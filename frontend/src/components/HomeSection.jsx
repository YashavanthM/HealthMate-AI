function HomeSection({ onStart }) {
  return (
    <section className="hero card">
      <div className="hero__content">
        <p className="eyebrow">Smart preventive health assistant</p>
        <h1>HealthMate AI - Smart Health Companion</h1>
        <p className="hero__text">
          Analyze basic health readings in seconds and present a friendly AI
          summary with diet, exercise, and voice guidance for live demos.
        </p>

        <div className="hero__actions">
          <button type="button" className="button button--primary" onClick={onStart}>
            Start Analysis
          </button>
          <div className="hero__stats">
            <span>Risk prediction</span>
            <span>AI-style summary</span>
            <span>Voice output</span>
          </div>
        </div>
      </div>

      <div className="hero__visual" aria-hidden="true">
        <div className="hero__circle">
          <div className="hero__card hero__card--main">
            <span>Health Score</span>
            <strong>92</strong>
          </div>
          <div className="hero__card hero__card--secondary">
            <span>Monitoring</span>
            <strong>Active</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeSection;
