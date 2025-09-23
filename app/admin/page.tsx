"use client"

import { useCallback, useEffect, useMemo, useState } from "react"
import { products } from "@/lib/products"
import { fetchPurchases, sendAdminEmail, type Purchase } from "@/api/adminService"
import { createScopedLogger } from "@/utils/logger"

const log = createScopedLogger("admin:dashboard")

export default function AdminDashboard() {
  const productSlugs = useMemo(() => Object.keys(products), [])
  const [slug, setSlug] = useState(productSlugs[0])
  const [purchases, setPurchases] = useState<Purchase[]>([])
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")
  const [loadingPurchases, setLoadingPurchases] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)

  const loadPurchases = useCallback(async () => {
    setLoadingPurchases(true)
    try {
      const results = await fetchPurchases(slug)
      setPurchases(results)
    } catch (error) {
      log.error("Failed to load purchases", error)
    } finally {
      setLoadingPurchases(false)
    }
  }, [slug])

  useEffect(() => {
    loadPurchases()
  }, [loadPurchases])

  const handleSendEmail = useCallback(async () => {
    if (!subject || !message) {
      setStatus("Subject and message are required")
      return
    }

    setSendingEmail(true)
    setStatus("Sending…")

    try {
      const response = await sendAdminEmail({ slug, subject, message })
      if (response.success) {
        setStatus(`Sent to ${response.count ?? "selected"} recipients`)
        setSubject("")
        setMessage("")
      } else {
        setStatus(response.error || "Error sending")
        log.warn("Admin email send failed", response.error)
      }
    } catch (error) {
      setStatus("Error sending email")
      log.error("Admin email send threw", error)
    } finally {
      setSendingEmail(false)
    }
  }, [slug, subject, message])

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🛒 Admin Purchase Dashboard</h1>

      <select
        className="bg-black text-white border border-gray-500 rounded px-4 py-2 mb-6"
        value={slug}
        onChange={(event) => setSlug(event.target.value)}
      >
        {productSlugs.map((key) => (
          <option key={key} value={key}>
            {products[key].title}
          </option>
        ))}
      </select>

      <button
        type="button"
        onClick={loadPurchases}
        className="mb-4 text-sm underline"
        disabled={loadingPurchases}
      >
        {loadingPurchases ? "Refreshing…" : "Refresh purchases"}
      </button>

      <ul className="space-y-2">
        {purchases.map((purchase) => (
          <li key={purchase.id} className="bg-[#1f1f2e] p-4 rounded-md">
            <p><strong>Email:</strong> {purchase.email}</p>
            <p><strong>Type:</strong> {purchase.type}</p>
            <p><strong>When:</strong> {new Date(purchase.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2">
        <input
          className="w-full bg-black text-white border border-gray-500 rounded px-4 py-2"
          placeholder="Subject"
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
        />
        <textarea
          className="w-full bg-black text-white border border-gray-500 rounded px-4 py-2"
          rows={4}
          placeholder="Message HTML"
          value={message}
          onChange={(event) => setMessage(event.target.value)}
        />
        <button
          onClick={handleSendEmail}
          className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
          disabled={sendingEmail}
        >
          {sendingEmail ? "Sending…" : "Send Email to Buyers"}
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </div>
    </div>
  )
}
