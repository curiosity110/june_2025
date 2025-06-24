import { Resend } from "resend";
import { products } from "@/lib/products";
import { prisma } from "@/lib/prisma";

type EmailType = "freebie" | "ebook" | "bundle" | "course" | "ai";

const fromEmail = `deepdigidive <${process.env.EMAIL_FROM ?? "deepdigidive info@ubc-finance.com"}>`;

const siteURL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ubc-finance.com";

const resendClient = new Resend(process.env.RESEND_API_KEY || "");

function getEmailType(slug: string): EmailType {
  const product = products[slug];
  if (!product) return "ebook";
  if (product.isFree) return "freebie";
  if (product.category === "bundle") return "bundle";
  if (product.category === "course" || slug.includes("course")) return "course";
  if (slug.includes("ai")) return "ai";
  return "ebook";
}

function buildTemplate(type: EmailType, slug: string) {
  const product = products[slug];
  const downloadUrl = `${siteURL}/downloads/${slug}.pdf`;

  const bonusText = {
    bundle: "Enjoy your bundle with all future updates.",
    course: "Welcome to the course! Check your dashboard for updates.",
    ai: "Unlock AI bonuses inside the download.",
    freebie: "Here's your free resource.",
    default: "Thanks for being part of our community!",
  };

  return {
    subject: `Your ${product?.title || "Download"}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #eab308;">${product?.title || "Your Download"}</h2>
        <p>${product?.description || "Thanks for grabbing your resource!"}</p>
        <a href="${downloadUrl}" style="display:inline-block;padding:12px 24px;background-color:#facc15;color:black;font-weight:bold;text-decoration:none;border-radius:8px;">Download</a>
        <p style="margin-top:20px">${bonusText[type] || bonusText.default}</p>
        <p style="font-size:12px;color:#999">Need help? Just reply to this email.</p>
      </div>
    `,
  };
}

export async function sendDownloadEmail(
  to: string,
  productName: string,
  downloadSlug: string,
  phone?: string
) {
  const downloadUrl = `${siteURL}/downloads/${downloadSlug}.pdf`;

  const subject = `Your Download: ${productName}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2 style="color: #eab308;">You're In 🎉</h2>
      <p>Thanks for grabbing <strong>${productName}</strong>!</p>
      <a href="${downloadUrl}" style="display:inline-block;padding:12px 24px;background-color:#facc15;color:black;font-weight:bold;text-decoration:none;border-radius:8px;">Open Ebook</a>
      <p style="margin-top:20px;font-size:12px;color:#999;">📥 Right-click → Save As to keep it</p>
      <p style="font-size:12px;color:#999;">Questions? Reply to this email.</p>
    </div>
  `;

  const res = await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });

  console.log("📬 Resend response:", res);
}

export async function sendCustomEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");

  const res = await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });

  console.log("📬 Custom email response:", res);
}

export async function sendEmailByType({
  email,
  productSlug,
}: {
  email: string;
  productSlug: string;
}): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_SITE_URL) {
    return { success: false, error: "Missing environment variables" };
  }

  const type = getEmailType(productSlug);
  const product = products[productSlug];
  if (!product) return { success: false, error: "Invalid product slug" };

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const alreadySent = await prisma.emailLog.findFirst({
    where: {
      email,
      product: productSlug,
      sentAt: { gte: today },
    },
  });

  if (alreadySent) {
    console.log("📭 Duplicate prevented for", email, productSlug);
    return { success: true };
  }

  const template = buildTemplate(type, productSlug);

  try {
    const result = await resendClient.emails.send({
      from: fromEmail,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    await prisma.emailLog.create({
      data: { email, product: productSlug, template: type },
    });

    console.log("✅ Email sent:", email, "Result:", result.id || "OK");
    return { success: true };
  } catch (err: any) {
    console.error("❌ sendEmailByType failed:", err.message);

    try {
      await prisma.emailQueue.create({
        data: {
          email,
          product: productSlug,
          template: type,
          retryAt: new Date(Date.now() + 1000 * 60 * 60 * 12), // 12h
          reason: err.message,
          status: "queued",
        },
      });
    } catch (qerr) {
      console.error("❌ Queue insert failed:", qerr);
    }

    return { success: false, error: err.message };
  }
}