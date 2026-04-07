import { useState } from "react"
//Prompt for AI
const SYSTEM_PROMPT = `You are Lumpy Space Princess, a dramatic and funny AI assistant living on this portfolio website. You are helpful but always a bit dramatic, keep answers short and fun. Start the chat with saying that the portfolio is not ready!`

export default function Chat({ onClose }) {
  const [messages, setMessages] = useState([
    { role: "assistant", content: "Oh my GLOB, a visitor! Portfolio is not ready! But she is working on it... 💜" }
  ])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)

  async function sendMessage() {
    if (!input.trim()) return
    const userMessage = { role: "user", content: input }
    const updated = [...messages, userMessage]
    setMessages(updated)
    setInput("")
    setLoading(true)

    //API call to Claude Sonner

    try {
      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": import.meta.env.VITE_ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "anthropic-dangerous-direct-browser-access": "true"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-5",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: updated
        })
      })

      const data = await res.json()
      console.log("API response:", data)
      if (!res.ok) {
        throw new Error(data.error?.message || `HTTP ${res.status}`)
      }
      const reply = data.content?.[0]?.text || "Oh glob something went wrong!"
      setMessages([...updated, { role: "assistant", content: reply }])
    } catch (err) {
      console.error("Chat error:", err)
      setMessages([...updated, { role: "assistant", content: `Error: ${err.message}` }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ position: "fixed", bottom: 20, right: 20, width: 320, background: "#1a0a2e", border: "1px solid #7f5af0", borderRadius: 12, overflow: "hidden", fontFamily: "sans-serif" }}>
      <div style={{ padding: "10px 16px", background: "#2d1b69", color: "#c4b5fd", fontSize: 13, fontWeight: 600 }}>
        💜 
         <button onClick={onClose} style={{ background: "none", border: "none", color: "#c4b5fd", cursor: "pointer", fontSize: 16 }}>✕</button>
      </div>
      <div style={{ padding: 12, height: 220, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
        {messages.map((m, i) => (
          <div key={i} style={{ alignSelf: m.role === "user" ? "flex-end" : "flex-start", background: m.role === "user" ? "#7f5af0" : "#2d1b69", color: "#fff", borderRadius: 10, padding: "8px 12px", fontSize: 13, maxWidth: "85%" }}>
            {m.content}
          </div>
        ))}
        {loading && <div style={{ alignSelf: "flex-start", color: "#c4b5fd", fontSize: 13 }}>yyyyy...</div>}
      </div>
      <div style={{ display: "flex", borderTop: "1px solid #7f5af0" }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === "Enter" && sendMessage()}
          placeholder="Ask LSP something..."
          style={{ flex: 1, background: "transparent", border: "none", padding: "10px 12px", color: "#fff", fontSize: 13, outline: "none" }}
        />
        <button onClick={sendMessage} style={{ background: "#7f5af0", border: "none", color: "#fff", padding: "10px 16px", cursor: "pointer", fontSize: 13 }}>
          Send
        </button>
      </div>
    </div>
  )
}