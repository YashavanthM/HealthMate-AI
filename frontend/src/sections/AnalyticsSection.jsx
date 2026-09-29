import {
  CartesianGrid,
  LabelList,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { getRiskTone } from "../lib/health";

function TrendChart({ history }) {
  const data = [...history]
    .reverse()
    .map((item, index) => ({ label: `#${index + 1}`, score: item.score }));

  return (
    <Card className="p-6" hover={false}>
      <SectionHeader
        eyebrow="Analytics"
        title="Health Score Trend"
        description="Smooth score movement across the latest analyses."
      />
      <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data} margin={{ top: 16, right: 18, bottom: 8, left: -12 }}>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" strokeDasharray="5 5" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
            <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{ fill: "transparent" }} width={40} />
            <Tooltip
              cursor={{ stroke: "rgba(56, 189, 248, 0.28)", strokeWidth: 2 }}
              contentStyle={{
                background: "rgba(15, 23, 42, 0.96)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: "14px",
                color: "#f8fafc",
              }}
              formatter={(value) => [`${value}/100`, "Health Score"]}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#38BDF8"
              strokeWidth={4}
              dot={{ r: 5, strokeWidth: 0, fill: "#38BDF8" }}
              activeDot={{ r: 8, stroke: "#dbeafe", strokeWidth: 2 }}
              animationDuration={1400}
            >
              <LabelList dataKey="score" fill="#38BDF8" fontSize={12} offset={12} position="bottom" />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}

function RecentAnalyses({ history }) {
  return (
    <Card className="p-6" hover={false}>
      <SectionHeader
        eyebrow="History"
        title="Recent Analyses"
        description="Card rows stay compact and readable."
      />
      <div className="space-y-3">
        {history.map((item) => {
          const tone = getRiskTone(item.risk);
          return (
            <div
              className="grid gap-3 rounded-2xl border border-white/10 bg-slate-950/35 p-4 transition hover:border-blue-400/25 hover:bg-white/[0.07] sm:grid-cols-[1fr_auto_auto_auto] sm:items-center"
              key={item.id}
            >
              <div>
                <strong className={`text-2xl font-black ${tone.text}`}>{item.score}/100</strong>
                <span className="mt-1 block text-xs text-slate-500">{item.date}</span>
              </div>
              <span className={`w-fit rounded-full border px-3 py-1 text-xs font-black ${tone.badge}`}>
                {item.risk}
              </span>
              <span className="text-sm font-semibold text-slate-300">S: {item.sugar}</span>
              <span className="text-sm font-semibold text-slate-300">BP: {item.bp}</span>
            </div>
          );
        })}
      </div>
    </Card>
  );
}

function AnalyticsSection({ history }) {
  return (
    <section id="history" className="grid gap-6 xl:grid-cols-2">
      <TrendChart history={history} />
      <RecentAnalyses history={history} />
    </section>
  );
}

export default AnalyticsSection;
