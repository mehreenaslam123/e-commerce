import { KeyboardEvent, useEffect, useRef, useState } from "react";
import { Navbar } from "../layouts/Navbar";
import { getStyleAdvice } from "@/api";

type ChatMessage = {
  role: "user" | "assistant";
  text: string;
};

export const StyleAdvisor = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem("style_advisor_messages");
    if (!saved) return;
    try {
      const parsed = JSON.parse(saved) as ChatMessage[];
      if (Array.isArray(parsed)) {
        setMessages(parsed);
      }
    } catch {
      localStorage.removeItem("style_advisor_messages");
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("style_advisor_messages", JSON.stringify(messages));
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    const trimmedQuestion = question.trim();
    if (!trimmedQuestion) return;

    setLoading(true);
    setError("");
    setQuestion("");
    setMessages((prev) => [...prev, { role: "user", text: trimmedQuestion }]);
    try {
      const result = await getStyleAdvice(trimmedQuestion);
      setMessages((prev) => [...prev, { role: "assistant", text: result.answer }]);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Could not get suggestion right now.";
      setMessages((prev) => [...prev, { role: "assistant", text: errorMessage }]);
      setError(err instanceof Error ? err.message : "Could not get suggestion right now.");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      if (!loading) {
        void handleAsk();
      }
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError("");
    localStorage.removeItem("style_advisor_messages");
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <section className="pt-24 pb-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col">
          <h1 className="text-4xl md:text-5xl font-light mb-3">AI Style Advisor</h1>
          <p className="text-gray-600 mb-4">
            Ask any style question and get practical outfit suggestions.
          </p>
          <div className="mb-3">
            <button
              onClick={clearChat}
              className="border border-gray-300 px-4 py-2 text-xs uppercase tracking-widest hover:bg-gray-100"
            >
              Clear Chat
            </button>
          </div>
          <div className="flex-1 overflow-y-auto border border-gray-200 bg-white p-4">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-3xl p-4 text-sm leading-relaxed whitespace-pre-wrap ${
                    message.role === "user"
                      ? "ml-auto bg-black text-white"
                      : "mr-auto bg-gray-100 text-gray-900"
                  }`}
                >
                  {message.text}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>
          <div className="mt-4 border border-gray-200 bg-white p-3">
            <textarea
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Type your message... (Enter to send, Shift+Enter for new line)"
              rows={3}
              className="w-full resize-none border border-gray-300 p-3 text-sm focus:outline-none focus:border-black"
            />
            <div className="mt-3 flex items-center justify-between">
              {error ? <div className="text-red-600 text-sm">{error}</div> : <div />}
              <button
                onClick={handleAsk}
                disabled={loading}
                className="bg-black text-white px-6 py-2 text-sm uppercase tracking-widest disabled:opacity-70"
              >
                {loading ? "Thinking..." : "Send"}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
