"""
Test Dialogues for Thai Central Fashion Chatbot
Contains test cases and example conversations
"""

import sys
from thai_fashion_chatbot import ChatInterface


class DialogueTester:
    """Test various conversation scenarios"""

    def __init__(self):
        self.test_results = []

    def run_test_scenario(self, scenario_name: str, messages: list):
        """Run a test scenario with multiple messages"""
        print(f"\n{'='*60}")
        print(f"TEST SCENARIO: {scenario_name}")
        print(f"{'='*60}\n")

        chat = ChatInterface()

        # Start conversation
        greeting = chat.start_conversation()
        print(f"🤖 P'Fashion: {greeting}\n")

        # Process each message
        for i, msg in enumerate(messages, 1):
            print(f"[Message {i}]")
            print(f"👤 Customer: {msg}")
            response = chat.send_message(msg)
            print(f"🤖 P'Fashion: {response}\n")

        print(f"{'='*60}\n")

        return chat.get_conversation_history()


def test_work_formal_scenario():
    """Test: Office Meeting - Women Formal"""
    tester = DialogueTester()

    messages = [
        "มีประชุมสำคัญพรุ่งนี้ค่ะ อยากดูดีแต่ไม่เกินไป",
        "เป็นประชุมแบบ formal พอสมควรค่ะ ชอบใส่กระโปรงมากกว่า",
        "งบประมาณประมาณ 10,000 บาทค่ะ"
    ]

    history = tester.run_test_scenario("Work Formal - Women", messages)
    return history


def test_startup_casual_scenario():
    """Test: Creative Office - Men Smart Casual"""
    tester = DialogueTester()

    messages = [
        "ทำงานบริษัท startup ครับ dress code ไม่เข้มงวดแต่ก็อยากดูดี",
        "งบไม่เกิน 5,000 บาทครับ"
    ]

    history = tester.run_test_scenario("Startup Smart Casual - Men", messages)
    return history


def test_weekend_cafe_scenario():
    """Test: Weekend Cafe - Women Comfy Chic"""
    tester = DialogueTester()

    messages = [
        "วันหยุดจะไปนั่งคาเฟ่ทำงานค่ะ อยากแต่งชิลล์ๆ แต่ถ่ายรูปสวย",
        "ชอบสไตล์มินิมอลค่ะ สีพาสเทล"
    ]

    history = tester.run_test_scenario("Weekend Cafe - Women", messages)
    return history


def test_wedding_guest_scenario():
    """Test: Evening Wedding Guest - Women"""
    tester = DialogueTester()

    messages = [
        "ไปงานแต่งเพื่อนค่ะ งานเย็นที่โรงแรม ไม่อยากชนชุดเจ้าสาว",
        "งบประมาณ 15,000 บาทค่ะ"
    ]

    history = tester.run_test_scenario("Wedding Guest - Women", messages)
    return history


def test_gym_workout_scenario():
    """Test: Gym/Yoga - Women Athleisure"""
    tester = DialogueTester()

    messages = [
        "เพิ่งจะเริ่มไปยิมค่ะ อยากได้ชุดที่ดูดีแล้วก็ใส่สบาย",
        "เล่น yoga กับ cardio ค่ะ"
    ]

    history = tester.run_test_scenario("Gym Workout - Women", messages)
    return history


def test_beach_vacation_scenario():
    """Test: Beach Vacation - Men"""
    tester = DialogueTester()

    messages = [
        "จะไปเที่ยวทะเล 3 วัน ครับ อยากได้ชุดที่ใส่ได้หลาย look",
        "จะไปภูเก็ตครับ งบประมาณ 10,000 บาท"
    ]

    history = tester.run_test_scenario("Beach Vacation - Men", messages)
    return history


def test_first_date_scenario():
    """Test: First Date Dinner - Women"""
    tester = DialogueTester()

    messages = [
        "มีเดทมื้อเย็นครั้งแรกค่ะ ร้านอาหารญี่ปุ่นหรู ตื่นเต้นมาก!",
        "อยากดู feminine แต่ไม่ overdressed ค่ะ",
        "งบ 20,000 บาทได้ค่ะ"
    ]

    history = tester.run_test_scenario("First Date - Women", messages)
    return history


def test_business_dinner_scenario():
    """Test: Business Dinner - Men"""
    tester = DialogueTester()

    messages = [
        "มีดินเนอร์กับ clients ที่โรงแรม 5 ดาวครับ",
        "งบไม่จำกัดครับ ต้องการดู impressive"
    ]

    history = tester.run_test_scenario("Business Dinner - Men", messages)
    return history


def test_budget_inquiry_scenario():
    """Test: Budget Inquiry"""
    tester = DialogueTester()

    messages = [
        "อยากรู้ว่าแบรนด์ที่ Central มีอะไรบ้าง",
        "งบประมาณต่างกันยังไงคะ"
    ]

    history = tester.run_test_scenario("Budget Inquiry", messages)
    return history


def test_style_advice_scenario():
    """Test: Style Advice Request"""
    tester = DialogueTester()

    messages = [
        "อยากรู้ tips การแต่งตัวสำหรับสาวออฟฟิศค่ะ",
        "มีคำแนะนำเรื่องสีที่เข้ากันไหมคะ"
    ]

    history = tester.run_test_scenario("Style Advice", messages)
    return history


def test_unclear_request_scenario():
    """Test: Unclear Request Handling"""
    tester = DialogueTester()

    messages = [
        "หาชุด",
        "สวยๆ",
        "ไปทำงานค่ะ เป็น formal office"
    ]

    history = tester.run_test_scenario("Unclear Request Handling", messages)
    return history


def test_seasonal_advice_scenario():
    """Test: Seasonal Fashion Advice"""
    tester = DialogueTester()

    messages = [
        "ช่วงหน้าร้อนควรแต่งตัวยังไงดีคะ",
        "ผ้าแบบไหนที่เหมาะกับอากาศไทย"
    ]

    history = tester.run_test_scenario("Seasonal Advice", messages)
    return history


def test_mix_match_scenario():
    """Test: Mix & Match Advice"""
    tester = DialogueTester()

    messages = [
        "มีเสื้อสีขาวกับกางเกงยีนส์ค่ะ จะ mix & match ยังไงให้ดูดี",
        "มี accessories อะไรแนะนำไหมคะ"
    ]

    history = tester.run_test_scenario("Mix & Match", messages)
    return history


def test_multiple_occasions_scenario():
    """Test: Multiple Occasions in One Chat"""
    tester = DialogueTester()

    messages = [
        "อยากได้ชุดไปทำงานค่ะ",
        "ได้แล้วค่ะ แล้วอยากได้ชุดไปเดทด้วย",
        "ขอบคุณค่ะ ช่วยแนะนำชุดไปงานแต่งด้วยได้ไหม"
    ]

    history = tester.run_test_scenario("Multiple Occasions", messages)
    return history


def test_color_coordination_scenario():
    """Test: Color Coordination Advice"""
    tester = DialogueTester()

    messages = [
        "ผิวคล้ำควรเลือกสีอะไรดีคะ",
        "สีฟ้ากับสีอะไรเข้ากันบ้างคะ"
    ]

    history = tester.run_test_scenario("Color Coordination", messages)
    return history


def test_body_type_scenario():
    """Test: Body Type Styling"""
    tester = DialogueTester()

    messages = [
        "ตัวเล็กแต่ขาสั้นค่ะ ควรใส่แบบไหนดี",
        "กางเกงขาสั้นเหมาะไหมคะ"
    ]

    history = tester.run_test_scenario("Body Type Styling", messages)
    return history


# ============================================
# COMPREHENSIVE TEST SUITE
# ============================================

def run_all_tests():
    """Run all test scenarios"""
    print("\n" + "="*80)
    print("THAI CENTRAL FASHION CHATBOT - COMPREHENSIVE TEST SUITE")
    print("="*80)

    test_scenarios = [
        ("Work Formal Scenario", test_work_formal_scenario),
        ("Startup Casual Scenario", test_startup_casual_scenario),
        ("Weekend Cafe Scenario", test_weekend_cafe_scenario),
        ("Wedding Guest Scenario", test_wedding_guest_scenario),
        ("Gym Workout Scenario", test_gym_workout_scenario),
        ("Beach Vacation Scenario", test_beach_vacation_scenario),
        ("First Date Scenario", test_first_date_scenario),
        ("Business Dinner Scenario", test_business_dinner_scenario),
        ("Budget Inquiry Scenario", test_budget_inquiry_scenario),
        ("Style Advice Scenario", test_style_advice_scenario),
        ("Unclear Request Scenario", test_unclear_request_scenario),
        ("Seasonal Advice Scenario", test_seasonal_advice_scenario),
        ("Mix & Match Scenario", test_mix_match_scenario),
        ("Multiple Occasions Scenario", test_multiple_occasions_scenario),
        ("Color Coordination Scenario", test_color_coordination_scenario),
        ("Body Type Scenario", test_body_type_scenario)
    ]

    results = []
    for scenario_name, test_func in test_scenarios:
        try:
            print(f"\n▶ Running: {scenario_name}")
            history = test_func()
            results.append({
                "scenario": scenario_name,
                "status": "PASSED",
                "messages": len(history)
            })
            print(f"✅ {scenario_name} - PASSED ({len(history)} messages)")
        except Exception as e:
            results.append({
                "scenario": scenario_name,
                "status": "FAILED",
                "error": str(e)
            })
            print(f"❌ {scenario_name} - FAILED: {e}")

    # Print summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)

    passed = sum(1 for r in results if r["status"] == "PASSED")
    failed = sum(1 for r in results if r["status"] == "FAILED")

    print(f"\nTotal Tests: {len(results)}")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"Success Rate: {(passed/len(results)*100):.1f}%\n")

    if failed > 0:
        print("\nFailed Tests:")
        for r in results:
            if r["status"] == "FAILED":
                print(f"  • {r['scenario']}: {r['error']}")

    print("\n" + "="*80 + "\n")

    return results


# ============================================
# INTERACTIVE TEST MODE
# ============================================

def interactive_test():
    """Interactive testing mode"""
    print("\n" + "="*80)
    print("INTERACTIVE TEST MODE")
    print("="*80)
    print("\nChoose a test scenario:")
    print("1. Work Formal (Women)")
    print("2. Startup Casual (Men)")
    print("3. Weekend Cafe (Women)")
    print("4. Wedding Guest (Women)")
    print("5. Gym Workout (Women)")
    print("6. Beach Vacation (Men)")
    print("7. First Date (Women)")
    print("8. Business Dinner (Men)")
    print("9. Budget Inquiry")
    print("10. Style Advice")
    print("0. Run All Tests")
    print("q. Quit")

    choice = input("\nEnter choice: ").strip()

    scenarios = {
        "1": test_work_formal_scenario,
        "2": test_startup_casual_scenario,
        "3": test_weekend_cafe_scenario,
        "4": test_wedding_guest_scenario,
        "5": test_gym_workout_scenario,
        "6": test_beach_vacation_scenario,
        "7": test_first_date_scenario,
        "8": test_business_dinner_scenario,
        "9": test_budget_inquiry_scenario,
        "10": test_style_advice_scenario,
        "0": run_all_tests
    }

    if choice == "q":
        print("Goodbye!")
        return

    test_func = scenarios.get(choice)
    if test_func:
        test_func()
    else:
        print("Invalid choice!")


# ============================================
# UNIT TESTS
# ============================================

def test_intent_detection():
    """Test intent detection accuracy"""
    from thai_fashion_chatbot import ThaiCentralFashionChatbot

    chatbot = ThaiCentralFashionChatbot()

    test_cases = [
        ("หาชุดไปทำงาน", "need_outfit"),
        ("ราคาเท่าไหร่", "budget_info"),
        ("สไตล์ไหนดี", "style_advice"),
        ("หา", "unclear"),
        ("แนะนำเสื้อผ้าหน่อย", "need_outfit"),
        ("งบ 5000 บาท", "budget_info"),
        ("มีเทรนด์อะไรบ้าง", "style_advice")
    ]

    print("\n" + "="*60)
    print("INTENT DETECTION TESTS")
    print("="*60 + "\n")

    correct = 0
    for message, expected_intent in test_cases:
        detected = chatbot._analyze_intent(message)
        status = "✅" if detected == expected_intent else "❌"
        print(f"{status} '{message}' → {detected} (expected: {expected_intent})")
        if detected == expected_intent:
            correct += 1

    accuracy = (correct / len(test_cases)) * 100
    print(f"\nAccuracy: {accuracy:.1f}% ({correct}/{len(test_cases)})")


def test_occasion_detection():
    """Test occasion detection from messages"""
    from thai_fashion_chatbot import ThaiCentralFashionChatbot

    chatbot = ThaiCentralFashionChatbot()

    test_cases = [
        ("ไปประชุม", "work_formal"),
        ("ทำงาน startup", "work_casual"),
        ("นั่งคาเฟ่", "casual_chill"),
        ("ไปงานแต่ง", "wedding"),
        ("ไปยิม", "sport"),
        ("เที่ยวทะเล", "travel"),
        ("มีเดท", "date")
    ]

    print("\n" + "="*60)
    print("OCCASION DETECTION TESTS")
    print("="*60 + "\n")

    for message, expected_occasion in test_cases:
        detected = chatbot._detect_occasion(message)
        print(f"'{message}' → {detected.value} (expected: {expected_occasion})")


# ============================================
# MAIN EXECUTION
# ============================================

def main():
    """Main test execution"""
    import sys

    if len(sys.argv) > 1:
        if sys.argv[1] == "--all":
            run_all_tests()
        elif sys.argv[1] == "--intent":
            test_intent_detection()
        elif sys.argv[1] == "--occasion":
            test_occasion_detection()
        elif sys.argv[1] == "--interactive":
            interactive_test()
        else:
            print("Usage:")
            print("  python test_dialogues.py --all         # Run all test scenarios")
            print("  python test_dialogues.py --intent      # Test intent detection")
            print("  python test_dialogues.py --occasion    # Test occasion detection")
            print("  python test_dialogues.py --interactive # Interactive test mode")
    else:
        # Default: interactive mode
        interactive_test()


if __name__ == "__main__":
    main()
