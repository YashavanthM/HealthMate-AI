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

function HealthChart({ score, history = [] }) {
  const sampleScores = [89, 73, 73, 61, 66];
  const historyData =
    history.length > 0
      ? [...history]
          .reverse()
          .map((item, index) => ({
            label: `#${index + 1}`,
            score: item.score,
          }))
      : sampleScores.map((item, index) => ({
          label: `#${index + 1}`,
          score: index === sampleScores.length - 1 ? score || item : item,
        }));

  const chartData =
    historyData.length > 1
      ? historyData
      : [
          { label: "Start", score: 100 },
          { label: "Current", score },
        ];

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/25 hover:shadow-[0_0_38px_rgba(56,189,248,0.12)]">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">Analytics</p>
        <h2 className="mt-2 text-2xl font-black text-white">Health Score Trend</h2>
        <p className="mt-2 text-sm text-slate-400">Last 5 analyses</p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-3">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 12, right: 20, bottom: 8, left: -12 }}>
            <defs>
              <linearGradient id="healthScoreGradient" x1="0" x2="1" y1="0" y2="0">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="52%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#06b6d4" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(148, 163, 184, 0.12)" strokeDasharray="5 5" vertical={false} />
            <XAxis dataKey="label" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8" }} />
            <YAxis
              domain={[0, 100]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "transparent" }}
              width={42}
            />
            <Tooltip
              cursor={{ stroke: "rgba(53, 145, 225, 0.28)", strokeWidth: 2 }}
              contentStyle={{
                background: "rgba(15, 23, 42, 0.94)",
                color: "#f8fafc",
                border: "1px solid rgba(255, 255, 255, 0.1)",
                borderRadius: "12px",
              }}
              formatter={(value) => [`${value}/100`, "Health Score"]}
            />
            <Line
              type="monotone"
              dataKey="score"
              stroke="#3591e1"
              strokeWidth={4}
              animationDuration={1400}
              animationEasing="ease-out"
              dot={{ r: 6, strokeWidth: 0, fill: "#3591e1" }}
              activeDot={{ r: 8, strokeWidth: 2, fill: "#3591e1", stroke: "#dbeafe" }}
            >
              <LabelList
                dataKey="score"
                fill="#3591e1"
                fontSize={12}
                offset={12}
                position="bottom"
              />
            </Line>
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default HealthChart;
