import { prisma } from '@/lib/prisma'
import { products } from '@/lib/products'
import RetryButton from './RetryButton'

interface SearchParams {
  product?: string
  status?: string
}

export const dynamic = 'force-dynamic'

export default async function EmailActivityPage({ searchParams }: { searchParams: SearchParams }) {
  const { product, status } = searchParams

  const logs = await prisma.emailLog.findMany({
    where: product ? { product } : undefined,
    orderBy: { sentAt: 'desc' },
  })

  const queue = await prisma.emailQueue.findMany({
    where: {
      ...(product ? { product } : {}),
      ...(status ? { status } : {}),
    },
    orderBy: { retryAt: 'desc' },
  })

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📧 Email Activity</h1>
      <form className="flex flex-wrap gap-2 mb-6">
        <select
          name="product"
          defaultValue={product || ''}
          className="bg-black text-white border border-gray-500 rounded px-3 py-1"
        >
          <option value="">All Products</option>
          {Object.values(products).map((p) => (
            <option key={p.slug} value={p.slug}>
              {p.title}
            </option>
          ))}
        </select>
        <select
          name="status"
          defaultValue={status || ''}
          className="bg-black text-white border border-gray-500 rounded px-3 py-1"
        >
          <option value="">All Statuses</option>
          <option value="queued">Queued</option>
          <option value="failed">Failed</option>
          <option value="delivered">Delivered</option>
        </select>
        <button
          type="submit"
          className="bg-yellow-500 text-black font-semibold px-4 py-1 rounded"
        >
          Apply
        </button>
      </form>
      <div className="overflow-x-auto mb-8">
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
      <div className="overflow-x-auto">
        <h2 className="text-xl font-bold mb-2">Queued Emails</h2>
        <table className="min-w-full bg-[#1f1f2e] rounded-md">
          <thead>
            <tr className="text-left bg-[#29293d]">
              <th className="p-2">Email</th>
              <th className="p-2">Product</th>
              <th className="p-2">Retry At</th>
              <th className="p-2">Status</th>
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
                <td className="p-2">
                  <RetryButton id={q.id} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
