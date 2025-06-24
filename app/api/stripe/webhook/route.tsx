import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { logPurchase } from "@/lib/purchase"

export const config = {
  api: {
    bodyParser: false, // Needed to prevent body from being parsed!
  },
}

const stripeSecret = process.env.STRIPE_SECRET_KEY
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET

if (!stripeSecret || !webhookSecret) {
  throw new Error("Stripe environment variables are not set")
}

const stripe = new Stripe(stripeSecret, {
  apiVersion: "2025-05-28.basil",
})

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer()
  const signature = req.headers.get("stripe-signature")

  if (!signature) {
    return new NextResponse("Missing signature", { status: 400 })
  }

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(Buffer.from(rawBody), signature, webhookSecret)
  } catch (err) {
    console.error("Webhook signature verification failed.", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.customer_details?.email && session.metadata?.slug) {
      await logPurchase(session.customer_details.email, session.metadata.slug, {
        name: session.customer_details.name || "",
        phone: session.customer_details.phone || "",
      })
    }
  }

  return new NextResponse(null, { status: 200 })
}
