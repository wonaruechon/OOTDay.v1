# Dialogue Requirements & Expected Results
## สำหรับ Thai Fashion Specialist Chatbot

---

## 📋 Requirement Overview

### System Requirements
- **Response Time:** < 2 seconds
- **Language:** Thai (friendly, casual tone)
- **Product Links:** Always clickable to Central website
- **Recommendations:** 3-5 products per outfit
- **Price Display:** Thai Baht with comma separator

---

## 🎯 Dialog Test Cases & Expected Results

### Test Case 1: Basic Work Outfit Request

#### 📥 INPUT
```
Customer: "หาชุดทำงานค่ะ"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: โอเค้! ชุดทำงานเลยนะคะ 😊 ขอถามเพิ่มหน่อยค่ะ:
- ทำงานออฟฟิศหรือต้องพบลูกค้าบ่อยคะ?
- ชอบสไตล์แบบไหน? (Formal, Smart Casual, Business Casual)
- มีโทนสีที่ชอบเป็นพิเศษมั้ยคะ?
```

#### 📥 INPUT
```
Customer: "ออฟฟิศค่ะ smart casual ชอบโทนเอิร์ธโทน"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: เยี่ยมเลยค่ะ! มาดู Smart Casual Look โทนเอิร์ธสำหรับออฟฟิศกัน 💼

**Modern Professional Look**

📸 ![AIIZ Shirt](/images/aiiz-beige-shirt.jpg)
**AIIZ เสื้อเชิ้ตลินินสีเบจ**
💰 1,290 บาท
[ช้อปเลย →](https://www.central.co.th/th/aiiz-shirt)

📸 ![UNIQLO Pants](/images/uniqlo-brown-pants.jpg)
**UNIQLO กางเกงขายาวสีน้ำตาล**
💰 1,290 บาท
[ช้อปเลย →](https://www.central.co.th/th/uniqlo-pants)

**Total เสื้อผ้า: 2,580 บาท**

💡 **Styling Tips & Tricks:**
• **รองเท้า:** Loafers หนังสีน้ำตาล - เลือกสีให้เข้ากับเข็มขัด = classic rule
• **กระเป๋า:** Messenger bag หนัง - กระเป๋ามีโครงช่วยให้ดูเป็นมืออาชีพ
• **เครื่องประดับ:** นาฬิกาหนังสายน้ำตาล - minimal accessories = professional look

💡 **Outfit Styling:** พับแขนเสื้อครึ่งแขน + นาฬิกาหนัง = ผ่อนคลายแต่โปร

ต้องการดูลุคอื่นอีกมั้ยคะ? 😊
```

#### ✅ SUCCESS CRITERIA
- ✓ มีการทักทายและตอบรับคำขอ
- ✓ ถามคำถามเพิ่มเติม 2-3 ข้อ (ไม่รวม size)
- ✓ แนะนำ CLOTHES 2-5 ชิ้นพร้อมราคาและลิงก์
- ✓ ACCESSORIES เป็น styling tips & tricks (ไม่มีลิงก์)
- ✓ มี Styling Tips สำหรับ outfit
- ✓ Total price = CLOTHES เท่านั้น
- ✓ เสนอความช่วยเหลือเพิ่มเติม

---

### Test Case 2: Specific Occasion - Wedding Guest

#### 📥 INPUT
```
Customer: "ไปงานแต่งเพื่อนค่ะ"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: งานแต่งเพื่อน! ต้องสวยแต่ไม่แย่งซีนเจ้าสาวนะคะ 💕
ขอถามเพิ่มนิดนึงค่ะ:
- งานกลางวันหรือกลางคืนคะ?
- สถานที่จัดงาน? (โรงแรม, Garden, ริมทะเล)
- มีธีมสีหรือ dress code มั้ยคะ?
```

#### 📥 INPUT
```
Customer: "งานเย็นที่โรงแรม ธีมสีชมพู-ขาว"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: งานเย็นโรงแรม ธีมชมพู-ขาว สวยหวานแน่ๆ! ✨ แต่ระวังอย่าใส่ขาวล้วนนะคะ

**Option 1: Romantic Blush Pink**

📸 ![Ted Baker Dress](/images/tedbaker-blush-dress.jpg)
**Ted Baker เดรสผ้าซาตินสีชมพู Blush**
💰 4,990 บาท
[ช้อปเลย →](https://www.central.co.th/th/tedbaker-blush-dress)

**Total เสื้อผ้า: 4,990 บาท**

💡 **Styling Tips & Tricks:**
• **รองเท้า:** Pointed Toe Heels สีนู้ด ส้น 3 นิ้ว - ทำให้ดูสูงเพรียว + เดินสบาย
• **กระเป๋า:** Clutch สีทองชมพูหรือนู้ด - ขนาดพอใส่มือถือ+ลิป คล้องข้อมือหรือถือก็สวย
• **เครื่องประดับ:** ต่างหูคริสตัลสีชมพู + สร้อยคอมุก = elegant แต่ไม่โอเวอร์

💡 **Wedding Guest Tips:**
- สีชมพู Blush เข้าธีมแต่ไม่สว่างแย่งเจ้าสาว
- ความยาวระดับเข่าสุภาพเหมาะสม
- ผ้าซาตินสะท้อนแสงสวย ถ่ายรูปปัง!
- เตรียมผ้าเช็ดน้ำตา งานเพื่อนสนิทน้ำตาไหลง่าย 😊

ถ้างบน้อยกว่านี้ บอกได้นะคะ มีตัวเลือกอื่นค่ะ!
```

---

### Test Case 3: Budget-Conscious Request

#### 📥 INPUT
```
Customer: "อยากได้ชุดไปเดท งบไม่เกิน 2000 บาท"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: เดทในงบ 2,000 บาท ได้ลุคสวยแน่นอนค่ะ! 💕
ขอถามนิดนึงนะคะ:
- ไปเดทที่ไหนคะ? (ดูหนัง, ทานข้าว, เดินเล่น)
- ชอบสไตล์หวานๆ หรือคูลๆ คะ?
```

#### 📥 INPUT
```
Customer: "ไปคาเฟ่แล้วเดินห้าง ชอบแบบหวานๆ ค่ะ"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: คาเฟ่ + เดินห้าง ลุคหวานในงบ 2,000 จัดให้เลยค่ะ! ☕💖

**Sweet Cafe Date Look**

📸 ![H&M Top](/images/hm-lace-top.jpg)
**H&M เสื้อลูกไม้สีขาว**
💰 590 บาท
[ช้อปเลย →](https://www.central.co.th/th/hm-white-lace-top)

📸 ![POMELO Skirt](/images/pomelo-pink-skirt.jpg)
**POMELO กระโปรงพลีทสีชมพูอ่อน**
💰 790 บาท
[ช้อปเลย →](https://www.central.co.th/th/pomelo-pink-skirt)

**Total เสื้อผ้า: 1,380 บาท** ✅ (เหลือ 620 บาท)

💡 **Styling Tips & Tricks (ใช้ของที่มีอยู่):**
• **รองเท้า:** Ballet flats หรือ sneakers สีอ่อน - เลือกรองเท้าสบาย เดินได้ทั้งวัน
• **กระเป๋า:** Crossbody bag ใบเล็ก - กระเป๋าเล็กพอดีมือถือ+ลิป ไม่หนักตอนเดิน
• **เครื่องประดับ:** ต่างหูห่วงเล็กๆ + scrunchie ผูกผม = น่ารักแบบ effortless

💡 **Budget Styling Secrets:**
- Mix กับของที่มีอยู่แล้ว = ประหยัด + ดูเป็นธรรมชาติ
- ทา lip gloss แทนลิปสติก = fresh & natural
- ผมมัดหางม้าสูง + scrunchie = cute casual vibe

ลุคนี้หวาน ถ่ายรูปสวย เดินทั้งวันสบายค่ะ! 📸
```

---

### Test Case 4: Urgent Request

#### 📥 INPUT
```
Customer: "ด่วนค่ะ! อีก 2 ชม. ต้องไป party"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: โอ๊ย ด่วนจริง! ไม่ต้องกังวลค่ะ จัดให้ทันแน่นอน! ⏰
ช่วยบอกด่วนๆ นะคะ:
- ปาร์ตี้แบบไหน? (Club, Rooftop, House party)
- มีชุดสีอะไรในตู้บ้างคะ?
```

#### 📥 INPUT
```
Customer: "Rooftop bar ค่ะ มีเดรสสีดำ กางเกงยีนส์"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: Rooftop bar + มีเดรสดำ = Perfect! จัดด่วน 15 นาทีเสร็จค่ะ! 🎉

**QUICK PARTY LOOK - ของที่ต้องซื้อด่วน:**

1. **Statement Earrings** - ZARA ต่างหูห้อยทอง (390 บาท)
   [ช้อปที่สาขาใกล้บ้าน →](https://www.central.co.th/th/store-locator)

2. **รองเท้า** - Charles & Keith ส้นสูงสีทอง (1,590 บาท)
   [เช็คสต๊อกใกล้บ้าน →](https://www.central.co.th/th/check-stock)

**จัดลุคใน 15 นาที:**
✓ เดรสดำที่มี + ต่างหูใหม่ = Instant glam
✓ รองเท้าส้นทอง = ดูหรูทันที
✓ แต่งหน้า: Smokey eyes + Red lips
✓ ผมรวบสูง Messy bun

**💡 LAST MINUTE TIPS:**
- ฉีด Setting Spray ให้เมคอัพอยู่ทน
- พก Power bank (ถ่ายรูปเยอะแน่)
- ใส่คาร์ดิแกนบางๆ ไว้ (Rooftop ลมแรง)

รีบไปเลยค่ะ! Have fun! 🥂✨
```

---

### Test Case 5: Complex Multi-Occasion Request

#### 📥 INPUT
```
Customer: "ต้องการชุดที่ใส่ทำงานแล้วไปเดทต่อได้เลย"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: Day to Night transformation look! ฉลาดมากค่ะ 👔➡️💕
ขอถามนะคะ:
- ทำงานแบบ formal หรือ casual?
- เดทตอนเย็นไปไหนคะ?
- พกของเพิ่มในกระเป๋าได้มั้ย?
```

#### 📥 INPUT
```
Customer: "Smart casual ค่ะ เย็นไปดินเนอร์ พกของได้นิดหน่อย"
```

#### 📤 EXPECTED OUTPUT
```
Stylist: จัดให้เลยค่ะ! ลุค 2-in-1 ที่แปลงร่างได้ใน 5 นาที! ✨

**BASE LOOK (เช้า-บ่าย):**
1. **เดรส** - COS เดรสสีดำทรงเข้ารูป (2,490 บาท)
   [ช้อปตอนนี้ →](https://www.central.co.th/th/cos-black-dress)

2. **เบลเซอร์** - MANGO เบลเซอร์สีเบจ (1,990 บาท)
   [ช้อปตอนนี้ →](https://www.central.co.th/th/mango-beige-blazer)

3. **รองเท้า** - Nine West Block Heels 2 นิ้ว สีดำ (2,290 บาท)
   [ช้อปตอนนี้ →](https://www.central.co.th/th/ninewest-block-heels)

**EVENING TRANSFORM KIT (ใส่กระเป๋า):**
• Statement earrings ต่างหูห้อย (590 บาท)
• Bold lipstick สีแดง/Berry
• Clutch bag ใบเล็ก (ซ่อนในกระเป๋าใหญ่)

**⚡ 5-Min Transformation:**
1. ถอดเบลเซอร์
2. เปลี่ยนต่างหู studs → statement earrings
3. ทาลิป nude → bold red
4. ปล่อยผมที่รวบ → ปัดข้าง
5. สลับ tote bag → clutch

Work Professional ➝ Dinner Date Ready! 💼💕
```

---

## 📊 Response Performance Metrics

### Required Response Elements (Updated)
| Element | Requirement | Check |
|---------|-------------|-------|
| Greeting | Friendly acknowledgment | ✓ |
| Questions | 2-3 clarifying questions (NO size) | ✓ |
| CLOTHES | 3-5 items with prices + links | ✓ |
| ACCESSORIES | Styling tips & tricks (NO links) | ✓ |
| Outfit Tips | Styling advice for complete look | ✓ |
| Total Price | CLOTHES only (not accessories) | ✓ |
| Follow-up | Offer more help | ✓ |

### Response Quality Checklist (Updated)
- [ ] ใช้ภาษาไทยที่เป็นกันเอง
- [ ] มี emoji แต่ไม่มากเกิน (1-3 per message)
- [ ] ราคาแสดงเป็นหลักพันด้วยเครื่องหมาย comma (CLOTHES เท่านั้น)
- [ ] ❌ ไม่ถามเรื่อง size (ลูกค้าเลือกเองตอนซื้อ)
- [ ] ✅ CLOTHES มี links + images + prices
- [ ] ✅ ACCESSORIES เป็น styling tips & tricks (ไม่มี links)
- [ ] แนะนำสินค้าตรงกับ occasion
- [ ] ให้ทางเลือกหลายระดับราคา
- [ ] คำแนะนำ practical ใช้ได้จริง

---

## 🎯 Expected Business Results

### Conversion Metrics
- **Click-through Rate:** > 35%
- **Products per Session:** 3-5 items
- **Average Order Value:** 2,500-5,000 THB
- **Session Completion:** > 70%

### User Satisfaction
- **Helpful Rating:** > 4.5/5
- **Would Recommend:** > 85%
- **Return Users:** > 40%

---

## 🚫 Error Handling & Edge Cases

### Case: No Budget Specified
```
INPUT: "หาชุดปาร์ตี้"
OUTPUT: "ปาร์ตี้สนุกแน่ๆ! 🎉 ขอถามเพิ่มนะคะ:
- ปาร์ตี้แบบไหนคะ?
- งบประมาณประมาณไหนคะ? (2,000 / 5,000 / 10,000+)
- ชอบแนวไหน? (Sexy, Cute, Elegant)"
```

### Case: User Asks About Size
```
INPUT: "ไซส์ XXXL มีมั้ย"
OUTPUT: "แน่นอนค่ะ! Central มีไซส์หลากหลาย รวมถึง Plus Size ด้วยค่ะ
ตอนคลิกเข้าไปดูสินค้า จะเห็น size chart และสามารถเลือก size ที่ต้องการได้เลยนะคะ

พี่จะแนะนำแบรนด์ที่มีไซส์หลากหลาย:
- UNIQLO (up to 3XL)
- H&M+ (Plus Size Line)
- CPS (Extended Sizes)

ลองดูชุดที่เหมาะกับคุณกันนะคะ อยากได้ลุคแบบไหนคะ? 😊"
```

**Note:** หากลูกค้าถามเรื่อง size เอง ให้ตอบว่ามีหลาย size และสามารถเลือกตอน checkout แต่ไม่ต้องถามเรื่อง size ก่อน

### Case: Too Low Budget
```
INPUT: "งบ 500 บาท ได้มั้ย"
OUTPUT: "500 บาท ก็ได้ลุคสวยได้ค่ะ! 😊 แนะนำ:
1. Basic Items ที่ Mix ได้หลายลุค
2. ช้อปช่วง Sale (ลดสูงสุด 70%)
3. หรือซื้อ key piece แค่ชิ้นเดียวก่อน

ตอนนี้ SALE:
- H&M Basic Tee 290 บาท (จาก 590)
- Pomelo Accessories 390 บาท
[ดู Sale Items ทั้งหมด →](link)"
```

---

## ✅ Implementation Validation

### Test Protocol
1. **Load Testing:** 100 concurrent users
2. **Response Time:** < 2 seconds
3. **Link Validation:** All links clickable
4. **Price Accuracy:** Match database
5. **Language Check:** Proper Thai encoding

### Success Indicators
✓ Users complete full conversation
✓ Click product links
✓ Return for more recommendations
✓ Share positive feedback
✓ Make purchases

---

## 📝 Notes for QA Team

### Priority Test Scenarios
1. First-time user flow
2. Budget-conscious shopping
3. Urgent requests
4. Multi-occasion outfits
5. Size availability issues

### Common User Inputs to Test
- "หาชุดทำงาน"
- "ไปงานแต่ง"
- "งบ 1000 บาท"
- "ด่วน!"
- "ไซส์ใหญ่" (ทดสอบการตอบเมื่อลูกค้าถามเอง)
- "ชุดที่ใส่ได้หลายโอกาส"
- "ไม่อยากใส่รองเท้าส้นสูง" (ทดสอบ accessories tips)

---

## 📋 Update Summary

### Key Policy Changes (v2.0):
1. **❌ No Size Questions** - Removed all size-related questions from test cases
2. **✅ Clothes WITH Links** - All clothing items include product links + images + prices
3. **💡 Accessories as Tips** - Shoes, bags, jewelry shown as styling tips & tricks (NO links)
4. **Updated Success Criteria** - Reflects new product categorization

### Impact on Testing:
- Faster conversation flows (fewer questions)
- Clear distinction between purchasable items (clothes) and styling advice (accessories)
- Total price calculations include clothes only
- Size selection handled at checkout, not in conversation

---

*Document Version: 2.0 (Updated)*
*Last Updated: 2024*
*Next Review: After Phase 1 Launch*