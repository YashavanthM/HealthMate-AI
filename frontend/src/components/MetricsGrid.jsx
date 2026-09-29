import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const riskClasses = {
  Low: "border-emerald-400/20 bg-emerald-400/10 text-emerald-100",
  Medium: "border-amber-400/20 bg-amber-400/10 text-amber-100",
  High: "border-red-400/20 bg-red-400/10 text-red-100",
};

function CountUp({ value }) {
  const numericValue = Number(value);
  const [displayValue, setDisplayValue] = useState(Number.isFinite(numericValue) ? numericValue : 0);

  useEffect(() => {
    if (!Number.isFinite(numericValue)) {
      return undefined;
    }

    let frameId;
    const duration = 700;
    const startTime = performance.now();
    const startValue = displayValue;
    const difference = numericValue - startValue;

    const tick = (now) => {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplayValue(Math.round(startValue + difference * eased));

      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [numericValue]);

  return displayValue;
}

function MetricCard({ label, value, status, children }) {
  return (
    <motion.article
      className="group rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:scale-[1.02] hover:border-cyan-300/25 hover:shadow-[0_0_38px_rgba(56,189,248,0.12)]"
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: "easeOut" }}
    >
      <span className="block text-xs font-black uppercase tracking-[0.22em] text-slate-500">
        {label}
      </span>
      <div className="mt-4 text-3xl font-black tracking-tight text-white">
        {value}
      </div>
      {status ? (
        <span className={`mt-5 inline-flex rounded-full border px-3 py-1 text-xs font-black ${status.className}`}>
          {status.label}
        </span>
      ) : null}
      {children}
    </motion.article>
  );
}

function MetricsGrid({ result, healthData }) {
  const risk = result?.risk || "Medium";
  const riskClass = riskClasses[risk] || riskClasses.Medium;
  const score = Number(result?.score) || 61;
  const sugar = healthData?.sugar || 165;
  const bp = healthData?.bp || "138/88";
  const [systolic, diastolic] = String(bp).split("/");
  const sugarStatus = Number(sugar) > 180 ? "High" : Number(sugar) > 140 ? "Medium" : "Low";
  const bpStatus = Number(systolic) >= 130 ? "Borderline" : "Normal";

  return (
    <section className="mb-10" aria-label="Health metrics">
      <div className="mb-5 flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">Current vitals</p>
          <h2 className="mt-2 text-2xl font-black text-white">Health Metrics</h2>
        </div>
        <p className="hidden max-w-lg text-sm text-slate-500 md:block">
          High-signal metrics first, with score and risk visible in under three seconds.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          label="Sugar Level"
          value={<><CountUp value={sugar} /> <span className="text-[22px] text-[#c8c9c4]">mg/dL</span></>}
          status={{ label: sugarStatus, className: riskClasses[sugarStatus] || riskClasses.Medium }}
        />
        <MetricCard
          label="Blood Pressure"
          value={<>{systolic}<span className="text-[22px] text-[#c8c9c4]">/{diastolic || "80"}</span></>}
          status={{ label: bpStatus, className: "bg-[#fff4df] text-[#8a570e]" }}
        />
        <MetricCard
          label="Risk Level"
          value={risk}
          status={{ label: "Monitor", className: riskClass }}
        />
        <MetricCard
          label="Health Score"
          value={<><CountUp value={score} /><span className="text-xl text-slate-400">/100</span></>}
        >
          <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-300"
              initial={{ width: 0 }}
              animate={{ width: `${score}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
          </div>
        </MetricCard>
      </div>
    </section>
  );
}

export default MetricsGrid;
