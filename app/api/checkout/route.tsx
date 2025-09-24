// app/api/checkout/route.ts
import { NextResponse } from "next/server"
import { products } from "@/lib/products"
import { logPurchase } from "@/lib/purchase"
import { createScopedLogger } from "@/utils/logger"

const log = createScopedLogger("api:checkout")

// In dummy payment mode we skip Stripe entirely. This API simply logs a
// purchase and returns the thank-you URL to redirect the user.
export async function POST(req: Request) {
  const { slug, email } = await req.json()

  const product = products[slug]
  if (!product) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 })
  }

  try {
    const userEmail = email || process.env.TEST_EMAIL || "test@example.com"
    await logPurchase(userEmail, slug)
    return NextResponse.json({ success: true })
  } catch (err) {
    log.error("Dummy checkout error", err)
    return NextResponse.json(
      { error: "Failed to create dummy purchase" },
      { status: 500 }
    )
  }
}
