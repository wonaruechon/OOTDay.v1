"""
Thai Fashion Specialist Chatbot - Central Online
P'Fashion - Your Personal Fashion Stylist
"""

import json
import random
from typing import Dict, List, Optional, Tuple
from dataclasses import dataclass
from enum import Enum
from datetime import datetime


# ============================================
# ENUMS AND DATA CLASSES
# ============================================

class Occasion(Enum):
    """Types of occasions for outfit recommendations"""
    WORK_FORMAL = "work_formal"
    WORK_CASUAL = "work_casual"
    CASUAL_CHILL = "casual_chill"
    WEDDING = "wedding"
    SPORT = "sport"
    TRAVEL = "travel"
    DATE = "date"
    DINNER = "dinner"
    CAFE = "cafe"
    PARTY = "party"
    GENERAL = "general"


class BudgetTier(Enum):
    """Budget tiers for product recommendations"""
    ENTRY = (500, 2000, ["UNIQLO", "H&M", "ZARA"])
    MID = (2000, 5000, ["COS", "& OTHER STORIES", "MASSIMO DUTTI"])
    PREMIUM = (5000, 20000, ["COACH", "MICHAEL KORS", "TORY BURCH"])
    LUXURY = (20000, float('inf'), ["GUCCI", "LOEWE", "BOTTEGA VENETA"])


class Season(Enum):
    """Thai seasons for clothing recommendations"""
    HOT = "hot"  # Mar-May
    RAINY = "rainy"  # Jun-Oct
    COOL = "cool"  # Nov-Feb


@dataclass
class Product:
    """Product information structure"""
    name: str
    brand: str
    type: str
    price: int
    image_url: str
    central_url: str
    reason: str
    is_clothing: bool = True  # Only clothing has direct Central links


@dataclass
class OutfitRecommendation:
    """Complete outfit recommendation"""
    occasion: Occasion
    products: List[Product]
    styling_tips: List[str]
    total_price: int


# ============================================
# FASHION CHATBOT CLASS
# ============================================

class ThaiCentralFashionChatbot:
    """Thai Fashion Specialist Chatbot - P'Fashion"""

    def __init__(self):
        """Initialize the chatbot with personality and knowledge base"""
        self.name = "พี่แฟชั่น (P'Fashion)"
        self.role = "Thai Fashion Specialist & Personal Stylist at Central Online"
        self.personality = "เป็นกันเอง เหมือนเพื่อนสนิทที่รักแฟชั่น พูดจาสนุกสนาน ใช้ภาษาไทยแบบ casual แต่สุภาพ"

        # Communication style elements
        self.polite_particles = ["จ้า", "ค่ะ", "ครับ", "นะคะ", "นะครับ"]
        self.emojis = ["✨", "💕", "😊", "🛍️", "👗", "👔", "🌟", "💪", "☕", "🌊"]

        # Fashion expertise areas
        self.expertise = [
            "Vintage", "Y2K", "Minimalist", "Streetwear", "High Fashion",
            "Korean Fashion", "Japanese Fashion", "European Style", "American Style",
            "Mix & Match Techniques", "Color Coordination", "Occasion Dressing",
            "Budget-Friendly Styling", "Body Type Styling"
        ]

        # Initialize conversation state
        self.conversation_state = {
            "greeted": False,
            "customer_info": {},
            "current_occasion": None,
            "budget": None,
            "preferences": []
        }

        # Load product database
        self._init_product_database()

    def _init_product_database(self):
        """Initialize sample product database"""
        self.products_db = {
            "blazer_sets": [
                Product(
                    name="เซ็ทสูทกระโปรง สีกรมท่า",
                    brand="ZARA WOMAN",
                    type="Blazer Set",
                    price=3990,
                    image_url="[Navy blazer set image]",
                    central_url="https://www.central.co.th/th/zara-navy-blazer-set",
                    reason="สีกรมท่าดูเป็นทางการแต่ไม่ดุเหมือนสีดำ",
                    is_clothing=True
                )
            ],
            "shirts": [
                Product(
                    name="เสื้อ Oxford สีฟ้าอ่อน",
                    brand="UNIQLO",
                    type="Oxford Shirt",
                    price=990,
                    image_url="[Oxford shirt image]",
                    central_url="https://www.central.co.th/th/uniqlo-oxford-shirt-blue",
                    reason="Oxford ผ้าดี ราคาโอเค ใส่ได้ทุกวัน",
                    is_clothing=True
                )
            ],
            "dresses": [
                Product(
                    name="ชุดเดรสผ้าซาติน สีม่วง Dusty",
                    brand="POMELO",
                    type="Midi Dress",
                    price=2890,
                    image_url="[Satin dress image]",
                    central_url="https://www.central.co.th/th/pomelo-satin-midi-dress",
                    reason="สี Dusty purple หรูหรา ไม่ชนใคร",
                    is_clothing=True
                )
            ],
            "accessories": [
                Product(
                    name="กระเป๋า Tote หนังแท้",
                    brand="COACH",
                    type="Structured Bag",
                    price=8900,
                    image_url="[Tote bag image]",
                    central_url="",  # No direct link for accessories
                    reason="ใส่เอกสารและ laptop ได้ ดูเป็นผู้บริหาร",
                    is_clothing=False
                )
            ]
        }

    # ============================================
    # CORE CHATBOT METHODS
    # ============================================

    def get_greeting(self) -> str:
        """Get initial greeting message"""
        return "ฮายย ✋🏻 กำลังหาอะไรอยู่"

    def process_message(self, message: str) -> str:
        """Process customer message and generate appropriate response"""
        # First greeting response
        if not self.conversation_state["greeted"]:
            self.conversation_state["greeted"] = True
            return self._first_response(message)

        # Analyze message intent
        intent = self._analyze_intent(message)

        # Generate response based on intent
        if intent == "need_outfit":
            return self._handle_outfit_request(message)
        elif intent == "budget_info":
            return self._handle_budget_info(message)
        elif intent == "style_advice":
            return self._handle_style_advice(message)
        elif intent == "unclear":
            return self._request_clarification()
        else:
            return self._general_response(message)

    def _first_response(self, message: str) -> str:
        """Generate first response after greeting"""
        responses = [
            f"สวัสดีค่ะ! 😊 ดีใจที่ได้ช่วยเลือกชุดให้นะคะ บอกพี่หน่อยว่า {message} สำหรับโอกาสอะไรคะ?",
            f"หวัดดีจ้า! ✨ {message} เหรอคะ? เล่าให้พี่ฟังหน่อยว่าจะใส่ไปไหน",
            f"ว้าว! กำลังหาชุดสวยๆ อยู่สินะ 💕 {message} แบบไหนที่ใจคะ?"
        ]
        return random.choice(responses)

    def _analyze_intent(self, message: str) -> str:
        """Analyze customer message intent"""
        message_lower = message.lower()

        # Outfit request keywords
        outfit_keywords = ["ชุด", "เสื้อ", "กางเกง", "กระโปรง", "รองเท้า", "แต่งตัว", "ใส่"]
        if any(keyword in message_lower for keyword in outfit_keywords):
            return "need_outfit"

        # Budget keywords
        budget_keywords = ["ราคา", "งบ", "บาท", "แพง", "ถูก", "คุ้ม"]
        if any(keyword in message_lower for keyword in budget_keywords):
            return "budget_info"

        # Style advice keywords
        style_keywords = ["สไตล์", "เทรนด์", "แฟชั่น", "สี", "แมตช์", "เข้ากัน"]
        if any(keyword in message_lower for keyword in style_keywords):
            return "style_advice"

        # Check if message is too vague
        if len(message.split()) < 3:
            return "unclear"

        return "general"

    def _handle_outfit_request(self, message: str) -> str:
        """Handle outfit recommendation request"""
        # Determine occasion from message
        occasion = self._detect_occasion(message)
        self.conversation_state["current_occasion"] = occasion

        # Get appropriate outfit recommendation
        outfit = self._get_outfit_recommendation(occasion)

        # Format response
        return self._format_outfit_response(outfit)

    def _detect_occasion(self, message: str) -> Occasion:
        """Detect occasion from message"""
        message_lower = message.lower()

        occasion_keywords = {
            Occasion.WORK_FORMAL: ["ประชุม", "ทำงาน", "ออฟฟิศ", "formal"],
            Occasion.WORK_CASUAL: ["startup", "casual friday", "smart casual"],
            Occasion.CASUAL_CHILL: ["คาเฟ่", "เดิน", "ช้อป", "วันหยุด"],
            Occasion.WEDDING: ["งานแต่ง", "wedding", "งานเลี้ยง"],
            Occasion.SPORT: ["ออกกำลัง", "ยิม", "gym", "โยคะ", "วิ่ง"],
            Occasion.TRAVEL: ["เที่ยว", "ทะเล", "ภูเขา", "travel"],
            Occasion.DATE: ["เดท", "date", "ดินเนอร์โรแมนติก"],
            Occasion.DINNER: ["ดินเนอร์", "dinner", "มื้อเย็น"],
            Occasion.CAFE: ["คาเฟ่", "กาแฟ", "น้ำชา", "ชา"],
            Occasion.PARTY: ["ปาร์ตี้", "party", "rooftop", "bar"]
        }

        for occasion, keywords in occasion_keywords.items():
            if any(keyword in message_lower for keyword in keywords):
                return occasion

        return Occasion.GENERAL

    def _get_outfit_recommendation(self, occasion: Occasion) -> OutfitRecommendation:
        """Get outfit recommendation based on occasion"""
        # This would normally query the product database
        # For now, return a sample recommendation

        if occasion == Occasion.WORK_FORMAL:
            products = [
                self.products_db["blazer_sets"][0],
                self.products_db["shirts"][0]
            ]
            styling_tips = [
                "ใส่เข็มกลัดเล็กๆ ที่ปกเสื้อสูท เพิ่มความหรูหรา",
                "ทำผมมัดต่ำแบบ Low bun ดู professional",
                "แต่งหน้าโทน Nude แบบ 'No makeup makeup look'"
            ]
        else:
            # Default casual outfit
            products = [
                self.products_db["shirts"][0],
                self.products_db["accessories"][0]
            ]
            styling_tips = [
                "พับแขนเสื้อขึ้นถึงข้อศอก ดู casual",
                "เลือกสีที่ match กันทั้งชุด",
                "อย่าลืมรีดเสื้อให้เรียบนะคะ"
            ]

        total_price = sum(p.price for p in products)

        return OutfitRecommendation(
            occasion=occasion,
            products=products,
            styling_tips=styling_tips,
            total_price=total_price
        )

    def _format_outfit_response(self, outfit: OutfitRecommendation) -> str:
        """Format outfit recommendation as response"""
        response = f"มาดู Outfit สำหรับ{outfit.occasion.value}กันเลยค่ะ! ✨\n\n"

        for product in outfit.products:
            if product.is_clothing:
                response += f"👗 **{product.type}**: {product.name} - {product.brand}\n"
                response += f"🖼️ {product.image_url}\n"
                response += f"💰 ราคา: {product.price:,} บาท\n"
                response += f"🔗 {product.central_url}\n"
                response += f"💡 เหตุผล: {product.reason}\n\n"
            else:
                response += f"👜 **{product.type}**: {product.name} - {product.brand}\n"
                response += f"💰 ราคา: {product.price:,} บาท (ประมาณการ)\n"
                response += f"💡 แนะนำ: {product.reason}\n\n"

        response += "✨ **Styling Tips พิเศษ:**\n"
        for tip in outfit.styling_tips:
            response += f"- {tip}\n"

        response += f"\n💸 ราคารวมทั้งหมด: {outfit.total_price:,} บาท"

        return response

    def _handle_budget_info(self, message: str) -> str:
        """Handle budget-related questions"""
        response = "เรื่องงบประมาณ พี่แบ่งเป็น 4 ระดับนะคะ:\n\n"
        response += "💰 **Entry** (500-2,000 บาท/ชิ้น): UNIQLO, H&M, ZARA\n"
        response += "💰 **Mid** (2,000-5,000 บาท/ชิ้น): COS, & OTHER STORIES\n"
        response += "💰 **Premium** (5,000-20,000 บาท/ชิ้น): COACH, MICHAEL KORS\n"
        response += "💰 **Luxury** (20,000+ บาท/ชิ้น): GUCCI, LOEWE, BOTTEGA\n\n"
        response += "บอกพี่ได้เลยนะคะว่างบประมาณเท่าไหร่ จะช่วยเลือกให้คุ้มค่าที่สุด! 😊"
        return response

    def _handle_style_advice(self, message: str) -> str:
        """Handle style advice questions"""
        tips = [
            "Mix & Match เสื้อผ้าพื้นฐานกับ statement pieces",
            "เลือกสีที่เข้ากันแบบ monochrome หรือ complementary",
            "ลงทุนกับ basics ที่มีคุณภาพ ใส่ได้นาน",
            "Accessorize เพื่อเปลี่ยนลุคจากกลางวันเป็นกลางคืน",
            "เลือกผ้าที่เหมาะกับสภาพอากาศไทย"
        ]

        response = "มา Tips การแต่งตัวจากพี่เลยค่ะ! ✨\n\n"
        for tip in random.sample(tips, 3):
            response += f"• {tip}\n"
        response += "\nอยากรู้เรื่องไหนเพิ่มเติม บอกพี่ได้เลยนะคะ 💕"
        return response

    def _request_clarification(self) -> str:
        """Request more information from customer"""
        return ("ขอรายละเอียดเพิ่มนิดนึงได้ไหมคะ:\n"
                "• โอกาสอะไรคะ? (ทำงาน/เดท/ปาร์ตี้/ท่องเที่ยว)\n"
                "• Dress code มีกำหนดไหม?\n"
                "• งบประมาณประมาณไหนคะ?\n"
                "• ชอบสไตล์แบบไหน? (minimal/trendy/classic)\n"
                "• มีสีที่ชอบหรือเลี่ยงไหมคะ?")

    def _general_response(self, message: str) -> str:
        """Generate general conversational response"""
        return ("พี่พร้อมช่วยเรื่องแฟชั่นทุกอย่างเลยค่ะ! 🛍️\n"
                "ไม่ว่าจะเป็นเลือกชุดทำงาน ชุดเดท ชุดไปเที่ยว\n"
                "หรือจะปรึกษาเรื่อง mix & match ก็ได้นะคะ\n"
                "บอกพี่ได้เลยว่าอยากได้คำแนะนำเรื่องอะไร 😊")

    # ============================================
    # SEASONAL RECOMMENDATIONS
    # ============================================

    def get_seasonal_advice(self) -> str:
        """Get seasonal fashion advice based on current month"""
        current_month = datetime.now().month

        if 3 <= current_month <= 5:  # Hot season
            season = Season.HOT
            advice = [
                "ช่วงนี้อากาศร้อน แนะนำผ้า Linen, Cotton, Rayon",
                "เลือกสีอ่อนๆ สะท้อนความร้อน",
                "รองเท้าแบบ breathable จะสบายกว่า"
            ]
        elif 6 <= current_month <= 10:  # Rainy season
            season = Season.RAINY
            advice = [
                "หน้าฝนแนะนำผ้าแห้งเร็ว synthetic blends",
                "เลือกรองเท้ากันน้ำหรือกันลื่น",
                "เตรียม layer กันฝนไว้ด้วยนะคะ"
            ]
        else:  # Cool season
            season = Season.COOL
            advice = [
                "อากาศเย็นสบาย ใส่ layer ได้เลย cardigan, blazer",
                "ผ้า wool blend หรือ knit อุ่นดี",
                "รองเท้าหุ้มส้นจะดีกว่า"
            ]

        response = f"🌤️ **Fashion Tips หน้า{season.value}นี้:**\n"
        for tip in advice:
            response += f"• {tip}\n"
        return response


# ============================================
# CHATBOT INTERFACE
# ============================================

class ChatInterface:
    """Interface for interacting with the chatbot"""

    def __init__(self):
        self.chatbot = ThaiCentralFashionChatbot()
        self.conversation_history = []

    def start_conversation(self) -> str:
        """Start a new conversation"""
        greeting = self.chatbot.get_greeting()
        self.conversation_history.append({"role": "assistant", "message": greeting})
        return greeting

    def send_message(self, message: str) -> str:
        """Send message to chatbot and get response"""
        # Add user message to history
        self.conversation_history.append({"role": "user", "message": message})

        # Get chatbot response
        response = self.chatbot.process_message(message)

        # Add response to history
        self.conversation_history.append({"role": "assistant", "message": response})

        return response

    def get_conversation_history(self) -> List[Dict]:
        """Get full conversation history"""
        return self.conversation_history

    def reset_conversation(self):
        """Reset conversation state"""
        self.chatbot.conversation_state = {
            "greeted": False,
            "customer_info": {},
            "current_occasion": None,
            "budget": None,
            "preferences": []
        }
        self.conversation_history = []


# ============================================
# MAIN EXECUTION
# ============================================

def main():
    """Main function to run the chatbot"""
    print("=" * 60)
    print("Thai Central Fashion Chatbot - P'Fashion")
    print("Your Personal Fashion Stylist")
    print("=" * 60)
    print()

    # Initialize chat interface
    chat = ChatInterface()

    # Start conversation
    print(f"🤖 {chat.start_conversation()}")
    print()

    # Interactive chat loop
    while True:
        try:
            # Get user input
            user_input = input("👤 You: ").strip()

            # Check for exit commands
            if user_input.lower() in ["exit", "quit", "bye", "ลาก่อน"]:
                print("🤖 P'Fashion: ขอบคุณที่แวะมานะคะ หวังว่าจะได้ช่วยอีก! Happy shopping! 🛍️✨")
                break

            # Process message and get response
            response = chat.send_message(user_input)
            print(f"🤖 P'Fashion: {response}")
            print()

        except KeyboardInterrupt:
            print("\n🤖 P'Fashion: ลาก่อนค่ะ! ✨")
            break
        except Exception as e:
            print(f"❌ Error: {e}")
            print("🤖 P'Fashion: ขอโทษค่ะ มีปัญหานิดหน่อย ลองใหม่อีกทีนะคะ")


if __name__ == "__main__":
    main()