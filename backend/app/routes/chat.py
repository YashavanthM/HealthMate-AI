from fastapi import APIRouter

from app.services.ai_service import generate_chat_response


router = APIRouter()


@router.post("/chat")
def chat(data: dict):
    message = data.get("message")
    history = data.get("history", [])
    health_data = data.get("health_data")

    reply = generate_chat_response(message, health_data, history)

    return {"reply": reply}
