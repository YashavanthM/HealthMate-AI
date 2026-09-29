import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import Card from "../ui/Card";
import SectionHeader from "../ui/SectionHeader";
import { sendChatMessage } from "../lib/api";

const initialMessages = [
  {
    role: "ai",
    content: "I am ready to discuss your latest health analysis. Ask me anything about your readings.",
  },
];

function ChatSection({ healthData }) {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState("");
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, thinking]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const message = input.trim();

    if (!message || thinking || !healthData) {
      return;
    }

    const userMessage = { role: "user", content: message };
    const history = [...messages, userMessage].slice(-5);

    setMessages((current) => [...current, userMessage]);
    setInput("");
    setError("");
    setThinking(true);

    try {
      const response = await sendChatMessage({
        message,
        health_data: healthData,
        history,
      });

      setMessages((current) => [...current, { role: "ai", content: response.reply }].slice(-8));
    } catch (requestError) {
      setError(requestError.message || "AI doctor is unavailable right now.");
    } finally {
      setThinking(false);
    }
  };

  return (
    <section>
      <SectionHeader
        eyebrow="AI Doctor"
        title="Context-Aware Chat"
        description="A focused consultation panel with patient context and smooth auto-scroll."
      />

      <Card className="mx-auto max-w-3xl p-6" hover={false}>
        <div className="flex max-h-[420px] min-h-[320px] flex-col gap-3 overflow-y-auto rounded-2xl border border-white/10 bg-slate-950/35 p-4">
          {messages.map((message, index) => (
            <div
              className={`w-fit max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-6 ${
                message.role === "user"
                  ? "ml-auto bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                  : "mr-auto bg-white/10 text-slate-100"
              }`}
              key={`${message.role}-${index}`}
            >
              <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.16em] opacity-70">
                {message.role === "user" ? "You" : "AI Doctor"}
              </span>
              <p className="whitespace-pre-line">{message.content}</p>
            </div>
          ))}

          {thinking ? (
            <div className="mr-auto w-fit rounded-2xl bg-white/10 px-4 py-3 text-sm text-slate-100">
              <span className="mb-1 block text-[11px] font-black uppercase tracking-[0.16em] opacity-70">
                AI Doctor
              </span>
              <p className="flex items-center gap-2">
                AI is thinking
                <span className="flex gap-1">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300 [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-cyan-300" />
                </span>
              </p>
            </div>
          ) : null}
          <div ref={endRef} />
        </div>

        {error ? <p className="mt-4 rounded-xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-100">{error}</p> : null}
        {!healthData ? <p className="mt-4 text-sm text-slate-500">Run analysis first to unlock patient-aware chat.</p> : null}

        <form className="mt-4 grid gap-3 sm:grid-cols-[1fr_auto]" onSubmit={sendMessage}>
          <input
            className="h-12 rounded-xl border border-white/10 bg-white/[0.05] px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-blue-400/50 focus:shadow-[0_0_0_4px_rgba(37,99,235,0.14)]"
            disabled={!healthData || thinking}
            onChange={(event) => setInput(event.target.value)}
            placeholder="Ask: Is my sugar level dangerous?"
            value={input}
          />
          <Button disabled={!healthData || thinking} type="submit">
            Send
          </Button>
        </form>
      </Card>
    </section>
  );
}

export default ChatSection;
