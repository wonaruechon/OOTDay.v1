# Thai Central Fashion Chatbot - P'Fashion 👗✨

A sophisticated Thai fashion specialist chatbot designed for Central Online, providing personalized outfit recommendations, styling tips, and fashion advice in Thai language.

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Architecture](#architecture)
- [Product Database](#product-database)
- [Testing](#testing)
- [API Reference](#api-reference)
- [Customization](#customization)
- [License](#license)

## 🎯 Overview

**P'Fashion** (พี่แฟชั่น) is a friendly, knowledgeable Thai fashion specialist chatbot that acts as your personal stylist. The chatbot provides:

- Personalized outfit recommendations based on occasions
- Budget-conscious shopping advice
- Seasonal fashion tips
- Mix & match styling guidance
- Direct links to Central Online products (for clothing items)

### Character Profile

- **Name:** พี่แฟชั่น (P'Fashion)
- **Role:** Thai Fashion Specialist & Personal Stylist at Central Online
- **Personality:** เป็นกันเอง เหมือนเพื่อนสนิทที่รักแฟชั่น พูดจาสนุกสนาน
- **Communication Style:** Casual Thai with polite particles (จ้า, ค่ะ, ครับ, นะคะ)

## ✨ Features

### 1. Occasion-Based Recommendations
- **Work:** Formal meetings, startup casual, smart casual
- **Social:** Weddings, dates, dinners, parties
- **Casual:** Cafe visits, weekend outings, shopping
- **Active:** Gym, yoga, sports, beach vacations

### 2. Comprehensive Product Database
- 50+ curated products from Central Online brands
- Women's and men's clothing
- Accessories (shoes, bags, jewelry, watches)
- Budget tiers: Entry, Mid, Premium, Luxury

### 3. Smart Product Recommendations
- **Clothing items:** Direct links to Central Online
- **Accessories:** Styling tips and general recommendations
- Price transparency with total outfit cost

### 4. Seasonal Awareness
- **Hot Season (Mar-May):** Light fabrics, breathable materials
- **Rainy Season (Jun-Oct):** Quick-dry fabrics, water-resistant options
- **Cool Season (Nov-Feb):** Layering, wool blends, warm materials

### 5. Budget Guidance
- **Entry:** 500-2,000 บาท (UNIQLO, H&M, ZARA)
- **Mid:** 2,000-5,000 บาท (COS, & OTHER STORIES)
- **Premium:** 5,000-20,000 บาท (COACH, MICHAEL KORS)
- **Luxury:** 20,000+ บาท (GUCCI, LOEWE, HERMÈS)

### 6. Styling Tips
- Mix & match techniques
- Color coordination advice
- Occasion-appropriate dressing
- Body type considerations
- Accessorizing guidance

## 🚀 Installation

### Prerequisites
- Python 3.8 or higher

### Setup

1. **Clone or download the project:**
```bash
cd /Users/naruechon/Documents/Project/ChatDialog/t8
```

2. **Install dependencies (if any):**
```bash
# Currently uses only Python standard library
# No additional dependencies required
```

3. **Verify installation:**
```bash
python thai_fashion_chatbot.py
```

## 💬 Usage

### Basic Usage

```python
from thai_fashion_chatbot import ChatInterface

# Initialize chatbot
chat = ChatInterface()

# Start conversation
greeting = chat.start_conversation()
print(greeting)  # "ฮายย ✋🏻 กำลังหาอะไรอยู่"

# Send messages
response = chat.send_message("มีประชุมสำคัญพรุ่งนี้ค่ะ อยากดูดีแต่ไม่เกินไป")
print(response)

# Get conversation history
history = chat.get_conversation_history()
```

### Interactive Mode

Run the chatbot in interactive mode:

```bash
python thai_fashion_chatbot.py
```

Example interaction:
```
🤖 ฮายย ✋🏻 กำลังหาอะไรอยู่

👤 You: มีประชุมสำคัญพรุ่งนี้ค่ะ
🤖 P'Fashion: [outfit recommendations with styling tips]

👤 You: งบประมาณ 10,000 บาทค่ะ
🤖 P'Fashion: [budget-appropriate recommendations]
```

### Using Product Database

```python
from product_database import (
    initialize_product_database,
    get_outfit_combinations,
    search_products_by_occasion,
    get_seasonal_recommendations
)

# Get all products
db = initialize_product_database()

# Get pre-defined outfit combinations
outfits = get_outfit_combinations()
work_outfit = outfits["work_formal_women"]

# Search products by occasion
wedding_products = search_products_by_occasion("wedding", gender="women")

# Get seasonal recommendations
hot_season_tips = get_seasonal_recommendations("hot")
```

## 🏗️ Architecture

### Project Structure

```
t8/
├── ThaiCentralFashionChatbot_Context.md  # Context document
├── thai_fashion_chatbot.py               # Main chatbot implementation
├── product_database.py                   # Product data and utilities
├── test_dialogues.py                     # Test cases and scenarios
└── README.md                             # This file
```

### Core Components

#### 1. ThaiCentralFashionChatbot Class
Main chatbot engine with:
- Intent analysis
- Occasion detection
- Response generation
- Conversation state management

#### 2. ChatInterface Class
User-facing interface for:
- Starting conversations
- Sending/receiving messages
- Managing conversation history

#### 3. Product Database
Comprehensive database with:
- Product information (name, brand, price, images, URLs)
- Outfit combinations
- Seasonal recommendations
- Budget-tier categorization

### Data Models

```python
@dataclass
class Product:
    name: str
    brand: str
    type: str
    price: int
    image_url: str
    central_url: str
    reason: str
    is_clothing: bool = True

@dataclass
class OutfitRecommendation:
    occasion: Occasion
    products: List[Product]
    styling_tips: List[str]
    total_price: int
```

## 📦 Product Database

### Categories

1. **Women's Formal Wear**
   - Blazer sets, silk blouses, tailored pants
   - Brands: ZARA, COS, MASSIMO DUTTI

2. **Women's Casual Wear**
   - Oversized shirts, jeans, basic tees
   - Brands: H&M, ZARA, UNIQLO

3. **Women's Dresses**
   - Midi dresses, slip dresses, floral dresses
   - Brands: POMELO, & OTHER STORIES, ZARA

4. **Men's Formal Wear**
   - Suits, dress shirts, dress pants
   - Brands: BROOKS BROTHERS, THOMAS PINK, CANALI

5. **Men's Casual Wear**
   - Oxford shirts, chinos, polos, linen shirts
   - Brands: UNIQLO, GAP, LACOSTE

6. **Sportswear**
   - Sports bras, leggings, swim shorts
   - Brands: NIKE, LULULEMON, BILLABONG

7. **Accessories**
   - Shoes, bags, jewelry, watches
   - Brands: CHARLES & KEITH, COACH, TORY BURCH

### Pre-defined Outfits

The database includes complete outfit combinations:

- **Work Formal Women:** "Power Meeting Look"
- **Work Casual Men:** "Startup Smart Casual"
- **Weekend Cafe Women:** "Cafe Hopping Chic"
- **Wedding Guest Women:** "Evening Wedding Guest"
- **First Date Women:** "Romantic Dinner Date"
- **Business Dinner Men:** "Executive Dinner"
- **Gym Workout Women:** "Gym Ready Look"
- **Beach Vacation Men:** "Beach Ready"

## 🧪 Testing

### Run All Tests

```bash
python test_dialogues.py --all
```

### Test Specific Components

```bash
# Test intent detection
python test_dialogues.py --intent

# Test occasion detection
python test_dialogues.py --occasion

# Interactive test mode
python test_dialogues.py --interactive
```

### Test Scenarios

The test suite includes 16 comprehensive scenarios:

1. Work Formal (Women)
2. Startup Casual (Men)
3. Weekend Cafe (Women)
4. Wedding Guest (Women)
5. Gym Workout (Women)
6. Beach Vacation (Men)
7. First Date (Women)
8. Business Dinner (Men)
9. Budget Inquiry
10. Style Advice
11. Unclear Request Handling
12. Seasonal Advice
13. Mix & Match
14. Multiple Occasions
15. Color Coordination
16. Body Type Styling

### Sample Test Output

```
TEST SUMMARY
================================================================================
Total Tests: 16
✅ Passed: 16
❌ Failed: 0
Success Rate: 100.0%
```

## 📚 API Reference

### ChatInterface

#### Methods

```python
start_conversation() -> str
```
Start a new conversation and return greeting message.

```python
send_message(message: str) -> str
```
Send a message and get chatbot response.

```python
get_conversation_history() -> List[Dict]
```
Get full conversation history.

```python
reset_conversation() -> None
```
Reset conversation state.

### ThaiCentralFashionChatbot

#### Methods

```python
get_greeting() -> str
```
Get initial greeting message.

```python
process_message(message: str) -> str
```
Process customer message and generate response.

```python
get_seasonal_advice() -> str
```
Get seasonal fashion advice based on current month.

### Product Database Functions

```python
initialize_product_database() -> Dict
```
Initialize and return complete product database.

```python
get_outfit_combinations() -> Dict
```
Get pre-defined outfit combinations.

```python
search_products_by_occasion(occasion: str, gender: str = "all") -> List[Dict]
```
Search products suitable for specific occasion.

```python
get_product_by_id(product_id: str) -> Optional[Dict]
```
Get specific product by ID.

```python
get_seasonal_recommendations(season: str) -> Dict
```
Get seasonal recommendations (hot/rainy/cool).

```python
get_budget_recommendations(budget_tier: str) -> Dict
```
Get recommendations by budget tier (entry/mid/premium/luxury).

## 🎨 Customization

### Adding New Products

Edit `product_database.py`:

```python
database = {
    "women_formal": [
        {
            "id": "WF999",
            "name": "Your Product Name",
            "brand": "BRAND",
            "type": "Product Type",
            "price": 2990,
            "image": "[Product image]",
            "url": "https://www.central.co.th/...",
            "reason": "Why this product is great",
            "is_clothing": True,
            "occasion": ["work", "meeting"]
        }
    ]
}
```

### Adding New Occasions

Edit `thai_fashion_chatbot.py`:

```python
class Occasion(Enum):
    YOUR_NEW_OCCASION = "your_occasion_name"
```

Then add detection keywords:

```python
occasion_keywords = {
    Occasion.YOUR_NEW_OCCASION: ["keyword1", "keyword2"],
}
```

### Customizing Personality

Edit chatbot initialization in `thai_fashion_chatbot.py`:

```python
self.polite_particles = ["จ้า", "ค่ะ", "ครับ", "นะคะ", "นะครับ"]
self.emojis = ["✨", "💕", "😊", "🛍️", "👗"]
```

### Adding Styling Tips

Add to outfit combinations in `product_database.py`:

```python
"styling_tips": [
    "Your styling tip here",
    "Another helpful tip",
    "Pro tip for this occasion"
]
```

## 🔄 Conversation Flow

```
1. Greeting
   ↓
2. Customer expresses need
   ↓
3. Chatbot analyzes intent & occasion
   ↓
4. Request clarification if needed
   ↓
5. Generate outfit recommendations
   ↓
6. Provide styling tips
   ↓
7. Offer alternatives/follow-up
```

## 📊 Intent Detection

The chatbot detects various intents:

- **need_outfit:** Customer wants clothing recommendations
- **budget_info:** Questions about pricing/budget
- **style_advice:** Seeking fashion tips
- **unclear:** Message too vague, needs clarification
- **general:** General conversation

## 🌡️ Seasonal Recommendations

### Hot Season (Mar-May)
- Fabrics: Linen, Cotton, Rayon
- Colors: White, Cream, Light Blue, Pastel
- Tips: Breathable, light-colored clothing

### Rainy Season (Jun-Oct)
- Fabrics: Quick-dry, Synthetic blends
- Colors: Dark colors (Navy, Black, Grey)
- Tips: Water-resistant, fast-drying materials

### Cool Season (Nov-Feb)
- Fabrics: Wool blend, Knit, Cashmere
- Colors: Earth tones, Burgundy, Forest Green
- Tips: Layering, warmer materials

## 🎯 Best Practices

### For Users
1. Specify the occasion clearly
2. Mention budget if you have one
3. Share style preferences (minimal, trendy, classic)
4. Indicate gender if ambiguous

### For Developers
1. Keep product database updated
2. Add seasonal products regularly
3. Test new dialogue scenarios
4. Monitor conversation quality
5. Update styling tips with trends

## 🐛 Troubleshooting

### Common Issues

**Issue:** Chatbot not detecting occasion
- **Solution:** Use more specific keywords (e.g., "ประชุม" instead of "งาน")

**Issue:** Wrong gender recommendations
- **Solution:** Explicitly mention gender in message

**Issue:** Budget recommendations not appearing
- **Solution:** Include price/budget information in message

## 📝 Future Enhancements

- [ ] Integration with actual Central Online API
- [ ] Image recognition for outfit analysis
- [ ] User preference learning
- [ ] Multi-language support (English/Thai)
- [ ] Voice interaction capability
- [ ] Virtual try-on recommendations
- [ ] Social media integration
- [ ] Shopping cart functionality
- [ ] Outfit rating and feedback system
- [ ] Trend analysis and forecasting

## 🤝 Contributing

Contributions are welcome! Please:

1. Test your changes thoroughly
2. Update documentation
3. Add test cases for new features
4. Follow existing code style

## 📄 License

This project is created for educational and demonstration purposes.

## 👥 Contact

For questions or support, please refer to the project documentation.

---

**Built with ❤️ for Central Online**

*Happy Shopping! 🛍️✨*
