'use client'

import { useEffect, useState } from "react"
import { products } from "@/lib/products"

export default function AdminDashboard() {
  const [auth, setAuth] = useState(false)
  const [slug, setSlug] = useState(Object.keys(products)[0])
  const [purchases, setPurchases] = useState([])

  useEffect(() => {
    const key = prompt("Enter admin secret:")
    if (key === process.env.NEXT_PUBLIC_ADMIN_SECRET) {
      setAuth(true)
    } else {
      alert("Unauthorized")
    }
  }, [])

  useEffect(() => {
    if (!auth) return

    const fetchPurchases = async () => {
      const res = await fetch(`/api/admin/purchases?slug=${slug}&secret=${process.env.NEXT_PUBLIC_ADMIN_SECRET}`)
      const data = await res.json()
      setPurchases(data.purchases || [])
    }

    fetchPurchases()
  }, [slug, auth])

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
    </div>
  )
}
