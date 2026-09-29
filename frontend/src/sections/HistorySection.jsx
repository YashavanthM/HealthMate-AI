import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { getRiskTone } from "../lib/health";

function HistorySection({ history }) {
  return (
    <section>
      <SectionHeader
        eyebrow="Timeline"
        title="History Page"
        description="A full-width history view for past results and color-coded risk."
      />
      <Card className="p-6" hover={false}>
        <div className="space-y-3">
          {history.map((item) => {
            const tone = getRiskTone(item.risk);
            return (
              <div
                className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.035] p-4 transition hover:border-cyan-300/25 hover:bg-white/[0.06] md:flex-row md:items-center md:justify-between"
                key={`history-${item.id}`}
              >
                <div>
                  <p className="text-sm font-bold text-slate-400">{item.date}</p>
                  <strong className="mt-1 block text-xl font-black text-white">Score {item.score}/100</strong>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`rounded-full border px-3 py-1 text-xs font-black ${tone.badge}`}>{item.risk}</span>
                  <span className="text-sm text-slate-300">Sugar {item.sugar}</span>
                  <span className="text-sm text-slate-300">BP {item.bp}</span>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </section>
  );
}

export default HistorySection;
