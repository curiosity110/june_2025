import { NextResponse } from "next/server"
import { prisma } from "db/client"
import { sendCustomEmail } from "@/lib/email"
import { cookies } from "next/headers"

export async function POST(req: Request) {
  const cookieStore = await cookies()
  const secret = cookieStore.get("admin_secret")?.value

  if (secret !== process.env.ADMIN_SECRET) {
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

  const emails = Array.from(new Set(purchases.map((p: any) => p.email))) as string[]

  for (const email of emails) {
    await sendCustomEmail(email, subject, message)
  }

  return NextResponse.json({ success: true, count: emails.length })
}
