import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import Button from "../ui/Button";
import { getRiskTone } from "../lib/health";

const features = [
  "Live scoring",
  "Voice guidance",
  "AI doctor chat",
  "Exercise tracking",
];

function HeroSection({ result = {}, onStart, loading }) {
  const tone = getRiskTone(result?.risk || "Low");

  const targetScore = Number(result?.score) || 0;
  const [score, setScore] = useState(0);

  // 🔥 Smooth count animation (0 → score)
  useEffect(() => {
    let start = 0;
    const interval = setInterval(() => {
      start += 1;
      if (start >= targetScore) {
        start = targetScore;
        clearInterval(interval);
      }
      setScore(start);
    }, 15);

    return () => clearInterval(interval);
  }, [targetScore]);

  const radius = 70;
  const circumference = 2 * Math.PI * radius;

  return (
    <motion.section
      className="relative grid gap-10 rounded-3xl p-8 lg:grid-cols-2 
      bg-white/5 backdrop-blur-2xl border border-white/10 
      shadow-[0_8px_40px_rgba(0,0,0,0.3)] overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* 🌈 Glow Background */}
      <div className="absolute -top-20 -left-20 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />
      <div className="absolute top-40 right-0 w-80 h-80 bg-blue-500/10 blur-3xl rounded-full" />

      {/* LEFT CONTENT */}
      <div className="z-10">
        <p className="text-xs tracking-widest text-cyan-300 uppercase">
          HealthMate AI
        </p>

        <h1 className="mt-3 text-4xl md:text-5xl font-bold text-white leading-tight">
          Smart Preventive <br />
          <span className="text-cyan-400">Health Assistant</span>
        </h1>

        <p className="mt-4 text-slate-400 max-w-lg">
          Transform your health data into real-time insights, AI-powered plans,
          and smart guidance.
        </p>

        {/* FEATURES */}
        <div className="mt-6 flex flex-wrap gap-2">
          {features.map((f) => (
            <span
              key={f}
              className="px-3 py-1 text-xs bg-white/10 border border-white/10 rounded-full text-slate-200 backdrop-blur-md"
            >
              {f}
            </span>
          ))}
        </div>

        {/* BUTTON */}
        <div className="mt-6">
          <Button onClick={onStart}>
            {loading ? "Analyzing..." : "Start Analysis"}
          </Button>
        </div>
      </div>

      {/* RIGHT SIDE (APPLE STYLE RING) */}
      <div className="flex items-center justify-center relative">

        {/* 💓 Pulse Glow */}
        <motion.div
          className="absolute w-56 h-56 rounded-full bg-cyan-400/10 blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />

        <div className="relative w-44 h-44">

          {/* SVG RING */}
          <svg className="w-full h-full -rotate-90">
            <circle
              cx="90"
              cy="90"
              r={radius}
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="10"
              fill="none"
            />

            <motion.circle
              cx="90"
              cy="90"
              r={radius}
              stroke="url(#gradient)"
              strokeWidth="10"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              animate={{
                strokeDashoffset:
                  circumference - (score / 100) * circumference,
              }}
              transition={{ duration: 1.2 }}
            />

            {/* 🌈 Gradient */}
            <defs>
              <linearGradient id="gradient">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#3b82f6" />
              </linearGradient>
            </defs>
          </svg>

          {/* CENTER TEXT */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">

            {loading ? (
              <div className="text-cyan-400 animate-pulse text-sm">
                AI analyzing...
              </div>
            ) : (
              <>
                <motion.div
                  key={score}
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="text-4xl font-bold text-white"
                >
                  {score}
                </motion.div>

                <span className="text-xs text-slate-400">
                  Health Score
                </span>

                <span
                  className={`mt-2 px-3 py-1 text-xs rounded-full ${tone.badge}`}
                >
                  {result?.risk || "Low"}
                </span>
              </>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
}

export default HeroSection;