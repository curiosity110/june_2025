import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendEmailByType } from "@/lib/email";

export async function POST(req: Request) {
  const { searchParams } = new URL(req.url);
  const secret = searchParams.get("secret");
  if (secret !== process.env.NEXT_PUBLIC_ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { product, status, email, forceSend } = await req.json();

  const queue = await prisma.emailQueue.findMany({
    where: {
      ...(product ? { product } : {}),
      ...(status ? { status } : {}),
      ...(email ? { email } : {}),
    },
  });

  let count = 0;
  for (const entry of queue) {
    const result = await sendEmailByType({ email: entry.email, productSlug: entry.product, forceSend });
    if (result.success) {
      await prisma.emailQueue.update({ where: { id: entry.id }, data: { status: "delivered" } });
      count++;
    } else {
      await prisma.emailQueue.update({
        where: { id: entry.id },
        data: { reason: result.error || "failed", retryAt: new Date(Date.now() + 24 * 60 * 60 * 1000) },
      });
    }
  }

  return NextResponse.json({ success: true, count });
}
