/**
 * Guardrails System Configuration
 * Configures validation rules, keywords, and regeneration settings
 */

export interface GuardrailConfig {
  /** Enable/disable pre-validation */
  preValidationEnabled: boolean;

  /** Enable/disable post-validation */
  postValidationEnabled: boolean;

  /** Maximum regeneration attempts */
  maxRegenerations: number;

  /** Off-topic detection configuration */
  offTopicDetection: {
    /** Fashion-related keywords (Thai) */
    fashionKeywords: string[];
    /** Off-topic categories with keywords */
    offTopicCategories: Record<string, string[]>;
    /** Minimum fashion keywords required */
    minFashionKeywords: number;
  };

  /** Occasion appropriateness rules */
  occasionRules: Record<string, OccasionRule>;

  /** Brand voice validation patterns */
  brandVoice: {
    /** Required Thai conversational particles */
    requiredParticles: string[];
    /** Minimum particle count */
    minParticleCount: number;
    /** Maximum particle count */
    maxParticleCount: number;
    /** Required emoji count range */
    requiredEmojiCount: { min: number; max: number };
    /** Forbidden formal terms */
    forbiddenFormalTerms: string[];
    /** Conversational markers */
    conversationalMarkers: string[];
  };

  /** Redirect message for off-topic queries */
  redirectMessage: string;

  /** Fallback response when regenerations fail */
  fallbackResponse: string;
}

/**
 * Occasion appropriateness rule
 */
export interface OccasionRule {
  /** Formality level */
  formality: 'formal' | 'business-casual' | 'casual' | 'athletic' | 'party';
  /** Allowed clothing categories */
  allowedCategories: string[];
  /** Blocked clothing categories */
  blockedCategories: string[];
  /** Allowed keywords (Thai) */
  keywords: {
    allowed: string[];
    blocked: string[];
  };
}

/**
 * Default Guardrail configuration
 */
export const defaultGuardrailConfig: GuardrailConfig = {
  preValidationEnabled: process.env.GUARDRAIL_PRE_VALIDATION_ENABLED !== 'false',
  postValidationEnabled: process.env.GUARDRAIL_POST_VALIDATION_ENABLED !== 'false',
  maxRegenerations: parseInt(process.env.GUARDRAIL_MAX_REGENERATIONS || '2', 10),

  offTopicDetection: {
    fashionKeywords: [
      'เสื้อผ้า', 'แฟชั่น', 'สไตล์', 'outfit', 'แต่งตัว', 'ชุด',
      'กางเกง', 'เสื้อ', 'กระโปรง', 'รองเท้า', 'เดรส', 'แมทช์',
      'สี', 'ลาย', 'ทรง', 'ผ้า', 'แบรนด์', 'สวม', 'ใส่'
    ],
    offTopicCategories: {
      health: ['สุขภาพ', 'โรค', 'ยา', 'คลินิก', 'โรงพยาบาล', 'หมอ'],
      finance: ['เงิน', 'ลงทุน', 'หุ้น', 'กู้', 'เงินฝาก', 'ธนาคาร'],
      food: ['อาหาร', 'ร้านอาหาร', 'กิน', 'เมนู', 'สูตร', 'ทำอาหาร'],
      travel: ['ที่พัก', 'โรงแรม', 'ท่องเที่ยว', 'เที่ยวบิน', 'รีสอร์ท']
    },
    minFashionKeywords: 1
  },

  occasionRules: {
    wedding: {
      formality: 'formal',
      allowedCategories: ['dress', 'suit', 'thai-traditional', 'formal-wear'],
      blockedCategories: ['jeans', 't-shirt', 'sneakers', 'sportswear', 'shorts'],
      keywords: {
        allowed: ['เดรส', 'ชุดไทย', 'สูท', 'เสื้อเชิ้ต', 'กระโปรง', 'รองเท้าส้นสูง'],
        blocked: ['ยีนส์', 'เสื้อยืด', 'ผ้าใบ', 'กีฬา', 'ขาสั้น']
      }
    },
    work: {
      formality: 'business-casual',
      allowedCategories: ['shirt', 'blouse', 'slacks', 'dress', 'suit'],
      blockedCategories: ['crop-top', 'mini-skirt', 'ripped-jeans', 'sportswear'],
      keywords: {
        allowed: ['เสื้อเชิ้ต', 'เบลาส์', 'กางเกงสแล็ก', 'สูท', 'ออฟฟิศ'],
        blocked: ['เสื้อครอป', 'กระโปรงสั้น', 'ยีนส์ขาด', 'กีฬา']
      }
    },
    sport: {
      formality: 'athletic',
      allowedCategories: ['sportswear', 'athletic-wear', 'sneakers'],
      blockedCategories: ['formal-wear', 'dress', 'suit', 'heels'],
      keywords: {
        allowed: ['กีฬา', 'ออกกำลังกาย', 'ผ้าใบ', 'เลกกิ้ง'],
        blocked: ['สูท', 'เดรส', 'รองเท้าส้นสูง', 'เป็นทางการ']
      }
    },
    party: {
      formality: 'party',
      allowedCategories: ['party-wear', 'dress', 'trendy'],
      blockedCategories: ['office-wear', 'sportswear'],
      keywords: {
        allowed: ['ปาร์ตี้', 'สนุก', 'เท่', 'เปรี้ยว', 'เซ็กซี่'],
        blocked: ['ออฟฟิศ', 'กีฬา', 'เรียบร้อย']
      }
    },
    casual: {
      formality: 'casual',
      allowedCategories: ['casual-wear', 'jeans', 't-shirt', 'sneakers'],
      blockedCategories: ['formal-wear', 'suit'],
      keywords: {
        allowed: ['สบาย', 'ยีนส์', 'เสื้อยืด', 'ผ้าใบ', 'casual'],
        blocked: ['สูท', 'เป็นทางการ', 'เข้มงวด']
      }
    }
  },

  brandVoice: {
    requiredParticles: ['ค่ะ', 'นะคะ', 'เลย', 'นะ'],
    minParticleCount: 2,
    maxParticleCount: 5,
    requiredEmojiCount: { min: 1, max: 3 },
    forbiddenFormalTerms: ['ท่าน', 'กระผม', 'ข้าพเจ้า', 'ท่านผู้มีเกียรติ'],
    conversationalMarkers: ['แนะนำ', 'ช่วย', 'ลอง', 'ดูดี', 'เข้ากัน']
  },

  redirectMessage: 'ขอโทษนะคะ เราเป็นผู้ช่วยแนะนำแฟชั่นค่ะ ช่วยได้เฉพาะเรื่องเสื้อผ้าและการแต่งตัวเท่านั้น มีอะไรเกี่ยวกับชุดที่อยากปรึกษาไหมคะ? 😊',

  fallbackResponse: 'ขอโทษนะคะ ตอนนี้เรายังไม่สามารถแนะนำได้อย่างเหมาะสมค่ะ ลองถามใหม่อีกครั้งได้ไหมคะ หรือจะให้ช่วยแนะนำแบบทั่วไปก็ได้นะคะ 😊'
};

/**
 * Get Guardrail configuration with environment variable overrides
 */
export function getGuardrailConfig(): GuardrailConfig {
  return {
    ...defaultGuardrailConfig,
    preValidationEnabled: process.env.GUARDRAIL_PRE_VALIDATION_ENABLED !== 'false',
    postValidationEnabled: process.env.GUARDRAIL_POST_VALIDATION_ENABLED !== 'false',
    maxRegenerations: parseInt(
      process.env.GUARDRAIL_MAX_REGENERATIONS || String(defaultGuardrailConfig.maxRegenerations),
      10
    )
  };
}
