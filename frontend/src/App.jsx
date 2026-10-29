import { useState } from "react";
import {
  Bot,
  Send,
  Loader2,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import "./App.css";

const API_URL = "http://127.0.0.1:8000";

export default function App() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Welcome to NeuralForge AI. Describe your IT issue, and I'll help you troubleshoot it.",
      model: "system",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage(e) {
    e.preventDefault();

    const question = input.trim();

    if (!question || loading) return;

    setMessages((prev) => [
      ...prev,
      { role: "user", content: question },
    ]);

    setInput("");
    setLoading(true);

    try {
      const response = await fetch(`${API_URL}/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: question,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: data.response,
          model: data.model,
          latency: data.latency_ms,
        },
      ]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            `Connection failed: ${error.message}. Check that the FastAPI backend is running.`,
          model: "error",
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <Bot size={30} />
          <div>
            <h2>NeuralForge AI</h2>
            <span>Enterprise IT Assistant</span>
          </div>
        </div>

        <div className="sidebar-content">
          <div className="status">
            <ShieldCheck size={18} />
            <span>Development Environment</span>
          </div>

          <button
            className="new-chat"
            onClick={() => {
              setMessages([]);
              setInput("");
            }}
          >
            <RotateCcw size={16} />
            New Conversation
          </button>
        </div>

        <div className="sidebar-footer">
          Qwen2.5-1.5B + QLoRA
          <br />
          NeuralForge AI v1.0
        </div>
      </aside>

      <main className="main">
        <header className="header">
          <div>
            <h1>AI Troubleshooting Console</h1>
            <p>Diagnose enterprise IT issues efficiently</p>
          </div>

          <span className="badge">Development</span>
        </header>

        <section className="chat">
          {messages.length === 0 && (
            <div className="empty">
              <Bot size={46} />
              <h2>How can I help you?</h2>
              <p>
                Ask about Windows, VPN, DNS, Microsoft 365,
                Azure, Active Directory, and more.
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={`message ${message.role}`}
            >
              <div className="avatar">
                {message.role === "assistant" ? "AI" : "YOU"}
              </div>

              <div className="message-body">
                <div className="message-content">
                  {message.content}
                </div>

                {message.latency !== undefined && (
                  <div className="metadata">
                    {message.model} · {message.latency} ms
                  </div>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div className="loading">
              <Loader2 className="spinner" size={20} />
              NeuralForge is processing...
            </div>
          )}
        </section>

        <form className="composer" onSubmit={sendMessage}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe your IT issue..."
            disabled={loading}
          />

          <button type="submit" disabled={loading || !input.trim()}>
            <Send size={20} />
          </button>
        </form>
      </main>
    </div>
  );
}