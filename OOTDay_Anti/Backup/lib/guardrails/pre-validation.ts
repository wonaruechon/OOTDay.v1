/**
 * Pre-Validation for Guardrails System
 * Off-topic detection and query validation before LLM call
 */

import { hasFashionKeywords, hasOffTopicKeywords, getGuardrailConfig } from './validation-rules';

export interface PreValidationResult {
  passed: boolean;
  blockReason?: string;
  redirectMessage?: string;
}

/**
 * Perform pre-validation on user query
 */
export function preValidateQuery(query: string): PreValidationResult {
  const config = getGuardrailConfig();

  if (!config.preValidationEnabled) {
    return { passed: true };
  }

  // Check off-topic
  const isFashionRelated = hasFashionKeywords(query);
  const isOffTopic = hasOffTopicKeywords(query);

  if (!isFashionRelated && isOffTopic) {
    return {
      passed: false,
      blockReason: 'off_topic',
      redirectMessage: config.redirectMessage
    };
  }

  if (!isFashionRelated && query.trim().length > 10) {
    // Query is substantial but has no fashion keywords
    return {
      passed: false,
      blockReason: 'not_fashion_related',
      redirectMessage: config.redirectMessage
    };
  }

  return { passed: true };
}
