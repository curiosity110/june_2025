"use client"

import type { ReactNode } from "react"
import { usePathname } from "next/navigation"
import { ProtectedRoute } from "./ProtectedRoute"
import { useAdminAuth } from "@/hooks/useAdminAuth"

export type AppRouterProps = {
  children: ReactNode
}

const loadingFallback = (
  <div className="p-6 text-center text-white">Verifying access…</div>
)

const unauthorizedFallback = (
  <div className="p-6 text-center text-red-400">Access denied.</div>
)

export const AppRouter = ({ children }: AppRouterProps) => {
  const pathname = usePathname()
  const protectAdmin = pathname.startsWith("/admin")
  const auth = useAdminAuth({ enabled: protectAdmin })

  if (!protectAdmin) {
    return <>{children}</>
  }

  return (
    <ProtectedRoute
      isAuthorized={auth.isAuthorized}
      loading={auth.loading}
      fallback={loadingFallback}
      unauthorized={unauthorizedFallback}
    >
      {children}
    </ProtectedRoute>
  )
}
