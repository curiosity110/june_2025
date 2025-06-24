import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

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
}

