'use client'

import { useEffect, useState } from "react"
import { products } from "@/lib/products"

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false)
  const [slug, setSlug] = useState(Object.keys(products)[0])
  const [purchases, setPurchases] = useState([])
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [status, setStatus] = useState("")

  useEffect(() => {
    const verify = async () => {
      const check = await fetch('/api/admin/check')
      if (check.ok) { setAuth(true); return }
      const key = prompt('Enter admin secret:')
      if (!key) { alert('Unauthorized'); return }
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ secret: key })
      })
      if (res.ok) {
        setAuth(true)
      } else {
        alert('Unauthorized')
      }
    }
    verify()
  }, [])

  useEffect(() => {
    if (!auth) return

    const fetchPurchases = async () => {
      const res = await fetch(`/api/admin/purchases?slug=${slug}`)
      const data = await res.json()
      setPurchases(data.purchases || [])
    }

    fetchPurchases()
  }, [slug, auth])

  const sendEmail = async () => {
    setStatus("Sending...")
    const res = await fetch(`/api/admin/send-email`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ slug, subject, message }),
    })
    const data = await res.json()
    if (data.success) {
      setStatus(`Sent to ${data.count} recipients`)
      setSubject("")
      setMessage("")
    } else {
      setStatus(data.error || "Error sending")
    }
  }

  if (!auth) return null

  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold mb-4">🛒 Admin Purchase Dashboard</h1>

      <select
        className="bg-black text-white border border-gray-500 rounded px-4 py-2 mb-6"
        value={slug}
        onChange={(e) => setSlug(e.target.value)}
      >
        {Object.keys(products).map((key) => (
          <option key={key} value={key}>
            {products[key].title}
          </option>
        ))}
      </select>

      <ul className="space-y-2">
        {purchases.map((p: any) => (
          <li key={p.id} className="bg-[#1f1f2e] p-4 rounded-md">
            <p><strong>Email:</strong> {p.email}</p>
            <p><strong>Type:</strong> {p.type}</p>
            <p><strong>When:</strong> {new Date(p.createdAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>

      <div className="mt-8 space-y-2">
        <input
          className="w-full bg-black text-white border border-gray-500 rounded px-4 py-2"
          placeholder="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          className="w-full bg-black text-white border border-gray-500 rounded px-4 py-2"
          rows={4}
          placeholder="Message HTML"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={sendEmail}
          className="bg-yellow-500 text-black font-semibold px-4 py-2 rounded"
        >
          Send Email to Buyers
        </button>
        {status && <p className="text-sm mt-2">{status}</p>}
      </div>
    </div>
  )
}
