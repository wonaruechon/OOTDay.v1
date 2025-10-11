# 📚 คู่มือการใช้ AI Prompts

## 🎯 ไฟล์ Prompts ที่มีให้ใช้งาน

คุณมี **3 ไฟล์ prompts** ที่พร้อมใช้งาน:

### 1. **ai-prompts-ready-to-use.md** (ต้นฉบับ)
- **ขนาด:** 39KB, 1,115 บรรทัด
- **ภาษา:** English
- **เนื้อหา:** Prompts ละเอียด 8 ชุดสำหรับระบบ Supply Management
- **ความเหมาะสม:** เหมาะสำหรับใช้กับโปรเจกต์นี้โดยตรง
- **สถานะ:** ✅ ทดสอบแล้ว - สร้าง 2,806 บรรทัดสำเร็จ

**ใช้เมื่อไหร่:**
- ต้องการสร้าง Supply Management System
- ต้องการ prompts ที่ละเอียดมากๆ แบบ step-by-step
- ต้องการสร้างทั้ง 8 components ในโปรเจกต์นี้

---

### 2. **OPTIMIZED-AI-PROMPTS.md** (ปรับปรุงแล้ว) ⭐ แนะนำ
- **ขนาด:** 35KB
- **ภาษา:** English
- **เนื้อหา:**
  - ✅ Template สากลที่ใช้ได้กับ component ใดก็ได้
  - ✅ Prompts 4 ชุดที่ optimize แล้ว (Header, Table, Filter, Pagination)
  - ✅ Best practices และเทคนิค
  - ✅ Common issues & solutions
  - ✅ Verification checklist
- **สถานะ:** ✅ Verified - สร้างจากประสบการณ์จริง

**ใช้เมื่อไหร่:**
- ต้องการสร้าง components ใหม่ๆ (ไม่ใช่แค่ในโปรเจกต์นี้)
- ต้องการ template ที่ใช้ซ้ำได้
- ต้องการเรียนรู้วิธีเขียน prompts ที่มีประสิทธิภาพ
- ต้องการ troubleshooting guide

---

### 3. **OPTIMIZED-AI-PROMPTS-TH.md** (ภาษาไทย) 🇹🇭
- **ขนาด:** 32KB
- **ภาษา:** ไทย
- **เนื้อหา:** เหมือน #2 แต่เป็นภาษาไทย
- **สถานะ:** ✅ Verified

**ใช้เมื่อไหร่:**
- ต้องการอ่านเป็นภาษาไทย
- ทำงานกับทีมที่ใช้ภาษาไทย
- ต้องการ documentation เป็นภาษาไทย

---

## 🚀 Quick Start

### สำหรับผู้เริ่มต้น

1. **เปิดไฟล์:** `OPTIMIZED-AI-PROMPTS.md` (หรือ `OPTIMIZED-AI-PROMPTS-TH.md` ถ้าชอบภาษาไทย)
2. **อ่านส่วน Quick Start** เพื่อเข้าใจโครงสร้าง
3. **เลือก Prompt Template** ที่เหมาะสมจากไฟล์
4. **คัดลอกทั้งหมด** (รวม code examples)
5. **วางใน AI tool** (v0, Lovable, Cursor, Claude, ChatGPT)
6. **รอ AI generate** code
7. **ตรวจสอบด้วย Verification Checklist** ในไฟล์

### สำหรับผู้ที่ต้องการสร้างโปรเจกต์นี้

1. **เปิดไฟล์:** `ai-prompts-ready-to-use.md`
2. **เลือก Prompt** ที่ต้องการ (1-8):
   - Prompt 1: Application Header
   - Prompt 2: Supply Dashboard (หน้าหลัก)
   - Prompt 3: Filter Panel
   - Prompt 4: Data Table
   - Prompt 5: Pagination Controls
   - Prompt 6: Confirmation Dialog
   - Prompt 7: Settings Dialog
   - Prompt 8: Bookmark Management
3. **คัดลอก Prompt** ทั้งหมด
4. **วางใน AI tool**
5. **AI จะสร้าง component** ให้

### สำหรับผู้ที่ต้องการสร้าง Component ใหม่

1. **เปิดไฟล์:** `OPTIMIZED-AI-PROMPTS.md`
2. **ไปที่ส่วน:** "Prompt Template (Copy This!)"
3. **คัดลอก Template**
4. **แทนที่ [placeholders]** ด้วยข้อมูล component ของคุณ:
   - `[ComponentName]` → ชื่อ component
   - `[colors]` → รหัสสี hex
   - `[sizes]` → ขนาดที่แน่นอน
   - `[interactions]` → การโต้ตอบที่ต้องการ
5. **วาง Prompt ใน AI tool**

---

## 📊 เปรียบเทียบไฟล์

| ฟีเจอร์ | ai-prompts-ready-to-use.md | OPTIMIZED-AI-PROMPTS.md | OPTIMIZED-AI-PROMPTS-TH.md |
|---------|----------------------------|-------------------------|----------------------------|
| **ภาษา** | English | English | ไทย |
| **Components** | 8 (สำหรับโปรเจกต์นี้) | 4 (ตัวอย่าง) | 4 (ตัวอย่าง) |
| **Template** | ❌ | ✅ | ✅ |
| **Best Practices** | ❌ | ✅ | ✅ |
| **Troubleshooting** | ❌ | ✅ | ✅ |
| **Reusable** | บางส่วน | ✅ เต็มที่ | ✅ เต็มที่ |
| **ความละเอียด** | สูงมาก | สูง | สูง |
| **ใช้กับโปรเจกต์อื่น** | ❌ | ✅ | ✅ |
| **Tested** | ✅ | ✅ | ✅ |

---

## 🎨 ตัวอย่างการใช้งาน

### ตัวอย่าง 1: สร้าง Header จากไฟล์ต้นฉบับ

```bash
1. เปิด ai-prompts-ready-to-use.md
2. เลื่อนไปที่ "Prompt 1: Application Header Navigation"
3. คัดลอกตั้งแต่บรรทัด "# HIGH-LEVEL GOAL" จนถึง "Expected Output"
4. วางใน Cursor/Claude
5. AI สร้าง AppHeader.tsx ให้
```

### ตัวอย่าง 2: สร้าง Modal Dialog ใหม่จาก Template

```bash
1. เปิด OPTIMIZED-AI-PROMPTS.md
2. ไปที่ "Bonus: Quick Component Generator"
3. คัดลอก template สั้นๆ
4. แทนที่:
   - [COMPONENT NAME] → "DeleteConfirmDialog"
   - [Purpose] → "Modal to confirm item deletion"
   - [Props] → itemName, onConfirm, onCancel
5. วางใน v0.dev
6. AI สร้าง DeleteConfirmDialog.tsx
```

### ตัวอย่าง 3: แก้ TypeScript Error

```bash
1. เจอ error: "Parameter 'e' implicitly has an 'any' type"
2. เปิด OPTIMIZED-AI-PROMPTS.md
3. ไปที่ "Common Issues & Solutions" → "Issue 1"
4. อ่านวิธีแก้
5. เพิ่ม type: React.ChangeEvent<HTMLInputElement>
6. Error หาย
```

---

## 💡 Tips สำหรับการใช้งาน

### ✅ DO (ทำ):
1. **อ่าน Best Practices** ใน OPTIMIZED-AI-PROMPTS.md ก่อนใช้
2. **คัดลอกทั้งหมด** รวม code examples (อย่าตัดบางส่วน)
3. **ตรวจสอบ output** ด้วย Verification Checklist
4. **ปรับแต่งสี/ขนาด** ให้ตรงกับ design system ของคุณ
5. **ทดสอบ Accessibility** (keyboard, screen reader)

### ❌ DON'T (อย่าทำ):
1. **อย่าตัดบางส่วน** ของ prompt (เช่น ตัด TypeScript interfaces)
2. **อย่าใช้ชื่อสี** แทนรหัส hex (เช่น "red" แทน "#D32F2F")
3. **อย่าลืม dependencies** (ดู Dependencies section ใน prompt)
4. **อย่าข้าม accessibility** (AI อาจลืม aria-labels)
5. **อย่าสมมติว่า AI รู้ context** (ระบุทุกอย่างชัดเจน)

---

## 🔧 Workflow แนะนำ

### สำหรับโปรเจกต์ใหม่:

```
1. ใช้ OPTIMIZED-AI-PROMPTS.md
2. เริ่มจาก Template
3. ปรับแต่ง Template ให้เหมาะกับโปรเจกต์
4. Generate component ด้วย AI
5. ตรวจสอบด้วย Checklist
6. Build และทดสอบ
7. เก็บ prompt ที่ใช้ไว้ (สำหรับ component คล้ายๆ กัน)
```

### สำหรับโปรเจกต์นี้ (Supply Management):

```
1. ใช้ ai-prompts-ready-to-use.md
2. เลือก prompt ที่ต้องการ (1-8)
3. คัดลอกทั้งหมด
4. Generate ด้วย AI
5. ตรวจสอบว่า dependencies ครบหรือยัง
6. Build และทดสอบ
7. ถ้าเจอปัญหา: ดู OPTIMIZED-AI-PROMPTS.md → "Common Issues"
```

---

## 🎯 เป้าหมายของแต่ละไฟล์

### ai-prompts-ready-to-use.md
🎯 **เป้าหมาย:** สร้าง Supply Management System ที่สมบูรณ์

**ใช้เมื่อ:**
- กำลังทำโปรเจกต์นี้
- ต้องการ component ตามที่ออกแบบไว้แล้ว
- ต้องการ prompts ที่ละเอียดมากๆ

---

### OPTIMIZED-AI-PROMPTS.md
🎯 **เป้าหมาย:** เป็น Template และ Guide สำหรับสร้าง component ใดก็ได้

**ใช้เมื่อ:**
- ทำโปรเจกต์ใหม่
- ต้องการสร้าง component ที่ไม่มี prompt สำเร็จรูป
- ต้องการเรียนรู้การเขียน prompts ที่ดี
- เจอปัญหาและต้องการแก้

---

### OPTIMIZED-AI-PROMPTS-TH.md
🎯 **เป้าหมาย:** เหมือน OPTIMIZED-AI-PROMPTS.md แต่ภาษาไทย

**ใช้เมื่อ:**
- ชอบอ่านภาษาไทย
- ทำงานกับทีมไทย
- ต้องการ documentation ภาษาไทย

---

## 📈 ผลลัพธ์ที่คาดหวัง

เมื่อใช้ prompts เหล่านี้ คุณจะได้:

✅ **โค้ดที่มีคุณภาพ:**
- TypeScript strict mode (0 errors)
- Production-ready
- ผ่าน WCAG 2.1 AA

✅ **ประหยัดเวลา:**
- ไม่ต้องเขียนโค้ดเอง
- ไม่ต้อง debug มาก
- ได้ structure ที่ดี

✅ **เรียนรู้:**
- วิธีเขียน prompts ที่ดี
- Best practices
- Common patterns

---

## 🆘 ต้องการความช่วยเหลือ

### ถ้าเจอปัญหา TypeScript:
→ ดู `OPTIMIZED-AI-PROMPTS.md` → "Common Issues & Solutions" → "Issue 1"

### ถ้า AI สร้างโค้ดผิด:
→ ตรวจสอบว่าคัดลอก prompt ครบหรือไม่ (รวม code examples)

### ถ้าต้องการสร้าง component ใหม่:
→ ใช้ Template ใน `OPTIMIZED-AI-PROMPTS.md` → "Prompt Template"

### ถ้าต้องการตัวอย่างเพิ่ม:
→ ดู prompts 1-4 ใน `OPTIMIZED-AI-PROMPTS.md` → "Optimized Component Prompts"

### ถ้าต้องการทำโปรเจกต์นี้:
→ ใช้ `ai-prompts-ready-to-use.md` → เลือก Prompt 1-8

---

## 📚 Resources เพิ่มเติม

**ในโฟลเดอร์นี้ยังมี:**

- `README.md` - เอกสารประกอบโปรเจกต์
- `QUICKSTART.md` - คู่มือเริ่มต้นรวดเร็ว
- `IMPLEMENTATION_REPORT.md` - รายงานผลการสร้างแบบละเอียด
- `front-end-spec.md` - Specifications ละเอียด
- `ai-generation-prompts.md` - Prompts เพิ่มเติม

**โค้ดที่สร้างเสร็จแล้ว:**
- `src/components/` - Components ทั้ง 8 ตัว (2,806 บรรทัด)
- `src/pages/` - SupplyDetailsDashboard
- `src/api/` - Mock API
- `src/theme/` - Theme configuration

---

## ✅ Checklist การเริ่มต้น

เมื่อจะใช้ prompts เหล่านี้ ให้ทำตาม:

```
☐ อ่าน Quick Start ใน OPTIMIZED-AI-PROMPTS.md
☐ เลือกไฟล์ที่เหมาะสม (ดูตาราง comparison ด้านบน)
☐ อ่าน Best Practices
☐ คัดลอก prompt ทั้งหมด (อย่าตัด)
☐ วางใน AI tool
☐ รอ AI generate
☐ ตรวจสอบด้วย Verification Checklist
☐ Build และทดสอบ
☐ ถ้าเจอปัญหา: ดู Common Issues & Solutions
```

---

**สร้างเมื่อ:** 8 ตุลาคม 2025
**เวอร์ชั่น:** 1.0
**สถานะ:** พร้อมใช้งาน ✅

**คำถามหรือปัญหา:**
- อ่าน Common Issues ใน OPTIMIZED-AI-PROMPTS.md
- ดู Examples ในแต่ละไฟล์
- ตรวจสอบ Verification Checklist

**ความสำเร็จของ prompts เหล่านี้:**
- ✅ สร้างโค้ด 2,806 บรรทัดสำเร็จ
- ✅ 0 TypeScript errors
- ✅ Production build สำเร็จ
- ✅ ผ่าน WCAG 2.1 AA

🚀 **พร้อมสร้าง components ที่ยอดเยี่ยมแล้ว!**
