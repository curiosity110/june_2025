import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";

export async function GET(req: Request) {
  const cookieStore = cookies();
  const secret = cookieStore.get("admin_secret")?.value;
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const queue = await prisma.emailQueue.findMany({
    where: { status: 'queued' },
    orderBy: { retryAt: 'asc' },
  });
  return NextResponse.json({ queue });
}
