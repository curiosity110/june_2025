import { Resend } from "resend";
import { products } from "@/lib/products";
import { prisma } from "db/client";
import { createScopedLogger } from "@/utils/logger";

const log = createScopedLogger("lib:email");

type EmailType = "freebie" | "ebook" | "bundle" | "course" | "ai";

function getFromEmail(type: EmailType) {
  return type === "course"
    ? `VIRAL UBC <info@ubc-finance.com>`
    : `deepdigidive <info@ubc-finance.com>`;
}

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
  const downloadUrl = `${siteURL}/thank-you/${slug}`;

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
        <a href="${downloadUrl}" style="display:inline-block;padding:12px 24px;background-color:#facc15;color:black;font-weight:bold;text-decoration:none;border-radius:8px;">Access</a>
        <p style="margin-top:20px">${(bonusText as any)[type] || bonusText.default}</p>
        <p style="font-size:12px;color:#999">Need help? Just reply to this email.</p>
        <p style="font-size:12px;color:#666;margin-top:30px;">Sent from <a href="${siteURL}" style="color:#666;text-decoration:none;">${siteURL.replace(/^https?:\/\//,'')}</a></p>
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
  const downloadUrl = `${siteURL}/thank-you/${downloadSlug}`;

  const subject = `Your Download: ${productName}`;
  const html = `
    <div style="font-family: sans-serif; padding: 20px;">
      <h2 style="color: #eab308;">You're In 🎉</h2>
      <p>Thanks for grabbing <strong>${productName}</strong>!</p>
      <a href="${downloadUrl}" style="display:inline-block;padding:12px 24px;background-color:#facc15;color:black;font-weight:bold;text-decoration:none;border-radius:8px;">Open Ebook</a>
      <p style="margin-top:20px;font-size:12px;color:#999;">📥 Right-click → Save As to keep it</p>
      <p style="font-size:12px;color:#999;">Questions? Reply to this email.</p>
      <p style="font-size:12px;color:#666;margin-top:30px;">Sent from <a href="${siteURL}" style="color:#666;text-decoration:none;">${siteURL.replace(/^https?:\/\//,'')}</a></p>
    </div>
  `;

  const fromEmail = getFromEmail(getEmailType(downloadSlug));
  const res = await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });

  log.info("📬 Resend response:", res);
}

export async function sendCustomEmail(to: string, subject: string, html: string) {
  if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY");

  const fromEmail = getFromEmail("ebook");
  const res = await resendClient.emails.send({
    from: fromEmail,
    to,
    subject,
    html,
  });

  await prisma.emailLog.upsert({
    where: { email_template: { email: to, template: "custom" } },
    update: { count: { increment: 1 }, sentAt: new Date() },
    create: { email: to, product: "manual", template: "custom" },
  });

  log.info("📬 Custom email response:", res);
}

export async function sendEmailByType({
  email,
  productSlug,
  forceSend = false,
}: {
  email: string
  productSlug: string
  forceSend?: boolean
}): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_SITE_URL) {
    return { success: false, error: "Missing environment variables" };
  }

  const type = getEmailType(productSlug);
  const product = products[productSlug];
  if (!product) return { success: false, error: "Invalid product slug" };

  const logEntry = await prisma.emailLog.findUnique({
    where: { email_template: { email, template: type } },
  })

  if (process.env.NODE_ENV === "production" && logEntry && logEntry.count >= 3 && !forceSend) {
    return { success: true }
  }

  if (logEntry && !forceSend) {
    log.info("📭 Duplicate prevented for", email, productSlug)
    return { success: true }
  }

  const template = buildTemplate(type, productSlug);

  try {
    const fromEmail = getFromEmail(type)
    const result = await resendClient.emails.send({
      from: fromEmail,
      to: email,
      subject: template.subject,
      html: template.html,
    });

    if (logEntry) {
      await prisma.emailLog.update({
        where: { email_template: { email, template: type } },
        data: { count: { increment: 1 }, sentAt: new Date() },
      })
    } else {
      await prisma.emailLog.create({
        data: { email, product: productSlug, template: type },
      })
    }

    log.info("✅ Email sent:", email, "Result:", (result as any).id || "OK");
    return { success: true };
  } catch (err: any) {
    log.error("❌ sendEmailByType failed:", err.message);

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
      log.error("❌ Queue insert failed:", qerr);
    }

    return { success: false, error: err.message };
  }
}