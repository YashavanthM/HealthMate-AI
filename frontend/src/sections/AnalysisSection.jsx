import Button from "../ui/Button";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { sampleVitals } from "../lib/health";

function AnalysisSection({ error, formData, loading, onChange, onSample, onSubmit }) {
  return (
    <section id="analysis">
      <SectionHeader
        eyebrow="Analysis"
        title="Run Health Analysis"
        description="A focused form with only the vitals needed for the AI risk prediction."
      />

      <Card className="p-6" hover={false}>
        <form className="grid gap-5" onSubmit={onSubmit}>
          <div className="grid gap-5 md:grid-cols-3">
            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-300">Age</span>
              <input
                className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
                max="120"
                min="1"
                name="age"
                onChange={onChange}
                placeholder="45"
                required
                type="number"
                value={formData.age}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-300">Sugar Level</span>
              <input
                className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
                max="500"
                min="40"
                name="sugar"
                onChange={onChange}
                placeholder="165"
                required
                type="number"
                value={formData.sugar}
              />
            </label>

            <label className="grid gap-2">
              <span className="text-sm font-bold text-slate-300">Blood Pressure</span>
              <input
                className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
                name="bp"
                onChange={onChange}
                placeholder="138/88"
                required
                type="text"
                value={formData.bp}
              />
            </label>
          </div>

          {error ? (
            <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">
              {error}
            </p>
          ) : null}

          <div className="flex flex-col gap-3 sm:flex-row">
            <Button disabled={loading} type="submit">
              {loading ? "Analyzing..." : "Analyze"}
            </Button>
            <Button disabled={loading} onClick={() => onSample(sampleVitals)} variant="secondary">
              Sample Data
            </Button>
          </div>
        </form>
      </Card>
    </section>
  );
}

export default AnalysisSection;
