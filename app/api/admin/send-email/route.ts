import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { sendCustomEmail } from "@/lib/email"

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url)
  const secret = searchParams.get("secret")

  if (secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { slug, subject, message } = await req.json()

  if (!slug || !subject || !message) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 })
  }

  const purchases = await prisma.purchase.findMany({
    where: { productSlug: slug },
    select: { email: true },
  })

  const emails = Array.from(new Set(purchases.map((p) => p.email)))

  for (const email of emails) {
    await sendCustomEmail(email, subject, message)
  }

  return NextResponse.json({ success: true, count: emails.length })
