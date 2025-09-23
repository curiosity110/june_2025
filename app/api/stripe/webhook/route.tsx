import { NextResponse } from "next/server"
import { createScopedLogger } from "@/utils/logger"

const log = createScopedLogger("api:stripe-webhook")

// Stripe webhook is disabled in dummy payment mode.
export async function POST() {
  log.info("Webhook stubbed")
  return NextResponse.json({ ok: true })
}
