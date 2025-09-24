"use client"

import { useCallback, useEffect, useState } from "react"
import { checkAdminSession, loginAdmin } from "@/api/adminService"

export type AdminAuthState = {
  isAuthorized: boolean
  loading: boolean
  error?: string | null
  retry: () => void
}

type Options = {
  enabled?: boolean
}

export const useAdminAuth = ({ enabled = true }: Options = {}): AdminAuthState => {
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  const retry = useCallback(() => {
    setAttempt((current) => current + 1)
  }, [])

  useEffect(() => {
    if (!enabled) {
      setIsAuthorized(false)
      setLoading(false)
      setError(null)
      return
    }

    let cancelled = false

    const verify = async () => {
      setLoading(true)
      setError(null)

      const hasSession = await checkAdminSession()
      if (cancelled) return

      if (hasSession) {
        setIsAuthorized(true)
        setLoading(false)
        return
      }

      const secret = typeof window !== "undefined" ? window.prompt("Enter admin secret:") : null
      if (!secret) {
        setError("Unauthorized")
        setLoading(false)
        return
      }

      const success = await loginAdmin(secret)
      if (cancelled) return

      setIsAuthorized(success)
      setError(success ? null : "Unauthorized")
      setLoading(false)
    }

    verify()

    return () => {
      cancelled = true
    }
  }, [attempt, enabled])

  if (!enabled) {
    return { isAuthorized: false, loading: false, error: null, retry }
  }

  return { isAuthorized, loading, error, retry }
}
