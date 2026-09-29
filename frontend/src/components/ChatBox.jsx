import { useEffect, useRef, useState } from "react";
import { sendChatMessage } from "../services/api";

const welcomeMessage = {
  role: "ai",
  content: "I am ready to discuss your latest health analysis. Ask me anything about your readings.",
};

function speak(text) {
  if (!text || typeof window === "undefined" || !("speechSynthesis" in window)) {
    return;
  }

  const speech = new SpeechSynthesisUtterance(text);
  speech.rate = 0.92;
  speech.pitch = 1;
  speech.lang = "en-US";
  window.speechSynthesis.cancel();
  window.speechSynthesis.speak(speech);
}

function ChatBox({ healthData }) {
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isThinking, setIsThinking] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [aiGlow, setAiGlow] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef(null);
  const recognitionRef = useRef(null);
  const streamIntervalRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isThinking, isStreaming]);

  useEffect(() => {
    return () => {
      if (streamIntervalRef.current) {
        window.clearInterval(streamIntervalRef.current);
      }
      recognitionRef.current?.stop();
      window.speechSynthesis?.cancel();
    };
  }, []);

  const streamAiMessage = (reply) => {
    const safeReply = reply || "I could not generate a response. Please try again.";
    let index = 0;

    if (streamIntervalRef.current) {
      window.clearInterval(streamIntervalRef.current);
    }

    setAiGlow(true);
    setIsStreaming(true);
    setMessages((current) => [...current, { role: "ai", content: "" }].slice(-8));

    streamIntervalRef.current = window.setInterval(() => {
      index += 2;
      setMessages((current) =>
        current.map((message, messageIndex) =>
          messageIndex === current.length - 1
            ? { ...message, content: safeReply.slice(0, index) }
            : message,
        ),
      );

      if (index >= safeReply.length) {
        window.clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
        setIsStreaming(false);
        window.setTimeout(() => setAiGlow(false), 900);
        speak(safeReply);
      }
    }, 18);
  };

  const sendMessage = async (messageText = input) => {
    const trimmedMessage = messageText.trim();
    if (!trimmedMessage || !healthData || isThinking || isStreaming) {
      return;
    }

    const userMessage = { role: "user", content: trimmedMessage };
    const history = [...messages, userMessage].slice(-5);

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setIsThinking(true);

    try {
      const response = await sendChatMessage({
        message: trimmedMessage,
        health_data: healthData,
        history,
      });
      streamAiMessage(response.reply);
    } catch {
      setError("AI doctor is unavailable right now. Please try again.");
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    sendMessage();
  };

  const startVoiceInput = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setError("Voice input is not supported in this browser.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setIsListening(true);
      setError("");
    };

    recognition.onerror = () => {
      setIsListening(false);
      setError("Could not hear clearly. Please try the mic again.");
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      sendMessage(transcript);
    };

    recognitionRef.current = recognition;
    recognition.start();
  };

  return (
    <div className="mx-auto max-w-5xl overflow-hidden rounded-2xl border border-white/10 bg-white/[0.05] p-6 shadow-xl shadow-black/10 backdrop-blur-xl">
      <div className="mb-6 flex items-start gap-4">
        <div
          className={`grid h-14 w-14 shrink-0 place-items-center rounded-2xl border bg-blue-400/15 font-black text-blue-100 transition ${
            aiGlow ? "border-blue-200/50 shadow-[0_0_38px_rgba(59,130,246,0.65)]" : "border-white/10 shadow-lg shadow-blue-500/10"
          }`}
        >
          AI
        </div>
        <div>
          <p className="text-xs font-black uppercase tracking-[0.26em] text-cyan-200/70">AI doctor consultation</p>
          <h2 className="mt-2 text-2xl font-black text-white">Real-Time Doctor Chat</h2>
          <p className="mt-2 text-sm text-slate-400">
            Ask follow-up questions. The assistant remembers the latest messages and your health data.
          </p>
        </div>
      </div>

      <div className="flex max-h-[420px] min-h-[300px] flex-col gap-3 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/40 p-4 scroll-smooth" aria-live="polite">
        {messages.map((message, index) => (
          <div
            className={`w-fit max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
              message.role === "user"
                ? "ml-auto bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-lg shadow-blue-500/20"
                : "mr-auto border border-white/10 bg-white/[0.07] text-slate-100"
            }`}
            key={`${message.role}-${index}`}
          >
            <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.16em] opacity-70">{message.role === "user" ? "You" : "AI Doctor"}</span>
            <p className="whitespace-pre-line">{message.content}</p>
          </div>
        ))}
        {isThinking ? (
          <div className="mr-auto w-fit max-w-[82%] rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-slate-100">
            <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.16em] opacity-70">AI Doctor</span>
            <p className="flex items-center gap-2">
              AI is thinking
              <span className="flex gap-1">
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.2s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-300 [animation-delay:-0.1s]" />
                <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-blue-300" />
              </span>
            </p>
          </div>
        ) : null}
        <div ref={messagesEndRef} />
      </div>

      {error ? <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm font-semibold text-red-100">{error}</p> : null}
      {!healthData ? (
        <p className="mt-4 text-sm text-slate-500">Run a health analysis first so the chat can use patient context.</p>
      ) : null}

      <form className="mt-4 grid gap-3 md:grid-cols-[1fr_auto_auto]" onSubmit={handleSubmit}>
        <input
          className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
          disabled={!healthData || isThinking || isStreaming}
          onChange={(event) => setInput(event.target.value)}
          placeholder="Ask: Is my sugar level dangerous?"
          type="text"
          value={input}
        />
        <button
          className="rounded-xl border border-white/10 bg-white/[0.05] px-5 py-3 text-sm font-black text-slate-200 transition hover:scale-[1.02] hover:bg-white/[0.08] disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!healthData || isThinking || isStreaming || isListening}
          onClick={startVoiceInput}
          type="button"
        >
          {isListening ? "Listening..." : "Mic"}
        </button>
        <button
          className="rounded-xl bg-gradient-to-r from-blue-600 to-cyan-400 px-5 py-3 text-sm font-black text-white shadow-[0_0_30px_rgba(37,99,235,0.28)] transition hover:scale-[1.02] hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-60"
          disabled={!healthData || isThinking || isStreaming}
          type="submit"
        >
          Send
        </button>
      </form>
    </div>
  );
}

export default ChatBox;
