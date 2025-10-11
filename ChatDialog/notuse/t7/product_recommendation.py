"""
Product Recommendation System for OOTDay Assistant
Integrates with Central Group's product ecosystem
"""

from dataclasses import dataclass, field
from typing import List, Dict, Optional, Tuple
from enum import Enum
import random
import json


class ProductCategory(Enum):
    """Product categories in Central's inventory"""
    # Women's Categories
    WOMENS_DRESS = "womens_dress"
    WOMENS_TOP = "womens_top"
    WOMENS_BOTTOM = "womens_bottom"
    WOMENS_SHOES = "womens_shoes"
    WOMENS_BAG = "womens_bag"
    WOMENS_ACCESSORIES = "womens_accessories"

    # Men's Categories
    MENS_SHIRT = "mens_shirt"
    MENS_PANTS = "mens_pants"
    MENS_SUIT = "mens_suit"
    MENS_SHOES = "mens_shoes"
    MENS_BAG = "mens_bag"
    MENS_ACCESSORIES = "mens_accessories"

    # Unisex Categories
    SPORTSWEAR = "sportswear"
    CASUAL_WEAR = "casual_wear"
    OUTERWEAR = "outerwear"


class Brand(Enum):
    """Central Group brands and partner brands"""
    # Central Department Store Brands
    JASPAL = "JASPAL"
    CPS_CHAPS = "CPS CHAPS"
    LYN = "LYN"

    # Robinson Brands
    AIIZ = "AIIZ"
    ROBINSON = "ROBINSON"

    # International Brands at Central
    ZARA = "ZARA"
    UNIQLO = "UNIQLO"
    HM = "H&M"
    MANGO = "MANGO"
    CHARLES_KEITH = "CHARLES & KEITH"
    PEDRO = "PEDRO"
    STEVE_MADDEN = "STEVE MADDEN"
    ADIDAS = "ADIDAS"
    NIKE = "NIKE"
    COACH = "COACH"
    KATE_SPADE = "KATE SPADE"
    MICHAEL_KORS = "MICHAEL KORS"

    # Thai Local Brands
    GREYHOUND = "GREYHOUND"
    FLYNOW = "FLYNOW"
    THEATRE = "THEATRE"


@dataclass
class CentralProduct:
    """Product structure matching Central's catalog"""
    sku: str
    name: str
    brand: Brand
    category: ProductCategory
    price: int
    original_price: Optional[int] = None
    discount_percentage: Optional[int] = None
    colors: List[str] = field(default_factory=list)
    sizes: List[str] = field(default_factory=list)
    materials: List[str] = field(default_factory=list)
    tags: List[str] = field(default_factory=list)
    occasion_fit: List[str] = field(default_factory=list)
    style_attributes: Dict[str, any] = field(default_factory=dict)
    central_url: str = ""
    image_urls: List[str] = field(default_factory=list)
    in_stock: bool = True
    popularity_score: float = 0.0
    review_rating: float = 0.0
    review_count: int = 0


@dataclass
class OutfitRecommendation:
    """Complete outfit recommendation with Central products"""
    outfit_name: str
    occasion: str
    style_description: str
    products: List[CentralProduct]
    total_price: int
    styling_notes: List[str]
    alternative_products: Dict[str, List[CentralProduct]] = field(default_factory=dict)
    confidence_score: float = 0.0


class ProductDatabase:
    """Simulated Central Group product database"""

    def __init__(self):
        self.products = self._initialize_products()
        self.product_index = self._build_index()

    def _initialize_products(self) -> List[CentralProduct]:
        """Initialize sample product database with Central Group products"""
        products = [
            # Women's Dresses
            CentralProduct(
                sku="JAS-WD-001",
                name="Midi Dress คอวี ผ้าซาติน",
                brand=Brand.JASPAL,
                category=ProductCategory.WOMENS_DRESS,
                price=3990,
                original_price=4990,
                discount_percentage=20,
                colors=["ชมพูนู้ด", "ขาวครีม", "น้ำเงินกรม"],
                sizes=["S", "M", "L"],
                materials=["ซาติน", "โพลีเอสเตอร์"],
                tags=["elegant", "midi", "formal"],
                occasion_fit=["wedding", "dinner", "date"],
                style_attributes={"formality": 8, "comfort": 6, "trendiness": 7},
                central_url="https://www.central.co.th/jaspal-midi-dress",
                popularity_score=8.5,
                review_rating=4.5,
                review_count=234
            ),
            CentralProduct(
                sku="MAN-WD-002",
                name="Wrap Dress แขนยาว",
                brand=Brand.MANGO,
                category=ProductCategory.WOMENS_DRESS,
                price=2990,
                colors=["ดำ", "กรมท่า", "เขียวเข้ม"],
                sizes=["XS", "S", "M", "L", "XL"],
                materials=["ผ้าเรยอน"],
                tags=["casual", "versatile", "comfortable"],
                occasion_fit=["work", "dinner", "cafe"],
                style_attributes={"formality": 6, "comfort": 8, "trendiness": 7},
                central_url="https://www.central.co.th/mango-wrap-dress",
                popularity_score=7.8,
                review_rating=4.3,
                review_count=156
            ),
            CentralProduct(
                sku="ZAR-WD-003",
                name="Floral Midi Dress",
                brand=Brand.ZARA,
                category=ProductCategory.WOMENS_DRESS,
                price=2490,
                colors=["ลายดอกไม้พื้นขาว", "ลายดอกไม้พื้นดำ"],
                sizes=["S", "M", "L"],
                materials=["ผ้าชีฟอง"],
                tags=["romantic", "feminine", "spring"],
                occasion_fit=["date", "cafe", "chill"],
                style_attributes={"formality": 4, "comfort": 7, "trendiness": 8},
                central_url="https://www.central.co.th/zara-floral-dress",
                popularity_score=8.2,
                review_rating=4.4,
                review_count=189
            ),

            # Women's Tops
            CentralProduct(
                sku="UNQ-WT-001",
                name="Rayon Blouse แขนสั้น",
                brand=Brand.UNIQLO,
                category=ProductCategory.WOMENS_TOP,
                price=990,
                colors=["ขาว", "ฟ้าอ่อน", "ชมพูอ่อน", "เบจ"],
                sizes=["XS", "S", "M", "L", "XL", "XXL"],
                materials=["เรยอน 100%"],
                tags=["basic", "versatile", "breathable"],
                occasion_fit=["work", "cafe", "chill"],
                style_attributes={"formality": 5, "comfort": 9, "trendiness": 6},
                central_url="https://www.central.co.th/uniqlo-rayon-blouse",
                popularity_score=9.0,
                review_rating=4.6,
                review_count=567
            ),
            CentralProduct(
                sku="HM-WT-002",
                name="Linen Shirt แขนยาว",
                brand=Brand.HM,
                category=ProductCategory.WOMENS_TOP,
                price=1290,
                colors=["ขาว", "ครีม", "ฟ้า", "ลายทาง"],
                sizes=["S", "M", "L"],
                materials=["ลินิน", "ฝ้าย"],
                tags=["casual", "summer", "relaxed"],
                occasion_fit=["travel", "chill", "cafe"],
                style_attributes={"formality": 3, "comfort": 9, "trendiness": 7},
                central_url="https://www.central.co.th/hm-linen-shirt",
                popularity_score=7.5,
                review_rating=4.2,
                review_count=234
            ),

            # Women's Bottoms
            CentralProduct(
                sku="UNQ-WB-001",
                name="Wide Leg Pants ผ้าดราป",
                brand=Brand.UNIQLO,
                category=ProductCategory.WOMENS_BOTTOM,
                price=1490,
                colors=["ดำ", "กรมท่า", "น้ำตาล", "ครีม"],
                sizes=["XS", "S", "M", "L", "XL"],
                materials=["โพลีเอสเตอร์", "เรยอน"],
                tags=["comfortable", "professional", "versatile"],
                occasion_fit=["work", "dinner", "date"],
                style_attributes={"formality": 6, "comfort": 8, "trendiness": 7},
                central_url="https://www.central.co.th/uniqlo-wide-pants",
                popularity_score=8.3,
                review_rating=4.5,
                review_count=345
            ),
            CentralProduct(
                sku="ZAR-WB-002",
                name="High Waist Jeans",
                brand=Brand.ZARA,
                category=ProductCategory.WOMENS_BOTTOM,
                price=1990,
                colors=["ยีนส์อ่อน", "ยีนส์เข้ม", "ดำ"],
                sizes=["24", "25", "26", "27", "28", "29", "30", "31", "32"],
                materials=["ผ้ายีนส์", "ผ้ายืด"],
                tags=["casual", "trendy", "versatile"],
                occasion_fit=["chill", "cafe", "date"],
                style_attributes={"formality": 3, "comfort": 7, "trendiness": 8},
                central_url="https://www.central.co.th/zara-high-waist-jeans",
                popularity_score=8.7,
                review_rating=4.4,
                review_count=456
            ),

            # Women's Shoes
            CentralProduct(
                sku="CK-WS-001",
                name="Block Heel Sandals",
                brand=Brand.CHARLES_KEITH,
                category=ProductCategory.WOMENS_SHOES,
                price=2490,
                colors=["นู้ด", "ดำ", "ขาว"],
                sizes=["35", "36", "37", "38", "39", "40"],
                materials=["หนังเทียม"],
                tags=["comfortable", "elegant", "versatile"],
                occasion_fit=["wedding", "dinner", "work"],
                style_attributes={"formality": 7, "comfort": 7, "trendiness": 7},
                central_url="https://www.central.co.th/charles-keith-block-heel",
                popularity_score=8.1,
                review_rating=4.3,
                review_count=278
            ),
            CentralProduct(
                sku="PED-WS-002",
                name="Pointed Toe Pumps",
                brand=Brand.PEDRO,
                category=ProductCategory.WOMENS_SHOES,
                price=3290,
                colors=["ดำ", "นู้ด", "แดง"],
                sizes=["35", "36", "37", "38", "39"],
                materials=["หนังแท้"],
                tags=["formal", "professional", "elegant"],
                occasion_fit=["work", "dinner", "wedding"],
                style_attributes={"formality": 8, "comfort": 5, "trendiness": 6},
                central_url="https://www.central.co.th/pedro-pointed-pumps",
                popularity_score=7.9,
                review_rating=4.2,
                review_count=189
            ),
            CentralProduct(
                sku="ADI-WS-003",
                name="Stan Smith Sneakers",
                brand=Brand.ADIDAS,
                category=ProductCategory.WOMENS_SHOES,
                price=3200,
                original_price=4000,
                discount_percentage=20,
                colors=["ขาว/เขียว", "ขาว/กรมท่า"],
                sizes=["36", "37", "38", "39", "40"],
                materials=["หนังเทียม", "ยาง"],
                tags=["casual", "comfortable", "classic"],
                occasion_fit=["chill", "cafe", "travel"],
                style_attributes={"formality": 2, "comfort": 9, "trendiness": 7},
                central_url="https://www.central.co.th/adidas-stan-smith",
                popularity_score=9.2,
                review_rating=4.7,
                review_count=890
            ),

            # Women's Bags
            CentralProduct(
                sku="COA-WBG-001",
                name="Crossbody Bag หนังแท้",
                brand=Brand.COACH,
                category=ProductCategory.WOMENS_BAG,
                price=8900,
                original_price=12000,
                discount_percentage=26,
                colors=["ดำ", "น้ำตาล", "แดง"],
                sizes=["One Size"],
                materials=["หนังแท้"],
                tags=["luxury", "versatile", "durable"],
                occasion_fit=["work", "dinner", "date"],
                style_attributes={"formality": 7, "comfort": 8, "trendiness": 7},
                central_url="https://www.central.co.th/coach-crossbody",
                popularity_score=8.5,
                review_rating=4.6,
                review_count=234
            ),
            CentralProduct(
                sku="CK-WBG-002",
                name="Mini Clutch Bag",
                brand=Brand.CHARLES_KEITH,
                category=ProductCategory.WOMENS_BAG,
                price=1590,
                colors=["ทอง", "เงิน", "ดำ"],
                sizes=["One Size"],
                materials=["หนังเทียม"],
                tags=["evening", "party", "compact"],
                occasion_fit=["wedding", "party", "dinner"],
                style_attributes={"formality": 8, "comfort": 6, "trendiness": 7},
                central_url="https://www.central.co.th/charles-keith-clutch",
                popularity_score=7.8,
                review_rating=4.3,
                review_count=167
            ),

            # Men's Shirts
            CentralProduct(
                sku="CPS-MS-001",
                name="Oxford Shirt แขนยาว",
                brand=Brand.CPS_CHAPS,
                category=ProductCategory.MENS_SHIRT,
                price=1990,
                colors=["ขาว", "ฟ้าอ่อน", "ชมพูอ่อน"],
                sizes=["S", "M", "L", "XL", "XXL"],
                materials=["ผ้าอ๊อกฟอร์ด"],
                tags=["formal", "business", "classic"],
                occasion_fit=["work", "dinner", "wedding"],
                style_attributes={"formality": 8, "comfort": 6, "trendiness": 5},
                central_url="https://www.central.co.th/cps-oxford-shirt",
                popularity_score=8.0,
                review_rating=4.4,
                review_count=456
            ),
            CentralProduct(
                sku="UNQ-MS-002",
                name="Dry Pique Polo Shirt",
                brand=Brand.UNIQLO,
                category=ProductCategory.MENS_SHIRT,
                price=790,
                colors=["ขาว", "กรมท่า", "ดำ", "เทา", "แดง"],
                sizes=["XS", "S", "M", "L", "XL", "XXL"],
                materials=["ผ้า DRY", "โพลีเอสเตอร์"],
                tags=["casual", "comfortable", "versatile"],
                occasion_fit=["chill", "cafe", "sport"],
                style_attributes={"formality": 4, "comfort": 9, "trendiness": 6},
                central_url="https://www.central.co.th/uniqlo-dry-polo",
                popularity_score=8.8,
                review_rating=4.5,
                review_count=1234
            ),

            # Men's Pants
            CentralProduct(
                sku="ZAR-MP-001",
                name="Slim Fit Chinos",
                brand=Brand.ZARA,
                category=ProductCategory.MENS_PANTS,
                price=2290,
                colors=["กากี", "กรมท่า", "ดำ", "เทา"],
                sizes=["28", "29", "30", "31", "32", "33", "34", "36"],
                materials=["ผ้าชิโน", "ผ้ายืด"],
                tags=["smart casual", "versatile", "modern"],
                occasion_fit=["work", "dinner", "date"],
                style_attributes={"formality": 6, "comfort": 7, "trendiness": 7},
                central_url="https://www.central.co.th/zara-chinos",
                popularity_score=8.2,
                review_rating=4.3,
                review_count=567
            ),

            # Sport Wear
            CentralProduct(
                sku="NIK-SP-001",
                name="Dri-FIT Running Shirt",
                brand=Brand.NIKE,
                category=ProductCategory.SPORTSWEAR,
                price=1490,
                colors=["ดำ", "ขาว", "เทา", "น้ำเงิน"],
                sizes=["S", "M", "L", "XL"],
                materials=["Dri-FIT", "โพลีเอสเตอร์"],
                tags=["athletic", "performance", "breathable"],
                occasion_fit=["sport"],
                style_attributes={"formality": 1, "comfort": 10, "trendiness": 7},
                central_url="https://www.central.co.th/nike-drifit-shirt",
                popularity_score=8.9,
                review_rating=4.6,
                review_count=789
            ),
            CentralProduct(
                sku="ADI-SP-002",
                name="3-Stripes Leggings",
                brand=Brand.ADIDAS,
                category=ProductCategory.SPORTSWEAR,
                price=1790,
                colors=["ดำ", "กรมท่า", "เทาเข้ม"],
                sizes=["XS", "S", "M", "L", "XL"],
                materials=["โพลีเอสเตอร์", "สแปนเด็กซ์"],
                tags=["athletic", "comfortable", "stretchy"],
                occasion_fit=["sport"],
                style_attributes={"formality": 1, "comfort": 9, "trendiness": 7},
                central_url="https://www.central.co.th/adidas-leggings",
                popularity_score=8.7,
                review_rating=4.5,
                review_count=654
            )
        ]

        return products

    def _build_index(self) -> Dict[str, List[CentralProduct]]:
        """Build product index for fast lookup"""
        index = {
            "category": {},
            "brand": {},
            "occasion": {},
            "price_range": {
                "budget": [],  # < 2000
                "mid": [],     # 2000-5000
                "premium": []  # > 5000
            }
        }

        for product in self.products:
            # Category index
            cat_key = product.category.value
            if cat_key not in index["category"]:
                index["category"][cat_key] = []
            index["category"][cat_key].append(product)

            # Brand index
            brand_key = product.brand.value
            if brand_key not in index["brand"]:
                index["brand"][brand_key] = []
            index["brand"][brand_key].append(product)

            # Occasion index
            for occasion in product.occasion_fit:
                if occasion not in index["occasion"]:
                    index["occasion"][occasion] = []
                index["occasion"][occasion].append(product)

            # Price range index
            if product.price < 2000:
                index["price_range"]["budget"].append(product)
            elif product.price <= 5000:
                index["price_range"]["mid"].append(product)
            else:
                index["price_range"]["premium"].append(product)

        return index

    def search_products(self,
                        category: Optional[ProductCategory] = None,
                        brand: Optional[Brand] = None,
                        occasion: Optional[str] = None,
                        max_price: Optional[int] = None,
                        min_price: Optional[int] = None,
                        tags: Optional[List[str]] = None) -> List[CentralProduct]:
        """Search products based on criteria"""
        results = self.products.copy()

        if category:
            results = [p for p in results if p.category == category]

        if brand:
            results = [p for p in results if p.brand == brand]

        if occasion:
            results = [p for p in results if occasion in p.occasion_fit]

        if max_price:
            results = [p for p in results if p.price <= max_price]

        if min_price:
            results = [p for p in results if p.price >= min_price]

        if tags:
            results = [p for p in results if any(tag in p.tags for tag in tags)]

        return results

    def get_by_sku(self, sku: str) -> Optional[CentralProduct]:
        """Get product by SKU"""
        for product in self.products:
            if product.sku == sku:
                return product
        return None


class RecommendationEngine:
    """AI-powered recommendation engine"""

    def __init__(self, product_db: ProductDatabase):
        self.product_db = product_db
        self.style_compatibility_matrix = self._init_style_matrix()

    def _init_style_matrix(self) -> Dict[Tuple[str, str], float]:
        """Initialize style compatibility scores between product categories"""
        return {
            # High compatibility
            ("womens_dress", "womens_shoes"): 0.9,
            ("womens_dress", "womens_bag"): 0.9,
            ("womens_top", "womens_bottom"): 0.95,
            ("womens_top", "womens_shoes"): 0.8,
            ("mens_shirt", "mens_pants"): 0.95,
            ("mens_shirt", "mens_shoes"): 0.85,

            # Medium compatibility
            ("sportswear", "womens_shoes"): 0.6,
            ("casual_wear", "womens_bag"): 0.7,

            # Low compatibility
            ("sportswear", "womens_dress"): 0.2,
            ("mens_suit", "sportswear"): 0.1,
        }

    def generate_outfit(self,
                       occasion: str,
                       gender: str = "female",
                       budget: Optional[int] = None,
                       style_preferences: Optional[List[str]] = None) -> OutfitRecommendation:
        """Generate complete outfit recommendation"""

        # Get products for occasion
        occasion_products = self.product_db.search_products(occasion=occasion)

        if not occasion_products:
            occasion_products = self.product_db.products  # Fallback to all products

        # Separate by category
        categories = {}
        for product in occasion_products:
            cat = product.category.value
            if cat not in categories:
                categories[cat] = []
            categories[cat].append(product)

        # Build outfit based on gender and occasion
        outfit_products = []

        if gender == "female":
            # Option 1: Dress + Shoes + Bag
            if "womens_dress" in categories and len(categories["womens_dress"]) > 0:
                outfit_products.append(self._select_best_product(categories["womens_dress"], budget))
            else:
                # Option 2: Top + Bottom
                if "womens_top" in categories:
                    outfit_products.append(self._select_best_product(categories["womens_top"], budget))
                if "womens_bottom" in categories:
                    outfit_products.append(self._select_best_product(categories["womens_bottom"], budget))

            # Add shoes
            if "womens_shoes" in categories:
                outfit_products.append(self._select_best_product(categories["womens_shoes"], budget))

            # Add bag for formal occasions
            if occasion in ["wedding", "dinner", "party"] and "womens_bag" in categories:
                outfit_products.append(self._select_best_product(categories["womens_bag"], budget))

        else:  # male
            # Shirt + Pants + Shoes
            if "mens_shirt" in categories:
                outfit_products.append(self._select_best_product(categories["mens_shirt"], budget))
            if "mens_pants" in categories:
                outfit_products.append(self._select_best_product(categories["mens_pants"], budget))
            if "mens_shoes" in categories:
                outfit_products.append(self._select_best_product(categories["mens_shoes"], budget))

        # Calculate total price
        total_price = sum(p.price for p in outfit_products)

        # Generate outfit name and description
        outfit_name = self._generate_outfit_name(occasion, style_preferences)
        style_description = self._generate_style_description(occasion, outfit_products)

        # Generate styling notes
        styling_notes = self._generate_styling_notes(occasion, outfit_products)

        # Find alternatives
        alternatives = self._find_alternatives(outfit_products)

        return OutfitRecommendation(
            outfit_name=outfit_name,
            occasion=occasion,
            style_description=style_description,
            products=outfit_products,
            total_price=total_price,
            styling_notes=styling_notes,
            alternative_products=alternatives,
            confidence_score=self._calculate_confidence(outfit_products, occasion)
        )

    def _select_best_product(self, products: List[CentralProduct], max_budget: Optional[int]) -> CentralProduct:
        """Select best product from list based on criteria"""
        if not products:
            return None

        # Filter by budget if specified
        if max_budget:
            budget_filtered = [p for p in products if p.price <= max_budget]
            if budget_filtered:
                products = budget_filtered

        # Sort by popularity and rating
        products.sort(key=lambda p: (p.popularity_score * 0.6 + p.review_rating * 0.4), reverse=True)

        # Add some randomization to avoid always picking the same product
        top_products = products[:min(3, len(products))]
        return random.choice(top_products)

    def _generate_outfit_name(self, occasion: str, style_prefs: Optional[List[str]]) -> str:
        """Generate creative outfit name"""
        base_names = {
            "wedding": ["Elegant Celebration", "Wedding Guest Chic", "Formal Elegance"],
            "work": ["Professional Power", "Office Sophisticate", "Workday Confidence"],
            "chill": ["Weekend Comfort", "Relaxed Vibes", "Casual Cool"],
            "sport": ["Active Energy", "Fitness Ready", "Athletic Style"],
            "travel": ["Wanderlust Ready", "Travel Comfort", "Journey Style"],
            "date": ["Romantic Evening", "Date Night Perfect", "First Impression"],
            "dinner": ["Dinner Elegance", "Evening Sophistication", "Restaurant Ready"],
            "cafe": ["Coffee Date Style", "Brunch Chic", "Cafe Culture"],
            "party": ["Party Perfect", "Night Out Glam", "Celebration Mode"]
        }

        names = base_names.get(occasion, ["Stylish Look"])
        return random.choice(names)

    def _generate_style_description(self, occasion: str, products: List[CentralProduct]) -> str:
        """Generate outfit style description"""
        descriptions = {
            "wedding": "ลุคหรูหราเหมาะกับงานแต่งงาน ดูดีแต่ไม่ over เจ้าสาว",
            "work": "ลุคโปรเฟสชั่นแนลที่ให้ความมั่นใจในที่ทำงาน",
            "chill": "ลุคสบายๆ แต่ยังคงความเก๋ไว้ได้",
            "sport": "ลุคสปอร์ตที่ทั้งใส่สบายและดูดี",
            "travel": "ลุคเดินทางที่สะดวกสบายแต่ถ่ายรูปสวย",
            "date": "ลุคเดทที่ทำให้คุณดูน่าประทับใจ",
            "dinner": "ลุคดินเนอร์หรูหราที่เหมาะกับบรรยากาศ",
            "cafe": "ลุคนั่งคาเฟ่ที่ดู effortlessly chic",
            "party": "ลุคปาร์ตี้ที่ทำให้คุณโดดเด่นในงาน"
        }

        return descriptions.get(occasion, "ลุคที่เหมาะสมกับทุกโอกาส")

    def _generate_styling_notes(self, occasion: str, products: List[CentralProduct]) -> List[str]:
        """Generate specific styling notes for the outfit"""
        general_notes = [
            "Mix & Match ได้กับไอเท็มอื่นในตู้เสื้อผ้า",
            "เหมาะกับสภาพอากาศของไทย",
            "ดูแลรักษาง่าย ซักเครื่องซักผ้าได้"
        ]

        occasion_specific = {
            "wedding": [
                "เพิ่มเครื่องประดับโทนทองหรือเงินเพื่อความหรูหรา",
                "ทำผมเก้าสวยๆ จะช่วยคอมพลีทลุค"
            ],
            "work": [
                "ใส่นาฬิกาคลาสสิกเพิ่มความโปรเฟสชั่นแนล",
                "เก็บสีโทนเดียวกันให้ดูเป็นชุด"
            ],
            "sport": [
                "อย่าลืมใส่ถุงเท้ากีฬาที่ดีเพื่อป้องกันการบาดเจ็บ",
                "ผูกผมให้เรียบร้อยระหว่างออกกำลังกาย"
            ]
        }

        notes = general_notes.copy()
        if occasion in occasion_specific:
            notes.extend(occasion_specific[occasion])

        return notes[:3]  # Return top 3 notes

    def _find_alternatives(self, products: List[CentralProduct]) -> Dict[str, List[CentralProduct]]:
        """Find alternative products for each item in outfit"""
        alternatives = {}

        for product in products:
            # Find similar products
            similar = self.product_db.search_products(
                category=product.category,
                max_price=int(product.price * 1.3),
                min_price=int(product.price * 0.7)
            )

            # Remove the original product and limit to 2 alternatives
            similar = [p for p in similar if p.sku != product.sku][:2]

            if similar:
                alternatives[product.sku] = similar

        return alternatives

    def _calculate_confidence(self, products: List[CentralProduct], occasion: str) -> float:
        """Calculate confidence score for the recommendation"""
        if not products:
            return 0.0

        # Check occasion fit
        occasion_fit_score = sum(
            1.0 if occasion in p.occasion_fit else 0.5
            for p in products
        ) / len(products)

        # Check popularity
        popularity_score = sum(p.popularity_score for p in products) / (len(products) * 10)

        # Check reviews
        review_score = sum(p.review_rating for p in products) / (len(products) * 5)

        # Weight and combine scores
        confidence = (occasion_fit_score * 0.5 + popularity_score * 0.3 + review_score * 0.2)

        return min(confidence, 1.0)  # Cap at 1.0


class ProductFormatter:
    """Format products for display to users"""

    @staticmethod
    def format_product_link(product: CentralProduct) -> str:
        """Format product as clickable link for Thai output"""
        discount_text = ""
        if product.discount_percentage:
            discount_text = f" (ลด {product.discount_percentage}%)"

        return f"[{product.name} - {product.brand.value}]({product.central_url}) - ฿{product.price:,}{discount_text}"

    @staticmethod
    def format_outfit(outfit: OutfitRecommendation) -> str:
        """Format complete outfit recommendation for display"""
        lines = []
        lines.append(f"**ลุค: {outfit.outfit_name}**")
        lines.append(outfit.style_description)
        lines.append("\n🛍️ **แนะนำสินค้า:**")

        for product in outfit.products:
            lines.append(f"- {ProductFormatter.format_product_link(product)}")

        lines.append(f"\n**รวม:** ฿{outfit.total_price:,}")

        if outfit.styling_notes:
            lines.append("\n💡 **Styling Tips:**")
            for note in outfit.styling_notes:
                lines.append(f"- {note}")

        return "\n".join(lines)

    @staticmethod
    def format_product_details(product: CentralProduct) -> str:
        """Format detailed product information"""
        lines = []
        lines.append(f"**{product.name}**")
        lines.append(f"แบรนด์: {product.brand.value}")
        lines.append(f"ราคา: ฿{product.price:,}")

        if product.original_price:
            lines.append(f"ราคาเดิม: ฿{product.original_price:,} (ประหยัด {product.discount_percentage}%)")

        if product.colors:
            lines.append(f"สี: {', '.join(product.colors)}")

        if product.sizes:
            lines.append(f"ไซส์: {', '.join(product.sizes)}")

        if product.review_rating > 0:
            lines.append(f"⭐ {product.review_rating}/5.0 ({product.review_count} รีวิว)")

        lines.append(f"\n[ดูสินค้า]({product.central_url})")

        return "\n".join(lines)


# Example usage
if __name__ == "__main__":
    # Initialize database and engine
    db = ProductDatabase()
    engine = RecommendationEngine(db)

    # Generate outfit for wedding
    outfit = engine.generate_outfit(
        occasion="wedding",
        gender="female",
        budget=10000
    )

    # Format and print
    formatter = ProductFormatter()
    print(formatter.format_outfit(outfit))
    print("\n" + "="*50 + "\n")

    # Search for specific products
    dresses = db.search_products(
        category=ProductCategory.WOMENS_DRESS,
        max_price=5000
    )

    print("Available Dresses under ฿5000:")
    for dress in dresses[:3]:
        print(f"- {formatter.format_product_link(dress)}")