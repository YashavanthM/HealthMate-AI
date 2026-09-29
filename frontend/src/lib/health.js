export const sampleVitals = {
  age: "45",
  sugar: "165",
  bp: "138/88",
};

export const demoHistory = [
  { id: "demo-1", score: 61, risk: "Medium", sugar: 165, bp: "138/88", date: "Apr 21, 09:44 PM" },
  { id: "demo-2", score: 73, risk: "Low", sugar: 112, bp: "120/78", date: "Apr 20, 01:22 PM" },
  { id: "demo-3", score: 89, risk: "Low", sugar: 94, bp: "118/76", date: "Apr 20, 12:29 PM" },
  { id: "demo-4", score: 78, risk: "Low", sugar: 128, bp: "124/82", date: "Apr 19, 06:12 PM" },
  { id: "demo-5", score: 66, risk: "Medium", sugar: 148, bp: "136/86", date: "Apr 18, 08:16 AM" },
];

export function normalizeVitals(formData) {
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

export function getRiskTone(risk = "Low") {
  const key = risk.toLowerCase();

  if (key === "high") {
    return {
      badge: "border-red-400/20 bg-red-400/10 text-red-100",
      text: "text-red-300",
      dot: "bg-red-400",
    };
  }

  if (key === "medium") {
    return {
      badge: "border-amber-400/20 bg-amber-400/10 text-amber-100",
      text: "text-amber-300",
      dot: "bg-amber-400",
    };
  }

  return {
    badge: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
    text: "text-emerald-300",
    dot: "bg-emerald-400",
  };
}
