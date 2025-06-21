// app/api/checkout/route.ts
import Stripe from "stripe"
import { NextResponse } from "next/server"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
})

export async function POST(req: Request) {
  const body = await req.json()
  const { slug } = body

  // Match slug to product
  const products: Record<string, { name: string; price: number }> = {
    "affiliate-playbook": { name: "Affiliate Playbook", price: 1700 }, // €17
    "prompt-engineering": { name: "Prompt Engineering", price: 2700 }, // €27
  }

  const product = products[slug]
  if (!product) return NextResponse.json({ error: "Invalid product" }, { status: 400 })

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    line_items: [
      {
        price_data: {
          currency: "eur",
          product_data: {
            name: product.name,
          },
          unit_amount: product.price,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
    success_url: `${process.env.STRIPE_SUCCESS_URL.replace("[slug]", slug)}?success=true`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
    metadata: {
      slug,
    },
  })

  return NextResponse.json({ url: session.url })
}
