import { Resend } from "resend";
import { products } from "@/lib/products";
import { prisma } from "@/lib/prisma";

type EmailType = "freebie" | "ebook" | "bundle" | "course" | "ai";

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
  const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${slug}.pdf`;
  const bonus = {
    bundle: "Enjoy your bundle with all future updates.",
    course: "Welcome to the course! Check your dashboard for updates.",
    ai: "Unlock AI bonuses inside the download.",
    freebie: "Here's your free resource.",
    default: "Thanks for being part of our community!",
  }[type] || bonus.default;

  return {
    subject: `Your ${product?.title || "Download"}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #eab308;">${product?.title || "Your Download"}</h2>
        <p>${product?.description || "Thank you for your purchase/download!"}</p>
        <a href="${downloadUrl}" style="display:inline-block;padding:12px 24px;background-color:#facc15;color:black;font-weight:bold;text-decoration:none;border-radius:8px;">Download</a>
        <p style="margin-top:20px">${bonus}</p>
        <p style="font-size:12px;color:#999">Need help? Just reply to this email.</p>
      </div>
    `,
  };
}

const resendClient = new Resend(process.env.RESEND_API_KEY || "");

export async function sendDownloadEmail(
  to: string,
  productName: string,
  downloadSlug: string,
  phone?: string
) {
  const fromEmail = process.env.EMAIL_FROM

  if (!process.env.NEXT_PUBLIC_SITE_URL || !process.env.RESEND_API_KEY) {
    throw new Error("Missing required environment variables.");
  }

  const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${downloadSlug}.pdf`;

  const result = await resendClient.emails.send({
    from: fromEmail,
    to,
    subject: `Your Download: ${productName}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #eab308;">You're In 🎉</h2>
        <p>Thanks for grabbing <strong>${productName}</strong>!</p>
        <a href="${downloadUrl}"
          style="display: inline-block; padding: 12px 24px; background-color: #facc15; color: black; font-weight: bold; text-decoration: none; border-radius: 8px;">
          Open Ebook
        </a>
        <p style="margin-top: 20px; font-size: 12px; color: #999;">
          📥 To save it permanently: right-click and choose <strong>"Save As"</strong>
        </p>
        <p style="font-size: 12px; color: #999;">Need help? Just reply to this email.</p>
      </div>
    `,
  });

  console.log("📬 Resend result:", result);
}

export async function sendCustomEmail(to: string, subject: string, html: string) {
  const fromEmail = "info@ubc-finance.com";

  if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");

  const result = await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });

  console.log("📬 Custom email sent:", result);
}

export async function sendEmailByType({
  email,
  productSlug,
}: {
  email: string;
  productSlug: string;
}): Promise<{ success: boolean; error?: string }> {
  const fromEmail = "info@ubc-finance.com";

  if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_SITE_URL) {
    return { success: false, error: "Missing environment variables" };
  }

  const type = getEmailType(productSlug);
  const product = products[productSlug];

  if (!product) {
    return { success: false, error: "Invalid product slug" };
  }

  const startOfDay = new Date();
  startOfDay.setHours(0, 0, 0, 0);

  const existing = await prisma.emailLog.findFirst({
    where: {
      email,
      product: productSlug,
      sentAt: { gte: startOfDay },
    },
  });

  // Optional duplicate prevention:
  // if (existing) return { success: true };

  const tpl = buildTemplate(type, productSlug);

  try {
    const res = await resendClient.emails.send({
      from: fromEmail,
      to: email,
      subject: tpl.subject,
      html: tpl.html,
    });

    console.log("📬 Email sent:", res);

    await prisma.emailLog.create({
      data: { email, product: productSlug, template: type },
    });

    return { success: true };
  } catch (err: any) {
    console.error("❌ sendEmailByType error:", err.message);

    try {
      await prisma.emailQueue.create({
        data: {
          email,
          product: productSlug,
          template: type,
          retryAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
          reason: err.message || "send failure",
          status: "queued",
        },
      });
    } catch (queueErr) {
      console.error("❌ Queue insert failed:", queueErr);
    }

    return { success: false, error: err.message };
  }
}
