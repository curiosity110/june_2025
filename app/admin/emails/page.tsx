'use client'

import { useEffect, useState } from "react"

export default function EmailLogPage() {
  const [auth, setAuth] = useState(false)
  const [secret, setSecret] = useState('')
  const [logs, setLogs] = useState<any[]>([])
  const [queue, setQueue] = useState<any[]>([])

  useEffect(() => {
    const key = prompt('Enter admin secret:')
    if (key === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setSecret(key || '')
      setAuth(true)
    } else {
      alert('Unauthorized')
    }
  }, [])

  useEffect(() => {
    if (!auth) return
    const fetchData = async () => {
      const [logsRes, queueRes] = await Promise.all([
        fetch(`/api/admin/email-logs?secret=${secret}`),
        fetch(`/api/admin/email-queue?secret=${secret}`)
      ])
      const logData = await logsRes.json()
      const queueData = await queueRes.json()
      setLogs(logData.logs || [])
      setQueue(queueData.queue || [])
    }
    fetchData()
  }, [auth, secret])

  const retry = async (id: string) => {
    await fetch(`/api/admin/retry-email?secret=${secret}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id })
    })
    location.reload()
  }

  if (!auth) return null

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">📧 Email Send Log</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-[#1f1f2e] rounded-md">
          <thead>
            <tr className="text-left bg-[#29293d]">
              <th className="p-2">Email</th>
              <th className="p-2">Product</th>
              <th className="p-2">Template</th>
              <th className="p-2">Sent At</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id} className="border-t border-[#29293d]">
                <td className="p-2">{log.email}</td>
                <td className="p-2">{log.product}</td>
                <td className="p-2 capitalize">{log.template}</td>
                <td className="p-2">{new Date(log.sentAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {queue.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-2">Queued Emails</h2>
          <table className="min-w-full bg-[#1f1f2e] rounded-md">
            <thead>
              <tr className="text-left bg-[#29293d]">
                <th className="p-2">Email</th>
                <th className="p-2">Product</th>
                <th className="p-2">Retry At</th>
                <th className="p-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {queue.map((q) => (
                <tr key={q.id} className="border-t border-[#29293d]">
                  <td className="p-2">{q.email}</td>
                  <td className="p-2">{q.product}</td>
                  <td className="p-2">{new Date(q.retryAt).toLocaleString()}</td>
                  <td className="p-2">
                    <button className="text-yellow-300" onClick={() => retry(q.id)}>
                      Retry
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
