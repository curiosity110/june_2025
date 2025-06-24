import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailByType } from "@/lib/email";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = cookies();
  const secret = cookieStore.get("admin_secret")?.value;
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { id, forceSend } = await req.json();
  if (!id) {
    return NextResponse.json({ error: "Missing id" }, { status: 400 });
  }

  const entry = await prisma.emailQueue.findUnique({ where: { id } });
  if (!entry) {
    return NextResponse.json({ error: "Not found" }, { status: 404 });
  }

  const result = await sendEmailByType({ email: entry.email, productSlug: entry.product, forceSend });
  if (result.success) {
    await prisma.emailQueue.update({ where: { id }, data: { status: 'delivered' } });
    return NextResponse.json({ success: true });
  } else {
    await prisma.emailQueue.update({ where: { id }, data: { reason: result.error || 'failed', retryAt: new Date(Date.now() + 24*60*60*1000) } });
    return NextResponse.json({ success: false, error: result.error });
  }
}
