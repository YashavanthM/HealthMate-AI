import { useEffect, useRef, useState } from "react";
import { Pose } from "@mediapipe/pose";
import { Camera } from "@mediapipe/camera_utils";

export default function ExerciseCoach() {
  const videoRef = useRef(null);

  const [reps, setReps] = useState(0);
  const [status, setStatus] = useState("Idle");
  const [exercise, setExercise] = useState("Squat");
  const [accuracy, setAccuracy] = useState(0);
  const [feedback, setFeedback] = useState("Stand straight to begin");

  const lastState = useRef("up");
  const lastRepTime = useRef(0);

  // 🔊 Voice Coach
  const speak = (text) => {
    const msg = new SpeechSynthesisUtterance(text);
    msg.rate = 1;
    window.speechSynthesis.speak(msg);
  };

  // 📐 Angle Calculation
  const getAngle = (a, b, c) => {
    const ab = { x: a.x - b.x, y: a.y - b.y };
    const cb = { x: c.x - b.x, y: c.y - b.y };

    const dot = ab.x * cb.x + ab.y * cb.y;
    const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
    const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

    const angle = Math.acos(dot / (magAB * magCB));
    return (angle * 180) / Math.PI;
  };

  useEffect(() => {
    if (!videoRef.current) return;

    const pose = new Pose({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
    });

    pose.onResults((results) => {
      if (!results.poseLandmarks) return;

      const lm = results.poseLandmarks;

      const hip = lm[24];
      const knee = lm[26];
      const ankle = lm[28];

      const kneeAngle = getAngle(hip, knee, ankle);

      const now = Date.now();

      // 🎯 Squat Detection Logic (IMPROVED)
      if (kneeAngle < 90) {
        setStatus("Down");

        if (lastState.current === "up" && now - lastRepTime.current > 1000) {
          setReps((r) => r + 1);
          lastRepTime.current = now;

          speak("Good rep");

          setFeedback("Nice squat!");
        }

        lastState.current = "down";
      } else if (kneeAngle > 160) {
        setStatus("Up");
        lastState.current = "up";
      }

      // 📊 Accuracy Score
      const score = Math.max(0, Math.min(100, 180 - kneeAngle));
      setAccuracy(Math.round(score));

      // ⚠️ Form Feedback
      if (kneeAngle > 170) {
        setFeedback("Bend your knees more");
      } else if (kneeAngle < 60) {
        setFeedback("Too low — risk of injury");
      } else {
        setFeedback("Good form");
      }
    });

    const camera = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    camera.start();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6">
      
      {/* 🎥 CAMERA */}
      <div className="bg-gradient-to-br from-blue-900/40 to-black/40 rounded-2xl p-4 shadow-xl">
        <video
          ref={videoRef}
          className="rounded-xl w-full border border-white/10"
          autoPlay
          playsInline
        />
        <div className="mt-3 text-green-400 text-sm font-medium">
          ● AI Tracking Active
        </div>
      </div>

      {/* 📊 DATA PANEL */}
      <div className="bg-gradient-to-br from-slate-900 to-black rounded-2xl p-6 shadow-xl flex flex-col justify-between">
        
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">
            {exercise} Tracker
          </h2>

          {/* 🔢 REPS */}
          <div className="text-center">
            <div className="text-6xl font-bold text-blue-400">
              {reps}
            </div>
            <p className="text-gray-400 mt-1">Reps</p>
          </div>

          {/* 📊 ACCURACY */}
          <div className="mt-6">
            <p className="text-gray-400 text-sm">Accuracy</p>
            <div className="w-full bg-gray-800 rounded-full h-3 mt-2">
              <div
                className="bg-green-400 h-3 rounded-full transition-all"
                style={{ width: `${accuracy}%` }}
              />
            </div>
            <p className="text-green-400 text-sm mt-1">
              {accuracy}%
            </p>
          </div>

          {/* 🧠 STATUS */}
          <div className="mt-6 text-blue-400 font-medium">
            Status: {status}
          </div>

          {/* 💬 FEEDBACK */}
          <div className="mt-4 text-yellow-400 text-sm">
            {feedback}
          </div>
        </div>

        {/* 🎮 CONTROLS */}
        <div className="mt-8 flex gap-3">
          <button
            onClick={() => setReps(0)}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition"
          >
            Reset
          </button>
        </div>
      </div>
    </div>
  );
}