# Product Recommendation Response Templates
## สำหรับระบบแนะนำสินค้า Central Fashion Chatbot

---

## 📦 Product Display Format (Updated Policy)

### ✅ CLOTHES Items (WITH Links & Images)
**Category:** เสื้อ, กางเกง, กระโปรง, เดรส, ชุดว่ายน้ำ, เสื้อกันหนาว, ถุงน่อง

```markdown
📸 ![{product_name}]({image_url})
**{brand} {product_name}**
💰 {price} บาท
[ช้อปเลย →](https://central.co.th/{url})
```

### 💡 ACCESSORIES (Styling Tips & Tricks ONLY - NO Links)
**Category:** รองเท้า, กระเป๋า, เครื่องประดับ, หมวก, แว่น, เข็มขัด

```
💡 **Styling Tips & Tricks:**
• **รองเท้า:** {shoe_tip} - {styling_trick}
• **กระเป๋า:** {bag_tip} - {styling_trick}
• **เครื่องประดับ:** {jewelry_tip} - {styling_trick}
```

#### Example Output:
```
👔 **Outfit สำหรับทำงาน**

📸 ![AIIZ Shirt](/images/aiiz-shirt.jpg)
**AIIZ เสื้อเชิ้ตขาว**
💰 1,290 บาท
[ช้อปเลย →](https://central.co.th/aiiz-shirt)

📸 ![UNIQLO Pants](/images/uniqlo-pants.jpg)
**UNIQLO กางเกงสีกรมท่า**
💰 1,290 บาท
[ช้อปเลย →](https://central.co.th/uniqlo-pants)

**Total เสื้อผ้า: 2,580 บาท**

💡 **Styling Tips & Tricks:**
• **รองเท้า:** รองเท้าหนังสีดำหรือน้ำตาล - เลือกสีให้เข้ากับเข็มขัด = classic rule
• **กระเป๋า:** Tote bag หนังสีกลาง - กระเป๋ามีโครงช่วยให้ดูมืออาชีพ
• **เครื่องประดับ:** นาฬิกาหนังเรียบหรู - minimal jewelry = professional look
```

---

### Alternative: Numbered List (for emphasis)
```
1. **{brand} {product}** - {price} บาท
   [ช้อปตอนนี้ →]({url})
```

#### Example:
```
1. **POMELO เดรสชมพู** - 1,990 บาท
   [ช้อปตอนนี้ →](link)
```

---

### Complete Outfit Format
```
💼 **{look_name}** - Total: {total} บาท

• {item1} - {price1}.- [→](link)
• {item2} - {price2}.- [→](link)
• {item3} - {price3}.- [→](link)

💡 {styling_tip}
```

#### Example Output:
```
💼 **Smart Casual Look** - Total: 4,470 บาท

• AIIZ เสื้อเชิ้ตขาว - 1,290.- [→](link)
• UNIQLO กางเกงกรมท่า - 1,290.- [→](link)
• Charles & Keith รองเท้า - 1,890.- [→](link)

💡 พับแขนเสื้อ + ใส่นาฬิกา = ดูผ่อนคลายแต่โปร
```

---

## 🏷️ Product Categories & Typical Prices

### Women's Clothing
```json
{
  "tops": {
    "basic_tee": "290-590 THB",
    "blouse": "890-2,290 THB",
    "shirt": "990-2,490 THB",
    "sweater": "1,290-3,990 THB"
  },
  "bottoms": {
    "jeans": "990-2,990 THB",
    "trousers": "1,290-3,490 THB",
    "skirt": "790-2,490 THB",
    "shorts": "590-1,790 THB"
  },
  "dresses": {
    "casual": "890-2,490 THB",
    "work": "1,990-4,990 THB",
    "evening": "2,990-8,990 THB",
    "maxi": "1,790-3,990 THB"
  },
  "outerwear": {
    "blazer": "1,990-5,990 THB",
    "cardigan": "890-2,490 THB",
    "jacket": "1,490-4,990 THB",
    "coat": "2,990-7,990 THB"
  }
}
```

### Men's Clothing
```json
{
  "tops": {
    "polo": "790-1,990 THB",
    "dress_shirt": "990-2,990 THB",
    "t_shirt": "390-990 THB",
    "sweater": "1,290-3,490 THB"
  },
  "bottoms": {
    "chinos": "1,490-2,990 THB",
    "jeans": "1,290-3,490 THB",
    "dress_pants": "1,990-4,490 THB",
    "shorts": "790-1,990 THB"
  },
  "suits": {
    "blazer": "3,990-9,990 THB",
    "full_suit": "6,990-15,990 THB",
    "vest": "1,990-3,990 THB"
  }
}
```

### Footwear
```json
{
  "women": {
    "heels": "1,590-4,990 THB",
    "flats": "890-2,490 THB",
    "sneakers": "1,490-3,990 THB",
    "boots": "2,490-5,990 THB",
    "sandals": "790-2,290 THB"
  },
  "men": {
    "dress_shoes": "2,490-5,990 THB",
    "loafers": "1,990-4,490 THB",
    "sneakers": "1,990-4,990 THB",
    "boots": "2,990-6,990 THB",
    "sandals": "890-1,990 THB"
  }
}
```

### Accessories
```json
{
  "bags": {
    "clutch": "890-2,990 THB",
    "crossbody": "1,290-3,990 THB",
    "tote": "1,490-4,490 THB",
    "backpack": "1,990-3,990 THB",
    "wallet": "790-2,490 THB"
  },
  "jewelry": {
    "earrings": "390-1,990 THB",
    "necklace": "590-2,490 THB",
    "bracelet": "490-1,790 THB",
    "watch": "1,990-9,990 THB"
  },
  "other": {
    "belt": "790-2,290 THB",
    "scarf": "590-1,490 THB",
    "hat": "490-1,290 THB",
    "sunglasses": "990-3,490 THB"
  }
}
```

---

## 🎨 Occasion-Based Templates

### Template: Work/Office
```
สำหรับวันทำงาน พี่แนะนำ {style_name} Look ค่ะ 💼

**Essential Pieces:**
1. เสื้อ: {top_item} - {top_price} บาท
2. กางเกง/กระโปรง: {bottom_item} - {bottom_price} บาท
3. รองเท้า: {shoes_item} - {shoes_price} บาท

**Optional Additions:**
• เบลเซอร์เพิ่มความเป็นทางการ
• กระเป๋าหนังดูโปรเฟสชั่นอล
• นาฬิกาเรียบหรู

💡 **Office Tip:** {specific_tip}
```

### Template: Date Night
```
Date night ต้องพิเศษ! 💕 ลอง {look_description} ดูค่ะ

**The Look:**
{item_1} + {item_2} + {item_3}

**ราคา:**
• Look นี้ทั้งหมด: {total} บาท
• ชิ้นหลัก: {main_piece} - {main_price} บาท
• Mix & Match ได้กับ: {versatile_info}

💫 **Date Secret:** {romantic_tip}
```

### Template: Party/Event
```
🎉 {event_type} Ready Look!

**Must-Haves:**
{numbered_item_list}

**Total Investment:** {total_price} บาท

**Party Survival Kit:**
✓ {essential_1}
✓ {essential_2}
✓ {essential_3}

🌟 **Pro Tip:** {party_advice}
```

---

## 📱 Response Templates by User Type

### New Customer (First Interaction)
```
สวัสดีค่ะ! ยินดีต้อนรับสู่ Central Fashion Stylist 😊
พี่จะช่วยแนะนำการแต่งตัวให้เหมาะกับทุกโอกาสค่ะ

เริ่มจากบอกพี่หน่อยว่า:
• กำลังหาชุดสำหรับโอกาสอะไรคะ?
• มีสไตล์ที่ชอบเป็นพิเศษมั้ย?
• งบประมาณประมาณไหนคะ?

พร้อมช่วยเลือกให้เลยค่ะ! 💕
```

### Returning Customer
```
ดีใจที่ได้เจอกันอีกค่ะ! 😊
จำได้ว่าคุณชอบสไตล์ {previous_style} นะคะ

วันนี้มาหาอะไรคะ?
□ ชุดทำงาน
□ ชุดลำลอง
□ ชุดออกงาน
□ อื่นๆ (บอกได้เลยค่ะ)
```

### VIP/Frequent Shopper
```
สวัสดีคุณ {name} ค่ะ! ✨
เป็นยังไงบ้างคะ?

📍 New Arrivals สำหรับคุณ:
• {brand} คอลเลคชั่นใหม่ที่คุณชอบ
• Sale พิเศษ {discount}% เฉพาะ VIP
• {trending_item} ที่กำลังฮิต

วันนี้อยากดูอะไรเป็นพิเศษคะ?
```

---

## 💬 Quick Reply Templates

### When Budget is Too Low:
```
งบ {amount} บาท พี่มีวิธีช่วยค่ะ!
□ Focus ซื้อชิ้น key piece ก่อน
□ รอ SALE period (ลดสูงสุด 70%)
□ ดู Outlet items
□ Mix กับของที่มีอยู่แล้ว
เลือกแนวทางไหนดีคะ?
```

### When Size Not Available:
```
ไซส์ {size} อาจหาย��กหน่อย แต่พี่มีตัวเลือกค่ะ:
1. Pre-order (รอ 7-14 วัน)
2. ดูแบรนด์อื่นที่มีไซส์ {size}
3. แนะนำร้านที่มี stock
ลองดูตัวเลือกไหนก่อนดีคะ?
```

### When Asking for Discount:
```
เข้าใจค่ะว่าอยากได้ราคาดีๆ 😊
ตอนนี้มีโปรโมชั่น:
• ซื้อ 2 ชิ้น ลด 10%
• Member card ลดเพิ่ม 5%
• Points สะสมแลกส่วนลด
• SALE corner ลดสูงสุด 70%
สนใจแบบไหนคะ?
```

---

## 🔄 Dynamic Response Patterns

### Pattern 1: Progressive Disclosure
```
Round 1: แนะนำ 3 items พื้นฐาน
Round 2: ถ้าสนใจ → แนะนำ accessories เพิ่ม
Round 3: ถ้ายังอยู่ → suggest complete wardrobe
```

### Pattern 2: Budget Scaling
```
IF budget < 2,000 THB:
  → Focus on 1-2 key pieces
ELIF budget 2,000-5,000 THB:
  → Complete outfit (3-4 pieces)
ELIF budget > 5,000 THB:
  → Full look + accessories + options
```

### Pattern 3: Urgency Response
```
IF "ด่วน" OR "เดี๋ยวนี้":
  → Skip questions
  → Give instant recommendations
  → Include nearest store location
  → Suggest express delivery
```

---

## ✅ Quality Checklist for Every Response

### Must Include:
- [ ] Product name in Thai
- [ ] Brand name
- [ ] Price in THB with comma separator
- [ ] Clickable link with [ช้อปตอนนี้ →]
- [ ] At least 3 products
- [ ] 1 styling tip minimum

### Should Include:
- [ ] Total price (if outfit set)
- [ ] Color options
- [ ] Size availability note
- [ ] Mix & match suggestions
- [ ] Occasion appropriateness

### Nice to Have:
- [ ] Alternative options
- [ ] Budget-friendly version
- [ ] Trending information
- [ ] Care instructions
- [ ] Influencer inspiration

---

## 📈 A/B Testing Templates

### Version A: Casual Friendly
```
โอเค้! {occasion} งั้นเหรอคะ น่าสนุกจัง! 😄
มาดูกันว่ามีอะไรเด็ดๆ บ้าง~

{product_list}

ชอบลุคไหนเอ่ย? บอกได้นะคะ ❤️
```

### Version B: Professional Consultant
```
เข้าใจค่ะ สำหรับ {occasion} แนะนำดังนี้ค่ะ:

{product_list}

ลุคนี้เหมาะสมเพราะ {reasoning}
ต้องการคำแนะนำเพิ่มเติมหรือไม่คะ?
```

### Version C: Trendy Influencer
```
OMG! {occasion} ต้องปังให้สุด! ✨
Trending items ที่ห้ามพลาด:

{product_list}

Trust me~ ลุคนี้ทุกคนต้องเหลียวมองแน่ๆ 💖
```

---

## 🔧 Technical Integration

### API Response Format (With Images & Categorization)
```json
{
  "response_type": "product_recommendation",
  "occasion": "work",
  "clothes": [
    {
      "name": "AIIZ เสื้อเชิ้ตขาว",
      "price": 1290,
      "url": "https://www.central.co.th/th/aiiz-shirt",
      "image": "/images/aiiz-shirt.jpg",
      "category": "shirt"
    },
    {
      "name": "UNIQLO กางเกงกรมท่า",
      "price": 1290,
      "url": "https://www.central.co.th/th/uniqlo-pants",
      "image": "/images/uniqlo-pants.jpg",
      "category": "pants"
    }
  ],
  "accessories_suggestions": {
    "shoes": "รองเท้าหนังสีดำหรือน้ำตาล",
    "bag": "Tote bag หนังสีกลาง",
    "accessories": "นาฬิกาหนังเรียบหรู"
  },
  "total_price": 2580,
  "styling_tip": "พับแขนเสื้อขึ้นครึ่งแขน + นาฬิกาหนัง = ดูผ่อนคลายแต่โปร"
}
```

### Error Response Format
```json
{
  "error": true,
  "message": "ขออภัยค่ะ ไม่พบสินค้าที่ตรงกับความต้องการ",
  "suggestions": [
    "ลองค้นหาด้วยคำอื่น",
    "ปรับงบประมาณ",
    "ดูสินค้าใกล้เคียง"
  ],
  "fallback_products": []
}
```

---

*Template Version: 1.0*
*Central Fashion Chatbot System*
*Ready for Implementation*