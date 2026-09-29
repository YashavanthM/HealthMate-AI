function EmergencyAlert({ risk }) {
  if (risk !== "High") {
    return null;
  }

  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-red-400/30 bg-red-500/10 p-5 text-red-100 shadow-[0_0_34px_rgba(239,68,68,0.12)] sm:flex-row sm:items-center sm:justify-between" role="alert">
      <strong className="text-lg font-black">High Risk Alert</strong>
      <span className="text-sm font-semibold">Consult doctor immediately</span>
    </div>
  );
}

export default EmergencyAlert;
