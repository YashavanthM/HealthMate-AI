import json
import os
from dotenv import load_dotenv
from groq import Groq

from app.models.health_model import ChatMessage, DailyHealthPlan, HealthAnalysisRequest, RiskLevel

# -----------------------------
# ENV SETUP
# -----------------------------
load_dotenv()

API_KEY = os.getenv("GROQ_API_KEY")
print("GROQ KEY LOADED:", API_KEY is not None)

client = Groq(api_key=API_KEY)

# -----------------------------
# HELPERS
# -----------------------------
def _value(data, field):
    if isinstance(data, dict):
        return data.get(field)
    return getattr(data, field)


# -----------------------------
# CORE AI CALL (GROQ)
# -----------------------------
def _call_ai(prompt: str) -> str:
    try:
        response = client.chat.completions.create(
            model="llama-3.1-8b-instant",
            messages=[
                {"role": "system", "content": "You are a professional AI doctor."},
                {"role": "user", "content": prompt},
            ],
            max_tokens=250,
            temperature=0.7,
        )

        return response.choices[0].message.content.strip()

    except Exception as e:
        print("GROQ ERROR:", e)
        return "AI temporarily unavailable. Please try again."


# -----------------------------
# HEALTH EXPLANATION
# -----------------------------
def generate_health_explanation(data: HealthAnalysisRequest, risk: RiskLevel) -> str:
    prompt = f"""
You are a professional AI doctor.

Patient:
Age: {_value(data, "age")}
Sugar: {_value(data, "sugar")}
BP: {_value(data, "bp")}
Risk Level: {risk}

Provide:
1. Diagnosis (1 line)
2. Explanation (simple)
3. Diet Advice (3 bullet points)
4. Exercise Advice (3 bullet points)
5. Motivation line

Keep it short, friendly, and clear.
"""

    return _call_ai(prompt)


# -----------------------------
# DAILY PLAN (STRICT JSON)
# -----------------------------
def generate_daily_health_plan(data: HealthAnalysisRequest, risk: RiskLevel) -> DailyHealthPlan:
    prompt = f"""
You are an AI health assistant.

Patient:
Age: {_value(data, "age")}
Sugar: {_value(data, "sugar")}
BP: {_value(data, "bp")}
Risk: {risk}

Return ONLY JSON (no explanation):

{{
  "morning_routine": "short practical advice",
  "diet_plan": "simple food plan",
  "exercise_plan": "safe daily exercise"
}}
"""

    raw_text = _call_ai(prompt)

    try:
        cleaned = raw_text.replace("```json", "").replace("```", "").strip()
        plan_data = json.loads(cleaned)

        return DailyHealthPlan(
            morning_routine=str(plan_data.get("morning_routine", "")),
            diet_plan=str(plan_data.get("diet_plan", "")),
            exercise_plan=str(plan_data.get("exercise_plan", "")),
        )

    except Exception as e:
        print("JSON PARSE ERROR:", e)

        # 🔥 SAFE FALLBACK (IMPORTANT FOR DEMO)
        return DailyHealthPlan(
            morning_routine="Start with warm water + 5 min stretching",
            diet_plan="Eat balanced meals, avoid excess sugar",
            exercise_plan="Walk 20–30 minutes",
        )


# -----------------------------
# CHAT SUPPORT
# -----------------------------
def _chat_history_line(message: ChatMessage | dict) -> str:
    if isinstance(message, dict):
        role = message.get("role", "user")
        content = message.get("content", "")
    else:
        role = message.role
        content = message.content

    return f"{role}: {content}"


def generate_chat_response(
    user_message: str,
    health_data: HealthAnalysisRequest,
    chat_history: list[ChatMessage] | list[dict],
) -> str:
    history_text = "\n".join(
        [_chat_history_line(message) for message in chat_history[-5:]]
    )

    prompt = f"""
You are a real AI doctor.

Patient Data:
Age: {_value(health_data, "age")}
Sugar: {_value(health_data, "sugar")}
BP: {_value(health_data, "bp")}

Conversation:
{history_text}

User Question:
{user_message}

Rules:
- Answer exactly what user asks
- Keep it short (2–4 lines)
- Be clear and human-like
"""

    return _call_ai(prompt)