import nodemailer from "nodemailer";
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

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const resendClient = process.env.RESEND_API_KEY
  ? new Resend(process.env.RESEND_API_KEY)
  : null;

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

  if (!process.env.EMAIL_USER || !process.env.NEXT_PUBLIC_SITE_URL) {
    throw new Error("Missing required environment variables.");
  }

  const downloadUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/downloads/${downloadSlug}.pdf`;

  await transporter.sendMail({
    from: `"DeepDigiDive" <${process.env.EMAIL_USER}>`,
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

  if (!process.env.EMAIL_USER) {
    throw new Error("Missing required environment variables.")
  }

  await transporter.sendMail({
    from: `"DeepDigiDive" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
  })
}

export async function sendEmailByType({
  email,
  productSlug,
}: {
  email: string
  productSlug: string
}): Promise<{ success: boolean; error?: string }> {
  const type = getEmailType(productSlug)
  const product = products[productSlug]
  if (!product) {
    return { success: false, error: 'Invalid product slug' }
  }

  const tpl = buildTemplate(type, productSlug)

  try {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[DEV] Would send ${type} email to`, email)
    } else if (resendClient) {
      await resendClient.emails.send({
        from: `"DeepDigiDive" <${process.env.EMAIL_USER || 'noreply@deepdigidive.com'}>`,
        to: email,
        subject: tpl.subject,
        html: tpl.html,
      })
    } else {
      if (!process.env.EMAIL_USER || !process.env.NEXT_PUBLIC_SITE_URL) {
        throw new Error('Missing required environment variables.')
      }

      await transporter.sendMail({
        from: `"DeepDigiDive" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: tpl.subject,
        html: tpl.html,
      })
    }

    await prisma.emailLog.create({
      data: { email, product: productSlug, template: type },
    })

    return { success: true }
  } catch (err: any) {
    console.error('sendEmailByType error:', err)
    return { success: false, error: err.message }
  }
}
