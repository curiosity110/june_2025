// app/api/checkout/route.ts
import { NextResponse } from "next/server"
import Stripe from "stripe"
import { products } from "@/lib/products"

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil"
})

export async function POST(req: Request) {
  const { slug } = await req.json()

  const product = products[slug]
  if (!product) {
    return NextResponse.json({ error: "Invalid product." }, { status: 400 })
  }

  const successUrl = process.env.STRIPE_SUCCESS_URL?.replace("[slug]", slug) ?? "http://localhost:3000"
  const cancelUrl = process.env.STRIPE_CANCEL_URL?.replace("[slug]", slug) ?? "http://localhost:3000"

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: product.price,
            product_data: {
              name: product.title,
            },
          },
          quantity: 1,
        },
      ],
      success_url: successUrl,
      cancel_url: cancelUrl,
      metadata: { slug },
    })

    return NextResponse.json({ url: session.url })
  } catch (err) {
    console.error("Stripe checkout error", err)
    return NextResponse.json({ error: "Stripe session failed" }, { status: 500 })
  }
}
