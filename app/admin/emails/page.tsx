import { prisma } from "db/client";
import { products } from "@/lib/products";
import Link from "next/link";
import RetryButton from "./RetryButton";
import RetryAllButton from "./RetryAllButton";
import SendEmailPanel from "./SendEmailPanel";
import { cookies } from "next/headers";

type SP = Record<string, string | string[] | undefined>;

export const dynamic = "force-dynamic";

const toStr = (v?: string | string[]) => (Array.isArray(v) ? v[0] : v);

export default async function EmailActivityPage({
  searchParams,
}: {
  // ✅ Next 15: it's a Promise
  searchParams: Promise<SP>;
}) {
  const sp = await searchParams;
  const tab = toStr(sp.tab) ?? "sent";
  const product = toStr(sp.product);
  const status = toStr(sp.status);
  const email = toStr(sp.email);

  // ✅ cookies() is async in Next.js 15
  const cookieStore = await cookies()
  const cookie = cookieStore.get("admin_secret")?.value;
  if (cookie !== process.env.ADMIN_SECRET) {
    return <div className="p-6 text-white">Unauthorized</div>;
  }

  const logs = await prisma.emailLog.findMany({
    where: product ? { product } : undefined,
    orderBy: { sentAt: "desc" },
  });

  const queue = await prisma.emailQueue.findMany({
    where: {
      ...(product ? { product } : {}),
      ...(status ? { status } : {}),
      ...(email ? { email: { contains: email } } : {}),
    },
    orderBy: { retryAt: "desc" },
  });

  const logCounts = await prisma.emailLog.findMany({
    where: { OR: queue.map((q) => ({ email: q.email, template: q.template })) },
    select: { email: true, template: true, count: true },
  });

  const countMap: Record<string, number> = {};
  for (const l of logCounts) countMap[`${l.email}-${l.template}`] = l.count;

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📧 Email Dashboard</h1>

      <div className="flex gap-6 mb-6">
        <Link href="/admin/emails?tab=send"   className={tab === "send" ? "text-yellow-400 font-bold" : ""}>Send</Link>
        <Link href="/admin/emails?tab=sent"   className={tab === "sent" ? "text-yellow-400 font-bold" : ""}>Sent</Link>
        <Link href="/admin/emails?tab=queued" className={tab === "queued" ? "text-yellow-400 font-bold" : ""}>Queued</Link>
      </div>

      {tab === "send" && <SendEmailPanel />}

      {tab === "sent" && (
        <div className="overflow-x-auto">
          <h2 className="text-xl font-bold mb-2">Sent Emails</h2>
          <table className="min-w-full bg-[#1f1f2e] rounded-md">
            <thead>
              <tr className="text-left bg-[#29293d]">
                <th className="p-2">Email</th>
                <th className="p-2">Product</th>
                <th className="p-2">Sent At</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id} className="border-t border-[#29293d]">
                  <td className="p-2">{log.email}</td>
                  <td className="p-2">{log.product}</td>
                  <td className="p-2">{log.sentAt.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {tab === "queued" && (
        <div className="overflow-x-auto">
          <form className="flex flex-wrap gap-2 mb-4">
            <input type="hidden" name="tab" value="queued" />
            <select name="product" defaultValue={product || ""} className="bg-black text-white border border-gray-500 rounded px-3 py-1">
              <option value="">All Products</option>
              {Object.values(products).map((p) => (
                <option key={p.slug} value={p.slug}>{p.title}</option>
              ))}
            </select>
            <select name="status" defaultValue={status || ""} className="bg-black text-white border border-gray-500 rounded px-3 py-1">
              <option value="">All Statuses</option>
              <option value="queued">Queued</option>
              <option value="failed">Failed</option>
              <option value="delivered">Delivered</option>
            </select>
            <input
              type="text"
              name="email"
              defaultValue={email || ""}
              placeholder="Filter email"
              className="bg-black text-white border border-gray-500 rounded px-3 py-1"
            />
            <button type="submit" className="bg-yellow-500 text-black font-semibold px-4 py-1 rounded">Apply</button>
          </form>

          <div className="mb-2">
            <RetryAllButton product={product} status={status} email={email} />
          </div>

          <table className="min-w-full bg-[#1f1f2e] rounded-md">
            <thead>
              <tr className="text-left bg-[#29293d]">
                <th className="p-2">Email</th>
                <th className="p-2">Product</th>
                <th className="p-2">Retry At</th>
                <th className="p-2">Status</th>
                <th className="p-2">Count</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((q) => (
                <tr key={q.id} className="border-t border-[#29293d]">
                  <td className="p-2">{q.email}</td>
                  <td className="p-2">{q.product}</td>
                  <td className="p-2">{q.retryAt.toLocaleString()}</td>
                  <td className="p-2 capitalize">{q.status}</td>
                  <td className="p-2">{countMap[`${q.email}-${q.template}`] ?? 0}</td>
                  <td className="p-2"><RetryButton id={q.id} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
