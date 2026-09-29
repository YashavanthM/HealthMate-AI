# HealthMate AI

HealthMate AI is a hackathon-ready full-stack healthcare demo that analyzes simple user health inputs and returns:

- Health score
- Risk level
- Diet suggestions
- Exercise suggestions
- AI-style voice summary

## Tech Stack

- Frontend: React + Vite
- Backend: FastAPI
- Storage: No database, simple in-memory / computed responses only

## Project Structure

```text
healthmate-ai/
  backend/
    main.py
    requirements.txt
  frontend/
    package.json
    vite.config.js
    src/
      App.jsx
      components/
```

## Run Backend

```powershell
cd D:\AIhealth\healthmate-ai\backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
uvicorn main:app --reload
```

Backend runs on `http://127.0.0.1:8000`

## Run Frontend

```powershell
cd D:\AIhealth\healthmate-ai\frontend
npm install
npm run dev
```

Frontend runs on `http://127.0.0.1:5173`

The Vite dev server proxies `/api/*` requests to FastAPI automatically.

## API Example

### `POST /analyze`

```json
{
  "age": 42,
  "sugar": 155,
  "bp": "130/85"
}
```

### Response

```json
{
  "score": 68,
  "risk": "Medium",
  "diet": "Favor vegetables, lean protein, salads, oats, and low-sugar snacks...",
  "exercise": "Aim for 30 minutes of walking or cycling at least 5 days a week...",
  "analysis": "Based on your health data, your estimated health score is 68 out of 100..."
}
```
