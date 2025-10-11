#!/usr/bin/env python3
"""
Interactive CLI for OOTDay Fashion Assistant
Run this to chat with the bot in your terminal
"""

import sys
import uuid
from main import OOTDayAPI


def print_separator():
    """Print a visual separator"""
    print("\n" + "─" * 60 + "\n")


def print_bot_response(response: str):
    """Print bot response with formatting"""
    print("🤖 OOTDay:")
    print(response)


def print_user_message(message: str):
    """Print user message with formatting"""
    print(f"\n👤 You: {message}")


def main():
    """Run interactive chat session"""
    print("=" * 60)
    print("  🛍️  OOTDay AI Fashion Assistant - Interactive Chat  🛍️")
    print("=" * 60)
    print("\nWelcome! I'm your personal Thai fashion specialist.")
    print("Type 'quit', 'exit', or 'bye' to end the conversation.")
    print("Type 'help' for usage tips.")
    print_separator()

    # Initialize API and start session
    api = OOTDayAPI()
    session_id = str(uuid.uuid4())

    # Get welcome message
    response = api.chat(session_id)
    print_bot_response(response['response'])

    # Main conversation loop
    while True:
        try:
            # Get user input
            user_input = input("\n💬 You: ").strip()

            # Check for exit commands
            if user_input.lower() in ['quit', 'exit', 'bye', 'q']:
                print("\n👋 ขอบคุณที่ใช้บริการ OOTDay นะคะ! แต่งตัวสวยๆ ทุกวันเลย! ✨\n")

                # Ask if user wants to export conversation
                export_choice = input("Would you like to export this conversation? (y/n): ").strip().lower()
                if export_choice == 'y':
                    export = api.export_chat(session_id)
                    filename = f"ootday_chat_{session_id[:8]}.md"
                    with open(filename, 'w', encoding='utf-8') as f:
                        f.write(export)
                    print(f"✅ Conversation exported to: {filename}")

                break

            # Handle help command
            if user_input.lower() == 'help':
                print("\n📖 Usage Tips:")
                print("  • Ask for outfit recommendations for any occasion")
                print("  • Examples:")
                print("    - 'หาชุดไปงานแต่ง'")
                print("    - 'ต้องการชุดทำงาน'")
                print("    - 'หาชุดไปเที่ยว'")
                print("  • You can specify your budget, style preferences, colors")
                print("  • Type 'info' to see session information")
                print("  • Type 'quit' to exit")
                continue

            # Handle info command
            if user_input.lower() == 'info':
                info = api.get_session_info(session_id)
                print("\n📊 Session Information:")
                print(f"  • Session ID: {info['session_id'][:16]}...")
                print(f"  • Messages: {info['messages_count']}")
                print(f"  • Recommendations made: {info['recommendations_made']}")
                print(f"  • Customer profile: {info['customer_profile']}")
                continue

            # Skip empty input
            if not user_input:
                continue

            # Process message
            print_user_message(user_input)
            response = api.chat(session_id, user_input)

            if response['status'] == 'success':
                print_separator()
                print_bot_response(response['response'])
            else:
                print(f"\n❌ Error: {response.get('error', 'Unknown error')}")

        except KeyboardInterrupt:
            print("\n\n👋 Interrupted. Goodbye!")
            break
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")
            print("Please try again or type 'quit' to exit.")


if __name__ == "__main__":
    try:
        main()
    except Exception as e:
        print(f"Fatal error: {str(e)}")
        sys.exit(1)