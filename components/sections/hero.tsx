"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function HeroSection() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: "user" as const, content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      if (data.message) {
        setMessages([
          ...newMessages,
          { role: "assistant", content: data.message },
        ]);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="bg-section border-b border-border px-6 py-20 rounded-b-2xl shadow-lg relative">
      {/* <section className="bg-[#232336] border-b border-[#2a2a3a] shadow-lg rounded-b-2xl"> */}

      <div className="flex flex-col gap-10 sm:flex-row justify-between items-start sm:items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4 leading-tight">
            THE ULTIMATE
            <br /> BRANDING COURSE
          </h1>
          <p className="text-accent text-lg font-medium mb-6">
            AI POWER. SOUL-DRIVEN IMPACT.
            <br /> ENROLL INSTANTLY.
          </p>
          <Button className="bg-highlight text-black font-bold px-6 py-2 rounded-md">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
