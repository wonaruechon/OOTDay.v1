"""
Product Database for Thai Central Fashion Chatbot
Contains all product information and outfit combinations
"""

from typing import Dict, List, Any, Optional
from dataclasses import dataclass, field


@dataclass
class ProductDB:
    """Comprehensive product database for Central Online"""

    # Women's Clothing
    women_formal_wear: List[Dict[str, Any]] = field(default_factory=list)
    women_casual_wear: List[Dict[str, Any]] = field(default_factory=list)
    women_dresses: List[Dict[str, Any]] = field(default_factory=list)
    women_sportswear: List[Dict[str, Any]] = field(default_factory=list)

    # Men's Clothing
    men_formal_wear: List[Dict[str, Any]] = field(default_factory=list)
    men_casual_wear: List[Dict[str, Any]] = field(default_factory=list)
    men_sportswear: List[Dict[str, Any]] = field(default_factory=list)

    # Accessories
    bags: List[Dict[str, Any]] = field(default_factory=list)
    shoes: List[Dict[str, Any]] = field(default_factory=list)
    jewelry: List[Dict[str, Any]] = field(default_factory=list)
    watches: List[Dict[str, Any]] = field(default_factory=list)


def initialize_product_database() -> Dict:
    """Initialize complete product database"""

    database = {
        # ========================================
        # WOMEN'S FORMAL WEAR
        # ========================================
        "women_formal": [
            {
                "id": "WF001",
                "name": "เซ็ทสูทกระโปรง สีกรมท่า",
                "brand": "ZARA WOMAN",
                "type": "Blazer Set",
                "price": 3990,
                "image": "[Navy blazer set with matching skirt]",
                "url": "https://www.central.co.th/th/zara-navy-blazer-set",
                "reason": "สีกรมท่าดูเป็นทางการแต่ไม่ดุเหมือนสีดำ เซ็ทคู่ประหยัดเวลาจับคู่",
                "is_clothing": True,
                "occasion": ["work", "meeting", "presentation"]
            },
            {
                "id": "WF002",
                "name": "เสื้อเบลาส์ผ้าไหม สีครีม",
                "brand": "COS",
                "type": "Silk Blouse",
                "price": 2490,
                "image": "[Cream silk blouse with elegant draping]",
                "url": "https://www.central.co.th/th/cos-silk-blouse-cream",
                "reason": "ผ้าไหมดูแพง หรูหรา สีครีมทำให้หน้าสว่าง",
                "is_clothing": True,
                "occasion": ["work", "dinner", "formal"]
            },
            {
                "id": "WF003",
                "name": "กางเกงทำงานขายาว",
                "brand": "MASSIMO DUTTI",
                "type": "Tailored Pants",
                "price": 2890,
                "image": "[Black tailored pants]",
                "url": "https://www.central.co.th/th/massimo-dutti-tailored-pants",
                "reason": "ทรงสวย ขายาวดูสูง เข้ารูปพอดี",
                "is_clothing": True,
                "occasion": ["work", "meeting", "interview"]
            }
        ],

        # ========================================
        # WOMEN'S CASUAL WEAR
        # ========================================
        "women_casual": [
            {
                "id": "WC001",
                "name": "เสื้อเชิ้ต Oversized ลายทาง",
                "brand": "H&M",
                "type": "Oversized Shirt",
                "price": 1290,
                "image": "[Striped oversized shirt]",
                "url": "https://www.central.co.th/th/hm-striped-oversized-shirt",
                "reason": "Oversized สบาย ลายทางดูมี pattern ถ่ายรูปสวย",
                "is_clothing": True,
                "occasion": ["cafe", "weekend", "casual"]
            },
            {
                "id": "WC002",
                "name": "ยีนส์ขาบาน สีฟ้าอ่อน",
                "brand": "ZARA",
                "type": "Wide Leg Jeans",
                "price": 1590,
                "image": "[Light blue wide leg jeans]",
                "url": "https://www.central.co.th/th/zara-wide-leg-jeans",
                "reason": "ขาบานใส่สบาย นั่งนานไม่อึดอัด ดูมี style",
                "is_clothing": True,
                "occasion": ["casual", "shopping", "cafe"]
            },
            {
                "id": "WC003",
                "name": "เสื้อยืด Basic Tee Set 3 ตัว",
                "brand": "UNIQLO",
                "type": "Basic T-shirts",
                "price": 990,
                "image": "[Basic tee multipack]",
                "url": "https://www.central.co.th/th/uniqlo-basic-tee-set",
                "reason": "พื้นฐานที่ต้องมี mix & match ง่าย",
                "is_clothing": True,
                "occasion": ["daily", "casual", "layering"]
            }
        ],

        # ========================================
        # WOMEN'S DRESSES
        # ========================================
        "women_dresses": [
            {
                "id": "WD001",
                "name": "ชุดเดรสผ้าซาติน สีม่วง Dusty",
                "brand": "POMELO",
                "type": "Midi Dress",
                "price": 2890,
                "image": "[Dusty purple satin dress]",
                "url": "https://www.central.co.th/th/pomelo-satin-midi-dress",
                "reason": "สี Dusty purple หรูหรา ไม่ชนใคร ความยาว midi สุภาพ",
                "is_clothing": True,
                "occasion": ["wedding", "dinner", "party"]
            },
            {
                "id": "WD002",
                "name": "Slip Dress สีชมพู nude",
                "brand": "& OTHER STORIES",
                "type": "Slip Dress",
                "price": 3290,
                "image": "[Nude pink slip dress]",
                "url": "https://www.central.co.th/th/other-stories-slip-dress",
                "reason": "Slip dress ดู effortless chic สีชมพู nude ดูอ่อนโยน",
                "is_clothing": True,
                "occasion": ["date", "dinner", "cocktail"]
            },
            {
                "id": "WD003",
                "name": "ชุดเดรสลายดอก ทรง fit & flare",
                "brand": "ZARA",
                "type": "Floral Dress",
                "price": 2290,
                "image": "[Floral fit and flare dress]",
                "url": "https://www.central.co.th/th/zara-floral-midi-dress",
                "reason": "ลายดอกเข้ากับบรรยากาศสวน ทรง A-line พองนิดๆ น่ารัก",
                "is_clothing": True,
                "occasion": ["brunch", "garden", "tea"]
            }
        ],

        # ========================================
        # MEN'S FORMAL WEAR
        # ========================================
        "men_formal": [
            {
                "id": "MF001",
                "name": "สูทสีกรมท่าเข้ม",
                "brand": "BROOKS BROTHERS",
                "type": "Navy Suit",
                "price": 24900,
                "image": "[Navy business suit]",
                "url": "https://www.central.co.th/th/brooks-brothers-navy-suit",
                "reason": "Navy ดู professional กว่าดำ ตัดเย็บดี fit พอดี",
                "is_clothing": True,
                "occasion": ["business", "meeting", "formal"]
            },
            {
                "id": "MF002",
                "name": "เสื้อเชิ้ตขาว Egyptian cotton",
                "brand": "THOMAS PINK",
                "type": "Dress Shirt",
                "price": 4490,
                "image": "[White Egyptian cotton shirt]",
                "url": "https://www.central.co.th/th/thomas-pink-white-shirt",
                "reason": "ผ้า Egyptian cotton premium ขาวสะอาด crisp",
                "is_clothing": True,
                "occasion": ["work", "formal", "business"]
            },
            {
                "id": "MF003",
                "name": "กางเกงสแล็คสีเทา",
                "brand": "CANALI",
                "type": "Dress Pants",
                "price": 8900,
                "image": "[Grey dress pants]",
                "url": "https://www.central.co.th/th/canali-grey-pants",
                "reason": "สีเทาเข้ากับเสื้อได้หลายสี ผ้า wool blend คุณภาพดี",
                "is_clothing": True,
                "occasion": ["work", "business", "smart casual"]
            }
        ],

        # ========================================
        # MEN'S CASUAL WEAR
        # ========================================
        "men_casual": [
            {
                "id": "MC001",
                "name": "เสื้อ Oxford สีฟ้าอ่อน",
                "brand": "UNIQLO",
                "type": "Oxford Shirt",
                "price": 990,
                "image": "[Light blue Oxford shirt]",
                "url": "https://www.central.co.th/th/uniqlo-oxford-shirt-blue",
                "reason": "Oxford ผ้าดี ราคาโอเค ใส่ได้ทุกวัน สีฟ้าดูสดใส",
                "is_clothing": True,
                "occasion": ["casual", "startup", "date"]
            },
            {
                "id": "MC002",
                "name": "กางเกง Chinos สีเบจ",
                "brand": "GAP",
                "type": "Chinos",
                "price": 1890,
                "image": "[Beige chinos]",
                "url": "https://www.central.co.th/th/gap-khaki-chinos",
                "reason": "Chinos ดูดีกว่ายีนส์ สีเบจ match ง่าย",
                "is_clothing": True,
                "occasion": ["casual", "smart casual", "weekend"]
            },
            {
                "id": "MC003",
                "name": "เสื้อโปโล Premium cotton",
                "brand": "LACOSTE",
                "type": "Polo Shirt",
                "price": 3590,
                "image": "[Navy polo shirt]",
                "url": "https://www.central.co.th/th/lacoste-polo-navy",
                "reason": "Polo ดู smart กว่า T-shirt, navy เข้ากับทุกโอกาส",
                "is_clothing": True,
                "occasion": ["smart casual", "golf", "brunch"]
            },
            {
                "id": "MC004",
                "name": "เสื้อลินิน 2 สี (ขาว + ฟ้า)",
                "brand": "UNIQLO",
                "type": "Linen Shirts",
                "price": 1980,
                "image": "[White and blue linen shirts]",
                "url": "https://www.central.co.th/th/uniqlo-linen-shirts-set",
                "reason": "ลินินเบาสบาย เหมาะกับอากาศไทย",
                "is_clothing": True,
                "occasion": ["beach", "vacation", "summer"]
            }
        ],

        # ========================================
        # SPORTSWEAR
        # ========================================
        "sportswear": [
            {
                "id": "SP001",
                "name": "บราสปอร์ต Medium support",
                "brand": "NIKE",
                "type": "Sports Bra",
                "price": 1490,
                "image": "[Medium support sports bra]",
                "url": "https://www.central.co.th/th/nike-medium-support-bra",
                "reason": "พอดีสำหรับ gym/yoga ไม่รัดเกิน ผ้าระบายอากาศดี",
                "is_clothing": True,
                "occasion": ["gym", "yoga", "workout"],
                "gender": "women"
            },
            {
                "id": "SP002",
                "name": "เลกกิ้งเอวสูง",
                "brand": "LULULEMON",
                "type": "High-Waist Leggings",
                "price": 3900,
                "image": "[High-waist leggings]",
                "url": "https://www.central.co.th/th/lululemon-align-leggings",
                "reason": "เอวสูงกระชับหน้าท้อง ผ้า buttery soft ใส่สบายมาก",
                "is_clothing": True,
                "occasion": ["gym", "yoga", "athleisure"],
                "gender": "women"
            },
            {
                "id": "SP003",
                "name": "กางเกงว่ายน้ำ Boardshorts",
                "brand": "BILLABONG",
                "type": "Swim Shorts",
                "price": 1590,
                "image": "[Boardshorts with pattern]",
                "url": "https://www.central.co.th/th/billabong-boardshorts",
                "reason": "Quick-dry fabric แห้งเร็ว ลายสวย",
                "is_clothing": True,
                "occasion": ["beach", "swimming", "vacation"],
                "gender": "men"
            }
        ],

        # ========================================
        # SHOES (Non-clothing items)
        # ========================================
        "shoes": [
            {
                "id": "SH001",
                "name": "รองเท้าหัวแหลม ส้น 3 นิ้ว สีนู้ด",
                "brand": "CHARLES & KEITH",
                "type": "Pumps",
                "price": 2290,
                "image": "[Nude pointed pumps]",
                "url": "",  # No direct link for shoes
                "reason": "เลือกส้นสูง 3 นิ้วที่เดินสบาย สีนู้ดช่วยขยับขาให้ดูยาว",
                "is_clothing": False,
                "occasion": ["work", "formal", "wedding"],
                "gender": "women"
            },
            {
                "id": "SH002",
                "name": "รองเท้าผ้าใบขาว",
                "brand": "ADIDAS Stan Smith",
                "type": "Sneakers",
                "price": 3200,
                "image": "[White Stan Smith sneakers]",
                "url": "",
                "reason": "Stan Smith คลาสสิค ใส่ได้กับทุกชุด",
                "is_clothing": False,
                "occasion": ["casual", "daily", "smart casual"],
                "gender": "unisex"
            },
            {
                "id": "SH003",
                "name": "รองเท้าหนัง Oxford สีดำ",
                "brand": "CHURCH'S",
                "type": "Oxford Shoes",
                "price": 19900,
                "image": "[Black Oxford shoes]",
                "url": "",
                "reason": "Church's งาน handmade อังกฤษ คุณภาพคุ้มราคา",
                "is_clothing": False,
                "occasion": ["formal", "business", "wedding"],
                "gender": "men"
            },
            {
                "id": "SH004",
                "name": "รองเท้าบัลเล่ต์",
                "brand": "TORY BURCH",
                "type": "Ballet Flats",
                "price": 8900,
                "image": "[Ballet flats with logo]",
                "url": "",
                "reason": "สบายเท้า หรูดู expensive เดินเที่ยวได้ทั้งวัน",
                "is_clothing": False,
                "occasion": ["casual", "brunch", "shopping"],
                "gender": "women"
            }
        ],

        # ========================================
        # BAGS (Non-clothing items)
        # ========================================
        "bags": [
            {
                "id": "BG001",
                "name": "กระเป๋า Tote หนังแท้",
                "brand": "COACH",
                "type": "Structured Tote",
                "price": 8900,
                "image": "[Leather tote bag]",
                "url": "",
                "reason": "ใส่เอกสารและ laptop ได้ ทรง tote คลาสสิกดูเป็นผู้บริหาร",
                "is_clothing": False,
                "occasion": ["work", "business", "daily"]
            },
            {
                "id": "BG002",
                "name": "กระเป๋าคลัทช์ประดับคริสตัล",
                "brand": "CHARLES & KEITH",
                "type": "Crystal Clutch",
                "price": 1990,
                "image": "[Crystal embellished clutch]",
                "url": "",
                "reason": "พอดีมือ ประดับคริสตัลเข้ากับบรรยากาศงาน",
                "is_clothing": False,
                "occasion": ["wedding", "party", "formal"]
            },
            {
                "id": "BG003",
                "name": "กระเป๋าสะพายเล็ก Pillow Tabby",
                "brand": "COACH",
                "type": "Mini Bag",
                "price": 11900,
                "image": "[Pillow Tabby mini bag]",
                "url": "",
                "reason": "ขนาดกำลังดี trendy แต่ timeless",
                "is_clothing": False,
                "occasion": ["date", "dinner", "casual"]
            },
            {
                "id": "BG004",
                "name": "กระเป๋าเป้หนัง",
                "brand": "COACH Men",
                "type": "Leather Backpack",
                "price": 12900,
                "image": "[Men's leather backpack]",
                "url": "",
                "reason": "ใส่ Laptop ได้ ดูดีกว่ากระเป๋าเป้ผ้า",
                "is_clothing": False,
                "occasion": ["work", "travel", "daily"],
                "gender": "men"
            }
        ],

        # ========================================
        # ACCESSORIES
        # ========================================
        "accessories": [
            {
                "id": "AC001",
                "name": "เนคไทผ้าไหม สีเบอร์กันดี",
                "brand": "HERMÈS",
                "type": "Silk Tie",
                "price": 7900,
                "image": "[Burgundy silk tie]",
                "url": "",
                "reason": "สีเบอร์กันดี sophisticated ไหม Hermès ระดับ luxury",
                "is_clothing": False,
                "occasion": ["business", "formal", "wedding"],
                "gender": "men"
            },
            {
                "id": "AC002",
                "name": "ต่างหูและสร้อยคอมุก",
                "brand": "PATTARAPHAN",
                "type": "Pearl Set",
                "price": 3500,
                "image": "[Pearl earrings and necklace]",
                "url": "",
                "reason": "มุกคลาสสิค เหมาะกับงานแต่ง ดูดี expensive",
                "is_clothing": False,
                "occasion": ["wedding", "formal", "dinner"],
                "gender": "women"
            },
            {
                "id": "AC003",
                "name": "นาฬิกา Minimalist",
                "brand": "DANIEL WELLINGTON",
                "type": "Classic Watch",
                "price": 5900,
                "image": "[Minimalist watch]",
                "url": "",
                "reason": "Clean design เข้ากับทุกลุค",
                "is_clothing": False,
                "occasion": ["daily", "work", "casual"],
                "gender": "unisex"
            },
            {
                "id": "AC004",
                "name": "หมวก Panama",
                "brand": "PANAMA HAT",
                "type": "Straw Hat",
                "price": 1290,
                "image": "[Panama straw hat]",
                "url": "",
                "reason": "กันแดดได้ดี ถ่ายรูปเท่ห์",
                "is_clothing": False,
                "occasion": ["beach", "vacation", "outdoor"],
                "gender": "unisex"
            }
        ]
    }

    return database


def get_outfit_combinations() -> Dict:
    """Get pre-defined outfit combinations for different occasions"""

    combinations = {
        # ========================================
        # WORK OUTFITS
        # ========================================
        "work_formal_women": {
            "name": "Power Meeting Look",
            "items": ["WF001", "WF002", "SH001", "BG001", "AC002"],
            "styling_tips": [
                "ใส่เข็มกลัดเล็กๆ ที่ปกเสื้อสูท เพิ่มความหรูหรา",
                "ทำผมมัดต่ำแบบ Low bun ดู professional",
                "แต่งหน้าโทน Nude แบบ 'No makeup makeup look'",
                "ใส่นาฬิกาข้อมือสีเงินหรือทอง เพิ่มความน่าเชื่อถือ"
            ],
            "total_estimate": 22500
        },

        "work_casual_men": {
            "name": "Startup Smart Casual",
            "items": ["MC001", "MC002", "SH002", "BG004", "AC003"],
            "styling_tips": [
                "พับแขนเสื้อขึ้นมาถึงข้อศอก ดู casual แต่เรียบร้อย",
                "ใส่เข็มขัดหนังสีน้ำตาล tone on tone กับรองเท้า",
                "จัดผมแบบ side part หรือ textured ดูมี effort",
                "อย่าลืมรีดเสื้อให้เรียบนะครับ!"
            ],
            "total_estimate": 24000
        },

        # ========================================
        # CASUAL OUTFITS
        # ========================================
        "weekend_cafe_women": {
            "name": "Cafe Hopping Chic",
            "items": ["WC001", "WC002", "SH004", "BG003"],
            "styling_tips": [
                "เสียบชายเสื้อด้านหน้าแค่ครึ่งนึง (French tuck) ดูมี shape",
                "ใส่สร้อยคอทองเส้นเล็กๆ 2-3 เส้น layering",
                "ทาลิปแบบ gradient สีส้มอ่อนๆ ดูสุขภาพดี",
                "ถ่ายรูปช่วง golden hour (4-5 โมงเย็น) แสงสวยที่สุด"
            ],
            "total_estimate": 22500
        },

        # ========================================
        # SPECIAL OCCASION OUTFITS
        # ========================================
        "wedding_guest_women": {
            "name": "Evening Wedding Guest",
            "items": ["WD001", "SH001", "BG002", "AC002"],
            "styling_tips": [
                "ทำผมเก็บข้างนึงแล้วปล่อยลอนข้างนึง (Side swept waves)",
                "แต่งหน้าโทน Rosy pink ให้เข้ากับชุด",
                "ใช้ setting spray ให้เมคอัพติดทน",
                "เตรียมรองเท้าแบนไว้ในรถ เผื่อเท้าเจ็บ",
                "อย่าลืมแสดงความยินดีกับบ่าวสาวด้วยนะคะ!"
            ],
            "total_estimate": 10700
        },

        "first_date_women": {
            "name": "Romantic Dinner Date",
            "items": ["WD002", "SH001", "BG003"],
            "styling_tips": [
                "Makeup: 'Your skin but better' - BB cream, cream blush, lip tint",
                "Hair: Soft waves หรือ low ponytail ดู approachable",
                "ฉีดน้ำหอมกลิ่นอ่อนๆ fresh floral 2-3 จุด",
                "ทาเล็บสี nude หรือ soft pink ดูสะอาด",
                "พกเงินสดไว้ เผื่อต้อง split bill"
            ],
            "total_estimate": 17500
        },

        "business_dinner_men": {
            "name": "Executive Dinner",
            "items": ["MF001", "MF002", "SH003", "AC001"],
            "styling_tips": [
                "สูทต้อง fit พอดี ไหล่ไม่กว้าง แขนพอดีข้อมือ",
                "ติดกระดุมบนเม็ดเดียว เม็ดล่างเปิดไว้",
                "ผ้าเช็ดหน้าสีขาวพับ TV fold classic",
                "เข็มขัดหนังดำ match รองเท้า",
                "โกนหนวดเคราให้เรียบ ตัดผมให้ neat"
            ],
            "total_estimate": 57300
        },

        # ========================================
        # SPORT & ACTIVE OUTFITS
        # ========================================
        "gym_workout_women": {
            "name": "Gym Ready Look",
            "items": ["SP001", "SP002"],
            "styling_tips": [
                "เลือกชุดสีเซ็ทกัน (tone on tone) ดู put together",
                "มัดผมให้เรียบร้อย ใช้ headband กันเหงื่อ",
                "ใช้ dry shampoo ก่อนไปยิม ผมจะไม่มันเร็ว",
                "ทา tinted moisturizer แทน foundation",
                "ดื่มน้ำบ่อยๆ อย่างน้อย 2 ลิตร/วัน"
            ],
            "total_estimate": 5400
        },

        "beach_vacation_men": {
            "name": "Beach Ready",
            "items": ["SP003", "MC004", "AC004"],
            "styling_tips": [
                "Beach Day: กางเกงว่ายน้ำ + เสื้อลินินคลุม",
                "Sunset Bar: กางเกงขาสั้นสีเข้ม + เสื้อขาว",
                "พก sunscreen SPF 50+ ทาทุก 2 ชั่วโมง",
                "เตรียม waterproof bag สำหรับมือถือ",
                "พก after sun lotion บำรุงผิวหลังแดดเผา"
            ],
            "total_estimate": 4900
        }
    }

    return combinations


def get_seasonal_recommendations(season: str) -> Dict:
    """Get seasonal product recommendations"""

    seasonal = {
        "hot": {
            "recommended_fabrics": ["Linen", "Cotton", "Rayon", "Bamboo"],
            "recommended_colors": ["White", "Cream", "Light Blue", "Pastel"],
            "product_ids": ["MC004", "WC001", "WC002"],
            "tips": [
                "เลือกผ้าบางเบา ระบายอากาศดี",
                "สีอ่อนสะท้อนความร้อน",
                "หลีกเลี่ยงผ้า synthetic ที่อับชื้น",
                "เลือกรองเท้าแบบ breathable"
            ]
        },
        "rainy": {
            "recommended_fabrics": ["Synthetic blends", "Quick-dry", "Water-resistant"],
            "recommended_colors": ["Dark colors", "Navy", "Black", "Grey"],
            "product_ids": ["MF001", "WF001"],
            "tips": [
                "เลือกผ้าแห้งเร็ว",
                "สีเข้มซ่อนรอยเปื้อนได้ดี",
                "รองเท้ากันน้ำหรือกันลื่น",
                "พก jacket กันฝนไว้"
            ]
        },
        "cool": {
            "recommended_fabrics": ["Wool blend", "Knit", "Fleece", "Cashmere"],
            "recommended_colors": ["Earth tones", "Burgundy", "Forest Green", "Navy"],
            "product_ids": ["MF001", "WF001", "MC003"],
            "tips": [
                "Layer up ด้วย cardigan หรือ blazer",
                "ผ้าหนาขึ้นแต่ไม่หนักเกิน",
                "รองเท้าหุ้มส้นอุ่นกว่า",
                "พกผ้าพันคอบางๆ ไว้"
            ]
        }
    }

    return seasonal.get(season, seasonal["hot"])


def get_budget_recommendations(budget_tier: str) -> Dict:
    """Get product recommendations by budget tier"""

    budget_products = {
        "entry": {
            "brands": ["UNIQLO", "H&M", "ZARA", "GAP"],
            "price_range": "500-2,000 บาท/ชิ้น",
            "product_ids": ["MC001", "WC001", "WC002", "WC003"],
            "tips": [
                "ลงทุนกับ basics ที่ใส่ได้บ่อย",
                "เลือกสีที่ mix & match ง่าย",
                "ดูแลรักษาให้ดีจะใช้ได้นาน",
                "รอ sale ช่วงเปลี่ยนฤดูกาล"
            ]
        },
        "mid": {
            "brands": ["COS", "& OTHER STORIES", "MASSIMO DUTTI", "MANGO"],
            "price_range": "2,000-5,000 บาท/ชิ้น",
            "product_ids": ["WF002", "WD002", "MC003"],
            "tips": [
                "คุณภาพผ้าดีขึ้น คุ้มค่ากว่า",
                "Design unique ไม่ชนใคร",
                "เหมาะกับโอกาสพิเศษ",
                "ใช้ member card ได้ส่วนลด"
            ]
        },
        "premium": {
            "brands": ["COACH", "MICHAEL KORS", "TORY BURCH", "KATE SPADE"],
            "price_range": "5,000-20,000 บาท/ชิ้น",
            "product_ids": ["BG001", "BG003", "SH004"],
            "tips": [
                "เน้นซื้อ accessories ใช้ได้นาน",
                "Classic pieces ไม่ตกเทรนด์",
                "ซื้อช่วง sale ได้ลดเยอะ",
                "ดูแล maintain ดีๆ ขายต่อได้ราคา"
            ]
        },
        "luxury": {
            "brands": ["GUCCI", "LOEWE", "BOTTEGA VENETA", "HERMÈS"],
            "price_range": "20,000+ บาท/ชิ้น",
            "product_ids": ["AC001", "SH003"],
            "tips": [
                "Investment pieces มีค่าเพิ่มขึ้น",
                "Timeless design ใช้ได้ทุกยุค",
                "ซื้อจาก boutique มั่นใจของแท้",
                "เก็บรักษาในกล่อง dust bag"
            ]
        }
    }

    return budget_products.get(budget_tier, budget_products["entry"])


# ============================================
# UTILITY FUNCTIONS
# ============================================

def search_products_by_occasion(occasion: str, gender: str = "all") -> List[Dict]:
    """Search products suitable for specific occasion"""
    db = initialize_product_database()
    suitable_products = []

    for category in db.values():
        for product in category:
            if occasion.lower() in [occ.lower() for occ in product.get("occasion", [])]:
                if gender == "all" or product.get("gender", "unisex") in [gender, "unisex"]:
                    suitable_products.append(product)

    return suitable_products


def get_product_by_id(product_id: str) -> Optional[Dict]:
    """Get specific product by ID"""
    db = initialize_product_database()

    for category in db.values():
        for product in category:
            if product.get("id") == product_id:
                return product

    return None


def create_custom_outfit(product_ids: List[str]) -> Dict:
    """Create custom outfit from product IDs"""
    products = []
    total_price = 0

    for pid in product_ids:
        product = get_product_by_id(pid)
        if product:
            products.append(product)
            total_price += product["price"]

    return {
        "products": products,
        "total_price": total_price,
        "clothing_items": [p for p in products if p.get("is_clothing", False)],
        "accessories": [p for p in products if not p.get("is_clothing", False)]
    }


if __name__ == "__main__":
    # Test database initialization
    db = initialize_product_database()
    print(f"Database initialized with {sum(len(cat) for cat in db.values())} products")

    # Test outfit combinations
    outfits = get_outfit_combinations()
    print(f"\nAvailable outfit combinations: {len(outfits)}")

    # Test search by occasion
    work_products = search_products_by_occasion("work", "women")
    print(f"\nFound {len(work_products)} work-appropriate products for women")

    # Test seasonal recommendations
    hot_season = get_seasonal_recommendations("hot")
    print(f"\nHot season recommendations: {hot_season['recommended_fabrics']}")