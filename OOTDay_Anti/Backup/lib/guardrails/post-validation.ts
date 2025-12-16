/**
 * Post-Validation for Guardrails System
 * Validates LLM responses for occasion appropriateness, brand voice, and topic relevance
 */

import {
  detectOccasion,
  checkOccasionAppropriatenesss,
  checkBrandVoiceCompliance,
  checkTopicRelevance,
  getGuardrailConfig
} from './validation-rules';

export interface PostValidationResult {
  passed: boolean;
  violations: string[];
  occasionCheck: boolean;
  brandVoiceCheck: { compliant: boolean; score: number; details: string };
  topicRelevanceCheck: boolean;
}

/**
 * Perform post-validation on LLM response
 */
export function postValidateResponse(
  response: string,
  originalQuery: string
): PostValidationResult {
  const config = getGuardrailConfig();

  if (!config.postValidationEnabled) {
    return {
      passed: true,
      violations: [],
      occasionCheck: true,
      brandVoiceCheck: { compliant: true, score: 10, details: 'Validation disabled' },
      topicRelevanceCheck: true
    };
  }

  const violations: string[] = [];

  // Check occasion appropriateness
  const occasion = detectOccasion(originalQuery);
  let occasionCheck = true;

  if (occasion) {
    occasionCheck = checkOccasionAppropriatenesss(response, occasion);
    if (!occasionCheck) {
      violations.push(`occasion_inappropriate_for_${occasion}`);
    }
  }

  // Check brand voice compliance
  const brandVoiceCheck = checkBrandVoiceCompliance(response);
  if (!brandVoiceCheck.compliant) {
    violations.push('brand_voice_non_compliant');
  }

  // Check topic relevance
  const topicRelevanceCheck = checkTopicRelevance(response);
  if (!topicRelevanceCheck) {
    violations.push('off_topic_content');
  }

  return {
    passed: violations.length === 0,
    violations,
    occasionCheck,
    brandVoiceCheck,
    topicRelevanceCheck
  };
}
