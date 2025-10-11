# Quick Start Guide - Thai Central Fashion Chatbot

## 🚀 Get Started in 5 Minutes

### Step 1: Verify Files

Make sure you have these files in `/Users/naruechon/Documents/Project/ChatDialog/t8/`:

```
✅ thai_fashion_chatbot.py       # Main chatbot
✅ product_database.py            # Product data
✅ test_dialogues.py              # Tests
✅ README.md                      # Documentation
✅ QUICKSTART.md                  # This file
```

### Step 2: Run the Chatbot

Open terminal and run:

```bash
cd /Users/naruechon/Documents/Project/ChatDialog/t8
python thai_fashion_chatbot.py
```

### Step 3: Try Example Conversations

#### Example 1: Work Outfit
```
👤 You: มีประชุมสำคัญพรุ่งนี้ค่ะ
🤖 P'Fashion: [Recommends professional outfit]

👤 You: งบประมาณ 10,000 บาท
🤖 P'Fashion: [Adjusts recommendations]
```

#### Example 2: Weekend Casual
```
👤 You: วันหยุดจะไปนั่งคาเฟ่
🤖 P'Fashion: [Suggests comfy chic outfit]
```

#### Example 3: Date Night
```
👤 You: มีเดทมื้อเย็นค่ะ ตื่นเต้นมาก!
🤖 P'Fashion: [Gives romantic dinner outfit]
```

### Step 4: Test the System

Run automated tests:

```bash
# Run all test scenarios
python test_dialogues.py --all

# Run interactive test mode
python test_dialogues.py --interactive
```

## 📱 Usage Examples

### Basic Conversation

```python
from thai_fashion_chatbot import ChatInterface

# Create chatbot instance
chat = ChatInterface()

# Start
print(chat.start_conversation())

# Chat
response1 = chat.send_message("หาชุดไปทำงาน")
print(response1)

response2 = chat.send_message("งบ 5000 บาท")
print(response2)
```

### Get Product Information

```python
from product_database import (
    initialize_product_database,
    search_products_by_occasion
)

# Get all products
db = initialize_product_database()
print(f"Total products: {sum(len(cat) for cat in db.values())}")

# Search for work clothes
work_items = search_products_by_occasion("work", "women")
for item in work_items:
    print(f"{item['name']} - {item['price']} บาท")
```

### Get Outfit Combinations

```python
from product_database import get_outfit_combinations

# Get pre-defined outfits
outfits = get_outfit_combinations()

# Show work outfit
work_outfit = outfits["work_formal_women"]
print(f"Outfit: {work_outfit['name']}")
print(f"Items: {work_outfit['items']}")
print(f"Total: {work_outfit['total_estimate']} บาท")
```

## 🎯 Common Use Cases

### Use Case 1: Office Worker
**Need:** Professional outfit for important meeting
**Budget:** 10,000-20,000 บาท
**Message:** "มีประชุมสำคัญพรุ่งนี้ค่ะ งบ 15,000 บาท"

### Use Case 2: Startup Employee
**Need:** Smart casual for relaxed office
**Budget:** Under 5,000 บาท
**Message:** "ทำงาน startup ครับ อยากดูดีแต่สบายๆ งบไม่เกิน 5000"

### Use Case 3: Wedding Guest
**Need:** Elegant dress for evening wedding
**Budget:** Flexible
**Message:** "ไปงานแต่งเพื่อนค่ะ งานเย็นที่โรงแรม"

### Use Case 4: Gym Beginner
**Need:** Comfortable workout clothes
**Budget:** Entry level
**Message:** "เพิ่งเริ่มไปยิม อยากได้ชุดสบายๆ"

### Use Case 5: Beach Vacation
**Need:** Versatile vacation outfits
**Budget:** 10,000 บาท
**Message:** "ไปเที่ยวทะเล 3 วัน อยากได้ชุดที่ mix ได้หลายแบบ"

## 💡 Pro Tips

### Get Better Recommendations

1. **Be Specific About Occasion**
   - ❌ "หาชุด"
   - ✅ "หาชุดไปงานแต่งเพื่อน งานเย็นที่โรงแรม"

2. **Mention Your Budget**
   - ❌ "อยากได้ชุดสวยๆ"
   - ✅ "อยากได้ชุดสวยๆ งบประมาณ 10,000 บาท"

3. **Share Style Preferences**
   - ❌ "แนะนำชุดทำงาน"
   - ✅ "แนะนำชุดทำงานสไตล์มินิมอล สีพาสเทล"

4. **Indicate Gender if Needed**
   - ❌ "ชุดไปเดท"
   - ✅ "ชุดผู้ชายไปเดทมื้อแรก"

### Get Styling Advice

Ask about:
- Color coordination: "สีฟ้าเข้ากับสีอะไร"
- Mix & match: "เสื้อขาวกับกางเกงยีนส์ mix ยังไง"
- Body type: "ตัวเล็กควรใส่แบบไหน"
- Seasonal: "หน้าร้อนควรใส่ผ้าแบบไหน"

## 🔍 Exploring Features

### Check Seasonal Recommendations

```python
from thai_fashion_chatbot import ThaiCentralFashionChatbot

chatbot = ThaiCentralFashionChatbot()
seasonal_advice = chatbot.get_seasonal_advice()
print(seasonal_advice)
```

### Browse by Budget Tier

```python
from product_database import get_budget_recommendations

# Entry level (500-2,000 บาท)
entry = get_budget_recommendations("entry")
print(f"Brands: {entry['brands']}")

# Premium (5,000-20,000 บาท)
premium = get_budget_recommendations("premium")
print(f"Brands: {premium['brands']}")
```

### Get Outfit Ideas

```python
from product_database import get_outfit_combinations

outfits = get_outfit_combinations()

# List all available outfits
for outfit_id, outfit in outfits.items():
    print(f"{outfit_id}: {outfit['name']}")
    print(f"  Estimated cost: {outfit['total_estimate']:,} บาท")
    print(f"  Tips: {len(outfit['styling_tips'])} styling tips")
    print()
```

## 🧪 Testing

### Quick Test

```bash
# Run one test scenario
python test_dialogues.py --interactive
# Choose option 1 for work formal test
```

### Full Test Suite

```bash
# Run all 16 test scenarios
python test_dialogues.py --all
```

Expected output:
```
TEST SUMMARY
================================================================================
Total Tests: 16
✅ Passed: 16
❌ Failed: 0
Success Rate: 100.0%
```

## 🎨 Customization Quick Guide

### Add Your Own Product

Edit `product_database.py`, find the appropriate category:

```python
"women_casual": [
    {
        "id": "WC999",  # Unique ID
        "name": "Your Product",
        "brand": "BRAND NAME",
        "type": "Product Type",
        "price": 1990,
        "image": "[Image description]",
        "url": "https://www.central.co.th/...",
        "reason": "Why recommend this",
        "is_clothing": True,
        "occasion": ["casual", "weekend"]
    }
]
```

### Add Styling Tip

In `product_database.py`, find outfit combinations:

```python
"styling_tips": [
    "Your new styling tip here",
    # ... existing tips
]
```

## ❓ Common Questions

**Q: How do I exit the chatbot?**
A: Type `exit`, `quit`, `bye`, or `ลาก่อน`

**Q: Can I use English?**
A: Currently optimized for Thai language. English support planned.

**Q: How accurate are the prices?**
A: Prices are sample data. Real integration would fetch from Central Online API.

**Q: Can I add my own brands?**
A: Yes! Edit `product_database.py` to add products.

**Q: How do I reset a conversation?**
A: Call `chat.reset_conversation()` or restart the program.

## 📚 Next Steps

1. **Explore the Code**
   - Read `thai_fashion_chatbot.py` for chatbot logic
   - Browse `product_database.py` for product data
   - Check `test_dialogues.py` for examples

2. **Try Different Scenarios**
   - Work outfits (formal/casual)
   - Special occasions (wedding/date)
   - Active wear (gym/beach)
   - Style advice

3. **Customize**
   - Add your favorite brands
   - Create custom outfit combinations
   - Add personal styling tips

4. **Read Full Documentation**
   - See `README.md` for complete details
   - Check API reference
   - Review architecture

## 🆘 Need Help?

1. Check `README.md` for detailed documentation
2. Run tests to see examples: `python test_dialogues.py --all`
3. Review the context document: `ThaiCentralFashionChatbot_Context.md`

## 🎉 You're Ready!

Start chatting with P'Fashion:

```bash
python thai_fashion_chatbot.py
```

Happy styling! 👗✨
