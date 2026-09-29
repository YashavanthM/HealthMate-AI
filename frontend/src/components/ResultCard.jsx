import { motion } from "framer-motion";

const riskStyles = {
  low: {
    badge: "border-emerald-300/25 bg-emerald-400/15 text-emerald-100 shadow-emerald-500/20",
    glow: "from-emerald-400/30 to-blue-400/10",
    fill: "from-emerald-400 to-cyan-300",
  },
  medium: {
    badge: "border-amber-300/25 bg-amber-400/15 text-amber-100 shadow-amber-500/20",
    glow: "from-amber-400/30 to-blue-400/10",
    fill: "from-amber-300 to-orange-400",
  },
  high: {
    badge: "border-red-300/25 bg-red-400/15 text-red-100 shadow-red-500/20",
    glow: "from-red-400/30 to-blue-400/10",
    fill: "from-red-400 to-rose-500",
  },
};

function ResultCard({ result }) {
  const riskKey = result.risk.toLowerCase();
  const styles = riskStyles[riskKey] ?? riskStyles.low;
  const score = Number(result.score) || 0;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">Analysis result</p>
        <h2 className="mt-2 text-2xl font-black text-white">Your Health Snapshot</h2>
      </div>

      <div className="grid gap-4 lg:grid-cols-[0.9fr_0.75fr_1.35fr]">
        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-300/25"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className={`absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gradient-to-br ${styles.glow} blur-3xl`} />
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Health Score</span>
          <motion.strong
            className="mt-4 block text-7xl font-black tracking-tight text-white"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 140 }}
          >
            {score}
          </motion.strong>
          <small className="text-slate-400">out of 100</small>
          <div className="mt-6">
            <div className="mb-2 flex items-center justify-between text-sm text-slate-300">
              <span>Health Score Meter</span>
              <strong>{score}/100</strong>
            </div>
            <div className="h-3 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className={`h-full rounded-full bg-gradient-to-r ${styles.fill}`}
                initial={{ width: 0 }}
                animate={{ width: `${score}%` }}
                transition={{ duration: 0.9, ease: "easeOut" }}
              />
            </div>
          </div>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-300/25"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
        >
          <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Risk Level</span>
          <div className={`mt-5 inline-flex rounded-full border px-5 py-2 text-lg font-black shadow-lg ${styles.badge}`}>
            {result.risk}
          </div>
          <p className="mt-5 text-sm leading-6 text-slate-300">
            The risk badge is based on your latest sugar level, age, and blood
            pressure context.
          </p>
        </motion.div>

        <motion.div
          className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-950/35 p-6 shadow-lg transition hover:-translate-y-1 hover:border-blue-300/25"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.16, duration: 0.45 }}
        >
          <span className="text-sm uppercase tracking-[0.25em] text-blue-200">AI Insight</span>
          <p className="mt-4 text-base leading-7 text-slate-100">{result.analysis}</p>
        </motion.div>
      </div>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <h3 className="font-black text-white">Diet Suggestions</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{result.diet}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <h3 className="font-black text-white">Exercise Suggestions</h3>
          <p className="mt-2 whitespace-pre-line text-sm leading-6 text-slate-400">{result.exercise}</p>
        </div>
      </div>
    </div>
  );
}

export default ResultCard;
