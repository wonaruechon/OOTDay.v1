"""
Example Usage - Thai Central Fashion Chatbot
Demonstrates various ways to use the chatbot
"""

from thai_fashion_chatbot import ChatInterface, ThaiCentralFashionChatbot
from product_database import (
    initialize_product_database,
    get_outfit_combinations,
    search_products_by_occasion,
    get_seasonal_recommendations,
    get_budget_recommendations,
    get_product_by_id
)


def example_1_basic_conversation():
    """Example 1: Basic conversation flow"""
    print("\n" + "="*60)
    print("EXAMPLE 1: Basic Conversation")
    print("="*60 + "\n")

    # Create chatbot instance
    chat = ChatInterface()

    # Start conversation
    greeting = chat.start_conversation()
    print(f"🤖 P'Fashion: {greeting}\n")

    # Customer wants work outfit
    msg1 = "มีประชุมสำคัญพรุ่งนี้ค่ะ อยากดูดีแต่ไม่เกินไป"
    print(f"👤 Customer: {msg1}")
    response1 = chat.send_message(msg1)
    print(f"🤖 P'Fashion: {response1}\n")

    # Specify budget
    msg2 = "งบประมาณประมาณ 10,000 บาทค่ะ"
    print(f"👤 Customer: {msg2}")
    response2 = chat.send_message(msg2)
    print(f"🤖 P'Fashion: {response2}\n")


def example_2_product_search():
    """Example 2: Searching products"""
    print("\n" + "="*60)
    print("EXAMPLE 2: Product Search")
    print("="*60 + "\n")

    # Initialize database
    db = initialize_product_database()

    # Count products
    total = sum(len(category) for category in db.values())
    print(f"📦 Total products in database: {total}\n")

    # Search by occasion
    print("🔍 Searching for work-appropriate women's clothing:")
    work_products = search_products_by_occasion("work", gender="women")

    for i, product in enumerate(work_products[:5], 1):
        print(f"\n{i}. {product['name']}")
        print(f"   Brand: {product['brand']}")
        print(f"   Price: {product['price']:,} บาท")
        print(f"   Type: {product['type']}")

    # Search for wedding outfits
    print("\n" + "-"*60)
    print("🔍 Searching for wedding-appropriate items:")
    wedding_products = search_products_by_occasion("wedding")

    for i, product in enumerate(wedding_products[:3], 1):
        print(f"\n{i}. {product['name']} - {product['brand']}")
        print(f"   Price: {product['price']:,} บาท")


def example_3_outfit_combinations():
    """Example 3: Pre-defined outfit combinations"""
    print("\n" + "="*60)
    print("EXAMPLE 3: Outfit Combinations")
    print("="*60 + "\n")

    outfits = get_outfit_combinations()

    print(f"📋 Available outfit combinations: {len(outfits)}\n")

    # Show work formal outfit
    work_outfit = outfits["work_formal_women"]
    print("👔 " + work_outfit["name"])
    print(f"   Items: {len(work_outfit['items'])} pieces")
    print(f"   Estimated cost: {work_outfit['total_estimate']:,} บาท")
    print(f"\n   Styling Tips:")
    for tip in work_outfit["styling_tips"][:3]:
        print(f"   • {tip}")

    print("\n" + "-"*60)

    # Show date outfit
    date_outfit = outfits["first_date_women"]
    print("\n💕 " + date_outfit["name"])
    print(f"   Items: {len(date_outfit['items'])} pieces")
    print(f"   Estimated cost: {date_outfit['total_estimate']:,} បាท")
    print(f"\n   Styling Tips:")
    for tip in date_outfit["styling_tips"][:3]:
        print(f"   • {tip}")


def example_4_seasonal_recommendations():
    """Example 4: Seasonal recommendations"""
    print("\n" + "="*60)
    print("EXAMPLE 4: Seasonal Recommendations")
    print("="*60 + "\n")

    seasons = ["hot", "rainy", "cool"]

    for season in seasons:
        recommendations = get_seasonal_recommendations(season)
        print(f"\n🌡️  {season.upper()} SEASON")
        print(f"   Recommended Fabrics: {', '.join(recommendations['recommended_fabrics'])}")
        print(f"   Recommended Colors: {', '.join(recommendations['recommended_colors'])}")
        print(f"\n   Tips:")
        for tip in recommendations['tips'][:3]:
            print(f"   • {tip}")
        print()


def example_5_budget_tiers():
    """Example 5: Budget-based recommendations"""
    print("\n" + "="*60)
    print("EXAMPLE 5: Budget Tiers")
    print("="*60 + "\n")

    tiers = ["entry", "mid", "premium", "luxury"]

    for tier in tiers:
        budget_info = get_budget_recommendations(tier)
        print(f"\n💰 {tier.upper()} TIER")
        print(f"   Price Range: {budget_info['price_range']}")
        print(f"   Brands: {', '.join(budget_info['brands'][:3])}")
        print(f"\n   Shopping Tips:")
        for tip in budget_info['tips'][:2]:
            print(f"   • {tip}")


def example_6_get_specific_product():
    """Example 6: Get specific product by ID"""
    print("\n" + "="*60)
    print("EXAMPLE 6: Get Specific Product")
    print("="*60 + "\n")

    # Get a specific product
    product = get_product_by_id("WF001")

    if product:
        print(f"📦 Product Details:")
        print(f"   ID: {product['id']}")
        print(f"   Name: {product['name']}")
        print(f"   Brand: {product['brand']}")
        print(f"   Type: {product['type']}")
        print(f"   Price: {product['price']:,} บาท")
        print(f"   Occasions: {', '.join(product['occasion'])}")
        print(f"   Reason: {product['reason']}")
        if product.get('url'):
            print(f"   URL: {product['url']}")


def example_7_multiple_conversations():
    """Example 7: Multiple conversation scenarios"""
    print("\n" + "="*60)
    print("EXAMPLE 7: Multiple Conversation Scenarios")
    print("="*60 + "\n")

    scenarios = [
        ("Weekend Cafe", "วันหยุดจะไปนั่งคาเฟ่ค่ะ อยากแต่งชิลล์ๆ"),
        ("Gym Workout", "เพิ่งเริ่มไปยิมค่ะ อยากได้ชุดสบายๆ"),
        ("Beach Vacation", "จะไปเที่ยวทะเลครับ 3 วัน")
    ]

    for scenario_name, message in scenarios:
        print(f"\n📝 Scenario: {scenario_name}")
        print(f"   Message: \"{message}\"")

        chat = ChatInterface()
        chat.start_conversation()
        response = chat.send_message(message)

        # Show first 150 characters of response
        preview = response[:150] + "..." if len(response) > 150 else response
        print(f"   Response: {preview}\n")


def example_8_seasonal_advice():
    """Example 8: Get seasonal advice from chatbot"""
    print("\n" + "="*60)
    print("EXAMPLE 8: Seasonal Fashion Advice")
    print("="*60 + "\n")

    chatbot = ThaiCentralFashionChatbot()
    advice = chatbot.get_seasonal_advice()

    print("🌤️  Current Seasonal Advice:")
    print(advice)


def example_9_conversation_history():
    """Example 9: Managing conversation history"""
    print("\n" + "="*60)
    print("EXAMPLE 9: Conversation History")
    print("="*60 + "\n")

    chat = ChatInterface()

    # Start conversation
    chat.start_conversation()
    chat.send_message("หาชุดไปทำงาน")
    chat.send_message("งบ 5000 บาท")
    chat.send_message("ขอบคุณค่ะ")

    # Get history
    history = chat.get_conversation_history()

    print(f"📜 Total messages in conversation: {len(history)}\n")

    for i, entry in enumerate(history, 1):
        role = "🤖 P'Fashion" if entry["role"] == "assistant" else "👤 Customer"
        message = entry["message"][:80] + "..." if len(entry["message"]) > 80 else entry["message"]
        print(f"{i}. {role}: {message}\n")


def example_10_custom_outfit():
    """Example 10: Create custom outfit from product IDs"""
    print("\n" + "="*60)
    print("EXAMPLE 10: Custom Outfit Creation")
    print("="*60 + "\n")

    from product_database import create_custom_outfit

    # Create outfit from specific product IDs
    product_ids = ["WF001", "WF002", "SH001", "BG001"]
    outfit = create_custom_outfit(product_ids)

    print("👗 Custom Outfit Created:")
    print(f"   Total Items: {len(outfit['products'])}")
    print(f"   Clothing Items: {len(outfit['clothing_items'])}")
    print(f"   Accessories: {len(outfit['accessories'])}")
    print(f"   Total Price: {outfit['total_price']:,} บาท\n")

    print("   Products:")
    for product in outfit['products']:
        print(f"   • {product['name']} - {product['price']:,} บาท")


# ============================================
# MAIN MENU
# ============================================

def show_menu():
    """Show interactive menu"""
    print("\n" + "="*60)
    print("Thai Central Fashion Chatbot - Example Usage")
    print("="*60)
    print("\nChoose an example to run:")
    print("\n1.  Basic Conversation")
    print("2.  Product Search")
    print("3.  Outfit Combinations")
    print("4.  Seasonal Recommendations")
    print("5.  Budget Tiers")
    print("6.  Get Specific Product")
    print("7.  Multiple Conversations")
    print("8.  Seasonal Advice")
    print("9.  Conversation History")
    print("10. Custom Outfit Creation")
    print("\n0.  Run ALL Examples")
    print("q.  Quit")


def run_all_examples():
    """Run all examples"""
    examples = [
        example_1_basic_conversation,
        example_2_product_search,
        example_3_outfit_combinations,
        example_4_seasonal_recommendations,
        example_5_budget_tiers,
        example_6_get_specific_product,
        example_7_multiple_conversations,
        example_8_seasonal_advice,
        example_9_conversation_history,
        example_10_custom_outfit
    ]

    for example_func in examples:
        example_func()
        input("\nPress Enter to continue...")


def main():
    """Main function"""
    examples = {
        "1": example_1_basic_conversation,
        "2": example_2_product_search,
        "3": example_3_outfit_combinations,
        "4": example_4_seasonal_recommendations,
        "5": example_5_budget_tiers,
        "6": example_6_get_specific_product,
        "7": example_7_multiple_conversations,
        "8": example_8_seasonal_advice,
        "9": example_9_conversation_history,
        "10": example_10_custom_outfit,
        "0": run_all_examples
    }

    while True:
        show_menu()
        choice = input("\nEnter choice: ").strip()

        if choice == "q":
            print("\n👋 ลาก่อนค่ะ! Goodbye!\n")
            break

        example_func = examples.get(choice)
        if example_func:
            example_func()
            input("\n✅ Example completed. Press Enter to continue...")
        else:
            print("\n❌ Invalid choice! Please try again.")


if __name__ == "__main__":
    main()
