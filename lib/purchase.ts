import { prisma } from "@/lib/prisma";
import { sendDownloadEmail } from "@/lib/email";

export async function logPurchase(email: string, slug: string, opts?: { name?: string; phone?: string }) {
  await prisma.purchase.create({
    data: {
      email,
      productSlug: slug,
      fullName: opts?.name ?? "",
      phone: opts?.phone ?? "",
      type: slug.includes("course") ? "course" : "ebook",
    },
  });

  await sendDownloadEmail(email, slug, slug, opts?.phone);
}
