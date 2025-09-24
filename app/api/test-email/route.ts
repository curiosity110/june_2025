// /app/api/send-bulk-email/route.ts

import { Resend } from "resend";
import { prisma } from "db/client";
import { createScopedLogger } from "@/utils/logger";


const i = 'icloud.com';
const g = 'gmail.com';
const m = 'hotmail.com';


const recipients = [
    `gjorgidelev98@gmail.com`,
    'delevdzoce@gmail.com',
    'dzoko.d@hotmail.com',
    'deepdigidive@gmail.com',
    'luckpower98@gmail.com',
    'georgiedelev@gmail.com',
];
export async function GET() {
    const resend = new Resend(process.env.RESEND_API_KEY!);

    const batchSize = 50;
    const responses = [];

    const log = createScopedLogger("api:test-email");

    for (let i = 0; i < recipients.length; i += batchSize) {
        const batch = recipients.slice(i, i + batchSize);

        const uniqueBatch = [];

        for (const email of batch) {
            const log = await prisma.emailLog.findFirst({
                where: {
                    email,
                    template: "thankyou",
                },
            });

            if (!log || log.count < 3) {
                uniqueBatch.push(email);

                await prisma.emailLog.upsert({
                    where: { email_template: { email, template: "thankyou" } },
                    update: { count: { increment: 1 }, sentAt: new Date() },
                    create: {
                        email,
                        product: "bulk-email",
                        template: "thankyou",
                        count: 1,
                    },
                });
            }
        }

        if (uniqueBatch.length === 0) continue;

        try {
            const res = await resend.emails.send({
                from: 'Gio <info@ubc-finance.com>',
                to: "gjorgidelev98@gmail.com",
                bcc: uniqueBatch,
                subject: "Just a little thanks from Gio 🍪",
                html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; max-width: 600px;">
            <h2 style="color: #facc15;">Hey friend! 🎉</h2>
            <p>You're awesome for opening this.</p>
            <p>I'm trying to building something real with 💻, ☕, and your encouragement.</p>
            <p>Here’s a cookie just for being you: <span style="font-size: 1.5rem;">🍪</span></p>
            <p><strong>THANK YOU SO MUCH</strong</p>
            <p style="font-size: 0.9rem; color: #888;">Sent with love from <strong>Your Friend Gio</strong></p>
          </div>
        `,
            });

            responses.push(res);
        } catch (error: any) {
            log.error("Resend failed:", error);
            responses.push({ error: error.message });
        }
    }

    return new Response(JSON.stringify(responses), { status: 200 });
}