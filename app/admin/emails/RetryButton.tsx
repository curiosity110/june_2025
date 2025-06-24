'use client'

import { useState } from 'react'

export default function RetryButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)
  const [force, setForce] = useState(false)

  const handleRetry = async () => {
    setLoading(true)
    await fetch(`/api/admin/retry-email`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, forceSend: force }),
    })
    location.reload()
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleRetry}
        disabled={loading}
        className="text-yellow-300 disabled:opacity-50"
      >
        {loading ? 'Retrying...' : 'Retry'}
      </button>
      <label className="text-xs flex items-center gap-1">
        <input type="checkbox" checked={force} onChange={e => setForce(e.target.checked)} />
        Force
      </label>
    </div>
  )
}
