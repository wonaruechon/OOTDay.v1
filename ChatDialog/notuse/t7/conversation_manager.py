"""
Conversation Flow Manager for OOTDay Assistant
Handles multi-turn conversations, context tracking, and follow-up interactions
"""

from enum import Enum
from typing import Dict, List, Optional, Any
from dataclasses import dataclass, field
import json


class ConversationState(Enum):
    """Tracks the current state of the conversation"""
    GREETING = "greeting"
    GATHERING_INFO = "gathering_info"
    RECOMMENDATION = "recommendation"
    FOLLOW_UP = "follow_up"
    REFINEMENT = "refinement"


@dataclass
class ConversationContext:
    """Stores conversation context and user preferences"""
    state: ConversationState = ConversationState.GREETING
    occasion: Optional[str] = None
    gender: Optional[str] = None
    budget_range: Optional[tuple] = None
    style_preferences: List[str] = field(default_factory=list)
    color_preferences: List[str] = field(default_factory=list)
    size_info: Dict[str, str] = field(default_factory=dict)
    previous_recommendations: List[Any] = field(default_factory=list)
    conversation_history: List[Dict] = field(default_factory=list)
    special_requirements: List[str] = field(default_factory=list)


class ConversationFlowManager:
    """Manages the conversation flow and state transitions"""

    def __init__(self):
        self.context = ConversationContext()
        self.clarifying_questions = {
            "occasion": [
                "อยากทราบว่าจะใส่ไปงานอะไรคะ? 🤔",
                "จะไปไหนดีคะ? งานแต่ง ทำงาน หรือไปเที่ยวเล่น?",
                "โอเคชั่นอะไรเอ่ย? บอกหน่อยนะคะ"
            ],
            "budget": [
                "มีงบประมาณประมาณไหนคะ? จะได้แนะนำให้พอดี 💰",
                "อยากได้ในราคาประมาณเท่าไหร่คะ?",
                "งบเท่าไหร่ถึงจะโอเคคะ?"
            ],
            "style": [
                "ชอบสไตล์แบบไหนคะ? เรียบหรู แคชชวล หรือทันสมัย?",
                "อยากได้ลุคแบบไหน? สบายๆ หรือเป็นทางการหน่อย?",
                "มีสไตล์ที่ชอบเป็นพิเศษมั้ยคะ?"
            ],
            "color": [
                "มีสีที่ชอบหรือไม่ชอบมั้ยคะ?",
                "อยากได้โทนสีแบบไหนคะ? สว่างๆ เข้มๆ หรือพาสเทล?",
                "มีสีโปรดมั้ยคะ? หรือสีที่ไม่อยากใส่?"
            ],
            "special": [
                "มีข้อกำหนดพิเศษอะไรมั้ยคะ? เช่น แพ้ผ้า ไม่ใส่แขนกุด",
                "มีอะไรที่ต้องระวังเป็นพิเศษมั้ยคะ?",
                "มีความต้องการพิเศษอื่นๆ มั้ยคะ?"
            ]
        }

    def process_turn(self, user_message: str) -> Dict[str, Any]:
        """Process a conversation turn and return appropriate response data"""

        # Add to conversation history
        self.context.conversation_history.append({
            "role": "user",
            "message": user_message
        })

        # Determine intent and update context
        intent = self._analyze_intent(user_message)
        self._update_context(user_message, intent)

        # Generate response based on current state
        response_data = self._generate_response_data()

        # Update conversation state
        self._transition_state(intent)

        return response_data

    def _analyze_intent(self, message: str) -> str:
        """Analyze user intent from message"""
        message_lower = message.lower()

        # Intent patterns
        if any(word in message_lower for word in ["สวัสดี", "หวัดดี", "hello", "hi"]):
            return "greeting"
        elif any(word in message_lower for word in ["ไม่ชอบ", "เปลี่ยน", "อื่น", "ไม่เอา"]):
            return "dislike"
        elif any(word in message_lower for word in ["ชอบ", "เอา", "สนใจ", "ดี"]):
            return "like"
        elif any(word in message_lower for word in ["ขอบคุณ", "thanks", "เรียบร้อย", "พอ"]):
            return "complete"
        elif any(word in message_lower for word in ["ราคา", "งบ", "บาท", "พัน", "หมื่น"]):
            return "budget_info"
        elif any(word in message_lower for word in ["ช่วย", "แนะนำ", "หา", "อยาก"]):
            return "request_help"
        else:
            return "general_info"

    def _update_context(self, message: str, intent: str):
        """Update conversation context based on message and intent"""
        message_lower = message.lower()

        # Extract occasion
        if not self.context.occasion:
            occasions = {
                "wedding": ["งานแต่ง", "แต่งงาน", "wedding"],
                "work": ["ทำงาน", "ออฟฟิศ", "work", "office"],
                "chill": ["chill", "สบายๆ", "วันหยุด", "relax"],
                "sport": ["ออกกำลัง", "วิ่ง", "ฟิตเนส", "sport", "gym"],
                "travel": ["เที่ยว", "travel", "ทริป"],
                "date": ["เดท", "date", "นัด"],
                "dinner": ["ดินเนอร์", "dinner", "อาหารค่ำ"],
                "cafe": ["คาเฟ่", "cafe", "กาแฟ"],
                "party": ["ปาร์ตี้", "party", "เลี้ยง"]
            }

            for occasion, keywords in occasions.items():
                if any(keyword in message_lower for keyword in keywords):
                    self.context.occasion = occasion
                    break

        # Extract budget
        if "งบ" in message or "บาท" in message:
            # Simple budget extraction (could be enhanced)
            import re
            numbers = re.findall(r'\d+(?:,\d+)*', message)
            if numbers:
                budget_value = int(numbers[0].replace(',', ''))
                self.context.budget_range = (budget_value * 0.7, budget_value * 1.3)

        # Extract style preferences
        styles = {
            "classic": ["เรียบหรู", "คลาสสิก", "classic", "ดูดี"],
            "casual": ["สบาย", "แคชชวล", "casual", "ชิล"],
            "modern": ["ทันสมัย", "โมเดิร์น", "modern", "เก๋"],
            "cute": ["น่ารัก", "หวาน", "cute", "คิ้วท์"],
            "sexy": ["เซ็กซี่", "sexy", "ดูดี"],
            "minimal": ["มินิมอล", "เรียบ", "minimal", "simple"]
        }

        for style, keywords in styles.items():
            if any(keyword in message_lower for keyword in keywords):
                if style not in self.context.style_preferences:
                    self.context.style_preferences.append(style)

        # Extract color preferences
        colors = {
            "neutral": ["ขาว", "ดำ", "เทา", "น้ำตาล", "เบจ", "นู้ด"],
            "pastel": ["พาสเทล", "อ่อน", "หวาน"],
            "bright": ["สดใส", "สด", "จัด"],
            "dark": ["เข้ม", "ดำ", "กรม"],
            "specific": ["แดง", "น้ำเงิน", "เขียว", "ชมพู", "ม่วง", "เหลือง", "ส้ม"]
        }

        for color_type, keywords in colors.items():
            if any(keyword in message_lower for keyword in keywords):
                if color_type not in self.context.color_preferences:
                    self.context.color_preferences.append(color_type)

    def _generate_response_data(self) -> Dict[str, Any]:
        """Generate response data based on current context and state"""
        response_data = {
            "state": self.context.state,
            "needs_more_info": False,
            "missing_info": [],
            "clarifying_questions": [],
            "can_recommend": False
        }

        # Check what information is still needed
        if not self.context.occasion:
            response_data["needs_more_info"] = True
            response_data["missing_info"].append("occasion")
            response_data["clarifying_questions"].append(
                self._get_clarifying_question("occasion")
            )

        # Check if we have enough info to make recommendations
        if self.context.occasion:
            response_data["can_recommend"] = True

        # Add follow-up questions based on state
        if self.context.state == ConversationState.GATHERING_INFO:
            if not self.context.budget_range and len(self.context.conversation_history) > 2:
                response_data["clarifying_questions"].append(
                    self._get_clarifying_question("budget")
                )
            if not self.context.style_preferences:
                response_data["clarifying_questions"].append(
                    self._get_clarifying_question("style")
                )

        response_data["context"] = {
            "occasion": self.context.occasion,
            "budget": self.context.budget_range,
            "styles": self.context.style_preferences,
            "colors": self.context.color_preferences
        }

        return response_data

    def _get_clarifying_question(self, question_type: str) -> str:
        """Get a clarifying question for the given type"""
        import random
        questions = self.clarifying_questions.get(question_type, [])
        return random.choice(questions) if questions else ""

    def _transition_state(self, intent: str):
        """Transition conversation state based on intent"""
        if self.context.state == ConversationState.GREETING:
            if intent in ["request_help", "general_info"]:
                self.context.state = ConversationState.GATHERING_INFO

        elif self.context.state == ConversationState.GATHERING_INFO:
            if self.context.occasion:
                self.context.state = ConversationState.RECOMMENDATION

        elif self.context.state == ConversationState.RECOMMENDATION:
            if intent == "dislike":
                self.context.state = ConversationState.REFINEMENT
            elif intent == "like":
                self.context.state = ConversationState.FOLLOW_UP
            elif intent == "complete":
                self.context.state = ConversationState.GREETING

        elif self.context.state == ConversationState.REFINEMENT:
            self.context.state = ConversationState.RECOMMENDATION

        elif self.context.state == ConversationState.FOLLOW_UP:
            if intent == "complete":
                self.context.state = ConversationState.GREETING
            else:
                self.context.state = ConversationState.RECOMMENDATION

    def reset_conversation(self):
        """Reset conversation context for new session"""
        self.context = ConversationContext()

    def get_conversation_summary(self) -> Dict[str, Any]:
        """Get a summary of the current conversation"""
        return {
            "turns": len(self.context.conversation_history),
            "state": self.context.state.value,
            "preferences": {
                "occasion": self.context.occasion,
                "budget": self.context.budget_range,
                "styles": self.context.style_preferences,
                "colors": self.context.color_preferences
            },
            "recommendations_made": len(self.context.previous_recommendations)
        }


class ResponseTemplateManager:
    """Manages response templates for different scenarios"""

    def __init__(self):
        self.templates = {
            "greeting": [
                "ฮายย ✋🏻 กำลังหาอะไรอยู่",
                "สวัสดีค่า! วันนี้อยากได้ชุดแบบไหนคะ? 😊",
                "หวัดดี! มาช่วยเลือกชุดสวยๆ กันนะคะ ✨"
            ],
            "need_occasion": [
                "อยากได้ชุดไปไหนคะ? บอกหน่อยจะได้แนะนำให้เหมาะสม 😊",
                "จะใส่ไปโอเคชั่นไหนคะ? งานแต่ง ทำงาน หรือไปเที่ยว?",
                "ช่วยบอกหน่อยว่าจะใส่ไปไหน จะได้แนะนำให้ปังๆ ค่ะ"
            ],
            "acknowledgment": [
                "เข้าใจแล้วค่ะ! {context}",
                "โอเคค่า! {context}",
                "ได้เลยค่ะ! {context}"
            ],
            "recommendation_intro": [
                "มาดูลุคที่เหมาะกับ{occasion}กันค่ะ ✨",
                "ขอแนะนำลุคสวยๆ สำหรับ{occasion}นะคะ",
                "มีตัวเลือกดีๆ มาฝากสำหรับ{occasion}ค่ะ"
            ],
            "follow_up": [
                "อยากดูทางเลือกอื่นไหมคะ? หรือมีข้อกำหนดเพิ่มเติมมั้ย? 😊",
                "ชอบลุคไหนมากกว่ากันคะ? หรืออยากปรับแต่งอะไรมั้ย?",
                "เป็นไงบ้างคะ? ถูกใจมั้ย หรืออยากดูแบบอื่นอีก?"
            ],
            "refinement": [
                "ไม่เป็นไรค่ะ มาลองดูลุคอื่นกัน! อยากได้แนวไหนคะ?",
                "งั้นขอแนะนำใหม่นะคะ บอกเพิ่มเติมได้ว่าอยากได้แบบไหน",
                "โอเคค่ะ จะหาลุคอื่นที่เหมาะกว่านี้ให้นะคะ"
            ],
            "completion": [
                "ยินดีที่ได้ช่วยเลือกชุดสวยๆ ค่ะ! ขอให้ดูดีทุกวันนะคะ 💕",
                "ขอบคุณที่ใช้บริการ OOTDay นะคะ แต่งตัวสวยๆ ทุกวันเลย! ✨",
                "หวังว่าจะถูกใจนะคะ มีอะไรให้ช่วยอีกบอกได้เลยค่า 😊"
            ]
        }

    def get_template(self, template_type: str, context: Dict = None) -> str:
        """Get a template and fill in context if provided"""
        import random

        templates = self.templates.get(template_type, [""])
        template = random.choice(templates)

        if context:
            template = template.format(**context)

        return template

    def create_custom_response(self, base_template: str, additions: List[str]) -> str:
        """Create a custom response by combining base template with additions"""
        parts = [base_template]
        parts.extend(additions)
        return "\n".join(parts)