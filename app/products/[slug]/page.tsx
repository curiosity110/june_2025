// app/products/[slug]/page.tsx
'use client'

import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { products } from "@/lib/products"
import Image from "next/image"
import toast from "react-hot-toast"
import { useEffect } from "react"


export default function ProductPage() {

  const [showThankYou, setShowThankYou] = useState(false)

  const { slug } = useParams<{ slug: string }>()
  const router = useRouter()
  const product = products[slug as string]
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [checkoutEmail, setCheckoutEmail] = useState("")
  const [showEmailModal, setShowEmailModal] = useState(false)
  const [emailSentTo, setEmailSentTo] = useState("")

  if (!product) return <div className="text-white p-10">Product not found.</div>

  useEffect(() => {
    setShowThankYou(false)
    setEmail("")
    setPhone("")
    setEmailSentTo("")
    setShowEmailModal(false)
  }, [slug])

  useEffect(() => {
    const stored = typeof window !== 'undefined' ? localStorage.getItem('checkout-email') : null
    if (stored) setCheckoutEmail(stored)
  }, [slug])

  const handleFreeDownload = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const res = await fetch("/api/free-download", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email, phone }),
      })

      const data = await res.json()
      if (data.success) {
        setEmail("")
        setPhone("")
        setShowThankYou(true)
        toast.success("Download sent to your email! 📩")
      } else {
        toast.error("Something went wrong.")
      }
    } catch (err) {
      toast.error("Could not send email.")
      console.error("Free download error:", err)
    }

    setLoading(false)
  }

  const handleCheckout = async () => {
    if (!checkoutEmail) {
      toast.error("Please enter an email")
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug, email: checkoutEmail }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`\ud83d\udce9 Email sent to ${checkoutEmail}!`)
        setEmailSentTo(checkoutEmail)
        localStorage.setItem('checkout-email', checkoutEmail)
      } else {
        toast.error("\u26a0\ufe0f Email failed to send")
      }
    } catch (err) {
      console.error("Checkout error:", err)
      toast.error("\u26a0\ufe0f Email failed to send")
    }

    setLoading(false)
    setShowEmailModal(false)
  }

  return (
    <>
    <section className="bg-[#0f0f1c] px-6 py-20 text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <button
          onClick={() => router.back()}
          className="inline-flex items-center text-yellow-300 text-sm hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back
        </button>

        {product.image && (
          <Image
            src={product.image}
            alt={product.title}
            priority
            width={800}
            height={500}
            className="rounded-lg border border-[#2c2c40] mb-6 shadow-md"
          />
        )}

        <h1 className="text-3xl font-bold text-yellow-300">{product.title}</h1>
        <p className="text-purple-300">{product.description}</p>

        <div className="bg-[#1f1f2e] border border-[#2c2c40] p-6 rounded-xl space-y-4">
          <pre className="text-sm whitespace-pre-wrap text-purple-200">
            {product.content}
          </pre>

          {product.isFree ? (
            <form onSubmit={handleFreeDownload} className="space-y-4">
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
                placeholder="Your phone (optional)"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-[#2c2c40] text-white placeholder-gray-400"
              />
              <button
                type="submit"
                disabled={loading}
                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:scale-105 transition w-full"
              >
                {loading ? "Sending..." : product.ctaLabel}
              </button>
              {showThankYou && (
                <div className="bg-green-600 text-white p-4 rounded-md mt-4 shadow-md text-center">
                  <p className="font-semibold">You're in! 🎉</p>
                  <p className="text-sm mt-1">Your file is on the way to your inbox.</p>
                  <a
                    href={`/downloads/${product.slug}.pdf`}
                    download
                    className="underline text-yellow-300 block mt-2"
                  >
                    Or click here to download it directly
                  </a>
                </div>
              )}

            </form>

          ) : (
            <>
              <button
                onClick={() => setShowEmailModal(true)}
                disabled={loading}
                className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:scale-105 transition w-full"
              >
                {loading ? "Processing..." : product.ctaLabel}
              </button>
              {emailSentTo && (
                <p className="text-green-400 mt-2">Email sent to {emailSentTo}!</p>
              )}
            </>
          )}
        </div>
      </div>
    </section>
    {showEmailModal && (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
        <div className="bg-[#1f1f2e] p-6 rounded-md space-y-4 w-80">
          <h2 className="text-lg font-bold text-white">Enter your email</h2>
          <input
            type="email"
            value={checkoutEmail}
            onChange={(e) => setCheckoutEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full px-3 py-2 rounded-md text-black"
          />
          <div className="flex justify-end space-x-2">
            <button onClick={() => setShowEmailModal(false)} className="text-sm text-white">Cancel</button>
            <button onClick={handleCheckout} className="bg-yellow-400 text-black font-bold px-4 py-2 rounded-md">
              Buy
            </button>
          </div>
        </div>
      </div>
    )}
    </>
  )
}
