'use client'

import { useState } from 'react'

export default function RetryButton({ id }: { id: string }) {
  const [loading, setLoading] = useState(false)

  const handleRetry = async () => {
    setLoading(true)
    await fetch(`/api/admin/retry-email?secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    })
    location.reload()
  }

  return (
    <button
      onClick={handleRetry}
      disabled={loading}
      className="text-yellow-300 disabled:opacity-50"
    >
      {loading ? 'Retrying...' : 'Retry'}
    </button>
  )
}
