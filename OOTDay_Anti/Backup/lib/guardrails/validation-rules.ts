/**
 * Validation Rules for Guardrails System
 * Defines keyword lists, occasion rules, and brand voice patterns
 */

import { getGuardrailConfig } from '../../config/guardrail-config';

/**
 * Check if query contains fashion-related keywords
 */
export function hasFashionKeywords(query: string): boolean {
  const config = getGuardrailConfig();
  const queryLower = query.toLowerCase();

  const fashionKeywordCount = config.offTopicDetection.fashionKeywords.filter(keyword =>
    queryLower.includes(keyword.toLowerCase())
  ).length;

  return fashionKeywordCount >= config.offTopicDetection.minFashionKeywords;
}

/**
 * Check if query contains off-topic keywords
 */
export function hasOffTopicKeywords(query: string): boolean {
  const config = getGuardrailConfig();
  const queryLower = query.toLowerCase();

  for (const [category, keywords] of Object.entries(config.offTopicDetection.offTopicCategories)) {
    const hasOffTopicKeyword = keywords.some(keyword =>
      queryLower.includes(keyword.toLowerCase())
    );

    if (hasOffTopicKeyword) {
      return true;
    }
  }

  return false;
}

/**
 * Detect occasion from query
 */
export function detectOccasion(query: string): string | null {
  const config = getGuardrailConfig();
  const queryLower = query.toLowerCase();

  // Check each occasion's keywords
  for (const [occasion, rules] of Object.entries(config.occasionRules)) {
    const hasOccasionKeyword = rules.keywords.allowed.some(keyword =>
      queryLower.includes(keyword.toLowerCase())
    );

    if (hasOccasionKeyword || queryLower.includes(occasion)) {
      return occasion;
    }
  }

  return null;
}

/**
 * Check if mentioned products are appropriate for occasion
 */
export function checkOccasionAppropriatenesss(response: string, occasion: string): boolean {
  const config = getGuardrailConfig();
  const rules = config.occasionRules[occasion];

  if (!rules) {
    return true; // No rules for this occasion, pass by default
  }

  const responseLower = response.toLowerCase();

  // Check for blocked keywords
  const hasBlockedKeyword = rules.keywords.blocked.some(keyword =>
    responseLower.includes(keyword.toLowerCase())
  );

  if (hasBlockedKeyword) {
    return false;
  }

  return true;
}

/**
 * Check brand voice compliance
 */
export function checkBrandVoiceCompliance(response: string): {
  compliant: boolean;
  score: number;
  details: string;
} {
  const config = getGuardrailConfig();
  let score = 10;
  const issues: string[] = [];

  // Check for required particles
  const particleCount = config.brandVoice.requiredParticles.filter(particle =>
    response.includes(particle)
  ).length;

  if (particleCount < config.brandVoice.minParticleCount) {
    score -= 3;
    issues.push(`Insufficient conversational particles (${particleCount}/${config.brandVoice.minParticleCount})`);
  } else if (particleCount > config.brandVoice.maxParticleCount) {
    score -= 2;
    issues.push(`Too many conversational particles (${particleCount}/${config.brandVoice.maxParticleCount})`);
  }

  // Check emoji count
  const emojiCount = (response.match(/[\u{1F300}-\u{1F9FF}]|✨|💡|👔|👗|👞|💰|🔗|💕/gu) || []).length;

  if (emojiCount < config.brandVoice.requiredEmojiCount.min) {
    score -= 2;
    issues.push(`Insufficient emojis (${emojiCount}/${config.brandVoice.requiredEmojiCount.min})`);
  } else if (emojiCount > config.brandVoice.requiredEmojiCount.max) {
    score -= 1;
    issues.push(`Too many emojis (${emojiCount}/${config.brandVoice.requiredEmojiCount.max})`);
  }

  // Check for forbidden formal terms
  const hasForbiddenTerms = config.brandVoice.forbiddenFormalTerms.some(term =>
    response.includes(term)
  );

  if (hasForbiddenTerms) {
    score -= 4;
    issues.push('Contains overly formal terms');
  }

  const compliant = score >= 6; // Pass threshold

  return {
    compliant,
    score,
    details: issues.length > 0 ? issues.join('; ') : 'All checks passed'
  };
}

/**
 * Check topic relevance
 */
export function checkTopicRelevance(response: string): boolean {
  const config = getGuardrailConfig();
  const responseLower = response.toLowerCase();

  // Check for fashion keywords
  const hasFashionContent = config.offTopicDetection.fashionKeywords.some(keyword =>
    responseLower.includes(keyword.toLowerCase())
  );

  // Check for off-topic content
  for (const [category, keywords] of Object.entries(config.offTopicDetection.offTopicCategories)) {
    const hasOffTopicContent = keywords.some(keyword =>
      responseLower.includes(keyword.toLowerCase())
    );

    if (hasOffTopicContent) {
      return false;
    }
  }

  return hasFashionContent;
}

export { getGuardrailConfig };
