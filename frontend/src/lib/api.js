const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

async function parseJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

export async function analyzeHealth(payload) {
  const response = await fetch(`${API_BASE_URL}/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.detail || "Unable to analyze health data right now.");
  }

  return data;
}

export async function sendChatMessage(payload) {
  const response = await fetch(`${API_BASE_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = await parseJson(response);

  if (!response.ok) {
    throw new Error(data?.detail || "Unable to reach the AI doctor right now.");
  }

  return data;
}
