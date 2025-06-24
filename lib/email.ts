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
  let bonus = "Thanks for being part of our community!";
  if (type === "bundle") bonus = "Enjoy your bundle with all future updates.";
  if (type === "course") bonus = "Welcome to the course! Check your dashboard for updates.";
  if (type === "ai") bonus = "Unlock AI bonuses inside the download.";
  if (type === "freebie") bonus = "Here's your free resource.";

  return {
    subject: `Your ${product.title}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #eab308;">${product.title}</h2>
        <p>${product.description}</p>
        <a href="${downloadUrl}" style="display:inline-block;padding:12px 24px;background-color:#facc15;color:black;font-weight:bold;text-decoration:none;border-radius:8px;">Download</a>
        <p style="margin-top:20px">${bonus}</p>
        <p style="font-size:12px;color:#999">Need help? Reply to this email.</p>
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
  if (process.env.NODE_ENV === "development") {
    console.log("[DEV] Skipping email send. Would send to:", to);
    return;
  }

  if (!process.env.NEXT_PUBLIC_SITE_URL || !process.env.RESEND_API_KEY) {
    throw new Error("Missing required environment variables.");
  }

  const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${downloadSlug}.pdf`;

  await resendClient.emails.send({
    from: "info@ubc-finance.com",
    to,
    subject: `Your Download: ${productName}`,
    html: `
      <div style="font-family: sans-serif; padding: 20px;">
        <h2 style="color: #eab308;">You're In 🎉</h2>
        <p>Thanks for grabbing <strong>${productName}</strong>!</p>
        <p>Your ebook is ready. Click below to open it:</p>
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
}

export async function sendCustomEmail(to: string, subject: string, html: string) {
  if (process.env.NODE_ENV === "development") {
    console.log(`[DEV] Skipping custom email to ${to} with subject ${subject}`)
    return
  }

  if (!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY')
  }

  console.log('[EMAIL DEBUG] RESEND key prefix:', process.env.RESEND_API_KEY?.slice(0, 4))
  console.log('[EMAIL DEBUG] To:', to)
  console.log('[EMAIL DEBUG] Subject length:', subject.length, 'Body length:', html.length)

  const res = await resendClient.emails.send({
    from: 'info@ubc-finance.com',
    to,
    subject,
    html,
  })
  console.log('[EMAIL DEBUG] Resend response:', res)
}

export async function sendEmailByType({
  email,
  productSlug,
}: {
  email: string
  productSlug: string
}): Promise<{ success: boolean; error?: string }> {
  if (!process.env.RESEND_API_KEY || !process.env.NEXT_PUBLIC_SITE_URL) {
    return { success: false, error: 'Missing environment variables' }
  }

  const type = getEmailType(productSlug)
  const product = products[productSlug]
  if (!product) {
    return { success: false, error: 'Invalid product slug' }
  }

  const startOfDay = new Date()
  startOfDay.setHours(0, 0, 0, 0)
  const existing = await prisma.emailLog.findFirst({
    where: {
      email,
      product: productSlug,
      sentAt: { gte: startOfDay },
    },
  })
  if (existing) {
    console.log('Duplicate send prevented for', email, productSlug)
    return { success: true }
  }

  // Check if this user already received this template type before.
  const existingType = await prisma.emailLog.findFirst({
    where: { email, template: type },
  })
  if (existingType) {
    console.log('Existing type email for', email, type)
    // Uncomment the next line to prevent re-sending the same template type.
    // return { success: true }
  }

  const tpl = buildTemplate(type, productSlug)

  console.log('[EMAIL DEBUG] RESEND key prefix:', process.env.RESEND_API_KEY?.slice(0, 4))
  console.log('[EMAIL DEBUG] To:', email)
  console.log('[EMAIL DEBUG] Subject length:', tpl.subject.length, 'Body length:', tpl.html.length)

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Would send ${type} email to`, email)
    } else {
      const res = await resendClient.emails.send({
        from: 'info@ubc-finance.com',
        to: email,
        subject: tpl.subject,
        html: tpl.html,
      })
      console.log('[EMAIL DEBUG] Resend response:', res)
    }

    await prisma.emailLog.create({
      data: { email, product: productSlug, template: type },
    })

    return { success: true }
  } catch (err: any) {
    console.error('sendEmailByType error:', err)
    try {
      await prisma.emailQueue.create({
        data: {
          email,
          product: productSlug,
          template: type,
          retryAt: new Date(Date.now() + 24 * 60 * 60 * 1000),
          reason: err.message || 'send failure',
          status: 'queued',
        },
      })
    } catch (queueErr) {
      console.error('Queue insert failed:', queueErr)
    }
    return { success: false, error: err.message }
  }
}
