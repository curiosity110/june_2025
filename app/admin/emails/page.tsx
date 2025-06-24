'use client'

import { useEffect, useState } from "react"

export default function EmailLogPage() {
  const [auth, setAuth] = useState(false)
  const [logs, setLogs] = useState<any[]>([])

  useEffect(() => {
    const key = prompt('Enter admin secret:')
    if (key === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setAuth(true)
    } else {
      alert('Unauthorized')
    }
  }, [])

  useEffect(() => {
    if (!auth) return
    const fetchLogs = async () => {
      const res = await fetch(`/api/admin/email-logs?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`)
      const data = await res.json()
      setLogs(data.logs || [])
    }
    fetchLogs()
  }, [auth])

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
    </div>
  )
}
