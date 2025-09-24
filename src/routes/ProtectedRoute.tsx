"use client"

import type { ReactNode } from "react"

export type ProtectedRouteProps = {
  isAuthorized: boolean
  loading?: boolean
  fallback?: ReactNode
  unauthorized?: ReactNode
  children: ReactNode
}

export const ProtectedRoute = ({
  isAuthorized,
  loading = false,
  fallback = null,
  unauthorized = null,
  children,
}: ProtectedRouteProps) => {
  if (loading) {
    return <>{fallback}</>
  }

  if (!isAuthorized) {
    return <>{unauthorized}</>
  }

  return <>{children}</>
}
