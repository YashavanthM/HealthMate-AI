import { useEffect } from "react";

function DoctorAvatar({ analysisText, risk }) {
  useEffect(() => {
    if (!analysisText || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return undefined;
    }

    const synth = window.speechSynthesis;
    const utterance = new SpeechSynthesisUtterance(analysisText);
    const voices = synth.getVoices();
    const preferredVoice =
      voices.find((voice) =>
        /zira|samantha|female|google us english/i.test(voice.name),
      ) || voices[0];

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.rate = 1;
    utterance.pitch = 1.05;
    utterance.volume = 1;

    synth.cancel();
    synth.speak(utterance);

    return () => {
      synth.cancel();
    };
  }, [analysisText]);

  const replayVoice = () => {
    if (!analysisText || typeof window === "undefined" || !("speechSynthesis" in window)) {
      return;
    }

    const utterance = new SpeechSynthesisUtterance(analysisText);
    utterance.rate = 1;
    utterance.pitch = 1.05;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="card card--avatar">
      <div className="section-heading">
        <p className="eyebrow">AI doctor avatar</p>
        <h2>Voice Guidance</h2>
      </div>

      <div className="doctor-avatar">
        <svg viewBox="0 0 220 220" className="doctor-avatar__svg" role="img" aria-label="Doctor avatar">
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

      <div className="speech-bubble">
        <p className={`risk-pill risk-pill--${(risk || "low").toLowerCase()}`}>
          {risk ? `${risk} Risk` : "Awaiting analysis"}
        </p>
        <p>
          {analysisText ||
            "Once the analysis is ready, the doctor avatar will read the AI health summary aloud for a polished demo."}
        </p>
      </div>

      <button
        type="button"
        className="button button--secondary"
        disabled={!analysisText}
        onClick={replayVoice}
      >
        Replay Voice Summary
      </button>
    </div>
  );
}

export default DoctorAvatar;
