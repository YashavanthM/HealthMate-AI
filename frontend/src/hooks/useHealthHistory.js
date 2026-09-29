import { useEffect, useState } from "react";

const STORAGE_KEY = "healthmate_analysis_history";
const HISTORY_LIMIT = 5;

function readStoredHistory() {
  if (typeof window === "undefined") {
    return [];
  }

  try {
    const rawHistory = window.localStorage.getItem(STORAGE_KEY);
    return rawHistory ? JSON.parse(rawHistory) : [];
  } catch {
    return [];
  }
}

function useHealthHistory() {
  const [history, setHistory] = useState(readStoredHistory);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(history));
  }, [history]);

  const addHistoryItem = (result, formData) => {
    const newItem = {
      id: `${Date.now()}`,
      date: new Date().toLocaleString([], {
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      score: result.score,
      risk: result.risk,
      sugar: Number(formData.sugar),
      bp: formData.bp,
    };

    setHistory((current) => [newItem, ...current].slice(0, HISTORY_LIMIT));
  };

  return {
    history,
    addHistoryItem,
  };
}

export default useHealthHistory;
