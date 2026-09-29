function DailyPlanCard({ plan }) {
  if (!plan) {
    return null;
  }

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">Daily health plan</p>
        <h2 className="mt-2 text-2xl font-black text-white">Your Plan for Today</h2>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Morning</span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{plan.morning_routine}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Diet</span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{plan.diet_plan}</p>
        </div>
        <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-5">
          <span className="text-xs font-black uppercase tracking-[0.2em] text-slate-500">Exercise</span>
          <p className="mt-3 text-sm leading-6 text-slate-300">{plan.exercise_plan}</p>
        </div>
      </div>
    </div>
  );
}

export default DailyPlanCard;
