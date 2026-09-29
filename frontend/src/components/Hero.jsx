import { motion } from "framer-motion";

const featurePills = ["Live scoring", "Voice guidance", "AI doctor chat", "Exercise tracking"];

function Hero({ onStart }) {
  return (
    <motion.section
      animate={{ opacity: 1, y: 0 }}
      className="relative isolate mb-10 grid overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] p-6 shadow-2xl shadow-black/20 backdrop-blur-xl md:grid-cols-[1.1fr_0.9fr] md:p-8 lg:p-10"
      id="dashboard"
      initial={{ opacity: 0, y: 24 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
    >
      <div className="pointer-events-none absolute -left-32 -top-32 h-80 w-80 rounded-full bg-blue-600/20 blur-3xl" />
      <div className="pointer-events-none absolute right-6 top-1/2 h-96 w-96 -translate-y-1/2 rounded-full bg-cyan-400/10 blur-3xl" />

      <div className="relative z-10 max-w-3xl">
        <p className="mb-4 text-xs font-black uppercase tracking-[0.28em] text-cyan-200/80">HealthMate AI</p>
        <h2 className="max-w-2xl text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
          Smart Preventive Health Assistant
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-7 text-slate-400 md:text-lg">
          Turn vitals into AI-driven insights, risk predictions, daily plans,
          voice guidance, and real-time exercise feedback.
        </p>

        <div className="mt-7 flex max-w-2xl flex-wrap gap-3">
          {featurePills.map((pill) => (
            <span
              className="rounded-full border border-white/10 bg-white/[0.06] px-4 py-2 text-sm font-semibold text-slate-200"
              key={pill}
            >
              {pill}
            </span>
          ))}
        </div>

        <motion.button
          className="mt-8 rounded-2xl bg-gradient-to-r from-blue-600 to-cyan-400 px-6 py-3.5 text-sm font-black text-white shadow-[0_0_36px_rgba(37,99,235,0.32)] transition"
          onClick={onStart}
          type="button"
          whileHover={{ scale: 1.04, boxShadow: "0 0 46px rgba(56, 189, 248, 0.38)" }}
          whileTap={{ scale: 0.98 }}
        >
          Start Health Analysis
        </motion.button>
      </div>

      <div className="relative z-10 mt-10 flex items-center justify-center md:mt-0">
        <motion.div
          animate={{ scale: [1, 1.035, 1] }}
          className="relative grid h-64 w-64 place-items-center rounded-full border border-cyan-300/20 bg-cyan-300/10 shadow-[0_0_80px_rgba(56,189,248,0.16)]"
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-6 rounded-full border border-white/10 bg-slate-950/45 backdrop-blur-xl" />
          <div className="text-center">
            <motion.strong
              animate={{ opacity: 1, scale: 1 }}
              className="relative block text-5xl font-black leading-none tracking-tight text-white"
              initial={{ opacity: 0, scale: 0.86 }}
              transition={{ delay: 0.3, type: "spring", stiffness: 140 }}
            >
              84
            </motion.strong>
            <span className="relative mt-3 block text-sm font-semibold text-cyan-100">Health Score</span>
            <small className="relative mt-3 block text-sm font-black uppercase tracking-wide text-emerald-300">
              Good
            </small>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
}

export default Hero;
