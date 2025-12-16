/**
 * Chat Orchestrator
 * Coordinates RAG, Guardrails, and LLM calls in unified flow
 */

import { preValidateQuery } from './guardrails/pre-validation';
import { postValidateResponse } from './guardrails/post-validation';
import { shouldRegenerateResponse, getFallbackResponse } from './guardrails/regeneration';
import { retrieveKnowledge, formatRetrievedContext } from './rag/retrieval';
import { OpenRouterClient } from './openrouter-client';
import { logRAGEvent, logGuardrailEvent } from './rag-guardrail-logger';

export interface ChatRequest {
  query: string;
  systemPrompt?: string;
  modelId?: string;
}

export interface ChatResponse {
  response: string;
  metadata: {
    ragUsed: boolean;
    ragChunksRetrieved: number;
    preValidationPassed: boolean;
    postValidationPassed: boolean;
    regenerationCount: number;
    isFallback: boolean;
    processingTimeMs: number;
  };
}

/**
 * Main chat orchestrator function
 * Handles complete flow: Pre-Validation → RAG → LLM → Post-Validation
 */
export async function processChatRequest(request: ChatRequest): Promise<ChatResponse> {
  const startTime = Date.now();
  let regenerationCount = 0;
  const maxRegenerations = 2;

  // Step 1: Pre-Validation
  const preValidation = preValidateQuery(request.query);
  logGuardrailEvent('pre_validation', { query: request.query, result: preValidation });

  if (!preValidation.passed) {
    // Return redirect message
    return {
      response: preValidation.redirectMessage || 'ขอโทษค่ะ เราช่วยเฉพาะเรื่องแฟชั่นนะคะ',
      metadata: {
        ragUsed: false,
        ragChunksRetrieved: 0,
        preValidationPassed: false,
        postValidationPassed: true,
        regenerationCount: 0,
        isFallback: false,
        processingTimeMs: Date.now() - startTime
      }
    };
  }

  // Step 2: RAG Retrieval (parallel with prompt building)
  let retrievedContext = '';
  let ragChunksRetrieved = 0;

  try {
    const ragResult = await retrieveKnowledge(request.query);
    logRAGEvent('retrieval', { query: request.query, result: ragResult });

    if (ragResult.success && ragResult.retrievedChunks.length > 0) {
      retrievedContext = formatRetrievedContext(ragResult.retrievedChunks);
      ragChunksRetrieved = ragResult.retrievedChunks.length;
    }
  } catch (error) {
    console.error('RAG retrieval failed, continuing without context:', error);
  }

  // Step 3: Build augmented prompt
  const augmentedSystemPrompt = buildAugmentedPrompt(request.systemPrompt || '', retrievedContext);

  // Step 4: LLM Call with potential regeneration
  const client = new OpenRouterClient();
  let llmResponse = '';
  let postValidation;
  let isFallback = false;

  while (regenerationCount <= maxRegenerations) {
    try {
      // Call LLM
      const result = await client.sendChatCompletion({
        modelId: request.modelId || 'anthropic/claude-3.5-sonnet',
        systemPrompt: augmentedSystemPrompt,
        userMessage: request.query
      });

      llmResponse = result.content;

      // Step 5: Post-Validation
      postValidation = postValidateResponse(llmResponse, request.query);
      logGuardrailEvent('post_validation', {
        query: request.query,
        response: llmResponse,
        result: postValidation
      });

      if (postValidation.passed) {
        // Validation passed, return response
        break;
      }

      // Check if regeneration needed
      const regenerationPrompt = shouldRegenerateResponse({
        originalQuery: request.query,
        originalResponse: llmResponse,
        validationResult: postValidation,
        attemptCount: regenerationCount
      });

      if (regenerationPrompt.isFallback) {
        // Max attempts reached, use fallback
        llmResponse = getFallbackResponse();
        isFallback = true;
        break;
      }

      if (regenerationPrompt.shouldRegenerate) {
        // Inject constraints and regenerate
        const constrainedPrompt = `${augmentedSystemPrompt}\n\n${regenerationPrompt.constraintPrompt}`;
        regenerationCount++;

        logGuardrailEvent('regeneration', {
          query: request.query,
          attemptCount: regenerationCount,
          constraints: regenerationPrompt.constraintPrompt
        });

        // Continue loop for regeneration
        const regenerateResult = await client.sendChatCompletion({
          modelId: request.modelId || 'anthropic/claude-3.5-sonnet',
          systemPrompt: constrainedPrompt,
          userMessage: request.query
        });

        llmResponse = regenerateResult.content;
      } else {
        break;
      }
    } catch (error) {
      console.error('LLM call failed:', error);
      llmResponse = getFallbackResponse();
      isFallback = true;
      break;
    }
  }

  return {
    response: llmResponse,
    metadata: {
      ragUsed: ragChunksRetrieved > 0,
      ragChunksRetrieved,
      preValidationPassed: true,
      postValidationPassed: postValidation?.passed || false,
      regenerationCount,
      isFallback,
      processingTimeMs: Date.now() - startTime
    }
  };
}

/**
 * Build augmented prompt with RAG context
 */
function buildAugmentedPrompt(baseSystemPrompt: string, retrievedContext: string): string {
  if (!retrievedContext) {
    return baseSystemPrompt;
  }

  return `${baseSystemPrompt}

---

${retrievedContext}

---

ใช้ข้อมูลความรู้ที่ให้มาข้างต้นเพื่อช่วยตอบคำถาม แต่ตอบในลักษณะที่เป็นธรรมชาติและเป็นกันเอง อย่าอ้างอิงถึง "ข้อมูลที่ให้มา" โดยตรง`;
}
