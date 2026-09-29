function InputForm({
  formData,
  loading,
  error,
  onChange,
  onSampleData,
  onSubmit,
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/25 hover:shadow-[0_0_38px_rgba(56,189,248,0.12)]">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">Patient inputs</p>
        <h2 className="mt-2 text-2xl font-black text-white">Quick Health Analysis</h2>
        <p className="mt-2 text-sm text-slate-400">Enter basic vitals to generate an AI-guided risk summary.</p>
      </div>

      <form className="grid gap-5" onSubmit={onSubmit}>
        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-300">Age</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
            type="number"
            name="age"
            min="1"
            max="120"
            placeholder="Enter age"
            value={formData.age}
            onChange={onChange}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-300">Sugar Level</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
            type="number"
            name="sugar"
            min="40"
            max="500"
            placeholder="e.g. 145"
            value={formData.sugar}
            onChange={onChange}
            required
          />
        </label>

        <label className="grid gap-2">
          <span className="text-sm font-bold text-slate-300">Blood Pressure</span>
          <input
            className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
            type="text"
            name="bp"
            placeholder="e.g. 120/80 or 130"
            value={formData.bp}
            onChange={onChange}
            required
          />
        </label>

        <div className="flex flex-col gap-3 pt-2 sm:flex-row">
          <button
            type="submit"
            className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(37,99,235,0.28)] transition hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
          >
            {loading ? "Analyzing..." : "Analyze Health"}
          </button>

          <button
            type="button"
            className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-black text-slate-200 transition hover:scale-[1.02] hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
            disabled={loading}
            onClick={onSampleData}
          >
            Try Sample Data
          </button>
        </div>

        <p className="text-sm leading-6 text-slate-500">
          Use any real or sample values to demo the analysis flow from input to
          spoken result.
        </p>

        {error ? <p className="rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{error}</p> : null}
      </form>
    </div>
  );
}

export default InputForm;
