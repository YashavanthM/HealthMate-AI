import { Camera } from "@mediapipe/camera_utils";
import { POSE_CONNECTIONS, Pose } from "@mediapipe/pose";
import { useEffect, useRef, useState } from "react";

/* ---------- UTILS ---------- */

function getAngle(a, b, c) {
  const ab = { x: a.x - b.x, y: a.y - b.y };
  const cb = { x: c.x - b.x, y: c.y - b.y };

  const dot = ab.x * cb.x + ab.y * cb.y;
  const magAB = Math.sqrt(ab.x ** 2 + ab.y ** 2);
  const magCB = Math.sqrt(cb.x ** 2 + cb.y ** 2);

  const angle = Math.acos(dot / (magAB * magCB));
  return (angle * 180) / Math.PI;
}

function speak(text) {
  const u = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(u);
}

function drawSkeleton(ctx, landmarks, goodForm) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  ctx.strokeStyle = goodForm ? "#00ff88" : "#ff3b3b";
  ctx.lineWidth = 4;

  POSE_CONNECTIONS.forEach(([s, e]) => {
    const a = landmarks[s];
    const b = landmarks[e];
    if (!a || !b || a.visibility < 0.5 || b.visibility < 0.5) return;

    ctx.beginPath();
    ctx.moveTo(a.x * ctx.canvas.width, a.y * ctx.canvas.height);
    ctx.lineTo(b.x * ctx.canvas.width, b.y * ctx.canvas.height);
    ctx.stroke();
  });
}

/* ---------- COMPONENT ---------- */

export default function ExerciseDetector() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const cameraRef = useRef(null);
  const poseRef = useRef(null);

  const phaseRef = useRef("up");
  const lastRepTime = useRef(0);

  const [reps, setReps] = useState(0);
  const [feedback, setFeedback] = useState("Stand straight to begin");
  const [accuracy, setAccuracy] = useState(100);
  const [goodForm, setGoodForm] = useState(true);
  const [tracking, setTracking] = useState(false);

  useEffect(() => {
    return () => {
      cameraRef.current?.stop();
      poseRef.current?.close();
    };
  }, []);

  const handleResults = (res) => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    const lm = res.poseLandmarks;
    if (!lm) return;

    const hip = lm[24];
    const knee = lm[26];
    const ankle = lm[28];

    // ❌ Ignore if person not clearly visible
    if (hip.visibility < 0.5 || knee.visibility < 0.5) {
      setFeedback("Adjust your position");
      return;
    }

    const kneeAngle = getAngle(hip, knee, ankle);

    let formGood = true;
    let score = 100;

    /* ---------- FORM LOGIC ---------- */

    if (kneeAngle > 165) {
      setFeedback("Go lower");
      formGood = false;
      score = 60;
    } else if (kneeAngle < 70) {
      setFeedback("Too low — risk of injury");
      formGood = false;
      score = 65;
    } else {
      setFeedback("Perfect squat");
      score = 95;
    }

    setAccuracy(score);
    setGoodForm(formGood);

    /* ---------- REP LOGIC (FIXED) ---------- */

    const now = Date.now();

    // DOWN phase
    if (kneeAngle < 100 && phaseRef.current === "up") {
      phaseRef.current = "down";
    }

    // UP phase → count rep
    if (
      kneeAngle > 160 &&
      phaseRef.current === "down" &&
      now - lastRepTime.current > 1200 // cooldown
    ) {
      phaseRef.current = "up";
      lastRepTime.current = now;

      setReps((r) => r + 1);

      if (formGood) {
        speak("Good rep");
      } else {
        speak("Improve form");
      }
    }

    drawSkeleton(ctx, lm, formGood);
  };

  const start = async () => {
    if (!videoRef.current) return;

    const pose = new Pose({
      locateFile: (f) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${f}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
    });

    pose.onResults(handleResults);
    poseRef.current = pose;

    cameraRef.current = new Camera(videoRef.current, {
      onFrame: async () => {
        await pose.send({ image: videoRef.current });
      },
      width: 640,
      height: 480,
    });

    await cameraRef.current.start();

    setTracking(true);
    speak("AI trainer started");
  };

  const stop = () => {
    cameraRef.current?.stop();
    poseRef.current?.close();

    setTracking(false);
    phaseRef.current = "up";

    speak("Training stopped");
  };

  return (
    <div className="bg-[#0f172a] p-6 rounded-2xl shadow-xl space-y-6">

      <h2 className="text-white text-2xl font-bold">
        🧠 AI Exercise Coach
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* CAMERA */}
        <div className="relative rounded-xl overflow-hidden border border-white/10">
          <video ref={videoRef} autoPlay muted className="w-full" />
          <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full"
          />

          {/* STATUS */}
          <div className="absolute top-3 left-3 px-3 py-1 bg-black/60 text-white text-sm rounded">
            {tracking ? "🟢 AI Tracking Active" : "🔴 Stopped"}
          </div>

          {/* DEMO OVERLAY */}
          <div className="absolute bottom-3 right-3 w-20 opacity-70">
            <img
              src="https://media.giphy.com/media/l0HlQ7LRalQqdWfao/giphy.gif"
              alt="exercise demo"
              className="rounded-lg"
            />
          </div>
        </div>

        {/* PANEL */}
        <div className="text-white flex flex-col items-center justify-center space-y-4">

          {/* Avatar */}
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-3xl shadow-lg">
            🧑‍⚕️
          </div>

          {/* Feedback */}
          <div className="text-lg font-semibold text-center">
            {feedback}
          </div>

          {/* Reps */}
          <div className="text-6xl font-bold text-blue-400">
            {reps}
          </div>

          {/* Accuracy */}
          <div className={`text-xl font-bold ${goodForm ? "text-green-400" : "text-red-400"}`}>
            Accuracy: {accuracy}%
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-4">
            <button
              onClick={start}
              className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Start
            </button>

            <button
              onClick={stop}
              className="bg-red-500 px-4 py-2 rounded-lg hover:bg-red-600"
            >
              Stop
            </button>

            <button
              onClick={() => setReps(0)}
              className="bg-gray-700 px-4 py-2 rounded-lg"
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}