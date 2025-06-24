//app/api/free-download/route.ts
import { NextResponse } from "next/server"
import { sendEmailByType } from "@/lib/email"
import { products } from "@/lib/products"

export async function POST(req: Request) {
  try {
    const { email, slug, phone } = await req.json()
    const product = products[slug]

    if (!email || !product || !product.isFree) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
    }

    await sendEmailByType({ email, productSlug: slug })

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("🔥 API /free-download error:", err)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
