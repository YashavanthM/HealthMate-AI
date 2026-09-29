import { useState } from "react";
import { analyzeHealth } from "../services/api";

function normalizePayload(formData) {
  const age = Number(formData.age);
  const sugar = Number(formData.sugar);
  const bp = String(formData.bp || "").trim();

  if (!formData.age || !formData.sugar || !bp) {
    throw new Error("Please fill in age, sugar level, and blood pressure.");
  }

  if (!Number.isFinite(age) || age < 1 || age > 120) {
    throw new Error("Please enter a valid age between 1 and 120.");
  }

  if (!Number.isFinite(sugar) || sugar < 40 || sugar > 500) {
    throw new Error("Please enter a sugar level between 40 and 500.");
  }

  if (!/^\d{2,3}(\/\d{2,3})?$/.test(bp)) {
    throw new Error("Please enter blood pressure like 120/80 or 130.");
  }

  return { age, sugar, bp };
}

function useHealthAnalysis() {
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const analyze = async (formData) => {
    try {
      const payload = normalizePayload(formData);
      setLoading(true);
      setError("");
      setResult(null);

      const data = await analyzeHealth(payload);
      setResult(data);
      return data;
    } catch (requestError) {
      setError(requestError.message || "Something went wrong.");
      setResult(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError("");
  };

  return {
    result,
    loading,
    error,
    analyze,
    clearError,
  };
}

export default useHealthAnalysis;
