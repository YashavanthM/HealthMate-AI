from app.models.health_model import HealthAnalysisRequest, HealthAnalysisResponse, RiskLevel
from app.services.ai_service import generate_daily_health_plan, generate_health_explanation
from app.utils.helpers import clamp, parse_systolic_bp


def determine_risk_level(sugar: float) -> RiskLevel:
    if sugar > 180:
        return "High"
    if sugar > 140:
        return "Medium"
    return "Low"


def calculate_health_score(age: int, sugar: float, bp: str) -> int:
    score = 95

    if age >= 60:
        score -= 16
    elif age >= 45:
        score -= 10
    elif age >= 30:
        score -= 5

    if sugar > 180:
        score -= 32
    elif sugar > 140:
        score -= 18
    else:
        score -= 6

    systolic_bp = parse_systolic_bp(bp)
    if systolic_bp is not None:
        if systolic_bp >= 160:
            score -= 16
        elif systolic_bp >= 140:
            score -= 10
        elif systolic_bp >= 130:
            score -= 6

    return clamp(score, lower=35, upper=100)


def generate_diet_suggestion(risk: RiskLevel, systolic_bp: int | None) -> str:
    bp_note = ""
    if systolic_bp is not None and systolic_bp >= 140:
        bp_note = " Also lower sodium intake and avoid highly processed foods."

    if risk == "High":
        return (
            "Prioritize vegetables, legumes, whole grains, lean protein, and low-sugar meals."
            " Avoid sugary drinks and large dessert portions." + bp_note
        )
    if risk == "Medium":
        return (
            "Choose fiber-rich meals, salads, oats, fruit in moderation, and lighter snacks."
            " Reduce refined carbs and packaged sweets." + bp_note
        )
    return (
        "Maintain balanced meals with fruits, vegetables, proteins, hydration, and controlled sugar intake."
        + bp_note
    )


def generate_exercise_suggestion(risk: RiskLevel) -> str:
    if risk == "High":
        return (
            "Start with 20 to 30 minutes of brisk walking, light stretching, and gentle mobility work daily."
            " Get medical advice before intense exercise."
        )
    if risk == "Medium":
        return "Aim for 30 minutes of walking or cycling 5 days a week, plus 2 light strength sessions."
    return "Continue 25 to 40 minutes of regular exercise such as walking, yoga, or light cardio on most days."


def analyze_health_data(payload: HealthAnalysisRequest) -> HealthAnalysisResponse:
    systolic_bp = parse_systolic_bp(payload.bp)
    risk = determine_risk_level(payload.sugar)
    score = calculate_health_score(payload.age, payload.sugar, payload.bp)
    diet = generate_diet_suggestion(risk, systolic_bp)
    exercise = generate_exercise_suggestion(risk)

    analysis = generate_health_explanation(payload, risk)
    daily_plan = generate_daily_health_plan(payload, risk)

    return HealthAnalysisResponse(
        score=score,
        risk=risk,
        diet=diet,
        exercise=exercise,
        analysis=analysis,
        daily_plan=daily_plan,
    )
