function AnalysisForm({ formData, loading, error, onChange, onSubmit }) {
  return (
    <div className="card card--form">
      <div className="section-heading">
        <p className="eyebrow">Patient inputs</p>
        <h2>Quick Health Analysis</h2>
      </div>

      <form className="analysis-form" onSubmit={onSubmit}>
        <label className="field">
          <span>Age</span>
          <input
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

        <label className="field">
          <span>Sugar Level</span>
          <input
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

        <label className="field">
          <span>Blood Pressure</span>
          <input
            type="text"
            name="bp"
            placeholder="e.g. 120/80 or 130"
            value={formData.bp}
            onChange={onChange}
            required
          />
        </label>

        <button type="submit" className="button button--primary" disabled={loading}>
          {loading ? "Analyzing..." : "Analyze Health"}
        </button>

        {error ? <p className="form-error">{error}</p> : null}
      </form>
    </div>
  );
}

export default AnalysisForm;
