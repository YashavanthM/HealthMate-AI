from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes.analyze import router as analyze_router
from app.routes.chat import router as chat_router


app = FastAPI(
    title="HealthMate AI API",
    description="Professional hackathon-ready backend for HealthMate AI.",
    version="2.0.0",
)

# ✅ FIXED CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://localhost:5174",   # ✅ ADD THIS
        "http://127.0.0.1:5174",   # ✅ ADD THIS
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(analyze_router)
app.include_router(chat_router)


@app.get("/health")
def health_check() -> dict[str, str]:
    return {"status": "ok", "service": "HealthMate AI API"}