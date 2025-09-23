import { NextResponse } from "next/server"
import { createScopedLogger } from "@/utils/logger"

const log = createScopedLogger("api:chat")

export async function POST(req: Request) {
  const { messages } = await req.json()
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    return NextResponse.json(
      { error: "Missing OpenAI API key" },
      { status: 500 }
    )
  }

  const res = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages,
    }),
  })

  if (!res.ok) {
    log.error("OpenAI API error", await res.text())
    return NextResponse.json({ error: "AI request failed" }, { status: 500 })
  }

  const data = await res.json()
  const message = data.choices?.[0]?.message?.content || ""

  return NextResponse.json({ message })
}