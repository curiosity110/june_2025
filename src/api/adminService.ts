import { createScopedLogger } from "@/utils/logger"

const log = createScopedLogger("api:admin-service")

export type Purchase = {
  id: string
  email: string
  type: string
  createdAt: string
}

export type SendEmailPayload = {
  slug: string
  subject: string
  message: string
}

const jsonHeaders = { "Content-Type": "application/json" }

export const checkAdminSession = async (): Promise<boolean> => {
  try {
    const response = await fetch("/api/admin/check")
    return response.ok
  } catch (error) {
    log.error("Failed to verify admin session", error)
    return false
  }
}

export const loginAdmin = async (secret: string): Promise<boolean> => {
  try {
    const response = await fetch("/api/admin/login", {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify({ secret }),
    })

    return response.ok
  } catch (error) {
    log.error("Admin login failed", error)
    return false
  }
}

export const fetchPurchases = async (slug: string): Promise<Purchase[]> => {
  try {
    const response = await fetch(`/api/admin/purchases?slug=${slug}`)
    if (!response.ok) {
      log.warn("Purchase request failed", slug, response.status)
      return []
    }

    const data = await response.json()
    return (data.purchases ?? []) as Purchase[]
  } catch (error) {
    log.error("Failed to fetch purchases", error)
    return []
  }
}

export const sendAdminEmail = async (payload: SendEmailPayload) => {
  try {
    const response = await fetch(`/api/admin/send-email`, {
      method: "POST",
      headers: jsonHeaders,
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      log.warn("Admin email failed", response.status)
    }

    return response.json()
  } catch (error) {
    log.error("Admin email request errored", error)
    return { success: false, error: "Network error" }
  }
}
