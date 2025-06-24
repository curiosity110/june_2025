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
<<<<<<< HEAD
        <section className="bg-[#0f0f1c] border-b border-[#1f1f2e] px-6 py-20 rounded-b-2xl max-w-6xl mx-auto shadow-lg relative">
{/* <!--     <section className="bg-[#0f0f1c] px-6 py-20 border-t border-[#1f1f2e] rounded-b-xl max-w-6xl mx-auto shadow-lg relative"> --> */}
    {/* // <section className="bg-[#0f0f1c] px-6 py-20 rounded-xl max-w-6xl mx-auto shadow-lg mt-10 relative"> */}
{/* <!--     <section className="bg-[#0f0f1c] px-6 py-20 rounded-xl max-w-6xl mx-auto shadow-lg relative"> --> */}
=======
    // <section className="bg-[#0f0f1c] px-6 py-20 rounded-xl max-w-6xl mx-auto shadow-lg mt-10 relative">
    // <section  className="bg-[#0f0f1c] border-t border-[#1f1f2e] flex justify-between items-center py-6 px-6 max-w-6xl mx-auto">
    // <section className="bg-[#0f0f1c] border-b border-[#1f1f2e] px-6 py-20 rounded-none max-w-6xl mx-auto shadow-lg relative">
    <section className="bg-[#0f0f1c] border-b border-[#1f1f2e] px-6 py-20 rounded-b-2xl max-w-6xl mx-auto shadow-lg relative">

      {/* <section className="bg-[#0f0f1c] px-6 py-20 rounded-xl max-w-6xl mx-auto shadow-lg relative"> */}

>>>>>>> ac33bfa (header & hero merged (design))
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
      </div>
      <div className="overflow-hidden -mb-1">
        <svg
          viewBox="0 0 1440 100"
          className="w-full"
          preserveAspectRatio="none"
          fill="#151525"
        >
          <path
            d="M0,0 C600,100 840,0 1440,100 L1440,00 L0,0 Z"
            fill="url(#gradient)"
          />
          <defs>
            <linearGradient id="gradient" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="#1f1f2e" />
              <stop offset="100%" stopColor="#0f0f1c" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}
