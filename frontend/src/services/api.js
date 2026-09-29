// ===============================
// API CONFIG
// ===============================
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000";

// ===============================
// HELPER: FETCH WITH TIMEOUT + LOGS
// ===============================
async function fetchWithTimeout(url, options = {}, timeout = 8000) {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  console.log("🚀 API CALL:", url);

  try {
    const response = await fetch(url, {
      ...options,
      signal: controller.signal,
    });

    clearTimeout(id);

    console.log("✅ RESPONSE STATUS:", response.status);

    return response;
  } catch (error) {
    clearTimeout(id);

    if (error.name === "AbortError") {
      console.error("⏱ TIMEOUT:", url);
      throw new Error("Request timeout. Backend is slow or stuck.");
    }

    console.error("🌐 NETWORK ERROR:", error);
    throw new Error("Network error. Backend not reachable.");
  }
}

// ===============================
// ANALYZE HEALTH
// ===============================
export async function analyzeHealth(payload) {
  try {
    console.log("📤 Sending Analyze Payload:", payload);

    const response = await fetchWithTimeout(`${API_BASE_URL}/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let responseData = null;

    try {
      responseData = await response.json();
      console.log("📥 Analyze Response:", responseData);
    } catch {
      console.warn("⚠️ Failed to parse JSON");
      responseData = null;
    }

    if (!response.ok) {
      const detail =
        typeof responseData?.detail === "string"
          ? responseData.detail
          : "Unable to analyze health data right now.";

      throw new Error(detail);
    }

    return responseData;
  } catch (error) {
    console.error("❌ ANALYZE ERROR:", error.message);
    throw error;
  }
}

// ===============================
// CHAT WITH AI DOCTOR
// ===============================
export async function sendChatMessage(payload) {
  try {
    console.log("📤 Sending Chat Payload:", payload);

    const response = await fetchWithTimeout(`${API_BASE_URL}/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    let responseData = null;

    try {
      responseData = await response.json();
      console.log("📥 Chat Response:", responseData);
    } catch {
      console.warn("⚠️ Failed to parse JSON");
      responseData = null;
    }

    if (!response.ok) {
      const detail =
        typeof responseData?.detail === "string"
          ? responseData.detail
          : "Unable to reach the AI doctor right now.";

      throw new Error(detail);
    }

    return responseData;
  } catch (error) {
    console.error("❌ CHAT ERROR:", error.message);
    throw error;
  }
}