"""
Special Scenario Handler for OOTDay Assistant
Handles special customer situations and edge cases with empathy and expertise
"""

from dataclasses import dataclass
from typing import List, Dict, Optional, Any
from enum import Enum


class CustomerType(Enum):
    """Different types of customers with special needs"""
    BUDGET_CONSCIOUS = "budget_conscious"
    FASHION_NOVICE = "fashion_novice"
    TREND_FOCUSED = "trend_focused"
    BODY_CONSCIOUS = "body_conscious"
    TIME_PRESSED = "time_pressed"
    INDECISIVE = "indecisive"
    GIFT_BUYER = "gift_buyer"
    REPEAT_CUSTOMER = "repeat_customer"
    SEASONAL_SHOPPER = "seasonal_shopper"
    SPECIAL_NEEDS = "special_needs"


@dataclass
class SpecialScenario:
    """Structure for special scenario handling"""
    scenario_type: CustomerType
    indicators: List[str]  # Words/phrases that indicate this scenario
    approach: str  # How to approach this customer
    dos: List[str]  # Things to do
    donts: List[str]  # Things to avoid
    response_adjustments: Dict[str, any]  # How to adjust responses
    product_strategy: str  # Product recommendation strategy
    follow_up_strategy: str  # How to follow up


class SpecialScenarioHandler:
    """Handles special customer scenarios with tailored approaches"""

    def __init__(self):
        self.scenarios = self._initialize_scenarios()
        self.empathy_responses = self._initialize_empathy_responses()

    def _initialize_scenarios(self) -> Dict[CustomerType, SpecialScenario]:
        """Initialize special scenario configurations"""
        return {
            CustomerType.BUDGET_CONSCIOUS: SpecialScenario(
                scenario_type=CustomerType.BUDGET_CONSCIOUS,
                indicators=[
                    "งบน้อย", "ไม่มีตังค์", "ประหยัด", "ถูก", "ลดราคา",
                    "sale", "โปรโมชั่น", "ไม่เกิน", "แพง", "ราคา"
                ],
                approach="Focus on value and versatility, highlight sales/promotions",
                dos=[
                    "แนะนำสินค้าที่คุ้มค่าที่สุด",
                    "เน้น Mix & Match เพื่อความคุ้มค่า",
                    "ชี้โปรโมชั่นและส่วนลดที่มี",
                    "แนะนำสินค้าที่ใช้ได้หลายโอกาส",
                    "บอกราคาต่อการใส่ (cost per wear)"
                ],
                donts=[
                    "อย่าแนะนำสินค้าแพงก่อน",
                    "อย่าทำให้รู้สึกอายที่มีงบน้อย",
                    "อย่าข้ามการบอกราคา",
                    "อย่าแนะนำแบรนด์หรูเป็นอันดับแรก"
                ],
                response_adjustments={
                    "price_display": "always_show",
                    "discount_highlight": True,
                    "value_emphasis": "high",
                    "product_count": 3  # Show more options
                },
                product_strategy="Start with budget options, show value pieces",
                follow_up_strategy="Suggest building wardrobe gradually"
            ),

            CustomerType.FASHION_NOVICE: SpecialScenario(
                scenario_type=CustomerType.FASHION_NOVICE,
                indicators=[
                    "ไม่รู้", "ไม่เข้าใจ", "งง", "ไม่ถนัด", "ไม่เคย",
                    "ช่วยเลือก", "เลือกไม่เป็น", "แต่งตัวไม่เป็น"
                ],
                approach="Simplify advice, build confidence, educate gently",
                dos=[
                    "อธิบายง่ายๆ ไม่ใช้ศัพท์แฟชั่นมาก",
                    "แนะนำ basic items ที่ใส่ง่าย",
                    "ให้กำลังใจและสร้างความมั่นใจ",
                    "แนะนำชุดสำเร็จรูปหรือชุดเซ็ต",
                    "อธิบายว่าทำไมถึงเข้ากัน"
                ],
                donts=[
                    "อย่าใช้คำศัพท์แฟชั่นที่ซับซ้อน",
                    "อย่าแนะนำลุคที่ styling ยาก",
                    "อย่าทำให้รู้สึกว่าไม่มีสไตล์",
                    "อย่ารีบเร่ง ให้เวลาตัดสินใจ"
                ],
                response_adjustments={
                    "complexity": "simple",
                    "explanation_level": "detailed",
                    "confidence_building": True,
                    "visual_examples": "more"
                },
                product_strategy="Safe, classic choices that are hard to go wrong",
                follow_up_strategy="Offer step-by-step styling guidance"
            ),

            CustomerType.TREND_FOCUSED: SpecialScenario(
                scenario_type=CustomerType.TREND_FOCUSED,
                indicators=[
                    "เทรนด์", "ฮิต", "ใหม่ล่าสุด", "trending", "viral",
                    "ดารา", "อินฟลู", "instagram", "tiktok"
                ],
                approach="Showcase latest trends, reference influencers/celebrities",
                dos=[
                    "อ้างอิงเทรนด์ปัจจุบัน",
                    "เชื่อมโยงกับ influencers/celebrities",
                    "แนะนำสินค้า limited edition",
                    "บอกว่าอะไรกำลังฮิตในโซเชียล",
                    "แนะนำการ styling แบบ trendy"
                ],
                donts=[
                    "อย่าแนะนำของ classic เกินไป",
                    "อย่าลืมอัพเดทเทรนด์ใหม่",
                    "อย่าแนะนำสไตล์ที่ outdated",
                    "อย่าดูแก่หรือล้าสมัย"
                ],
                response_adjustments={
                    "trend_focus": "high",
                    "reference_style": "influencer",
                    "newness_emphasis": True,
                    "social_media_ready": True
                },
                product_strategy="Latest arrivals, trending items, statement pieces",
                follow_up_strategy="Update on new trends and arrivals"
            ),

            CustomerType.BODY_CONSCIOUS: SpecialScenario(
                scenario_type=CustomerType.BODY_CONSCIOUS,
                indicators=[
                    "อ้วน", "ผอม", "ตัวเล็ก", "ตัวใหญ่", "พรางหุ่น",
                    "พุง", "ขาใหญ่", "ไหล่กว้าง", "สะโพก", "ปกปิด"
                ],
                approach="Focus on flattering fits, build confidence, never judge",
                dos=[
                    "เน้นจุดเด่นของหุ่น",
                    "แนะนำทรงที่เหมาะกับรูปร่าง",
                    "ให้กำลังใจและสร้างความมั่นใจ",
                    "แนะนำเทคนิคการแต่งตัวที่ช่วยสัดส่วน",
                    "พูดในเชิงบวกเสมอ"
                ],
                donts=[
                    "อย่าพูดถึงจุดด้อยของหุ่น",
                    "อย่าใช้คำที่ทำร้ายความรู้สึก",
                    "อย่าแนะนำชุดที่รัดรูปถ้าไม่มั่นใจ",
                    "อย่า judge รูปร่าง",
                    "อย่าเปรียบเทียบกับคนอื่น"
                ],
                response_adjustments={
                    "fit_focus": "flattering",
                    "confidence_language": True,
                    "positive_framing": "always",
                    "size_inclusivity": True
                },
                product_strategy="Flattering silhouettes, strategic styling",
                follow_up_strategy="Continue building confidence with styling tips"
            ),

            CustomerType.TIME_PRESSED: SpecialScenario(
                scenario_type=CustomerType.TIME_PRESSED,
                indicators=[
                    "รีบ", "ด่วน", "เร่ง", "ไม่มีเวลา", "เดี๋ยวนี้",
                    "วันนี้", "พรุ่งนี้", "ด่วนมาก", "ทันที"
                ],
                approach="Quick, decisive recommendations, ready-to-go options",
                dos=[
                    "แนะนำตัวเลือกที่ดีที่สุดทันที",
                    "เสนอชุดสำเร็จรูป",
                    "บอกสินค้าที่มีของพร้อมส่ง",
                    "ให้ข้อมูลกระชับตรงประเด็น",
                    "แนะนำ quick fixes"
                ],
                donts=[
                    "อย่าให้ตัวเลือกเยอะเกินไป",
                    "อย่าอธิบายยืดยาว",
                    "อย่าแนะนำสินค้า pre-order",
                    "อย่าถามคำถามเยอะ"
                ],
                response_adjustments={
                    "response_speed": "fast",
                    "options_count": 2,  # Fewer options
                    "detail_level": "concise",
                    "availability_check": True
                },
                product_strategy="In-stock, quick delivery, complete outfits",
                follow_up_strategy="Offer to save time with preset combinations"
            ),

            CustomerType.INDECISIVE: SpecialScenario(
                scenario_type=CustomerType.INDECISIVE,
                indicators=[
                    "ไม่แน่ใจ", "ลังเล", "เลือกไม่ได้", "ชอบหมด",
                    "กลัวผิด", "คิดมาก", "ไม่รู้เลือกอะไรดี"
                ],
                approach="Guide gently, narrow choices, provide reassurance",
                dos=[
                    "ช่วยลดตัวเลือกทีละขั้น",
                    "ถามคำถามเพื่อกรองตัวเลือก",
                    "ให้เหตุผลสนับสนุนการตัดสินใจ",
                    "แนะนำ bestsellers",
                    "ให้ความมั่นใจในการเลือก"
                ],
                donts=[
                    "อย่าให้ตัวเลือกเยอะในครั้งเดียว",
                    "อย่ารีบเร่งให้ตัดสินใจ",
                    "อย่าทำให้สับสนมากขึ้น",
                    "อย่าแสดงความหงุดหงิด"
                ],
                response_adjustments={
                    "guidance_level": "high",
                    "decision_support": True,
                    "comparison_help": True,
                    "recommendation_strength": "clear"
                },
                product_strategy="Clear top pick with reasoning",
                follow_up_strategy="Reassure about choice, offer exchange info"
            ),

            CustomerType.GIFT_BUYER: SpecialScenario(
                scenario_type=CustomerType.GIFT_BUYER,
                indicators=[
                    "ซื้อให้", "ของขวัญ", "เซอร์ไพรส์", "วันเกิด",
                    "แฟน", "แม่", "เพื่อน", "ของฝาก"
                ],
                approach="Safe choices, gift-appropriate, include gift options",
                dos=[
                    "แนะนำของที่เป็น safe choice",
                    "ถามข้อมูลผู้รับเพิ่มเติม",
                    "แนะนำ gift sets ถ้ามี",
                    "เสนอการห่อของขวัญ",
                    "แนะนำไซส์ที่ flexible"
                ],
                donts=[
                    "อย่าแนะนำของที่ personal เกินไป",
                    "อย่าลืมถามงบประมาณ",
                    "อย่าแนะนำสินค้าที่เลือกไซส์ยาก",
                    "อย่าลืมบอกนโยบายคืนสินค้า"
                ],
                response_adjustments={
                    "gift_focus": True,
                    "safe_choices": True,
                    "gift_wrapping": "mention",
                    "size_flexibility": True
                },
                product_strategy="Universally flattering, gift sets, accessories",
                follow_up_strategy="Offer gift receipt and exchange options"
            ),

            CustomerType.SEASONAL_SHOPPER: SpecialScenario(
                scenario_type=CustomerType.SEASONAL_SHOPPER,
                indicators=[
                    "หน้าร้อน", "หน้าฝน", "หน้าหนาว", "ปีใหม่",
                    "สงกรานต์", "คริสต์มาส", "วาเลนไทน์"
                ],
                approach="Season-appropriate recommendations, weather considerations",
                dos=[
                    "แนะนำเสื้อผ้าเหมาะกับฤดูกาล",
                    "คำนึงถึงสภาพอากาศ",
                    "แนะนำสีที่เหมาะกับฤดูกาล",
                    "เสนอผ้าที่เหมาะกับอุณหภูมิ",
                    "แนะนำการเก็บรักษาตามฤดู"
                ],
                donts=[
                    "อย่าแนะนำผ้าหนาในหน้าร้อน",
                    "อย่าลืมปัจจัยสภาพอากาศ",
                    "อย่าแนะนำสีเข้มในฤดูร้อน",
                    "อย่าแนะนำผ้าที่ดูแลยากในหน้าฝน"
                ],
                response_adjustments={
                    "seasonal_focus": True,
                    "weather_appropriate": True,
                    "fabric_emphasis": True,
                    "color_seasonal": True
                },
                product_strategy="Season-specific materials and styles",
                follow_up_strategy="Update on seasonal collections"
            ),

            CustomerType.SPECIAL_NEEDS: SpecialScenario(
                scenario_type=CustomerType.SPECIAL_NEEDS,
                indicators=[
                    "แพ้", "พิการ", "ท้อง", "ให้นม", "ผ่าตัด",
                    "ฮิญาบ", "ศาสนา", "allergen", "sensitive"
                ],
                approach="Highly sensitive, accommodating, respectful",
                dos=[
                    "ให้ความเคารพและเข้าใจ",
                    "แนะนำตามความต้องการพิเศษ",
                    "ถามรายละเอียดอย่างสุภาพ",
                    "เสนอทางเลือกที่เหมาะสม",
                    "ให้ข้อมูลวัสดุอย่างละเอียด"
                ],
                donts=[
                    "อย่าทำให้รู้สึกแตกต่าง",
                    "อย่าตัดสินหรือสงสัย",
                    "อย่าละเลยความต้องการพิเศษ",
                    "อย่าแนะนำสิ่งที่ไม่เหมาะสม",
                    "อย่าเปิดเผยข้อมูลส่วนตัว"
                ],
                response_adjustments={
                    "sensitivity": "maximum",
                    "accommodation": True,
                    "detail_level": "comprehensive",
                    "respect_level": "high"
                },
                product_strategy="Specific to individual needs",
                follow_up_strategy="Continue respectful, accommodating service"
            )
        }

    def _initialize_empathy_responses(self) -> Dict[str, List[str]]:
        """Initialize empathetic responses for different situations"""
        return {
            "understanding": [
                "เข้าใจเลยค่ะ",
                "ไม่ต้องกังวลนะคะ เราช่วยได้",
                "โอเคค่ะ มาดูกันว่าจะช่วยอะไรได้บ้าง"
            ],
            "encouragement": [
                "ไม่ยากเลยค่ะ เดี๋ยวช่วยเลือกให้",
                "มั่นใจได้เลยค่ะ จะช่วยหาให้เหมาะสมที่สุด",
                "ดีใจที่ได้ช่วยค่ะ มาเริ่มกันเลย"
            ],
            "reassurance": [
                "เลือกถูกแล้วค่ะ สวยแน่นอน",
                "เหมาะสมมากเลยค่ะ มั่นใจได้",
                "ดูดีมากค่ะ เป็นตัวเลือกที่ยอดเยี่ยม"
            ],
            "apology": [
                "ขออภัยที่ยังไม่ตรงใจนะคะ",
                "ขอโทษค่ะ เดี๋ยวหาใหม่ให้",
                "ไม่เป็นไรเลยค่ะ ขอปรับให้ใหม่นะคะ"
            ]
        }

    def detect_scenario(self, message: str, context: Dict = None) -> Optional[CustomerType]:
        """Detect special scenario from customer message"""
        message_lower = message.lower()

        for customer_type, scenario in self.scenarios.items():
            if any(indicator in message_lower for indicator in scenario.indicators):
                return customer_type

        # Check context for additional clues
        if context:
            if context.get("budget") and context["budget"] < 3000:
                return CustomerType.BUDGET_CONSCIOUS
            if context.get("urgency") == "high":
                return CustomerType.TIME_PRESSED

        return None

    def get_scenario_approach(self, customer_type: CustomerType) -> SpecialScenario:
        """Get specific approach for customer type"""
        return self.scenarios.get(customer_type)

    def adjust_response(self,
                       base_response: str,
                       customer_type: CustomerType,
                       context: Dict = None) -> str:
        """Adjust response based on special scenario"""
        scenario = self.scenarios.get(customer_type)
        if not scenario:
            return base_response

        adjusted = base_response

        # Apply adjustments based on scenario
        adjustments = scenario.response_adjustments

        if adjustments.get("price_display") == "always_show":
            # Ensure all prices are visible
            pass  # Already handled in product formatting

        if adjustments.get("complexity") == "simple":
            # Simplify language
            adjusted = self._simplify_language(adjusted)

        if adjustments.get("confidence_building"):
            # Add encouraging phrases
            adjusted = self._add_encouragement(adjusted)

        return adjusted

    def _simplify_language(self, text: str) -> str:
        """Simplify fashion jargon"""
        replacements = {
            "silhouette": "ทรง",
            "layering": "ใส่ซ้อนกัน",
            "statement piece": "ชิ้นเด่น",
            "mix & match": "ผสมผสาน",
            "minimalist": "เรียบง่าย",
            "oversized": "ใหญ่ๆ สบายๆ"
        }

        for term, simple in replacements.items():
            text = text.replace(term, simple)

        return text

    def _add_encouragement(self, text: str) -> str:
        """Add encouraging phrases"""
        encouragements = [
            "\nใส่แล้วสวยแน่นอนค่ะ! 💫",
            "\nมั่นใจได้เลยค่ะ ดูดีมาก! ✨",
            "\nเป็นตัวเลือกที่ดีมากเลยค่ะ 😊"
        ]

        import random
        return text + random.choice(encouragements)

    def generate_empathy_response(self, response_type: str) -> str:
        """Generate appropriate empathetic response"""
        import random
        responses = self.empathy_responses.get(response_type, [""])
        return random.choice(responses) if responses else ""

    def handle_sensitive_topic(self, topic: str, message: str) -> str:
        """Handle sensitive topics with care"""
        sensitive_responses = {
            "pregnancy": """ยินดีด้วยนะคะคุณแม่! 🤱 ช่วงนี้ต้องเน้นความสบายเป็นหลักใช่มั้ยคะ
                         จะแนะนำชุดที่ทั้งใส่สบายและยังดูสวยด้วยนะคะ มีโอกาสพิเศษหรือใส่ทั่วไปคะ?""",

            "disability": """เข้าใจค่ะ จะช่วยหาชุดที่เหมาะสมและสะดวกสบายให้นะคะ
                          มีข้อกำหนดพิเศษที่ต้องคำนึงถึงมั้ยคะ? บอกมาได้เลย จะพยายามหาให้ตรงความต้องการที่สุดค่ะ""",

            "religion": """เข้าใจค่ะ จะแนะนำชุดที่สวยและเหมาะสมตามหลักการนะคะ
                       เราก็มีคอลเลคชั่นที่ปิดมิดชิดแต่ยังคงความสวยงามค่ะ มีโอกาสพิเศษหรือใส่ประจำคะ?""",

            "allergy": """โอ้โห ต้องระวังเรื่องนี้ด้วยสินะคะ ไม่ต้องห่วงนะคะ
                      จะแนะนำเฉพาะผ้าที่ไม่ระคายเคืองผิวให้เลยค่ะ แพ้ผ้าชนิดไหนบ้างคะ?""",

            "body_image": """ทุกคนมีความสวยงามในแบบของตัวเองค่ะ ✨
                        จะช่วยหาชุดที่ทำให้คุณรู้สึกมั่นใจและสวยที่สุดนะคะ บอกสไตล์ที่ชอบมาได้เลยค่ะ"""
        }

        return sensitive_responses.get(topic, self.generate_empathy_response("understanding"))


class CustomerProfileAnalyzer:
    """Analyze customer profile from conversation"""

    def __init__(self):
        self.profile_indicators = {
            "age_group": {
                "teen": ["นักเรียน", "นักศึกษา", "ม.ปลาย", "มหาลัย", "uni"],
                "young_adult": ["ทำงาน", "ออฟฟิศ", "จบใหม่", "เดท"],
                "adult": ["ลูก", "ครอบครัว", "ประชุม", "ผู้ใหญ่"],
                "senior": ["ผู้สูงอายุ", "เกษียณ", "สบายๆ"]
            },
            "lifestyle": {
                "professional": ["ทำงาน", "ออฟฟิศ", "ประชุม", "บริษัท"],
                "student": ["เรียน", "มหาลัย", "นักศึกษา"],
                "active": ["ออกกำลัง", "วิ่ง", "กีฬา", "gym"],
                "social": ["ปาร์ตี้", "เที่ยว", "คาเฟ่", "เดท"],
                "homebody": ["บ้าน", "สบายๆ", "relax", "chill"]
            },
            "fashion_level": {
                "beginner": ["ไม่รู้", "ไม่เป็น", "ช่วย", "งง"],
                "intermediate": ["ปกติ", "บ้าง", "พอได้"],
                "advanced": ["เทรนด์", "แบรนด์", "designer", "style"]
            }
        }

    def analyze_profile(self, conversation_history: List[str]) -> Dict[str, any]:
        """Analyze customer profile from conversation"""
        profile = {
            "age_group": None,
            "lifestyle": None,
            "fashion_level": None,
            "preferences": [],
            "constraints": []
        }

        # Combine all messages
        all_text = " ".join(conversation_history).lower()

        # Detect age group
        for age, indicators in self.profile_indicators["age_group"].items():
            if any(ind in all_text for ind in indicators):
                profile["age_group"] = age
                break

        # Detect lifestyle
        lifestyles = []
        for lifestyle, indicators in self.profile_indicators["lifestyle"].items():
            if any(ind in all_text for ind in indicators):
                lifestyles.append(lifestyle)
        profile["lifestyle"] = lifestyles

        # Detect fashion level
        for level, indicators in self.profile_indicators["fashion_level"].items():
            if any(ind in all_text for ind in indicators):
                profile["fashion_level"] = level
                break

        return profile

    def get_profile_recommendations(self, profile: Dict) -> List[str]:
        """Get recommendations based on customer profile"""
        recommendations = []

        if profile.get("age_group") == "teen":
            recommendations.append("Focus on trendy, affordable options")
        elif profile.get("age_group") == "adult":
            recommendations.append("Emphasize quality and versatility")

        if "professional" in profile.get("lifestyle", []):
            recommendations.append("Include work-appropriate options")
        if "active" in profile.get("lifestyle", []):
            recommendations.append("Suggest performance fabrics")

        if profile.get("fashion_level") == "beginner":
            recommendations.append("Provide detailed styling guidance")
        elif profile.get("fashion_level") == "advanced":
            recommendations.append("Include designer and trend-forward pieces")

        return recommendations


# Example usage
if __name__ == "__main__":
    # Initialize handler
    handler = SpecialScenarioHandler()

    # Test scenario detection
    test_messages = [
        "งบน้อยค่ะ ไม่เกิน 2000 บาท",
        "ไม่รู้จะเลือกอะไรดี แต่งตัวไม่เป็นเลย",
        "อยากได้ชุดตามเทรนด์ที่ดาราใส่",
        "ช่วยหาชุดที่พรางพุงหน่อยค่ะ",
        "รีบมากค่ะ ต้องใช้พรุ่งนี้เลย"
    ]

    print("Scenario Detection Tests:")
    for msg in test_messages:
        scenario = handler.detect_scenario(msg)
        if scenario:
            approach = handler.get_scenario_approach(scenario)
            print(f"\nMessage: {msg}")
            print(f"Detected: {scenario.value}")
            print(f"Approach: {approach.approach}")
            print(f"Key Do: {approach.dos[0]}")

    # Test profile analysis
    print("\n" + "="*50)
    print("Profile Analysis Test:")

    analyzer = CustomerProfileAnalyzer()
    conversation = [
        "สวัสดีค่ะ เป็นนักศึกษาค่ะ",
        "หาชุดไปเรียนและไปคาเฟ่",
        "ไม่ค่อยรู้เรื่องแฟชั่นเลย"
    ]

    profile = analyzer.analyze_profile(conversation)
    print(f"Profile: {profile}")

    recommendations = analyzer.get_profile_recommendations(profile)
    print(f"Recommendations: {recommendations}")

    # Test sensitive topic handling
    print("\n" + "="*50)
    print("Sensitive Topic Handling:")

    sensitive_response = handler.handle_sensitive_topic("pregnancy", "ท้อง 5 เดือนค่ะ")
    print(f"Pregnancy response: {sensitive_response}")