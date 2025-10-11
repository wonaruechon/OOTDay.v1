# Thai Fashion Chatbot - Implementation Guide

## Quick Start Checklist

### ✅ Core Requirements
- [ ] Greeting: "ฮายย ✋🏻 กำลังหาอะไรอยู่" (always on left side)
- [ ] Thai language with friendly tone
- [ ] Central product links in every recommendation
- [ ] 3-5 products per outfit suggestion
- [ ] Styling tips with each look

## System Architecture

### 1. Natural Language Processing (NLP)
```python
# Key Intent Categories
INTENTS = {
    'occasion': ['work', 'date', 'party', 'wedding', 'sport', 'travel', 'casual'],
    'style': ['formal', 'casual', 'chic', 'sporty', 'elegant', 'comfy'],
    'urgency': ['today', 'tomorrow', 'weekend', 'next week'],
    'budget': ['cheap', 'affordable', 'expensive', 'luxury']
}

# Entity Recognition
ENTITIES = {
    'gender': ['ชาย', 'หญิง', 'unisex'],
    'age_group': ['teen', 'young_adult', 'adult', 'senior'],
    'color': ['ขาว', 'ดำ', 'แดง', 'น้ำเงิน', 'ชมพู', 'เบจ', 'เทา'],
    'event_type': ['formal', 'semi-formal', 'casual', 'outdoor']
}

# Note: Size is NOT tracked - customers select during checkout
```

### 2. Product Management (Clothes vs Accessories)

**IMPORTANT DISTINCTION:**
- **CLOTHES** = WITH product links + images (lead to Central online)
- **ACCESSORIES** = STYLING TIPS & TRICKS only (NO links)

```javascript
// CLOTHES items - WITH links and images (lead to Central online)
const clothesProducts = {
  "work_formal": [
    {
      name: "AIIZ เสื้อเชิ้ตขาว",
      price: 1290,
      url: "/aiiz-shirt-white",
      image: "/images/aiiz-shirt.jpg",
      category: "clothes",
      type: "shirt"
    },
    {
      name: "UNIQLO กางเกงสีกรมท่า",
      price: 1290,
      url: "/uniqlo-navy-pants",
      image: "/images/uniqlo-pants.jpg",
      category: "clothes",
      type: "pants"
    }
  ],
  "date_casual": [
    {
      name: "H&M เสื้อลูกไม้",
      price: 590,
      url: "/hm-lace-top",
      image: "/images/hm-top.jpg",
      category: "clothes",
      type: "top"
    },
    {
      name: "POMELO กระโปรงชมพู",
      price: 790,
      url: "/pomelo-pink-skirt",
      image: "/images/pomelo-skirt.jpg",
      category: "clothes",
      type: "skirt"
    }
  ]
}

// ACCESSORIES - Styling tips & tricks ONLY (NO links, NO prices)
const accessoryStylingTips = {
  "work_formal": {
    shoes: {
      tip: "รองเท้าหนังสีดำหรือน้ำตาล",
      trick: "เลือกสีรองเท้าให้เข้ากับเข็มขัด = classic rule"
    },
    bag: {
      tip: "กระเป๋า tote bag หรือ structured bag",
      trick: "กระเป๋ามีโครงช่วยให้ดูเป็นระเบียบและมืออาชีพ"
    },
    jewelry: {
      tip: "นาฬิกาหนัง, เข็มขัดเข้าชุด",
      trick: "นาฬิกาหนังสายเข้ากับรองเท้า = coordinated look"
    }
  },
  "date_casual": {
    shoes: {
      tip: "รองเท้า flats หรือ sneakers สีอ่อน",
      trick: "เลือกรองเท้าสบายๆ เดินได้นาน - date ไม่ควรปวดเท้า!"
    },
    bag: {
      tip: "crossbody bag ใบเล็ก",
      trick: "กระเป๋าเล็กพอใส่มือถือ+ลิป ไม่กีดขวางตอนเดท"
    },
    jewelry: {
      tip: "ต่างหูห่วง, สร้อยคอเล็กๆ",
      trick: "เครื่องประดับ minimal = ดูไม่ try hard แต่น่ารัก"
    }
  }
}

// Product categories definition
const PRODUCT_CATEGORIES = {
  CLOTHES: ['เสื้อ', 'กางเกง', 'กระโปรง', 'เดรส', 'ชุดว่ายน้ำ', 'เสื้อกันหนาว', 'ถุงน่อง'],
  ACCESSORIES: ['รองเท้า', 'กระเป๋า', 'เครื่องประดับ', 'หมวก', 'แว่น', 'เข็มขัด', 'ผ้าพันคอ']
}
```

### 3. Recommendation Engine Logic (Updated)
```python
def generate_outfit_recommendation(user_context):
    """
    Input: User preferences and occasion
    Output: CLOTHES with links (3-5 items) + ACCESSORIES as styling tips
    """

    # Match user context to template
    template_key = match_template(
        occasion=user_context['occasion'],
        style=user_context['style'],
        budget=user_context['budget']
    )

    # Get CLOTHES items (with links)
    clothes_items = clothesProducts[template_key]

    # Get ACCESSORIES styling tips (NO links)
    accessories_tips = accessoryStylingTips[template_key]

    # Filter clothes by budget if specified
    if user_context.get('budget'):
        clothes_items = filter_by_budget(clothes_items, user_context['budget'])

    # Return formatted recommendation
    return {
        'clothes': clothes_items[:5],  # Max 5 CLOTHES items with links
        'accessories_tips': accessories_tips,  # Styling tips only
        'styling_tip': get_outfit_styling_tip(template_key),
        'total_price': sum(item['price'] for item in clothes_items),  # CLOTHES only
        'note': 'Total price includes clothes only. Accessories are optional styling suggestions.'
    }
```

## Conversation State Management

### State Machine Design
```
START → GREETING → INTENT_CAPTURE → CLARIFICATION → RECOMMENDATION → FEEDBACK → END
                            ↑                              ↓
                            └────────────←─────────────────┘
```

### Context Variables to Track
```python
conversation_context = {
    'session_id': 'uuid',
    'timestamp': 'datetime',
    'user_profile': {
        'gender': None,
        'age_range': None,
        # NOTE: size is NOT tracked - customers select at checkout
        'style_preference': [],
        'budget_range': None,
        'color_preferences': []
    },
    'current_request': {
        'occasion': None,
        'urgency': None,
        'specific_needs': [],
        'color_theme': None
    },
    'recommendations_shown': {
        'clothes': [],  # Items with links
        'accessories_tips': []  # Styling tips only
    },
    'feedback_received': [],
    'conversation_history': []
}
```

## Response Templates

### 1. Initial Greeting
```python
GREETING_TEMPLATE = "ฮายย ✋🏻 กำลังหาอะไรอยู่"
```

### 2. Clarification Questions
```python
CLARIFICATION_TEMPLATES = {
    'occasion': "ไปงานแบบไหนคะ? {options}",
    'style': "ชอบสไตล์แบบไหนคะ? {options}",
    'budget': "งบประมาณประมาณเท่าไหร่คะ?",
    'color': "มีสีที่ชอบเป็นพิเศษมั้ยคะ?",
    'time': "มีกำหนดเวลาเมื่อไหร่คะ? (ด่วน/ปกติ)"
}

# REMOVED: 'size' question - customers select size during checkout
# This streamlines the conversation and reduces friction
```

### 3. Product Recommendation
```python
PRODUCT_TEMPLATE = """
{number}. **{product_name}** - {brand} {product_type} สี{color} ({price} บาท)
   [ช้อปตอนนี้ →](https://www.central.co.th/th/{product_url})
"""
```

### 4. Styling Tips
```python
STYLING_TIPS = {
    'work': [
        "พับแขนเสื้อขึ้นครึ่งแขน จะดูผ่อนคลายแต่ยังดูดี",
        "ใส่เข็มขัดหนังเส้นเล็ก ช่วยให้ดู put together",
        "รองเท้าหนังสีเข้ากับเข็มขัด = Classic rule"
    ],
    'date': [
        "Slip dress + Denim jacket = คอมโบสุดปัง",
        "อย่าลืม Lip tint ติดทน ไม่ต้องเติมบ่อย",
        "Layer สร้อยคอเส้นเล็ก 2-3 เส้น ดูน่าสนใจ"
    ]
    # ... more occasions
}
```

## Error Handling & Edge Cases

### 1. No Products Available
```python
if not available_products:
    response = """
    ขออภัยค่ะ ตอนนี้สินค้าที่ตรงกับความต้องการหมดค่ะ
    ลองดูตัวเลือกใกล้เคียงนี้ดีมั้ยคะ: {alternative_options}
    """
```

### 2. Budget Mismatch
```python
if user_budget < min_outfit_price:
    response = """
    งบ {user_budget} บาท พี่มีตัวเลือกดีๆ มาแนะนำค่ะ!
    ลองเลือกซื้อทีละชิ้น หรือดู Sale items ก็ได้นะคะ
    {budget_friendly_options}
    """
```

### 3. Unclear Intent
```python
if confidence_score < 0.6:
    response = """
    ขอโทษค่ะ พี่ไม่แน่ใจว่าต้องการแบบไหน
    ช่วยบอกเพิ่มหน่อยได้มั้ยคะ:
    - จะไปงานอะไร?
    - ชอบสไตล์แบบไหน?
    - มีโทนสีที่อยากได้มั้ย?
    """
```

## Performance Optimization

### 1. Response Time Goals
- Initial greeting: < 100ms
- Intent recognition: < 500ms
- Product search: < 1 second
- Complete recommendation: < 2 seconds

### 2. Caching Strategy
```python
CACHE_KEYS = {
    'popular_outfits_{occasion}': 3600,  # 1 hour
    'product_details_{id}': 86400,        # 24 hours
    'user_preferences_{user_id}': 604800, # 7 days
    'trending_items': 1800                # 30 minutes
}
```

### 3. Load Balancing
- Use CDN for product images
- Cache frequent combinations
- Pre-compute popular outfits
- Async loading for non-critical data

## Analytics & Monitoring

### Key Metrics to Track
```python
ANALYTICS = {
    'conversation_metrics': [
        'avg_session_duration',
        'messages_per_session',
        'completion_rate',
        'abandonment_point'
    ],
    'recommendation_metrics': [
        'click_through_rate',
        'products_per_recommendation',
        'most_recommended_brands',
        'price_range_distribution'
    ],
    'user_satisfaction': [
        'positive_feedback_rate',
        'repeat_users',
        'recommendation_acceptance',
        'complaints_and_issues'
    ]
}
```

## Testing Scenarios

### 1. Happy Path Tests
- User asks for work outfit → Receives 3 options → Clicks product link
- User specifies budget → Gets recommendations within range
- User asks for alternatives → Receives different options

### 2. Edge Case Tests
- User gives vague request: "ชุดสวยๆ"
- Budget too low: "งบ 200 บาท"
- Specific unavailable combo: "ชุดว่ายน้ำสำหรับงานแต่ง"
- Multiple occasions: "ใส่ทำงานแล้วไปเดทต่อได้"

### 3. Stress Tests
- Concurrent users: 1000+
- Rapid message sending
- Large product catalog queries
- Network interruption handling

## Deployment Checklist

### Pre-Launch
- [ ] Test all product links
- [ ] Verify Thai language encoding
- [ ] Check mobile responsiveness
- [ ] Test payment gateway integration
- [ ] Validate analytics tracking

### Launch Day
- [ ] Monitor response times
- [ ] Check error rates
- [ ] Track user engagement
- [ ] Collect early feedback
- [ ] Have support team ready

### Post-Launch
- [ ] Daily performance review
- [ ] Weekly conversation analysis
- [ ] Monthly feature updates
- [ ] Quarterly trend integration
- [ ] Continuous model training

## Best Practices Summary

### ✨ Do's
1. **Always personalize** - Use context from conversation
2. **Be specific** - Include sizes, colors, prices
3. **Provide alternatives** - Offer 2-3 options
4. **Include tips** - Add styling advice
5. **Stay current** - Update with trends

### ❌ Don'ts
1. **Don't overwhelm** - Max 5 products per response
2. **Don't assume gender** - Ask if unclear
3. **Don't ignore budget** - Always respect constraints
4. **Don't be pushy** - Suggest, don't force
5. **Don't forget context** - Maintain conversation flow

## Support & Maintenance

### Daily Tasks
- Monitor error logs
- Check product link validity
- Review flagged conversations
- Update trending items

### Weekly Tasks
- Analyze conversation patterns
- Update recommendation weights
- Review customer feedback
- Retrain intent classifier

### Monthly Tasks
- Full system performance audit
- Update product catalog
- Review and update styling tips
- Analyze conversion metrics

## Contact & Resources

### Development Team Contacts
- Backend API: api-team@central.co.th
- Frontend Integration: web-team@central.co.th
- Product Database: catalog-team@central.co.th
- Analytics: data-team@central.co.th

### Documentation Links
- API Documentation: /docs/api
- Product Catalog Schema: /docs/products
- Conversation Flow Diagrams: /docs/flows
- Testing Guidelines: /docs/testing

### Training Resources
- Fashion Trend Updates: Weekly newsletter
- Thai Language Guidelines: /resources/language
- Central Brand Guidelines: /resources/branding
- Customer Service Best Practices: /resources/service

---

*Last Updated: 2024*
*Version: 1.0*
*Next Review: Monthly*