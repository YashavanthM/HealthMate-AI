import { Camera } from "@mediapipe/camera_utils";
import { POSE_CONNECTIONS, Pose } from "@mediapipe/pose";
import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";

const SIGNIFICANT_MOVEMENT = 0.08;

function drawSkeleton(canvas, landmarks) {
  const context = canvas.getContext("2d");
  if (!context) return;

  context.clearRect(0, 0, canvas.width, canvas.height);
  if (!landmarks) return;

  context.strokeStyle = "rgba(56, 189, 248, 0.9)";
  context.lineWidth = 4;

  POSE_CONNECTIONS.forEach(([startIndex, endIndex]) => {
    const start = landmarks[startIndex];
    const end = landmarks[endIndex];

    if (!start || !end || start.visibility < 0.45 || end.visibility < 0.45) return;

    context.beginPath();
    context.moveTo(start.x * canvas.width, start.y * canvas.height);
    context.lineTo(end.x * canvas.width, end.y * canvas.height);
    context.stroke();
  });

  landmarks.forEach((landmark) => {
    if (landmark.visibility < 0.45) return;

    context.beginPath();
    context.arc(landmark.x * canvas.width, landmark.y * canvas.height, 5, 0, Math.PI * 2);
    context.fillStyle = "#ffffff";
    context.fill();
    context.strokeStyle = "#38BDF8";
    context.lineWidth = 2;
    context.stroke();
  });
}

function CameraSection() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const cameraRef = useRef(null);
  const poseRef = useRef(null);
  const baselineYRef = useRef(null);
  const movementPhaseRef = useRef("ready");
  const previousRepsRef = useRef(0);
  const [isTracking, setIsTracking] = useState(false);
  const [reps, setReps] = useState(0);
  const [status, setStatus] = useState("Ready to start");
  const [feedback, setFeedback] = useState("Start tracking, then raise a hand or perform a simple squat.");
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    return () => {
      cameraRef.current?.stop();
      poseRef.current?.close();
    };
  }, []);

  useEffect(() => {
    if (reps <= previousRepsRef.current) {
      previousRepsRef.current = reps;
      return undefined;
    }

    setPulse(true);
    previousRepsRef.current = reps;
    const timer = window.setTimeout(() => setPulse(false), 420);
    return () => window.clearTimeout(timer);
  }, [reps]);

  const handlePoseResults = (results) => {
    const canvas = canvasRef.current;
    const video = videoRef.current;

    if (!canvas || !video) return;

    canvas.width = video.videoWidth || 640;
    canvas.height = video.videoHeight || 480;
    drawSkeleton(canvas, results.poseLandmarks);

    const landmarks = results.poseLandmarks;
    if (!landmarks) {
      setStatus("Move into frame");
      setFeedback("Step into view so HealthMate AI can see your posture.");
      return;
    }

    const leftShoulder = landmarks[11];
    const rightShoulder = landmarks[12];
    const leftWrist = landmarks[15];
    const rightWrist = landmarks[16];
    const leftHip = landmarks[23];
    const rightHip = landmarks[24];

    const shoulderY = (leftShoulder.y + rightShoulder.y) / 2;
    const hipY = (leftHip.y + rightHip.y) / 2;
    const wristY = Math.min(leftWrist.y, rightWrist.y);
    const bodyY = (shoulderY + hipY) / 2;

    if (baselineYRef.current === null) {
      baselineYRef.current = bodyY;
      setStatus("AI Tracking Active");
      return;
    }

    const movedDown = bodyY - baselineYRef.current > SIGNIFICANT_MOVEMENT;
    const handRaised = wristY < shoulderY - 0.06;

    if ((movedDown || handRaised) && movementPhaseRef.current === "ready") {
      movementPhaseRef.current = "active";
      setStatus("AI Tracking Active");
      setFeedback(handRaised ? "Hand raise detected. Keep going." : "Squat movement detected. Keep going.");
    }

    if (!movedDown && !handRaised && movementPhaseRef.current === "active") {
      movementPhaseRef.current = "ready";
      setReps((current) => current + 1);
      setFeedback("Rep counted. Great control.");
    }
  };

  const startTracking = async () => {
    if (!videoRef.current || isTracking) return;

    setStatus("Initializing camera");
    setFeedback("Camera starting. Please allow webcam access.");

    const pose = new Pose({
      locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/pose/${file}`,
    });

    pose.setOptions({
      modelComplexity: 1,
      smoothLandmarks: true,
      enableSegmentation: false,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    pose.onResults(handlePoseResults);
    poseRef.current = pose;

    cameraRef.current = new Camera(videoRef.current, {
      width: 640,
      height: 480,
      onFrame: async () => {
        if (videoRef.current) {
          await pose.send({ image: videoRef.current });
        }
      },
    });

    try {
      await cameraRef.current.start();
      setIsTracking(true);
      setStatus("AI Tracking Active");
      setFeedback("Move slowly. Raise a hand or squat down and return to count reps.");
    } catch {
      setStatus("Camera blocked");
      setFeedback("Camera access was blocked. Allow webcam permission and try again.");
    }
  };

  const stopTracking = () => {
    cameraRef.current?.stop();
    cameraRef.current = null;
    poseRef.current?.close();
    poseRef.current = null;
    baselineYRef.current = null;
    movementPhaseRef.current = "ready";
    setIsTracking(false);
    setStatus("Tracking paused");
    setFeedback("Start again when you are ready.");
  };

  const resetReps = () => {
    setReps(0);
    previousRepsRef.current = 0;
    baselineYRef.current = null;
    movementPhaseRef.current = "ready";
    setFeedback("Counter reset. Move into frame to start again.");
  };

  return (
    <section id="exercise">
      <SectionHeader
        eyebrow="Exercise"
        title="Camera Exercise Tracker"
        description="A real-time camera panel that feels like an AI fitness companion."
      />
      <Card className="p-6" hover={false}>
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="relative min-h-[360px] overflow-hidden rounded-xl border border-white/10 bg-slate-950/70">
            <video ref={videoRef} className="absolute inset-0 h-full w-full -scale-x-100 object-cover" playsInline muted />
            <canvas ref={canvasRef} className="absolute inset-0 h-full w-full -scale-x-100" />
            <div className="absolute left-4 top-4 rounded-full border border-emerald-300/20 bg-emerald-400/15 px-4 py-2 text-sm font-black text-emerald-100 shadow-[0_0_24px_rgba(34,197,94,0.22)] backdrop-blur">
              {isTracking ? "AI Tracking Active" : "Camera Ready"}
            </div>
            {!isTracking ? (
              <div className="absolute inset-0 grid place-items-center bg-slate-950/55 text-center">
                <div className="rounded-2xl border border-white/10 bg-white/[0.07] px-6 py-5 backdrop-blur">
                  <strong className="block text-lg font-black text-white">Start camera tracking</strong>
                  <span className="mt-1 block text-sm text-slate-400">HealthMate AI will count simple reps in real time.</span>
                </div>
              </div>
            ) : null}
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-6 text-center">
              <span className="text-xs font-black uppercase tracking-[0.24em] text-slate-500">Reps Count</span>
              <strong className={`mt-3 block text-6xl font-black text-white transition ${pulse ? "scale-110 text-cyan-200" : ""}`}>
                {reps}
              </strong>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
              <span className="text-xs font-black uppercase tracking-[0.22em] text-slate-500">Status</span>
              <strong className="mt-2 block text-lg text-white">{status}</strong>
            </div>
            <p className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 text-sm leading-6 text-slate-300">{feedback}</p>
            <div className="grid gap-3 sm:grid-cols-3">
              <Button disabled={isTracking} onClick={startTracking}>Start</Button>
              <Button disabled={!isTracking} onClick={stopTracking} variant="danger">Stop</Button>
              <Button onClick={resetReps} variant="secondary">Reset</Button>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

export default CameraSection;
