import { NextResponse } from "next/server";
import { prisma } from "db/client";
import { Resend } from "resend";
import { cookies } from "next/headers";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const secret = cookieStore.get("admin_secret")?.value;
  if (secret !== process.env.ADMIN_SECRET) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { emails, subject, html, mode } = await req.json();
  if (!emails || !Array.isArray(emails) || !subject || !html) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  const unique = Array.from(new Set(emails.map((e: string) => e.trim()).filter(Boolean)));
  const allowed: string[] = [];
  for (const email of unique) {
    const log = await prisma.emailLog.findUnique({
      where: { email_template: { email, template: "custom" } },
    });
    if (log && log.count >= 3) continue;
    allowed.push(email);
    if (log) {
      await prisma.emailLog.update({
        where: { email_template: { email, template: "custom" } },
        data: { count: { increment: 1 }, sentAt: new Date() },
      });
    } else {
      await prisma.emailLog.create({
        data: { email, product: "manual", template: "custom" },
      });
    }
  }

  if (!allowed.length) {
    return NextResponse.json({ error: "No eligible recipients" }, { status: 400 });
  }

  if (!process.env.RESEND_API_KEY) {
    return NextResponse.json({ error: "Email service not configured" }, { status: 500 });
  }
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = process.env.EMAIL_FROM || "info@ubc-finance.com";
  if (mode === "bcc") {
    await resend.emails.send({ from, to: from, bcc: allowed, subject, html });
  } else {
    for (const email of allowed) {
      await resend.emails.send({ from, to: email, subject, html });
    }
  }

  return NextResponse.json({ success: true, sentCount: allowed.length });
}
