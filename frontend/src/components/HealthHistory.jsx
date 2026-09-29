function HealthHistory({ history }) {
  const sampleHistory = [
    { id: "sample-1", score: 61, date: "Apr 21, 09:44 PM", risk: "Medium", sugar: 165, bp: "138/88" },
    { id: "sample-2", score: 73, date: "Apr 20, 01:22 PM", risk: "Low", sugar: 78, bp: "120" },
    { id: "sample-3", score: 89, date: "Apr 20, 12:29 PM", risk: "Low", sugar: 78, bp: "120" },
  ];
  const visibleHistory = history.length > 0 ? history : sampleHistory;

  return (
    <div className="h-full rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/25 hover:shadow-[0_0_38px_rgba(56,189,248,0.12)]">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">History</p>
        <h2 className="mt-2 text-2xl font-black text-white">Recent Analyses</h2>
        <p className="mt-2 text-sm text-slate-400">Tap to view details</p>
      </div>

      <div className="space-y-3">
          {visibleHistory.map((item) => (
            <div
              className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 transition hover:border-blue-400/25 hover:bg-white/[0.07] sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
              key={item.id}
            >
              <div>
                <strong className={`text-2xl font-black ${item.risk === "Medium" ? "text-amber-300" : "text-emerald-300"}`}>
                  {item.score}/100
                </strong>
                <span className="mt-1 block text-xs text-slate-500">{item.date}</span>
              </div>
              <p
                className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${
                  item.risk === "Medium"
                    ? "border-amber-400/20 bg-amber-400/10 text-amber-100"
                    : "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
                }`}
              >
                {item.risk}
              </p>
              <span className="text-sm font-semibold text-slate-300">S: {item.sugar}</span>
              <span className="text-sm font-semibold text-slate-300">BP: {item.bp}</span>
            </div>
          ))}
      </div>
    </div>
  );
}

export default HealthHistory;
