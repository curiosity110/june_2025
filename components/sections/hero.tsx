"use client"
import { useState } from "react"
import { Button } from "@/components/ui/button"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function HeroSection() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [credits] = useState(25)

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = { role: "user" as const, content: input }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput("")
    setLoading(true)

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      })
      const data = await res.json()
      if (data.message) {
        setMessages([...newMessages, { role: "assistant", content: data.message }])
      }
    } finally {
      setLoading(false)
    }
  }

  return (
        <section className="bg-[#0f0f1c] border-b border-[#1f1f2e] px-6 py-20 rounded-b-2xl max-w-6xl mx-auto shadow-lg relative">
          {/* <section className="bg-[#232336] border-b border-[#2a2a3a] shadow-lg rounded-b-2xl"> */}


      <div className="flex flex-col gap-10 sm:flex-row justify-between items-start sm:items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4 leading-tight">
            THE ULTIMATE<br /> BRANDING COURSE
          </h1>
          <p className="text-accent text-lg font-medium mb-6">
            AI POWER. SOUL-DRIVEN IMPACT.<br /> ENROLL INSTANTLY.
          </p>
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 rounded-md">Get Started</Button>
        </div>

        {/* <div className="absolute top-6 right-6 bg-[#1f1f2e] text-sm text-white px-4 py-3 rounded-lg shadow-md">
          <p className="font-semibold mb-1">Hello</p>
          <p className="text-xs text-text-soft">How can I help you?</p>
        </div> */}
        <div className="absolute top-6 right-6 bg-[#1f1f2e] text-sm text-white p-4 rounded-lg shadow-md w-72">
          <div className="h-40 overflow-y-auto space-y-2 mb-2 text-xs">
            {messages.length === 0 && (
              <p className="text-text-soft">How can I help you?</p>
            )}
            {messages.map((m, i) => (
              <p key={i} className={m.role === "user" ? "text-yellow-300 text-right" : "text-purple-200"}>
                {m.content}
              </p>
            ))}
          </div>
          <form onSubmit={sendMessage} className="flex gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask the AI..."
              className="flex-grow rounded-md bg-[#2c2c40] px-2 py-1 text-white placeholder-gray-400"
            />
            <Button type="submit" disabled={loading} className="px-3 py-1 text-xs">
              {loading ? "..." : "Send"}
            </Button>
          </form>
        </div>

        {open && (
          <div className="fixed inset-0 bg-black/80 z-50 p-6 flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl text-white font-bold animate-pulse">AI Codex: You Ask. It Delivers.</h2>
              <button onClick={() => setOpen(false)} className="text-gray-300">✕</button>
            </div>
            <div className="text-white text-sm mb-4">💰 You have {credits} Credits</div>
            <div className="flex gap-2 mb-4 text-xs">
              <button className="bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">+10 Credits Free Guide</button>
              <button className="bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">Mini Course 49 Credits</button>
              <button className="bg-gray-800 px-2 py-1 rounded hover:bg-gray-700">Hero Course 497 CHF 🔥</button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-2 mb-2 text-sm">
              {messages.length === 0 && (
                <p className="text-text-soft">How can I help you?</p>
              )}
              {messages.map((m, i) => (
                <p key={i} className={m.role === "user" ? "text-yellow-300 text-right" : "text-purple-200"}>
                  {m.content}
                </p>
              ))}
              {loading && <p className="text-purple-200 animate-pulse">Codex is typing…</p>}
            </div>
            <form onSubmit={sendMessage} className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask the AI..."
                className="flex-grow rounded-md bg-[#2c2c40] px-2 py-1 text-white placeholder-gray-400"
              />
              <Button type="submit" disabled={loading} className="px-3 py-1 text-xs">
                {loading ? "..." : "Send"}
              </Button>
            </form>
            <div className="text-center mt-4 text-sm text-white font-semibold">
              Unlock Full AI Mode — 497 CHF Hero Course
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

