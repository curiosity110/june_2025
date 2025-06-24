import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const slug = searchParams.get("slug")
  const cookieStore = cookies()
  const secret = cookieStore.get("admin_secret")?.value

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!slug) {
    return NextResponse.json({ error: "Missing slug" }, { status: 400 })
  }

  const purchases = await prisma.purchase.findMany({
    where: { productSlug: slug },
    orderBy: { createdAt: "desc" },
  })

  return NextResponse.json({ purchases })
}
