//app/api/free-download/route.ts
import { NextResponse } from "next/server"
import { sendEmailByType } from "@/lib/email"
import { products } from "@/lib/products"
import { createScopedLogger } from "@/utils/logger"

const log = createScopedLogger("api:free-download")

export async function POST(req: Request) {
  try {
    const { email, slug, phone } = await req.json()
    const product = products[slug]

    if (!email || !product || !product.isFree) {
      return NextResponse.json({ success: false, error: "Invalid request" }, { status: 400 })
    }

    const result = await sendEmailByType({ email, productSlug: slug })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error || 'Email failed' }, { status: 500 })
    }

    const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${slug}.pdf`

    return NextResponse.json({ success: true, downloadUrl })
  } catch (err) {
    log.error("🔥 API /free-download error:", err)
    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 })
  }
}
