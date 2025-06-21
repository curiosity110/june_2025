// // app/api/stripe/webhook/route.ts
// import { NextResponse } from "next/server"
// import Stripe from "stripe"
// import { buffer } from "micro"
// import nodemailer from "nodemailer"
// import { sendDownloadEmail } from "@/lib/email"


// await transporter.sendMail({
//   from: `"Deep Digi Dive" <${process.env.EMAIL_USER}>`,
//   to,
//   subject: "Your Digital Product is Ready!",
//   html: `
//       <p>Hi there,</p>
//       <p>Thank you for your purchase. Click below to download:</p>
//       <a href="${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${slug}.pdf">Download Now</a>
//       <p>Enjoy and feel free to reach out anytime.</p>
//       <p>– The Deep Digi Dive Team</p>
//     `,
// })


// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
// })

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// }

// export async function POST(req: Request) {
//   const rawBody = await req.arrayBuffer()
//   const signature = req.headers.get("stripe-signature") as string

//   let event: Stripe.Event

//   try {
//     event = stripe.webhooks.constructEvent(
//       Buffer.from(rawBody),
//       signature,
//       process.env.STRIPE_WEBHOOK_SECRET!
//     )
//   } catch (err) {
//     console.error("Webhook signature verification failed.", err)
//     return new NextResponse("Invalid signature", { status: 400 })
//   }

//   if (event.type === "checkout.session.completed") {
//     const session = event.data.object as Stripe.Checkout.Session
//     const email = session.customer_details?.email
//     const slug = session.metadata?.slug

//     if (email && slug) {
//       await sendDownloadEmail(email, product.name, slug)
//     }
//   }

//   return new NextResponse("OK", { status: 200 })
// }
// app/api/stripe/webhook/route.ts
import { NextRequest, NextResponse } from "next/server"
import Stripe from "stripe"
import { buffer } from "micro"
import { sendDownloadEmail } from "@/lib/email"
import { PrismaClient } from "@prisma/client"

export const config = {
  api: {
    bodyParser: false, // Needed to prevent body from being parsed!
  },
}


const prisma = new PrismaClient()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
})

export async function POST(req: NextRequest) {
  const rawBody = await req.arrayBuffer()
  const signature = req.headers.get("stripe-signature") as string

  let event: Stripe.Event

  try {
    event = stripe.webhooks.constructEvent(
      Buffer.from(rawBody),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    )
  } catch (err) {
    console.error("Webhook signature verification failed.", err)
    return new NextResponse("Invalid signature", { status: 400 })
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session
    const email = session.customer_details?.email
    const slug = session.metadata?.slug

    console.log("✅ Payment received for:", email, "slug:", slug)

    if (email && slug) {
      await prisma.purchase.create({
        data: {
          email,
          productSlug: slug,
          fullName: session.customer_details?.name || "",
          phone: session.customer_details?.phone || "",
          type: slug.includes("course") ? "course" : "ebook", // example logic
        },
      })

      await sendDownloadEmail(email, slug, slug)
    }
  }

  return new NextResponse("Webhook received", { status: 200 })
}
