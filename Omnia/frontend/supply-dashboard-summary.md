# Supply Details Dashboard - สรุปจากรูปภาพ

## ภาพรวม
รูปภาพแสดง **Supply Details Dashboard** ซึ่งเป็นหน้าหลักของระบบ Supply Management System ที่รวมองค์ประกอบทั้งหมดเข้าด้วยกัน

## ตำแหน่งใน AI Prompts
**Prompt 2: Supply Details Dashboard - Complete Page**
(บรรทัด 106-250 ใน `/Users/naruechon/Documents/Project/Omnia/frontend/ai-prompts-ready-to-use.md`)

---

## องค์ประกอบหลักในรูปภาพ

### 1. Application Header (ด้านบนสุด)
- **พื้นหลัง:** สีเทาเข้ม (#1B3A57)
- **ซ้าย:** Hamburger menu + "OMNI ENTERPRISE"
- **ขวา:** BOOKMARKS, ORGANIZATION (CFR), PROFILE (CFR), Help, User icon, Assist icon
- **ความสูง:** 64px
- **เชื่อมโยงกับ:** Prompt 1

### 2. Page Title
- **ข้อความ:** "SUPPLY"
- **สี:** น้ำเงิน (#1976D2)
- **ขนาดฟอนต์:** 34px
- **ตำแหน่ง:** ด้านซ้าย, 24px margin

### 3. Filter Panel (พื้นหลังดำ/เทาเข้ม)
**Basic Filters (แถวที่ 1-2):**
- **แถว 1:** Location ID (CFM2372) | Item ID | Supply Type ID
- **แถว 2:** View | Include Errored Supply? | Display Pending Review?

**ปุ่มควบคุม:**
- **MORE:** ขยาย Advanced Filters (ด้านซ้าย)
- **APPLY:** ใช้ฟิลเตอร์ (สีน้ำเงิน, ด้านขวา)
- **CLEAR:** ล้างฟิลเตอร์ (outlined, ด้านขวา)

**เชื่อมโยงกับ:** Prompt 3

### 4. Data Table (ตารางข้อมูล)
**คอลัมน์ที่แสดง:**
1. ☐ Checkbox (สำหรับเลือกแถว)
2. Location ID (CFM2372 ซ้ำทุกแถว)
3. Item ID (เลข 14 หลัก)
4. Quantity (จัดขวา, มีคอมม่า เช่น 23400, 22340)
5. Available Quantity (จัดขวา, มีคอมม่า)
6. Supply Type ID (On Hand Available)
7. ERROR (No)
8. PENDING REVIEW (No)
9. Infinite Supply (No)
10. Kit Supply (No)
11. Segment (ว่าง)

**จำนวนข้อมูล:** 10 แถว/หน้า (จากทั้งหมด 8166 รายการ)

**สไตล์:**
- สลับสีแถว: ขาว (#FFFFFF) และเทาอ่อน (#F5F5F5)
- Header: ตัวหนา, พื้นหลังขาว

**เชื่อมโยงกับ:** Prompt 4

### 5. Pagination Controls (ด้านล่าง)
**ซ้าย:**
- ปุ่มนำทาง: ⏮ ◀ หน้า [1] ของ 817 ▶ ⏭

**ขวา:**
- ข้อความ: "Displaying 1 - 10 of 8166"
- ปุ่ม: **RESET ERROR** (สีแดง, disabled เพราะไม่มีแถวถูกเลือก)

**เชื่อมโยงกับ:** Prompt 5

---

## สถานะ Filter ปัจจุบันในรูป
```typescript
{
  locationId: "CFM2372",
  itemId: "",
  supplyTypeId: "",
  view: "Select an option",
  includeErrored: "Yes",
  displayPendingReview: "Yes & No"
}
```

## ข้อมูลตัวอย่างในตาราง (แถวแรก)
```typescript
{
  locationId: "CFM2372",
  itemId: "0000048633048",
  quantity: 23400,
  availableQuantity: 23400,
  supplyTypeId: "On Hand Available",
  error: false,       // แสดงเป็น "No"
  pendingReview: false, // แสดงเป็น "No"
  infiniteSupply: false,
  kitSupply: false,
  segment: ""
}
```

---

## Responsive Design (ตามที่ระบุใน Prompt 2)
- **Desktop (1280px+):** แสดงตามรูป (layout เต็ม)
- **Tablet (768-1279px):** ลด margins เหลือ 16px
- **Mobile (<768px):** Scroll แนวนอนทั้งหน้า

---

## เทคโนโลยีที่ใช้
- **UI Framework:** Material-UI (MUI)
- **Data Fetching:** React Query (@tanstack/react-query)
- **Data Grid:** @mui/x-data-grid
- **Language:** TypeScript + React

---

## ไฟล์ที่เกี่ยวข้อง (ตาม Prompt 2)
### ไฟล์ที่ต้องสร้าง:
- `src/pages/SupplyDetailsDashboard.tsx` - หน้าหลัก
- `src/api/supplyApi.ts` - Mock API functions
- `src/types/supply.ts` - TypeScript interfaces

### ไฟล์ที่ต้อง Import:
- `src/components/AppHeader.tsx` (Prompt 1)
- `src/components/FilterPanel.tsx` (Prompt 3)
- `src/components/DataTable.tsx` (Prompt 4)
- `src/components/PaginationControls.tsx` (Prompt 5)

---

## หมายเหตุสำคัญ
- **Mock Data:** ใช้ข้อมูล mock (setTimeout 1 วินาที)
- **Page Height:** 100vh (เต็มหน้าจอ)
- **Scroll Behavior:** ตารางเลื่อนภายใน container, ไม่ใช่ทั้งหน้า

---

**สร้างจาก:** รูปภาพ Supply Dashboard + Prompt 2
**วันที่:** 2025-10-08
**โดย:** Analysis of Production UI Screenshot
