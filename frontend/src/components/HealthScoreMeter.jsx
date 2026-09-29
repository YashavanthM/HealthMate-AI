function HealthScoreMeter({ score }) {
  return (
    <div className="score-meter">
      <div className="score-meter__label">
        <span>Health Score Meter</span>
        <strong>{score}/100</strong>
      </div>
      <div className="score-meter__track" aria-hidden="true">
        <div className="score-meter__fill" style={{ width: `${score}%` }} />
      </div>
    </div>
  );
}

export default HealthScoreMeter;
