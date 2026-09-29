from typing import Literal

from pydantic import BaseModel, Field


RiskLevel = Literal["Low", "Medium", "High"]
ChatRole = Literal["user", "ai"]


class HealthAnalysisRequest(BaseModel):
    age: int = Field(..., ge=1, le=120)
    sugar: float = Field(..., ge=40, le=500)
    bp: str = Field(..., min_length=1, max_length=20)


class DailyHealthPlan(BaseModel):
    morning_routine: str
    diet_plan: str
    exercise_plan: str


class HealthAnalysisResponse(BaseModel):
    score: int
    risk: RiskLevel
    diet: str
    exercise: str
    analysis: str
    daily_plan: DailyHealthPlan


class ChatMessage(BaseModel):
    role: ChatRole
    content: str = Field(..., min_length=1, max_length=1000)


class ChatRequest(BaseModel):
    message: str = Field(..., min_length=1, max_length=500)
    health_data: HealthAnalysisRequest
    history: list[ChatMessage] = Field(default_factory=list)


class ChatResponse(BaseModel):
    reply: str
