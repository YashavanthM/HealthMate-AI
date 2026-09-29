import { motion } from "framer-motion";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { getRiskTone } from "../lib/health";

function MetricCard({ label, value, badge, children, delay }) {
  return (
    <Card className="p-5" delay={delay}>
      <div className="flex items-start justify-between gap-4">
        <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">
          {label}
        </span>
        {badge}
      </div>
      <div className="mt-5 text-3xl font-black tracking-tight text-white">{value}</div>
      {children}
    </Card>
  );
}

function MetricsSection({ result, vitals }) {
  const tone = getRiskTone(result.risk);
  const score = Number(result.score) || 0;
  const sugarRisk = Number(vitals.sugar) > 180 ? "High" : Number(vitals.sugar) > 140 ? "Medium" : "Low";
  const sugarTone = getRiskTone(sugarRisk);
  const systolic = String(vitals.bp).split("/")[0];
  const bpRisk = Number(systolic) >= 130 ? "Medium" : "Low";
  const bpTone = getRiskTone(bpRisk);

  return (
    <section>
      <SectionHeader
        eyebrow="Current vitals"
        title="Health Metrics"
        description="Four high-signal readings designed for fast investor demos and quick patient understanding."
      />

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <MetricCard
          delay={0}
          label="Sugar Level"
          value={<>{vitals.sugar}<span className="ml-2 text-base text-slate-400">mg/dL</span></>}
          badge={<span className={`rounded-full border px-3 py-1 text-xs font-black ${sugarTone.badge}`}>{sugarRisk}</span>}
        />
        <MetricCard
          delay={0.05}
          label="Blood Pressure"
          value={vitals.bp}
          badge={<span className={`rounded-full border px-3 py-1 text-xs font-black ${bpTone.badge}`}>{bpRisk === "Medium" ? "Borderline" : "Normal"}</span>}
        />
        <MetricCard
          delay={0.1}
          label="Risk Level"
          value={<span className={tone.text}>{result.risk}</span>}
          badge={<span className={`rounded-full border px-3 py-1 text-xs font-black ${tone.badge}`}>AI scored</span>}
        />
        <MetricCard
          delay={0.15}
          label="Health Score"
          value={<>{score}<span className="text-base text-slate-400">/100</span></>}
          badge={<span className={`rounded-full border px-3 py-1 text-xs font-black ${tone.badge}`}>Updated</span>}
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

export default MetricsSection;
