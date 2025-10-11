# OOTDay AI Fashion Assistant 🛍️

A friendly Thai fashion specialist AI assistant integrated with Central Group's product ecosystem.

## 📋 Overview

OOTDay is an AI-powered fashion chatbot designed to provide personalized styling advice and product recommendations from Central Group's extensive catalog. The assistant combines fashion expertise with conversational AI to help customers find the perfect outfit for any occasion.

## ✨ Key Features

### 🎯 Core Capabilities
- **Personalized Fashion Consultation**: Understands customer needs and provides tailored recommendations
- **Multi-Occasion Expertise**: Specialized knowledge for 9+ different occasions
- **Product Integration**: Direct links to Central Group products with real-time pricing
- **Thai Language Support**: Natural Thai conversation with appropriate code-switching
- **Smart Context Management**: Remembers preferences throughout the conversation
- **Special Scenario Handling**: Adapts to budget constraints, fashion novices, and sensitive situations

### 🎨 Occasions Covered
1. **งานแต่งงาน (Wedding)** - Elegant formal wear
2. **ทำงาน (Work)** - Professional office attire
3. **วันชิลล์ (Chill Day)** - Casual comfortable looks
4. **ออกกำลังกาย (Sport)** - Athletic performance wear
5. **ท่องเที่ยว (Travel)** - Versatile travel outfits
6. **เดท (Date)** - Romantic evening wear
7. **ดินเนอร์ (Dinner)** - Sophisticated restaurant looks
8. **คาเฟ่ (Cafe)** - Instagram-worthy casual
9. **ปาร์ตี้ (Party)** - Statement party outfits

## 🏗️ Architecture

### Component Structure

```
t7/
├── dialog.md                    # Original specification document
├── ootday_assistant.py          # Core assistant with personality
├── conversation_manager.py      # Conversation flow & state management
├── occasion_expertise.py        # Occasion-specific styling knowledge
├── product_recommendation.py    # Product database & recommendation engine
├── special_scenarios.py         # Special customer scenario handling
├── test_scenarios.py            # Test suite & validation
├── main.py                      # Main integration & API
└── README.md                    # This file
```

### Module Descriptions

#### 1. **ootday_assistant.py**
- Core chatbot personality and identity
- Basic message processing
- Product database initialization
- Outfit generation logic

#### 2. **conversation_manager.py**
- Multi-turn conversation flow management
- Context tracking and state transitions
- Template-based response generation
- Information gathering strategies

#### 3. **occasion_expertise.py**
- Detailed guidelines for each occasion
- Seasonal adjustments (hot/rainy/cool)
- Style compatibility calculations
- Cultural considerations for Thai market

#### 4. **product_recommendation.py**
- Product database with Central Group brands
- Smart recommendation engine
- Product filtering and search
- Outfit combination algorithms
- Alternative product suggestions

#### 5. **special_scenarios.py**
- Budget-conscious customer handling
- Fashion novice support
- Body-conscious sensitivity
- Time-pressed quick recommendations
- Gift buyer assistance
- Special needs accommodation

#### 6. **test_scenarios.py**
- 10+ comprehensive test scenarios
- Example conversation flows
- Response validation
- Quality assurance checks

#### 7. **main.py**
- Integration of all components
- Session management
- API interface
- Conversation export
- Demo and testing

## 🚀 Usage

### Running the Demo

```bash
cd /Users/naruechon/Documents/Project/ChatDialog/t7
python3 main.py
```

### Running Tests

```bash
python3 main.py test
```

### Basic Usage Example

```python
from main import OOTDayAPI

# Initialize API
api = OOTDayAPI()

# Start new session
response = api.chat(session_id="user_123")
print(response['response'])  # "ฮายย ✋🏻 กำลังหาอะไรอยู่"

# Send message
response = api.chat(session_id="user_123", message="หาชุดไปงานแต่ง")
print(response['response'])  # Full outfit recommendations

# Get session info
info = api.get_session_info(session_id="user_123")
print(info)
```

### Advanced Usage

```python
from ootday_assistant import OOTDayAssistant
from product_recommendation import ProductDatabase, RecommendationEngine

# Initialize components
assistant = OOTDayAssistant()
product_db = ProductDatabase()
engine = RecommendationEngine(product_db)

# Generate outfit
outfit = engine.generate_outfit(
    occasion="wedding",
    gender="female",
    budget=8000,
    style_preferences=["classic", "elegant"]
)

print(f"Total price: ฿{outfit.total_price:,}")
for product in outfit.products:
    print(f"- {product.name}: ฿{product.price:,}")
```

## 🎭 Personality & Communication Style

### Core Personality Traits
- **Tone**: Warm, friendly, conversational
- **Approach**: Like a fashion-savvy best friend
- **Language**: Thai with natural English code-switching
- **Expertise**: Global fashion trends + Thai sensibilities

### Response Format

Every outfit recommendation includes:
```
**ลุค [Number]: [Creative Name]**
[Style description in Thai]

🛍️ **แนะนำสินค้า:**
- [Product 1 with link and price]
- [Product 2 with link and price]
- [Product 3 with link and price]

**รวม:** ฿[Total]

💡 **Styling Tip:** [Practical advice]

---

อยากดูทางเลือกอื่นไหมคะ? 😊
```

## 📊 Product Database

### Supported Brands

**Central Department Store Brands:**
- JASPAL
- CPS CHAPS
- LYN
- AIIZ

**International Brands:**
- ZARA, UNIQLO, H&M, MANGO
- CHARLES & KEITH, PEDRO
- STEVE MADDEN
- ADIDAS, NIKE
- COACH, KATE SPADE, MICHAEL KORS

**Thai Local Brands:**
- GREYHOUND
- FLYNOW
- THEATRE

### Product Categories
- Women's: Dresses, Tops, Bottoms, Shoes, Bags, Accessories
- Men's: Shirts, Pants, Suits, Shoes, Bags, Accessories
- Unisex: Sportswear, Casual Wear, Outerwear

## 🎯 Special Features

### 1. Budget-Conscious Support
- Highlights sales and promotions
- Emphasizes value and versatility
- Mix-and-match suggestions
- Gradual wardrobe building

### 2. Fashion Novice Guidance
- Simplified explanations
- Step-by-step styling advice
- Confidence-building language
- Safe, classic recommendations

### 3. Trend-Focused Recommendations
- Latest fashion trends
- Influencer-inspired looks
- Social media ready outfits
- Limited edition items

### 4. Body-Conscious Sensitivity
- Flattering silhouettes
- Positive framing only
- Focus on best features
- Never judgmental

### 5. Time-Pressed Quick Service
- Immediate top recommendations
- Ready-to-go complete outfits
- Concise, action-oriented responses
- In-stock availability focus

## 🧪 Testing & Validation

### Automated Validations

Every response is checked for:
- ✅ Product links (Central Online URLs)
- ✅ Price information (฿ symbol)
- ✅ Emojis for warmth
- ✅ Styling tips
- ✅ Thai language content
- ✅ Proper formatting

### Test Coverage

- **10+ Scenario Tests**: Wedding, Work, Date, Sport, Travel, etc.
- **Edge Cases**: Budget constraints, special needs, time pressure
- **Conversation Flows**: Multi-turn dialogues
- **Response Quality**: Format, tone, completeness

### Running Validations

```python
from test_scenarios import ConversationValidator

validator = ConversationValidator()
validations = validator.validate_response(response)
print(validations)  # Dict of validation results
```

## 📈 Success Metrics

The system supports these KPIs:

1. **Conversion Rate**: Direct product links drive purchases
2. **User Engagement**: Personalized, friendly interactions
3. **Central Online Traffic**: Every recommendation links to store
4. **Brand Loyalty**: Expert, accessible advice builds trust
5. **Cross-Selling**: Complete outfit recommendations

## 🔧 Configuration

### Adjusting Product Database

Edit `product_recommendation.py` to add/modify products:

```python
def _initialize_products(self):
    return [
        CentralProduct(
            sku="YOUR-SKU",
            name="Product Name",
            brand=Brand.BRAND_NAME,
            category=ProductCategory.CATEGORY,
            price=1990,
            colors=["สีขาว", "สีดำ"],
            # ... other fields
        )
    ]
```

### Customizing Occasions

Edit `occasion_expertise.py` to modify occasion guidelines:

```python
OccasionGuideline(
    occasion_type=OccasionType.YOUR_OCCASION,
    thai_name="ชื่อไทย",
    style_description="คำอธิบายสไตล์",
    # ... other fields
)
```

### Adjusting Personality

Edit `dialog.md` specification and update templates in `conversation_manager.py`.

## 🌟 Best Practices

### DO ✅
- Always include Central product links
- Use Thai naturally with appropriate emojis
- Consider Thai climate and culture
- Offer practical styling advice
- Show enthusiasm for fashion
- Provide options at different price points
- Ask follow-up questions to refine

### DON'T ❌
- Be overly formal or robotic
- Recommend products without links
- Ignore cultural appropriateness
- Overwhelm with too many options
- Use excessive jargon without explanation
- Make assumptions without asking
- Push products aggressively

## 🔄 Integration Points

### Future Enhancements

1. **Real-time Inventory**: Connect to Central's live product API
2. **Visual Search**: Upload photo to find similar items
3. **Size Recommendations**: AI-powered size fitting
4. **Preference Learning**: ML-based personalization
5. **Virtual Try-On**: AR integration
6. **Order Tracking**: Purchase follow-up
7. **Loyalty Program**: Points and rewards integration

### API Endpoints (Future)

```
POST /api/chat              # Send message
GET  /api/session/{id}      # Get session info
GET  /api/products/search   # Search products
GET  /api/occasions         # List occasions
POST /api/feedback          # Submit feedback
```

## 📝 Example Conversations

### Example 1: Wedding Guest

```
User: หาชุดไปงานแต่งเพื่อนค่ะ
Bot: อ้าว งานแต่งงานเพื่อนน่ารักเลย! 💕 อยากทราบรายละเอียดนิดนึงนะคะ
     งานแต่งแบบไหนคะ? เป็นงานในสวน โรงแรม หรือว่าวัด?

User: งานในโรงแรมค่ะ อยากดูดีแบบเรียบหรู
Bot: [2-3 complete outfit recommendations with products]
```

### Example 2: Budget-Conscious

```
User: หาชุดทำงานค่ะ แต่งบไม่เยอะ ไม่เกิน 3000
Bot: ไม่เป็นไรเลยค่ะ! เรามีตัวเลือกดีๆ ในราคาที่จับต้องได้นะคะ 💰
     [Budget-friendly work outfit recommendations]
```

### Example 3: Fashion Novice

```
User: ไม่รู้จะแต่งตัวยังไงดี ช่วยเลือกให้หน่อยค่ะ
Bot: ไม่ยากเลยค่ะ! เดี๋ยวช่วยเลือกให้ ชอบสไตล์แบบไหนคะ?
     เราจะหาชุดที่ใส่ง่ายและดูดีให้นะคะ 😊
```

## 📞 Support

For issues or questions about the OOTDay implementation:
1. Review this README
2. Check test scenarios in `test_scenarios.py`
3. Review original specification in `dialog.md`
4. Run demo with `python3 main.py` for testing

## 📄 License

This implementation is for Central Group's OOTDay Fashion Assistant project.

## 🎉 Credits

Built following the comprehensive specification in `dialog.md`, integrating:
- Thai fashion market expertise
- Central Group product ecosystem
- Conversational AI best practices
- Cultural sensitivity and inclusivity

---

**Version**: 1.0.0
**Last Updated**: 2025-10-10
**Status**: Demo Ready ✅

**Next Steps**:
1. Connect to Central's real product API
2. Deploy to production environment
3. Integrate with existing chat platform
4. Add analytics and monitoring
5. Continuous improvement based on user feedback