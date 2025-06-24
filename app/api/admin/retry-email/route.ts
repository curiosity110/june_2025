import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailByType } from "@/lib/email";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const entry = await prisma.emailQueue.findUnique({ where: { id } });
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = await sendEmailByType({ email: entry.email, productSlug: entry.product });
  if (result.success) {
    await prisma.emailQueue.update({ where: { id }, data: { status: 'delivered' } });
    return NextResponse.json({ success: true });
  } else {
    await prisma.emailQueue.update({ where: { id }, data: { reason: result.error || 'failed', retryAt: new Date(Date.now() + 24*60*60*1000) } });
    return NextResponse.json({ success: false, error: result.error });
  }
}
