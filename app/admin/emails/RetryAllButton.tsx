'use client'

import { useState } from 'react'
import toast from 'react-hot-toast'

export default function RetryAllButton({ product, status, email }: { product?: string; status?: string; email?: string }) {
  const [loading, setLoading] = useState(false)
  const [force, setForce] = useState(false)

  const handle = async () => {
    setLoading(true)
    const res = await fetch(`/api/admin/retry-all?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ product, status, email, forceSend: force }),
    })
    const data = await res.json()
    if (data.success) {
      toast.success(`Retried ${data.count} email(s)`)
      location.reload()
    } else {
      toast.error(data.error || 'Retry failed')
    }
    setLoading(false)
  }

  return (
    <div className="flex items-center gap-2">
      <button onClick={handle} disabled={loading} className="text-yellow-300 disabled:opacity-50">
        {loading ? 'Retrying...' : 'Retry All'}
      </button>
      <label className="text-xs flex items-center gap-1">
        <input type="checkbox" checked={force} onChange={e => setForce(e.target.checked)} />
        Force
      </label>
    </div>
  )
}
