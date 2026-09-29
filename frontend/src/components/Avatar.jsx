import { useEffect } from "react";

function Avatar({ analysisText, loading, risk }) {
  const explanation = analysisText;

  const speak = (text) => {
    if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.cancel();
    speech.rate = 0.9;
    speech.pitch = 1;
    speech.lang = "en-US";
    window.speechSynthesis.speak(speech);
  };

  useEffect(() => {
    if (!explanation) {
      return undefined;
    }

    speak(explanation);

    return () => {
      window.speechSynthesis?.cancel();
    };
  }, [explanation]);

  const replayVoice = () => {
    speak(explanation);
  };

  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl transition duration-300 hover:border-cyan-300/25 hover:shadow-[0_0_38px_rgba(56,189,248,0.12)]">
      <div className="mb-6">
        <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">AI doctor avatar</p>
        <h2 className="mt-2 text-2xl font-black text-white">Voice Guidance</h2>
      </div>

      <div className={`mx-auto grid h-48 w-48 place-items-center rounded-full border border-white/10 bg-white/[0.04] ${loading ? "shadow-[0_0_46px_rgba(59,130,246,0.35)]" : ""}`}>
        <svg viewBox="0 0 220 220" className="h-40 w-40 drop-shadow-2xl" role="img" aria-label="Doctor avatar">
          <circle cx="110" cy="110" r="100" fill="#e7f4ff" />
          <circle cx="110" cy="82" r="42" fill="#ffd9c2" />
          <path d="M68 74c10-30 68-38 84 0v16H68z" fill="#1f5ca8" />
          <path d="M62 190c8-42 28-62 48-62h0c20 0 40 20 48 62z" fill="#ffffff" />
          <path d="M96 130l14 18 14-18 22 60H74z" fill="#8fc6ff" />
          <rect x="104" y="138" width="12" height="24" rx="6" fill="#ff7f7f" />
          <circle cx="95" cy="84" r="4" fill="#183153" />
          <circle cx="125" cy="84" r="4" fill="#183153" />
          <path d="M95 101c8 7 22 7 30 0" fill="none" stroke="#183153" strokeWidth="4" strokeLinecap="round" />
          <path d="M74 190h72" fill="none" stroke="#d5e8ff" strokeWidth="10" strokeLinecap="round" />
        </svg>
      </div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
        <p className={`mb-3 inline-flex rounded-full border px-3 py-1 text-xs font-black ${
          (risk || "low").toLowerCase() === "high"
            ? "border-red-400/20 bg-red-400/10 text-red-100"
            : (risk || "low").toLowerCase() === "medium"
              ? "border-amber-400/20 bg-amber-400/10 text-amber-100"
              : "border-emerald-400/20 bg-emerald-400/10 text-emerald-100"
        }`}
        >
          {loading ? "Analyzing..." : risk ? `${risk} Risk` : "Awaiting analysis"}
        </p>
        <p className="text-sm leading-6 text-slate-300">
          {loading
            ? "The doctor avatar is preparing a spoken summary of this analysis."
            : explanation ||
              "Once the result is ready, the avatar will read out the AI health explanation for a polished demo."}
        </p>
      </div>

      <button
        type="button"
        className="mt-5 w-full rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-black text-slate-200 transition hover:scale-[1.02] hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
        disabled={!explanation || loading}
        onClick={replayVoice}
      >
        Replay Voice Summary
      </button>
    </div>
  );
}

export default Avatar;
