import { useRef } from "react";
import AnalysisSection from "../sections/AnalysisSection";
import AnalyticsSection from "../sections/AnalyticsSection";
import CameraSection from "../sections/CameraSection";
import ChatSection from "../sections/ChatSection";
import HeroSection from "../sections/HeroSection";
import HistorySection from "../sections/HistorySection";
import MetricsSection from "../sections/MetricsSection";
import SettingsSection from "../sections/SettingsSection";
import useHealthDashboard from "../hooks/useHealthDashboard";

function Dashboard() {
  const analysisRef = useRef(null);
  const chatRef = useRef(null);
  const exerciseRef = useRef(null);

  const {
    formData,
    displayResult,
    healthData,
    displayVitals,
    history,
    loading,
    error,
    updateField,
    analyze,
    useSample,
  } = useHealthDashboard();

  const scrollToAnalysis = () => {
    analysisRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToChat = () => {
    chatRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const scrollToExercise = () => {
    exerciseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    analyze();
  };

  return (
    <div className="space-y-12 px-6 pb-10">

      {/* 🔥 HERO */}
      <HeroSection
        result={displayResult}
        onStart={scrollToAnalysis}
        onChat={scrollToChat}
        onExercise={scrollToExercise}
      />

      {/* 📊 METRICS */}
      <MetricsSection result={displayResult} vitals={displayVitals} />

      {/* 📈 ANALYTICS */}
      <AnalyticsSection history={history} />

      {/* 🧠 ANALYSIS */}
      <div ref={analysisRef} className="space-y-8">

        <AnalysisSection
          error={error}
          formData={formData}
          loading={loading}
          onChange={updateField}
          onSample={useSample}
          onSubmit={handleSubmit}
        />

        {/* 🚀 PREMIUM DAILY PLAN */}
        {displayResult?.daily_plan && (
          <div className="bg-gradient-to-br from-slate-900/80 to-slate-800/40 backdrop-blur-xl p-6 rounded-3xl border border-white/10 shadow-2xl animate-fadeIn transition-all duration-500">

            <h2 className="text-2xl font-bold text-white mb-6 tracking-wide">
              🌟 Your Plan for Today
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {/* 🌅 MORNING */}
              <div className="group bg-white/5 hover:bg-gradient-to-br hover:from-blue-500/20 hover:to-cyan-400/10 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🌅</span>
                  <h3 className="text-sm text-cyan-300 font-semibold tracking-wide">
                    Morning
                  </h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {displayResult.daily_plan.morning_routine}
                </p>
              </div>

              {/* 🥗 DIET */}
              <div className="group bg-white/5 hover:bg-gradient-to-br hover:from-green-500/20 hover:to-emerald-400/10 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🥗</span>
                  <h3 className="text-sm text-green-300 font-semibold tracking-wide">
                    Diet
                  </h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {displayResult.daily_plan.diet_plan}
                </p>
              </div>

              {/* 🏃 EXERCISE */}
              <div className="group bg-white/5 hover:bg-gradient-to-br hover:from-pink-500/20 hover:to-orange-400/10 p-5 rounded-2xl border border-white/10 transition-all duration-300 hover:scale-[1.04] hover:shadow-lg">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xl">🏃</span>
                  <h3 className="text-sm text-pink-300 font-semibold tracking-wide">
                    Exercise
                  </h3>
                </div>
                <p className="text-white/90 text-sm leading-relaxed">
                  {displayResult.daily_plan.exercise_plan}
                </p>
              </div>

            </div>
          </div>
        )}
      </div>

      {/* 💬 AI DOCTOR CHAT */}
      <div ref={chatRef}>
        <ChatSection healthData={healthData} />
      </div>

      {/* 🎥 AI EXERCISE COACH */}
      <div ref={exerciseRef}>
        <CameraSection />
      </div>

      {/* 📜 HISTORY */}
      <HistorySection history={history} />

      {/* ⚙️ SETTINGS */}
      <SettingsSection />

    </div>
  );
}

export default Dashboard;