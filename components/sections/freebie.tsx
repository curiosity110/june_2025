'use client'
import { useState } from 'react'
import { products } from '@/lib/products'

export default function FreebieSection() {
  const freeProduct = Object.values(products).find(p => p.isFree)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  if (!freeProduct) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const res = await fetch('/api/free-download', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug: freeProduct.slug, email, phone })
    })
    if (res.ok) {
      setSent(true)
      setEmail('')
      setPhone('')
    }
    setLoading(false)
  }

  return (
    <section className="bg-[#151525] px-6 py-16 text-white mt-12">
      <div className="max-w-xl mx-auto space-y-6 text-center">
        <h2 className="text-2xl font-heading font-bold text-yellow-300">
          {freeProduct.title}
        </h2>
        <p className="text-purple-200 text-sm">{freeProduct.description}</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2c2c40] text-white placeholder-gray-400"
          />
          <input
            type="tel"
            placeholder="Phone (optional)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full px-4 py-2 rounded-md bg-[#2c2c40] text-white placeholder-gray-400"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:scale-105 transition w-full"
          >
            {loading ? 'Sending...' : freeProduct.ctaLabel}
          </button>
          {sent && (
            <p className="text-green-400 text-sm mt-2">Check your inbox for the download!</p>
          )}
        </form>
      </div>
    </section>
  )
}