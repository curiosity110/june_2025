import { NextResponse } from "next/server"

// Stripe webhook is disabled in dummy payment mode.
export async function POST() {
  console.log("Webhook stubbed")
  return NextResponse.json({ ok: true })
}
