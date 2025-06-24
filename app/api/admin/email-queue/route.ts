import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const queue = await prisma.emailQueue.findMany({
    where: { status: 'queued' },
    orderBy: { retryAt: 'asc' },
  });
  return NextResponse.json({ queue });
}
