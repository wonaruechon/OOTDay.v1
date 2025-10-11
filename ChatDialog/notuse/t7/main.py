"""
OOTDay Fashion Assistant - Main Integration
Complete chatbot system integrating all components
"""

import json
from typing import Dict, List, Optional, Any
from dataclasses import dataclass
import logging

# Import all modules
from ootday_assistant import OOTDayAssistant
from conversation_manager import ConversationFlowManager, ResponseTemplateManager
from occasion_expertise import OccasionExpertise, OccasionType, StyleCalculator
from product_recommendation import ProductDatabase, RecommendationEngine, ProductFormatter
from special_scenarios import SpecialScenarioHandler, CustomerProfileAnalyzer, CustomerType
from test_scenarios import OOTDayTestSuite, ConversationValidator

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)


@dataclass
class ChatSession:
    """Represents a chat session with a customer"""
    session_id: str
    customer_id: Optional[str] = None
    conversation_history: List[Dict] = None
    current_context: Dict = None
    customer_profile: Dict = None
    recommendations_made: List[Any] = None

    def __post_init__(self):
        if self.conversation_history is None:
            self.conversation_history = []
        if self.current_context is None:
            self.current_context = {}
        if self.customer_profile is None:
            self.customer_profile = {}
        if self.recommendations_made is None:
            self.recommendations_made = []


class OOTDayBot:
    """Main OOTDay Fashion Assistant Bot"""

    def __init__(self):
        # Initialize all components
        self.assistant = OOTDayAssistant()
        self.flow_manager = ConversationFlowManager()
        self.template_manager = ResponseTemplateManager()
        self.occasion_expertise = OccasionExpertise()
        self.product_db = ProductDatabase()
        self.recommendation_engine = RecommendationEngine(self.product_db)
        self.product_formatter = ProductFormatter()
        self.scenario_handler = SpecialScenarioHandler()
        self.profile_analyzer = CustomerProfileAnalyzer()
        self.validator = ConversationValidator()

        # Session management
        self.sessions: Dict[str, ChatSession] = {}

        logger.info("OOTDay Bot initialized successfully")

    def start_session(self, session_id: str) -> str:
        """Start a new chat session"""
        self.sessions[session_id] = ChatSession(session_id=session_id)
        self.flow_manager.reset_conversation()

        welcome_message = self.assistant.get_welcome_message()
        self._log_interaction(session_id, "bot", welcome_message)

        return welcome_message

    def process_message(self, session_id: str, message: str) -> str:
        """Process customer message and generate response"""
        # Get or create session
        if session_id not in self.sessions:
            self.sessions[session_id] = ChatSession(session_id=session_id)

        session = self.sessions[session_id]

        # Log user message
        self._log_interaction(session_id, "user", message)

        # Detect special scenario
        special_scenario = self.scenario_handler.detect_scenario(message, session.current_context)
        if special_scenario:
            logger.info(f"Detected special scenario: {special_scenario.value}")

        # Process through conversation flow manager
        flow_response = self.flow_manager.process_turn(message)

        # Generate appropriate response based on state
        if flow_response["needs_more_info"]:
            response = self._handle_information_gathering(flow_response, session)
        elif flow_response["can_recommend"]:
            response = self._generate_recommendations(flow_response["context"], session, special_scenario)
        else:
            response = self._handle_general_conversation(message, session)

        # Apply special scenario adjustments if needed
        if special_scenario:
            response = self.scenario_handler.adjust_response(response, special_scenario, session.current_context)

        # Update customer profile
        session.conversation_history.append({"role": "user", "message": message})
        session.conversation_history.append({"role": "bot", "message": response})
        session.customer_profile = self.profile_analyzer.analyze_profile(
            [msg["message"] for msg in session.conversation_history if msg["role"] == "user"]
        )

        # Log bot response
        self._log_interaction(session_id, "bot", response)

        # Validate response format
        self._validate_response(response)

        return response

    def _handle_information_gathering(self, flow_response: Dict, session: ChatSession) -> str:
        """Handle information gathering phase"""
        response_parts = []

        # Add acknowledgment
        response_parts.append(self.template_manager.get_template("acknowledgment", {"context": ""}))

        # Add clarifying questions
        for question in flow_response.get("clarifying_questions", []):
            if question:
                response_parts.append(question)

        return " ".join(response_parts)

    def _generate_recommendations(self,
                                 context: Dict,
                                 session: ChatSession,
                                 special_scenario: Optional[CustomerType] = None) -> str:
        """Generate outfit recommendations"""
        # Extract key information
        occasion_str = context.get("occasion", "chill")
        budget = context.get("budget")
        style_prefs = context.get("styles", [])

        # Map occasion string to enum
        occasion_type = self._map_occasion(occasion_str)

        # Get occasion expertise
        occasion_guide = self.occasion_expertise.get_occasion_guide(occasion_type)

        # Generate outfits
        outfit1 = self.recommendation_engine.generate_outfit(
            occasion=occasion_str,
            gender="female",  # Default, should be detected from context
            budget=budget[1] if budget else None,
            style_preferences=style_prefs
        )

        outfit2 = self.recommendation_engine.generate_outfit(
            occasion=occasion_str,
            gender="female",
            budget=budget[1] if budget else None,
            style_preferences=style_prefs
        )

        # Build response
        response_parts = []

        # Opening
        opening = self.template_manager.get_template("recommendation_intro", {"occasion": occasion_guide.thai_name})
        response_parts.append(opening)
        response_parts.append("")

        # Format outfits
        response_parts.append(self.product_formatter.format_outfit(outfit1))
        response_parts.append("\n---\n")
        response_parts.append(self.product_formatter.format_outfit(outfit2))

        # Follow-up
        response_parts.append("\n---\n")
        response_parts.append(self.template_manager.get_template("follow_up"))

        # Store recommendations
        session.recommendations_made.extend([outfit1, outfit2])

        return "\n".join(response_parts)

    def _handle_general_conversation(self, message: str, session: ChatSession) -> str:
        """Handle general conversation"""
        # Use the basic assistant for general responses
        return self.assistant.process_message(message)

    def _map_occasion(self, occasion_str: str) -> OccasionType:
        """Map occasion string to OccasionType enum"""
        mapping = {
            "wedding": OccasionType.WEDDING,
            "work": OccasionType.WORK,
            "chill": OccasionType.CHILL_DAY,
            "sport": OccasionType.SPORT,
            "travel": OccasionType.TRAVEL,
            "date": OccasionType.DATE,
            "dinner": OccasionType.DINNER,
            "cafe": OccasionType.CAFE,
            "party": OccasionType.PARTY
        }
        return mapping.get(occasion_str, OccasionType.CHILL_DAY)

    def _log_interaction(self, session_id: str, role: str, message: str):
        """Log interaction for analytics"""
        logger.info(f"[{session_id}] {role}: {message[:100]}...")  # Log first 100 chars

    def _validate_response(self, response: str) -> bool:
        """Validate response meets standards"""
        validations = self.validator.validate_response(response)

        missing = [check for check, result in validations.items() if not result and check in ["has_product_links", "has_price"]]
        if missing:
            logger.warning(f"Response validation warnings: {missing}")

        return all(validations.values())

    def get_session_summary(self, session_id: str) -> Dict:
        """Get summary of a chat session"""
        if session_id not in self.sessions:
            return {"error": "Session not found"}

        session = self.sessions[session_id]
        return {
            "session_id": session_id,
            "messages_count": len(session.conversation_history),
            "customer_profile": session.customer_profile,
            "recommendations_made": len(session.recommendations_made),
            "context": session.current_context
        }

    def export_conversation(self, session_id: str) -> str:
        """Export conversation as formatted text"""
        if session_id not in self.sessions:
            return "Session not found"

        session = self.sessions[session_id]
        lines = ["# OOTDay Chat Session", f"Session ID: {session_id}", ""]

        for entry in session.conversation_history:
            role = "Customer" if entry["role"] == "user" else "OOTDay"
            lines.append(f"**{role}:** {entry['message']}")
            lines.append("")

        return "\n".join(lines)


class OOTDayAPI:
    """API wrapper for OOTDay Bot"""

    def __init__(self):
        self.bot = OOTDayBot()

    def chat(self, session_id: str, message: str = None) -> Dict[str, Any]:
        """Main chat endpoint"""
        try:
            if message is None:
                # New session
                response = self.bot.start_session(session_id)
                return {
                    "status": "success",
                    "session_id": session_id,
                    "response": response,
                    "type": "greeting"
                }
            else:
                # Process message
                response = self.bot.process_message(session_id, message)
                return {
                    "status": "success",
                    "session_id": session_id,
                    "response": response,
                    "type": "message"
                }
        except Exception as e:
            logger.error(f"Error processing chat: {str(e)}")
            return {
                "status": "error",
                "error": str(e)
            }

    def get_session_info(self, session_id: str) -> Dict[str, Any]:
        """Get session information"""
        return self.bot.get_session_summary(session_id)

    def export_chat(self, session_id: str) -> str:
        """Export chat conversation"""
        return self.bot.export_conversation(session_id)


def demo_conversation():
    """Run a demo conversation"""
    print("="*50)
    print("OOTDay Fashion Assistant Demo")
    print("="*50 + "\n")

    # Initialize API
    api = OOTDayAPI()

    # Start session
    session_id = "demo_001"
    response = api.chat(session_id)
    print(f"OOTDay: {response['response']}\n")

    # Simulate conversation
    test_messages = [
        "หาชุดไปงานแต่งเพื่อนค่ะ ช่วยแนะนำหน่อย",
        "งานในโรงแรมค่ะ อยากดูดีแต่ไม่เกินไป แนวเรียบหรูคลาสสิก",
        "งบประมาณ 5000-8000 บาทค่ะ"
    ]

    for msg in test_messages:
        print(f"Customer: {msg}")
        response = api.chat(session_id, msg)
        print(f"OOTDay: {response['response'][:500]}...")  # Show first 500 chars
        print("\n" + "-"*30 + "\n")

    # Get session summary
    summary = api.get_session_info(session_id)
    print("Session Summary:")
    print(json.dumps(summary, indent=2, ensure_ascii=False))

    # Export conversation
    export = api.export_chat(session_id)
    print("\nExported Conversation Preview:")
    print(export[:500] + "...")


def run_tests():
    """Run test suite"""
    print("Running OOTDay Test Suite...")

    # Initialize test suite
    test_suite = OOTDayTestSuite()

    # Run specific scenario test
    test_result = test_suite.run_scenario_test("Wedding Guest - Complete Flow")
    print(f"Test Result: {json.dumps(test_result, indent=2)}")

    # Generate test report
    report = test_suite.generate_test_report()
    print(report)


if __name__ == "__main__":
    import sys

    if len(sys.argv) > 1 and sys.argv[1] == "test":
        # Run tests
        run_tests()
    else:
        # Run demo
        demo_conversation()