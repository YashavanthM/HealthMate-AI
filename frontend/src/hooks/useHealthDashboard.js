import { useEffect, useMemo, useState } from "react";
import { analyzeHealth } from "../lib/api";
import { demoHistory, normalizeVitals } from "../lib/health";

const STORAGE_KEY = "healthmate_analysis_history";
const HISTORY_LIMIT = 5;

function readHistory() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value ? JSON.parse(value) : [];
  } catch {
    return [];
  }
}

function useHealthDashboard() {
  const [formData, setFormData] = useState({ age: "", sugar: "", bp: "" });
  const [result, setResult] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [history, setHistory] = useState(readHistory);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const displayHistory = history.length > 0 ? history : demoHistory;

  const displayVitals = useMemo(() => {
    if (healthData) {
      return healthData;
    }

    const latest = displayHistory[0] || demoHistory[0];
    return {
      age: 45,
      sugar: latest.sugar,
      bp: latest.bp,
    };
  }, [displayHistory, healthData]);

  const displayResult = useMemo(() => {
    if (result) {
      return result;
    }

    const latest = displayHistory[0] || demoHistory[0];
    return {
      score: latest.score,
      risk: latest.risk,
      analysis: "Run an analysis to generate a personalized AI doctor insight.",
      diet: "Balanced meals, high fiber, and low refined sugar.",
      exercise: "Start with 20 minutes of light activity and mobility.",
    };
  }, [displayHistory, result]);

  const updateField = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({ ...current, [name]: value }));
    if (error) {
      setError("");
    }
  };

  const analyze = async (values = formData) => {
    try {
      const payload = normalizeVitals(values);
      setLoading(true);
      setError("");

      const data = await analyzeHealth(payload);
      setResult(data);
      setHealthData(payload);
      setHistory((current) =>
        [
          {
            id: `${Date.now()}`,
            date: new Date().toLocaleString([], {
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            }),
            score: data.score,
            risk: data.risk,
            sugar: payload.sugar,
            bp: payload.bp,
          },
          ...current,
        ].slice(0, HISTORY_LIMIT),
      );
      return data;
    } catch (requestError) {
      setError(requestError.message || "Something went wrong.");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const useSample = (sample) => {
    setFormData(sample);
    return analyze(sample);
  };

  return {
    formData,
    result,
    displayResult,
    healthData,
    displayVitals,
    history: displayHistory,
    loading,
    error,
    updateField,
    analyze,
    useSample,
  };
}

export default useHealthDashboard;
