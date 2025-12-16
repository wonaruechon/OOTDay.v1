/**
 * Regeneration Mechanism for Guardrails System
 * Handles response regeneration with constraint injection
 */

import { PostValidationResult } from './post-validation';
import { getGuardrailConfig } from './validation-rules';

export interface RegenerationContext {
  originalQuery: string;
  originalResponse: string;
  validationResult: PostValidationResult;
  attemptCount: number;
}

export interface RegenerationPrompt {
  shouldRegenerate: boolean;
  constraintPrompt: string;
  isFallback: boolean;
}

/**
 * Determine if regeneration is needed and create constraint prompt
 */
export function shouldRegenerateResponse(
  context: RegenerationContext
): RegenerationPrompt {
  const config = getGuardrailConfig();

  // Check if max attempts reached
  if (context.attemptCount >= config.maxRegenerations) {
    return {
      shouldRegenerate: false,
      constraintPrompt: '',
      isFallback: true
    };
  }

  // Check if validation failed
  if (!context.validationResult.passed) {
    const constraintPrompt = buildConstraintPrompt(context.validationResult);
    return {
      shouldRegenerate: true,
      constraintPrompt,
      isFallback: false
    };
  }

  return {
    shouldRegenerate: false,
    constraintPrompt: '',
    isFallback: false
  };
}

/**
 * Build constraint prompt based on violations
 */
function buildConstraintPrompt(validationResult: PostValidationResult): string {
  const constraints: string[] = [];

  for (const violation of validationResult.violations) {
    if (violation.startsWith('occasion_inappropriate')) {
      const occasion = violation.replace('occasion_inappropriate_for_', '');
      constraints.push(
        `IMPORTANT: This is for ${occasion.toUpperCase()}. Only suggest appropriate items for this occasion. Avoid casual wear for formal events and vice versa.`
      );
    }

    if (violation === 'brand_voice_non_compliant') {
      constraints.push(
        `IMPORTANT: Use friendly Thai conversational tone with particles like "ค่ะ", "นะคะ", "เลย". Include 1-3 emojis. Avoid overly formal language.`
      );
    }

    if (violation === 'off_topic_content') {
      constraints.push(
        `IMPORTANT: Stay focused on fashion and styling advice ONLY. Do not discuss health, finance, food, or travel topics.`
      );
    }
  }

  return constraints.join('\n\n');
}

/**
 * Get fallback response when regeneration fails
 */
export function getFallbackResponse(): string {
  const config = getGuardrailConfig();
  return config.fallbackResponse;
}
