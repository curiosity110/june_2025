'use client'
import { useState } from 'react'
import { products } from '@/lib/products'

export default function FreebieSection() {
  const freeProduct = Object.values(products).find(p => p.isFree)
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)
  const [link, setLink] = useState('')

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
      const data = await res.json()
      setSent(true)
      if (data.downloadUrl) setLink(data.downloadUrl)
      setEmail('')
      setPhone('')
    }
    setLoading(false)
  }

  return (
    <section className="bg-section py-24">
      <div className="container">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-up">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-accent-light">
              {freeProduct.title}
            </span>
          </h2>
          <p className="text-xl text-muted mb-12 animate-fade-up animate-delay-1">
            {freeProduct.description}
          </p>
          
          <div className="card-professional p-8 animate-fade-up animate-delay-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="email"
                  required
                  placeholder="Email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none text-white placeholder-gray-400 transition-colors"
                />
                <input
                  type="tel"
                  placeholder="Phone (optional)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-card border border-border focus:border-accent outline-none text-white placeholder-gray-400 transition-colors"
                />
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="btn-primary w-full py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Sending...' : freeProduct.ctaLabel}
              </button>
              
              {sent && (
                <div className="text-center p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <p className="text-green-400 text-sm">
                    Your download is ready!{' '}
                    <a href={link} className="underline font-medium" download>
                      Click here to download
                    </a>{' '}
                    and check your inbox for a copy.
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
