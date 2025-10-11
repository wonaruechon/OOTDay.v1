"""
Test Scenarios and Example Responses for OOTDay Assistant
Comprehensive test suite demonstrating various conversation flows
"""

from typing import List, Dict, Tuple
from dataclasses import dataclass


@dataclass
class TestScenario:
    """Structure for test scenarios"""
    scenario_name: str
    description: str
    user_inputs: List[str]
    expected_behaviors: List[str]
    tags: List[str]


class OOTDayTestSuite:
    """Comprehensive test suite for OOTDay Assistant"""

    def __init__(self):
        self.test_scenarios = self._initialize_scenarios()
        self.example_conversations = self._initialize_examples()

    def _initialize_scenarios(self) -> List[TestScenario]:
        """Initialize comprehensive test scenarios"""
        return [
            TestScenario(
                scenario_name="Wedding Guest - Complete Flow",
                description="User looking for wedding guest outfit with full conversation",
                user_inputs=[
                    "หาชุดไปงานแต่งเพื่อนค่ะ ช่วยแนะนำหน่อย",
                    "งานในโรงแรมค่ะ อยากดูดีแต่ไม่เกินไป แนวเรียบหรูคลาสสิก",
                    "งบประมาณ 5000-8000 บาทค่ะ",
                    "ชอบลุคที่ 1 ค่ะ แต่อยากเปลี่ยนสีเดรสเป็นสีน้ำเงินได้มั้ย"
                ],
                expected_behaviors=[
                    "Greet warmly and ask about occasion details",
                    "Present 2-3 wedding appropriate outfits",
                    "Include Central product links with prices",
                    "Adjust recommendations based on color preference"
                ],
                tags=["wedding", "formal", "complete_flow", "refinement"]
            ),

            TestScenario(
                scenario_name="Work Outfit - Professional Woman",
                description="Professional woman needing work wardrobe update",
                user_inputs=[
                    "ต้องการชุดทำงานใหม่ค่ะ",
                    "ทำงานออฟฟิศค่ะ ต้องดูโปรเฟสชั่นแนล",
                    "ชอบแนวมินิมอลค่ะ สีไม่ฉูดฉาด"
                ],
                expected_behaviors=[
                    "Ask about work environment/dress code",
                    "Recommend professional, minimal style pieces",
                    "Focus on neutral colors",
                    "Include mix-and-match suggestions"
                ],
                tags=["work", "professional", "minimal", "women"]
            ),

            TestScenario(
                scenario_name="First Date - Nervous Customer",
                description="Customer preparing for first date, unsure about style",
                user_inputs=[
                    "มีนัดเดทครั้งแรกค่ะ ไม่รู้จะใส่อะไรดี",
                    "ไปทานข้าวร้านบรรยากาศดีๆ แล้วอาจจะเดินเล่น",
                    "อยากดูสวยแต่ไม่ทำเกินค่ะ"
                ],
                expected_behaviors=[
                    "Provide reassuring, supportive response",
                    "Suggest comfortable yet attractive outfits",
                    "Include styling tips for confidence",
                    "Consider both dinner and walking comfort"
                ],
                tags=["date", "dinner", "first_time", "confidence"]
            ),

            TestScenario(
                scenario_name="Sport/Gym - Beginner",
                description="Someone starting their fitness journey",
                user_inputs=[
                    "จะเริ่มไปฟิตเนสค่ะ อยากได้ชุดออกกำลังกาย",
                    "เพิ่งเริ่มค่ะ อยากได้ชุดที่ใส่สบายไม่อาย"
                ],
                expected_behaviors=[
                    "Recommend comfortable, confidence-boosting sportswear",
                    "Include essential pieces for beginners",
                    "Suggest versatile items good for various exercises",
                    "Provide tips about proper sports attire"
                ],
                tags=["sport", "beginner", "comfort", "confidence"]
            ),

            TestScenario(
                scenario_name="Travel - Multi-Climate",
                description="Traveler visiting multiple climates",
                user_inputs=[
                    "จะไปเที่ยวญี่ปุ่นค่ะ ต้นฤดูหนาว",
                    "ไปทั้งโตเกียวและโอซาก้า 7 วันค่ะ",
                    "อยากได้ชุดที่ใส่ได้หลายแบบ ไม่ต้องเอาเยอะ"
                ],
                expected_behaviors=[
                    "Recommend layering pieces",
                    "Suggest versatile, mix-and-match items",
                    "Include weather-appropriate recommendations",
                    "Provide packing tips"
                ],
                tags=["travel", "versatile", "weather", "international"]
            ),

            TestScenario(
                scenario_name="Cafe - Instagram Worthy",
                description="Young customer wanting photogenic cafe outfit",
                user_inputs=[
                    "หาชุดไปนั่งคาเฟ่ถ่ายรูปค่ะ",
                    "อยากได้แนว Instagram aesthetic น่ารักๆ"
                ],
                expected_behaviors=[
                    "Recommend trendy, photogenic outfits",
                    "Suggest Instagram-friendly colors/patterns",
                    "Include accessories for complete look",
                    "Provide photo-friendly styling tips"
                ],
                tags=["cafe", "instagram", "trendy", "photo"]
            ),

            TestScenario(
                scenario_name="Budget Conscious - Student",
                description="University student with limited budget",
                user_inputs=[
                    "เป็นนักศึกษาค่ะ หาชุดไปเรียนแล้วใส่ไปเที่ยวได้ด้วย",
                    "งบไม่เกิน 2000 บาทค่ะ"
                ],
                expected_behaviors=[
                    "Focus on versatile, budget-friendly pieces",
                    "Suggest items that work for multiple occasions",
                    "Highlight value for money",
                    "Recommend mix-and-match possibilities"
                ],
                tags=["budget", "student", "versatile", "value"]
            ),

            TestScenario(
                scenario_name="Party - Birthday Celebration",
                description="Customer attending friend's birthday party",
                user_inputs=[
                    "ไปปาร์ตี้วันเกิดเพื่อนค่ะ",
                    "ธีมสีชมพู ที่ rooftop bar ค่ะ",
                    "อยากโดดเด่นหน่อยค่ะ"
                ],
                expected_behaviors=[
                    "Recommend party-appropriate pink outfits",
                    "Consider rooftop/outdoor setting",
                    "Suggest statement pieces",
                    "Include evening/night styling tips"
                ],
                tags=["party", "themed", "evening", "statement"]
            ),

            TestScenario(
                scenario_name="Seasonal - Hot Weather",
                description="Customer dealing with Thai hot season",
                user_inputs=[
                    "ร้อนมากเลยค่ะช่วงนี้",
                    "หาชุดใส่ทำงานที่ไม่ร้อนค่ะ",
                    "เหงื่อออกง่าย กลัวเป็นรอย"
                ],
                expected_behaviors=[
                    "Recommend breathable fabrics",
                    "Suggest light colors",
                    "Consider sweat-friendly materials",
                    "Provide hot weather styling tips"
                ],
                tags=["seasonal", "hot_weather", "work", "comfort"]
            ),

            TestScenario(
                scenario_name="Size Inclusive - Plus Size",
                description="Plus size customer seeking flattering outfits",
                user_inputs=[
                    "หาชุดไซส์ XL-XXL ค่ะ",
                    "อยากได้ชุดที่ช่วยพรางหน้าท้อง",
                    "ไปงานเลี้ยงบริษัทค่ะ"
                ],
                expected_behaviors=[
                    "Recommend flattering silhouettes",
                    "Avoid mentioning body insecurities",
                    "Focus on highlighting best features",
                    "Suggest confidence-boosting styles"
                ],
                tags=["size_inclusive", "formal", "confidence", "sensitive"]
            )
        ]

    def _initialize_examples(self) -> Dict[str, List[Tuple[str, str]]]:
        """Initialize example conversation pairs"""
        return {
            "greeting_variations": [
                ("สวัสดีค่ะ", "ฮายย ✋🏻 กำลังหาอะไรอยู่"),
                ("Hello", "ฮายย ✋🏻 กำลังหาอะไรอยู่"),
                ("หวัดดี", "ฮายย ✋🏻 กำลังหาอะไรอยู่")
            ],

            "wedding_guest_flow": [
                (
                    "หาชุดไปงานแต่งเพื่อนค่ะ ช่วยแนะนำหน่อย",
                    """อ้าว งานแต่งงานเพื่อนน่ารักเลย! 💕 อยากทราบรายละเอียดนิดนึงนะคะ งานแต่งแบบไหนคะ? เป็นงานในสวน โรงแรม หรือว่าวัด? แล้วอยากสวมใส่แบบไหน สีพาสเทลหวานๆ หรือจะไปทางเรียบหรูดีคะ? 😊"""
                ),
                (
                    "งานในโรงแรมค่ะ อยากดูดีแต่ไม่เกินไป แนวเรียบหรูคลาสสิก",
                    """เข้าใจเลยค่ะ! งานในโรงแรมก็เหมาะกับลุคเรียบหรูคลาสสิคมากๆ ขอแนะนำ 2 ลุคที่จะทำให้ดูดีแต่ไม่ชิงโฟกัสเจ้าสาวนะคะ ✨

**ลุค 1: Elegant Blush**
ชุดเดรสสีนู้ดชมพูอ่อนที่ให้ความรู้สึกอบอุ่นและหรูหรา เหมาะกับงานแต่งในโรงแรมมากค่ะ

🛍️ **แนะนำสินค้า:**
- **เดรส:** [Midi Dress คอวี สีชมพูนู้ด - JASPAL](https://www.central.co.th/jaspal-midi-dress) - ฿3,990
- **รองเท้า:** [Block Heel Sandals สีนู้ด - CHARLES & KEITH](https://www.central.co.th/charles-keith-block-heel) - ฿2,490
- **กระเป๋า:** [Mini Clutch Bag สีทอง - CHARLES & KEITH](https://www.central.co.th/charles-keith-clutch) - ฿1,590

💡 **Styling Tip:** เลือกเครื่องประดับโทนทองหรือพิ้งโกลด์เพิ่มความหรูหรา ผมรวบหลวมๆ จะทำให้ดูสวยงามและเหมาะกับงานค่ำคะ

---

**ลุค 2: Modern Classic Navy**
ถ้าอยากดูเท่และมั่นใจกว่านี้นิด ลองลุคสีกรมท่าเรียบหรูนี้ดูค่ะ

🛍️ **แนะนำสินค้า:**
- **เดรส:** [Wrap Dress แขนยาว สีกรมท่า - MANGO](https://www.central.co.th/mango-wrap-dress) - ฿2,990
- **รองเท้า:** [Pointed Toe Pumps สีดำ - PEDRO](https://www.central.co.th/pedro-pointed-pumps) - ฿3,290
- **กระเป๋า:** [Crossbody Bag หนังแท้ สีดำ - COACH](https://www.central.co.th/coach-crossbody) - ฿8,900 (ลด 26%)

💡 **Styling Tip:** สีกรมท่าเป็นสีที่เซฟและดูดีเสมอ ใส่ต่างหูยาวหรือสร้อยคอเรียบๆ จะช่วยเพิ่มมิติให้ลุคนี้เลยค่ะ

---

อยากดูทางเลือกอื่นไหมคะ? หรือมีข้อกำหนดเพิ่มเติมมั้ย? 😊"""
                )
            ],

            "work_outfit_flow": [
                (
                    "ต้องการชุดทำงานใหม่ค่ะ",
                    """เข้าใจเลยค่ะ! อยากได้ชุดทำงานสไตล์ไหนคะ? เป็นออฟฟิศที่เป็นทางการมากมั้ย หรือว่าแบบ smart casual ก็ได้คะ? แล้วมีสีหรือสไตล์ที่ชอบเป็นพิเศษมั้ย? 💼"""
                ),
                (
                    "ออฟฟิศ smart casual ค่ะ ชอบแนวมินิมอล",
                    """โอเคค่ะ! แนวมินิมอลสำหรับออฟฟิศ smart casual เลย ขอแนะนำ 2 ลุคที่ Mix & Match ได้หลายแบบนะคะ

**ลุค 1: Minimal Chic**
ลุคมินิมอลที่ดูคลีนและโปรเฟสชั่นแนล

🛍️ **แนะนำสินค้า:**
- **เสื้อ:** [Rayon Blouse แขนสั้น สีขาว - UNIQLO](https://www.central.co.th/uniqlo-rayon-blouse) - ฿990
- **กางเกง:** [Wide Leg Pants ผ้าดราป สีดำ - UNIQLO](https://www.central.co.th/uniqlo-wide-pants) - ฿1,490
- **รองเท้า:** [Pointed Toe Pumps สีดำ - PEDRO](https://www.central.co.th/pedro-pointed-pumps) - ฿3,290

💡 **Styling Tip:** เพิ่มเข็มขัดหนังเรียบๆ และนาฬิกามินิมอล จะช่วยให้ลุคดูเป็นมืออาชีพมากขึ้นค่ะ

---

อยากดูทางเลือกอื่นไหมคะ? หรือมีข้อกำหนดเพิ่มเติมมั้ย? 😊"""
                )
            ],

            "date_outfit_flow": [
                (
                    "มีนัดเดทค่ะ ช่วยแนะนำชุดหน่อย",
                    """อุ้ยย เดทด้วย! 💕 น่าตื่นเต้นจัง จะไปเดทที่ไหนคะ? ดินเนอร์ หนัง หรือเดินเล่น? แล้วอยากได้ลุคแบบไหน สวยหวานหรือเท่ๆ หน่อยดีคะ?"""
                ),
                (
                    "ไปทานข้าวร้านบรรยากาศดีๆ ค่ะ",
                    """เข้าใจเลยค่ะ! ดินเนอร์ต้องดูดีแต่ยังคงความเป็นตัวเอง มาดูลุคที่จะทำให้คุณมั่นใจและน่าประทับใจกันค่ะ

**ลุค 1: Romantic Evening**
ลุคโรแมนติกที่ดูสวยแบบ effortless

🛍️ **แนะนำสินค้า:**
- **เดรส:** [Floral Midi Dress - ZARA](https://www.central.co.th/zara-floral-dress) - ฿2,490
- **รองเท้า:** [Block Heel Sandals สีนู้ด - CHARLES & KEITH](https://www.central.co.th/charles-keith-block-heel) - ฿2,490
- **กระเป๋า:** [Mini Clutch Bag สีทอง - CHARLES & KEITH](https://www.central.co.th/charles-keith-clutch) - ฿1,590

💡 **Styling Tip:** ทาลิปสีชมพูนู้ดหรือแดงอ่อนๆ แต่งหน้าแบบ natural glow จะดูสวยและเป็นธรรมชาติค่ะ

---

อยากดูทางเลือกอื่นไหมคะ? หรืออยากปรับเปลี่ยนสไตล์? 😊"""
                )
            ],

            "budget_conscious_flow": [
                (
                    "หาชุดสวยๆ ค่ะ แต่งบไม่เยอะ",
                    """ไม่เป็นไรเลยค่ะ! เราก็มีตัวเลือกดีๆ ในราคาที่จับต้องได้นะคะ มีงบประมาณประมาณเท่าไหร่คะ? แล้วอยากได้ชุดไปโอกาสไหน? จะได้แนะนำให้คุ้มค่าที่สุดเลย 💰"""
                ),
                (
                    "ประมาณ 3000 บาทค่ะ ใส่ไปเที่ยวทั่วไป",
                    """ได้เลยค่ะ! 3000 บาทก็ได้ลุคสวยๆ ที่ใช้ได้หลายโอกาสแล้ว มาดูกันค่ะ

**ลุค 1: Casual Versatile**
ลุคที่ใส่ได้ทุกวัน Mix & Match ง่าย

🛍️ **แนะนำสินค้า:**
- **เสื้อ:** [Cotton T-Shirt สีขาว - UNIQLO](https://www.central.co.th/uniqlo-cotton-tee) - ฿590
- **กางเกง:** [High Waist Jeans - ZARA](https://www.central.co.th/zara-high-waist-jeans) - ฿1,990
- **รองเท้า:** [Canvas Sneakers สีขาว - CONVERSE (Outlet)](https://www.central.co.th/converse-outlet) - ฿990

**รวม:** ฿2,570

💡 **Styling Tip:** เสื้อยืดขาวและยีนส์เป็น classic combo ที่ไม่มีวันเอ้าท์ ใส่ได้ทุกที่ แมตช์ง่ายกับทุกอย่างในตู้เสื้อผ้าค่ะ

---

อยากดูตัวเลือกอื่นในงบนี้อีกมั้ยคะ? 😊"""
                )
            ],

            "style_refinement_flow": [
                (
                    "ชอบลุคที่แนะนำค่ะ แต่อยากเปลี่ยนสีหน่อย",
                    """ได้เลยค่ะ! อยากเปลี่ยนเป็นสีอะไรคะ? หรือมีโทนสีที่ชอบเป็นพิเศษมั้ย? บอกมาเลยจะหาตัวเลือกที่ใกล้เคียงให้นะคะ 😊"""
                ),
                (
                    "อยากได้โทนสีเขียวมิ้นท์หรือฟ้าพาสเทลค่ะ",
                    """โอเคค่ะ! โทนพาสเทลสดใสน่ารักมากเลย ขอปรับลุคให้ใหม่นะคะ

**ลุค Updated: Pastel Dream**
ลุคโทนพาสเทลตามที่ต้องการค่ะ

🛍️ **แนะนำสินค้า:**
- **เดรส:** [A-Line Midi Dress สีฟ้าพาสเทล - MANGO](https://www.central.co.th/mango-pastel-dress) - ฿2,990
- **รองเท้า:** [Block Heel Sandals สีขาว - CHARLES & KEITH](https://www.central.co.th/charles-keith-white-heel) - ฿2,490
- **กระเป๋า:** [Mini Bag สีมิ้นท์ - ZARA](https://www.central.co.th/zara-mint-bag) - ฿1,590

💡 **Styling Tip:** สีพาสเทลเข้ากันหมด mix สีฟ้า-มิ้นท์ได้สวยมาก เพิ่มต่างหูมุกจะดูหวานและคลาสสิคค่ะ

ชอบแบบนี้มั้ยคะ? หรืออยากปรับอะไรเพิ่มอีก? 😊"""
                )
            ],

            "special_requirements": [
                (
                    "แพ้ผ้าบางชนิดค่ะ ต้องใส่ผ้าฝ้าย 100%",
                    """เข้าใจค่ะ! สำคัญมากเลยที่ต้องเลือกผ้าที่ไม่ทำให้แพ้ งั้นเราจะเน้นแนะนำเฉพาะผ้าฝ้าย 100% หรือผ้าธรรมชาติที่ไม่ระคายเคืองผิวนะคะ มีโอกาสอะไรที่อยากหาชุดคะ?"""
                ),
                (
                    "ท้องมีลูกแล้วค่ะ หาชุดที่พรางท้องหน่อย",
                    """ยินดีด้วยนะคะคุณแม่! 🤱 ช่วงนี้ต้องเน้นชุดที่ใส่สบายและยังดูดีด้วยใช่มั้ยคะ จะแนะนำชุดที่ทั้งใส่สบายและช่วยพรางหน้าท้องให้ดูสมส่วนนะคะ อายุครรภ์กี่เดือนแล้วคะ?"""
                ),
                (
                    "ใส่ฮิญาบค่ะ หาชุดที่เหมาะสม",
                    """เข้าใจค่ะ! จะแนะนำชุดที่สวยและเหมาะสมกับการใส่ฮิญาบนะคะ เน้นชุดที่ปิดมิดชิด แขนยาว กระโปรงยาว และดีไซน์ที่ modest แต่ยังคงความสวยงามค่ะ มีโอกาสพิเศษหรือใส่ประจำวันคะ?"""
                )
            ],

            "error_handling": [
                (
                    "ไม่ชอบเลย หาใหม่ให้หน่อย",
                    """ไม่เป็นไรเลยค่ะ! 😊 ขอโทษที่ลุคที่แนะนำไม่ถูกใจนะคะ ช่วยบอกหน่อยว่าไม่ชอบตรงไหน หรืออยากได้แนวไหนมากกว่านี้คะ? จะได้แนะนำใหม่ให้ตรงใจเลย"""
                ),
                (
                    "แพงไป",
                    """เข้าใจค่ะ! งั้นขอทราบงบประมาณที่สะดวกหน่อยนะคะ จะได้หาตัวเลือกที่อยู่ในงบพอดีเลย หรือจะให้แนะนำเป็นชิ้นๆ ที่ซื้อทีละชิ้นก็ได้ค่ะ"""
                ),
                (
                    "ลิงก์ไม่ work",
                    """ขออภัยค่ะ! ลิงก์อาจจะมีปัญหา ลองค้นหาชื่อสินค้านี้ในเว็บ Central Online โดยตรงนะคะ หรือจะให้แนะนำสินค้าทางเลือกอื่นดีคะ?"""
                )
            ]
        }

    def get_test_scenario(self, scenario_name: str) -> TestScenario:
        """Get specific test scenario by name"""
        for scenario in self.test_scenarios:
            if scenario.scenario_name == scenario_name:
                return scenario
        return None

    def get_scenarios_by_tag(self, tag: str) -> List[TestScenario]:
        """Get all scenarios with specific tag"""
        return [s for s in self.test_scenarios if tag in s.tags]

    def get_example_conversation(self, flow_type: str) -> List[Tuple[str, str]]:
        """Get example conversation by type"""
        return self.example_conversations.get(flow_type, [])

    def run_scenario_test(self, scenario_name: str) -> Dict[str, any]:
        """Run a specific test scenario and return results"""
        scenario = self.get_test_scenario(scenario_name)
        if not scenario:
            return {"error": "Scenario not found"}

        # This would integrate with actual chatbot to test
        # For now, return scenario structure
        return {
            "scenario": scenario.scenario_name,
            "description": scenario.description,
            "test_inputs": scenario.user_inputs,
            "expected_behaviors": scenario.expected_behaviors,
            "status": "ready_to_test"
        }

    def generate_test_report(self) -> str:
        """Generate comprehensive test report"""
        report = []
        report.append("# OOTDay Assistant Test Report\n")
        report.append(f"Total Scenarios: {len(self.test_scenarios)}\n")

        # Group by tags
        tag_groups = {}
        for scenario in self.test_scenarios:
            for tag in scenario.tags:
                if tag not in tag_groups:
                    tag_groups[tag] = []
                tag_groups[tag].append(scenario.scenario_name)

        report.append("\n## Scenarios by Category:\n")
        for tag, scenarios in tag_groups.items():
            report.append(f"- **{tag}**: {len(scenarios)} scenarios")

        report.append("\n## Detailed Scenarios:\n")
        for scenario in self.test_scenarios:
            report.append(f"\n### {scenario.scenario_name}")
            report.append(f"- Description: {scenario.description}")
            report.append(f"- Tags: {', '.join(scenario.tags)}")
            report.append(f"- User inputs: {len(scenario.user_inputs)}")

        return "\n".join(report)


class ConversationValidator:
    """Validate conversations meet OOTDay requirements"""

    @staticmethod
    def validate_response(response: str) -> Dict[str, bool]:
        """Validate if response meets OOTDay standards"""
        validations = {
            "has_product_links": "https://www.central.co.th" in response,
            "has_price": "฿" in response,
            "has_emoji": any(ord(c) > 127 for c in response),
            "has_styling_tip": "Styling Tip" in response or "💡" in response,
            "is_thai_language": any(ord(c) >= 0x0E00 and ord(c) <= 0x0E7F for c in response),
            "has_greeting": "ฮายย" in response or "คะ" in response or "ค่ะ" in response
        }
        return validations

    @staticmethod
    def validate_product_format(product_text: str) -> bool:
        """Validate if product is formatted correctly"""
        required_elements = [
            "[",  # Link start
            "](",  # Link middle
            ")",  # Link end
            "฿",  # Price symbol
            " - "  # Separator
        ]
        return all(elem in product_text for elem in required_elements)

    @staticmethod
    def validate_outfit_structure(response: str) -> Dict[str, bool]:
        """Validate outfit recommendation structure"""
        validations = {
            "has_look_name": "**ลุค" in response,
            "has_product_section": "🛍️ **แนะนำสินค้า:**" in response,
            "has_styling_tip": "💡 **Styling Tip:**" in response,
            "has_follow_up": "อยากดู" in response or "มั้ยคะ" in response,
            "has_separator": "---" in response
        }
        return validations


# Example usage and testing
if __name__ == "__main__":
    # Initialize test suite
    test_suite = OOTDayTestSuite()

    # Get wedding scenario
    wedding_scenario = test_suite.get_test_scenario("Wedding Guest - Complete Flow")
    print(f"Testing: {wedding_scenario.scenario_name}")
    print(f"Description: {wedding_scenario.description}")
    print(f"User inputs: {wedding_scenario.user_inputs}")
    print()

    # Get example conversation
    wedding_flow = test_suite.get_example_conversation("wedding_guest_flow")
    print("Example Wedding Guest Conversation:")
    for user_msg, bot_response in wedding_flow:
        print(f"\nUser: {user_msg}")
        print(f"OOTDay: {bot_response[:200]}...")  # Show first 200 chars
    print()

    # Test response validation
    validator = ConversationValidator()
    sample_response = wedding_flow[1][1] if wedding_flow else ""
    validations = validator.validate_response(sample_response)
    print("\nResponse Validation:")
    for check, result in validations.items():
        print(f"- {check}: {'✓' if result else '✗'}")

    # Generate test report
    report = test_suite.generate_test_report()
    print("\n" + report)