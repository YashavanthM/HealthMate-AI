import { motion } from "framer-motion";

function Header() {
  const lastUpdated = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date());

  return (
    <motion.header
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between"
    >
      {/* LEFT SIDE */}
      <div>
        <h1 className="text-3xl md:text-4xl font-semibold text-white tracking-tight">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Last updated • {lastUpdated}
        </p>
      </div>

      {/* RIGHT SIDE (STARTUP STYLE STATUS) */}
      <div className="flex items-center gap-3">

        {/* 🟢 SYSTEM STATUS */}
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full 
          bg-white/5 border border-white/10 backdrop-blur-md">
          
          {/* Pulse dot */}
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400"></span>
          </span>

          <span className="text-xs text-slate-300 font-medium">
            System Active
          </span>
        </div>

        {/* ⚡ OPTIONAL: LIVE MODE TAG */}
        <div className="px-3 py-1.5 rounded-full 
          bg-gradient-to-r from-cyan-500/10 to-blue-500/10 
          border border-white/10 text-xs text-cyan-200 font-medium backdrop-blur-md">
          Live AI
        </div>

      </div>
    </motion.header>
  );
}

export default Header;