/**
 * OpenRouter API Client for LLM Model Testing
 * Handles API requests to OpenRouter with error handling and retry logic
 */

import { OpenRouterResponse, OpenRouterError, TokenUsage } from './types/test-types';
import { promises as fs } from 'fs';
import path from 'path';

export interface ChatCompletionOptions {
  modelId: string;
  systemPrompt: string;
  userMessage: string;
  timeout?: number;
  maxRetries?: number;
}

export interface ChatCompletionResult {
  content: string;
  tokenUsage: TokenUsage;
  responseTime: number;
}

export class OpenRouterClient {
  private apiKey: string;
  private baseUrl = 'https://openrouter.ai/api/v1';
  private systemPromptCache: string | null = null;
  private readonly DEFAULT_TIMEOUT = 30000; // 30 seconds
  private readonly DEFAULT_MAX_RETRIES = 3;

  constructor(apiKey?: string) {
    this.apiKey = apiKey || process.env.OPENROUTER_API_KEY || '';
    if (!this.apiKey) {
      throw new Error('OpenRouter API key is required. Set OPENROUTER_API_KEY in .env.local');
    }
  }

  /**
   * Load DialogTemplate14-2.md content to use as system prompt
   */
  private async loadSystemPrompt(): Promise<string> {
    if (this.systemPromptCache) {
      return this.systemPromptCache;
    }

    try {
      const templatePath = path.join(process.cwd(), '..', 'dialog', 't14.2-CC', 'DialogTemplate14-2.md');
      this.systemPromptCache = await fs.readFile(templatePath, 'utf-8');
      return this.systemPromptCache;
    } catch (error) {
      console.error('Failed to load DialogTemplate14-2.md:', error);
      // Return a minimal system prompt if file loading fails
      return 'You are a friendly Thai fashion specialist providing outfit recommendations and styling advice.';
    }
  }

  /**
   * Exponential backoff delay calculation
   */
  private getBackoffDelay(attempt: number): number {
    return Math.min(1000 * Math.pow(2, attempt), 10000); // Max 10 seconds
  }

  /**
   * Sleep utility for retry delays
   */
  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Send chat completion request to OpenRouter API
   */
  async sendChatCompletion(options: ChatCompletionOptions): Promise<ChatCompletionResult> {
    const {
      modelId,
      systemPrompt: customSystemPrompt,
      userMessage,
      timeout = this.DEFAULT_TIMEOUT,
      maxRetries = this.DEFAULT_MAX_RETRIES
    } = options;

    // Load system prompt (uses cache after first load)
    const systemPrompt = customSystemPrompt || await this.loadSystemPrompt();

    let lastError: Error | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const startTime = Date.now();

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeout);

        const response = await fetch(`${this.baseUrl}/chat/completions`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://ootday.app', // Optional: your app URL
            'X-Title': 'OOTDay Fashion Assistant' // Optional: your app name
          },
          body: JSON.stringify({
            model: modelId,
            messages: [
              {
                role: 'system',
                content: systemPrompt
              },
              {
                role: 'user',
                content: userMessage
              }
            ]
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        const responseTime = Date.now() - startTime;

        // Handle HTTP errors
        if (!response.ok) {
          const errorData: OpenRouterError = await response.json().catch(() => ({
            error: {
              message: response.statusText,
              type: 'unknown',
              code: response.status
            }
          }));

          // Rate limit error - retry with exponential backoff
          if (response.status === 429) {
            if (attempt < maxRetries) {
              const delay = this.getBackoffDelay(attempt);
              console.warn(`Rate limited. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
              await this.sleep(delay);
              continue;
            }
            throw new Error(`Rate limit exceeded after ${maxRetries} retries`);
          }

          // Invalid API key
          if (response.status === 401) {
            throw new Error('Invalid OpenRouter API key. Please check your OPENROUTER_API_KEY in .env.local');
          }

          // Other errors
          throw new Error(errorData.error?.message || `API request failed with status ${response.status}`);
        }

        // Parse successful response
        const data: OpenRouterResponse = await response.json();

        if (!data.choices || data.choices.length === 0) {
          throw new Error('No response from model');
        }

        return {
          content: data.choices[0].message.content,
          tokenUsage: {
            promptTokens: data.usage.prompt_tokens,
            completionTokens: data.usage.completion_tokens,
            totalTokens: data.usage.total_tokens
          },
          responseTime
        };

      } catch (error: any) {
        lastError = error;

        // Don't retry for certain errors
        if (error.name === 'AbortError') {
          throw new Error(`Request timeout after ${timeout}ms`);
        }

        if (error.message?.includes('Invalid OpenRouter API key')) {
          throw error; // Don't retry for auth errors
        }

        // Retry for network errors
        if (attempt < maxRetries && (error.message?.includes('fetch') || error.message?.includes('network'))) {
          const delay = this.getBackoffDelay(attempt);
          console.warn(`Network error. Retrying in ${delay}ms... (attempt ${attempt + 1}/${maxRetries})`);
          await this.sleep(delay);
          continue;
        }

        // No more retries
        if (attempt === maxRetries) {
          throw lastError;
        }
      }
    }

    throw lastError || new Error('Request failed after all retries');
  }

  /**
   * Get the cached system prompt (useful for testing)
   */
  async getSystemPrompt(): Promise<string> {
    return await this.loadSystemPrompt();
  }
}
