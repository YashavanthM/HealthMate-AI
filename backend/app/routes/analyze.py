from fastapi import APIRouter

from app.models.health_model import HealthAnalysisRequest, HealthAnalysisResponse
from app.services.health_service import analyze_health_data


router = APIRouter(tags=["analysis"])


@router.post("/analyze", response_model=HealthAnalysisResponse)
def analyze(payload: HealthAnalysisRequest) -> HealthAnalysisResponse:
    return analyze_health_data(payload)
