// app/products/[slug]/page.tsx
'use client'

import { useParams } from "next/navigation"
import { useState } from "react"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { products } from "@/lib/products"
import Image from "next/image"
import toast from "react-hot-toast"
import { useEffect } from "react"
import Header from "@/components/layout/header"


export default function ProductPage() {

  const [showThankYou, setShowThankYou] = useState(false)

  const { slug } = useParams()
  const product = products[slug as string]
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")

  if (!product) return <div className="text-white p-10">Product not found.</div>

  useEffect(() => {
    setShowThankYou(false)
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
    setLoading(true)

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug }),
      })

      const data = await res.json()
      if (data.url) {
        window.location.href = data.url
      } else {
        alert("Something went wrong.")
      }
    } catch (err) {
      console.error("Checkout error:", err)
      alert("Failed to start checkout.")
    }

    setLoading(false)
  }

  return (
    <>
      <Header />
      <section className="bg-[#0f0f1c] px-6 py-20 text-white">
      <div className="max-w-3xl mx-auto space-y-8">
        <Link
          href="/products"
          className="inline-flex items-center text-yellow-300 text-sm hover:underline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Products
        </Link>

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
            <button
              onClick={handleCheckout}
              disabled={loading}
              className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md hover:scale-105 transition w-full"
            >
              {loading ? "Processing..." : product.ctaLabel}
            </button>
          )}
        </div>
      </div>
      </section>
    </>
  )
}
