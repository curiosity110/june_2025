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
      <ul className="space-y-2">
        {logs.map(log => (
          <li key={log.id} className="bg-[#1f1f2e] p-4 rounded-md">
            <p><strong>Email:</strong> {log.email}</p>
            <p><strong>Product:</strong> {log.product}</p>
            <p><strong>Template:</strong> {log.template}</p>
            <p><strong>When:</strong> {new Date(log.sentAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}
