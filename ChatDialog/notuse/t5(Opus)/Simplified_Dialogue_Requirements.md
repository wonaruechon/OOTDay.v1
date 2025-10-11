# Simplified Dialogue Requirements
## Thai Fashion Chatbot - Streamlined Version

---

## 🎯 Core Principles
- **กระชับ ตรงประเด็น** - ไม่ให้ข้อมูลที่ไม่จำเป็น
- **Focus on Styling** - เน้นการ mix & match และ styling tips
- **Quick to Action** - ให้ลูกค้าคลิกไปเลือกซื้อได้เร็ว

---

## 📝 Simplified Response Format

### ❌ อย่าใส่ข้อมูลเหล่านี้:
- **ไซส์ที่มี** (ลูกค้าเลือกเองตอนซื้อที่เว็บ)
- **รายละเอียดสีทั้งหมด** (แค่บอกสีหลัก)
- **คุณสมบัติผ้าละเอียด** (focus styling แทน)
- **วิธีการซัก/ดูแล** (มีอยู่ที่หน้าสินค้า)

### ✅ ใส่เฉพาะข้อมูลสำคัญ:

#### **CLOTHES (มี link + รูป):**
**Categories:** เสื้อ, กางเกง, กระโปรง, เดรส, ชุดว่ายน้ำ, เสื้อกันหนาว, ถุงน่อง
- รูปสินค้า
- ชื่อ + แบรนด์
- ราคา
- ลิงก์ไป Central

#### **ACCESSORIES (แค่ Tips & Tricks - ไม่มี link):**
**Categories:** รองเท้า, กระเป๋า, เครื่องประดับ, หมวก, แว่น, เข็มขัด
- แนะนำแบบ styling tips
- เช่น "รองเท้าหนังสีดำ - เลือกสีให้เข้ากับเข็มขัด"
- เช่น "กระเป๋า tote bag - มีโครงช่วยให้ดูมืออาชีพ"

---

## 💬 Simplified Dialogue Examples

### Example 1: Work Outfit (Simplified)

#### Input:
```
"หาชุดทำงานค่ะ"
```

#### Simplified Response:
```
ชุดทำงานเลยค่ะ! 😊 งานออฟฟิศหรือพบลูกค้าคะ?
```

#### After clarification:
```
Smart Casual สำหรับออฟฟิศ จัดให้เลยค่ะ! 💼

📸 ![AIIZ Shirt](/images/aiiz-white.jpg)
**AIIZ เสื้อเชิ้ตลินินสีขาว**
💰 1,290 บาท
[ช้อปเลย →](link)

📸 ![UNIQLO Pants](/images/uniqlo-navy.jpg)
**UNIQLO กางเกงสีกรมท่า**
💰 1,290 บาท
[ช้อปเลย →](link)

**Total เสื้อผ้า: 2,580 บาท**

💡 **แนะนำเพิ่ม:**
• รองเท้า: Loafers หนังสีดำ
• กระเป๋า: Messenger bag
• เครื่องประดับ: นาฬิกาหนัง

💡 **Tips:** พับแขนเสื้อครึ่งแขน + นาฬิกา = ผ่อนคลายแต่โปร
```

**Note:** ไม่พูดถึงไซส์ สี หรือรายละเอียดที่ไม่จำเป็น

---

### Example 2: Date Night (Simplified)

#### Input:
```
"ไปเดทค่ะ งบ 2000"
```

#### Simplified Response:
```
เดทงบ 2,000 จัดให้สวยแน่นอน! 💕
ไปไหนคะ? (ดินเนอร์/คาเฟ่/ดูหนัง)
```

#### After clarification:
```
คาเฟ่เดท ลุคหวานๆ มาแล้วค่ะ! ☕

📸 ![H&M Top](/images/hm-lace.jpg)
**H&M เสื้อลูกไม้ขาว**
💰 590 บาท
[ช้อปเลย →](link)

📸 ![POMELO Skirt](/images/pomelo-pink.jpg)
**POMELO กระโปรงชมพู**
💰 790 บาท
[ช้อปเลย →](link)

**Total เสื้อผ้า: 1,380 บาท** ✅ (เหลือ 620)

💡 **แนะนำเพิ่ม (ใช้ของที่มี):**
• รองเท้า: Ballet flats หรือ sneakers สีอ่อน
• กระเป๋า: Crossbody bag ใบเล็ก
• เครื่องประดับ: ต่างหูห่วงเล็กๆ

💡 Mix กับของที่มีอยู่ = ประหยัด & Perfect!
```

---

### Example 3: Wedding Guest (Simplified)

#### Input:
```
"ไปงานแต่งค่ะ"
```

#### Response:
```
งานแต่ง ต้องสวยแต่ไม่แย่งเจ้าสาว! 💕
- งานกลางวัน/กลางคืน?
- มีธีมสีมั้ยคะ?
```

#### After clarification:
```
งานเย็น ธีมชมพู เยี่ยมเลยค่ะ! ✨

**Romantic Look**
• Ted Baker เดรสชมพู Blush - 4,990 บาท [ช้อป →](link)
• Kate Spade ส้นสูงนู้ด - 3,290 บาท [ช้อป →](link)
• Coach Clutch ทอง-ชมพู - 2,890 บาท [ช้อป →](link)

💡 ชมพู Blush = เข้าธีมแต่ไม่สว่างเกิน งานเย็นเลือกส้นไม่สูงมาก เดินสบาย
```

---

## 🎯 Question Strategy (Simplified)

### หลักการถามคำถาม:
1. **ถามแค่ที่จำเป็น** (1-2 คำถาม max)
2. **ถามแบบมีตัวเลือก** ให้ตอบง่าย
3. **ไม่ถามไซส์** (ลูกค้าเลือกเองตอนซื้อ)

### ตัวอย่างคำถามที่ดี:
```
✅ "ทำงานออฟฟิศหรือพบลูกค้าคะ?"
✅ "งบประมาณประมาณไหนคะ? (2,000 / 5,000 / 10,000+)"
✅ "ชอบสไตล์หวานๆ หรือเท่ๆ คะ?"
```

### ❌ ไม่ต้องถาม:
```
❌ "ใส่ไซส์อะไรคะ?" → ลูกค้าเลือกเองตอนซื้อ
❌ "ชอบผ้าแบบไหน?" → เน้น styling แทน
❌ "แพ้ผ้าอะไรมั้ย?" → ข้อมูลอยู่ที่หน้าสินค้า
```

**เหตุผล:** การไม่ถามเรื่อง size ทำให้การสนทนาราบรื่น ลดขั้นตอน และลูกค้าสามารถเลือก size ที่ถูกต้องตอนซื้อได้เลย

---

## 📊 Comparison: Old vs New Format

### OLD (Too Detailed):
```
1. **เสื้อ** - COS เสื้อเบลาส์ผ้าซิลค์ 100% สีขาวครีม
   • ไซส์: XS, S, M, L, XL
   • สีอื่นๆ: ดำ, กรมท่า, เบจ
   • ผ้านุ่ม ระบายอากาศดี ซักเครื่องได้
   • ราคา: 2,290 บาท (ลดจาก 3,290)
   [ช้อปตอนนี้ →](link)
```

### NEW (Streamlined):
```
• COS เบลาส์ซิลค์ครีม - 2,290 บาท [ช้อป →](link)
  ดูหรู เข้ากับทุกลุค
```

---

## 💡 Styling Focus Points

### แทนที่จะพูดถึง Product Details ให้ Focus:
1. **วิธี Mix & Match**
2. **โอกาสที่เหมาะสม**
3. **Styling Tips ที่ใช้ได้จริง**
4. **ความคุ้มค่า** (ใส่ได้หลายโอกาส)

### Example Styling Tips (Good):
```
✅ "เสื้อขาวตัวนี้ใส่กับกางเกงทำงาน หรือยีนส์ก็ได้"
✅ "รองเท้าสีนู้ดขยายขา ใส่กับชุดไหนก็เข้า"
✅ "กระเป๋าใบนี้จุของเยอะ เหมาะมากถ้าต้องพกของ"
```

### Avoid:
```
❌ "ผ้า Cotton 100% ซักเครื่องได้"
❌ "มีระบบ Cushioning ที่พื้นรองเท้า"
❌ "ฟอกสีด้วยระบบ Eco-friendly"
```

---

## 🚀 Quick Response Templates

### Template 1: Instant Work Look
```
ชุดทำงาน Smart Casual:
• AIIZ เชิ้ตขาว 1,290.- [→](link)
• UNIQLO กางเกงกรมท่า 1,290.- [→](link)
• Charles & Keith รองเท้า 1,890.- [→](link)
💡 Classic แต่ไม่น่าเบื่อ ใส่ได้ทุกวัน
```

### Template 2: Quick Party Look
```
Party Look ปังแน่!
• H&M Sequin Top 990.- [→](link)
• Topshop กางเกงซาติน 1,790.- [→](link)
• Aldo ส้นเมทัลลิค 2,490.- [→](link)
💡 Sequin + Satin = Luxe! ✨
```

### Template 3: Budget Date Look
```
เดทงบประหยัด (< 2,000):
• Pomelo เดรสลายดอก 890.- [→](link)
• Jelly Bunny รองเท้า 590.- [→](link)
💡 หวานแบบ effortless! 💕
```

---

## ⚡ Response Time Goals

### Simplified = Faster
| Action | Old Time | New Target |
|--------|----------|------------|
| Initial Response | 2 sec | < 1 sec |
| Product Search | 3 sec | < 1.5 sec |
| Full Recommendation | 4 sec | < 2 sec |

---

## 📱 Mobile-Optimized Format

### Best for Mobile Screens:
```
💼 Work Look

AIIZ เชิ้ต 1,290.- [→]
UNIQLO กางเกง 1,290.- [→]
Nine West รองเท้า 2,290.- [→]

Total: 4,870.-
💡 Pro tip included
```

### Avoid Long Blocks:
❌ ย่อหน้ายาวเกินไป
❌ รายละเอียดมากเกิน
❌ ลิงก์ที่ยาวมาก

---

## ✅ Final Checklist (Simplified)

### Every Response Must Have:
- [ ] 3-5 products (ชื่อ + ราคา + ลิงก์)
- [ ] 1 styling tip
- [ ] Total price (ถ้าเป็น set)
- [ ] Friendly tone

### ❌ Don't Include:
- [ ] Size information (customers select at checkout)
- [ ] Accessory product links (tips & tricks only)
- [ ] All color options (mention main color only)
- [ ] Fabric details (focus on styling)
- [ ] Care instructions (available on product page)
- [ ] Technical features (unless critical for styling)

### Nice to Have (If Quick):
- [ ] Why this combo works
- [ ] Alternative use cases
- [ ] Budget-saving tip

---

## 🎯 Success Metrics (Simplified)

### Primary Goals:
1. **Click Rate > 40%** (เพราะตรงจุด ไม่รกสายตา)
2. **Response Time < 1.5 sec** (เร็วขึ้นเพราะข้อมูลน้อยลง)
3. **Conversation Length < 6 messages** (ได้ผลเร็ว)

### What Matters:
✅ ลูกค้าคลิกไปดูสินค้า
✅ ได้ไอเดียการแต่งตัว
✅ รู้สึกว่าคุยกับเพื่อน
✅ ไม่รู้สึกถูก hard sell

### What Doesn't:
❌ บอกรายละเอียดครบถ้วน
❌ ให้ข้อมูลทางเทคนิค
❌ พูดถึงทุก option ที่มี

---

## 💭 Philosophy

> "Less is More - ให้ข้อมูลน้อย แต่ตรงใจ ดีกว่าให้เยอะแต่งง"

**Remember:**
- ลูกค้าจะเห็นรายละเอียดทั้งหมดที่เว็บ Central
- หน้าที่ chatbot คือ inspire และ guide
- ไม่ใช่ product catalog แต่เป็น styling friend

---

## 📝 Example: Full Conversation (Simplified)

```
Bot: ฮายย ✋🏻 กำลังหาอะไรอยู่

User: หาชุดไปทำงานค่ะ

Bot: ชุดทำงานเลยค่ะ! Style ไหนคะ - Formal หรือ Casual?

User: Smart casual ค่ะ งบ 5000

Bot: Smart Casual งบ 5,000 จัดให้เลย! 💼

• COS เชิ้ตซิลค์ 2,290.- [→]
• UNIQLO กางเกงสีกรม 1,290.- [→]
• Nine West Pumps 2,490.- [→]

Total: 6,070.- (นิดเดียว แต่คุ้มค่ามาก!)
💡 3 ชิ้นนี้ mix ได้กับทุกอย่างในตู้!

ถ้าอยากประหยัดกว่านี้ บอกได้นะคะ 😊

User: ขอบคุณค่ะ!

Bot: ยินดีค่ะ! Happy Shopping! 🛍️
```

**Total: 5 messages only!**

---

*Simplified Requirements v2.0*
*Focus: Speed, Clarity, Action*
*Last Update: 2024*