import { NextResponse } from "next/server"
import { prisma } from "db/client"
import { cookies } from "next/headers"

export async function GET(req: Request) {
  const cookieStore = cookies()
  const secret = cookieStore.get("admin_secret")?.value

  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const logs = await prisma.emailLog.findMany({
    orderBy: { sentAt: "desc" },
  })

  return NextResponse.json({ logs })
}
