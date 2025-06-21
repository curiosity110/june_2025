import { products } from "@/lib/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export default function BundleSection() {
  const bundles = Object.values(products).filter(
    (product) => product.category === "bundle"
  )

  return (
<section className="bg-[#0f0f1c] px-6 py-20 max-w-6xl mx-auto">
  <h2 className="text-accent text-sm font-semibold mb-8">🔥 Everything in One Bundle</h2>
  <div className="bg-[#151525] border border-[#2c2c40] p-8 rounded-xl shadow-md grid md:grid-cols-2 gap-8 items-center">
    <img src="/some-static-image.png" alt="Bundle preview" className="rounded-lg" />
    <div>
      <h3 className="text-2xl font-bold text-white mb-4">The Full AI Branding Kit</h3>
      <p className="text-purple-200 text-sm mb-4">
        Get all ebooks, templates, and future updates — one-time payment.
      </p>
      <Link
        href="/products/full-bundle"
        className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium hover:underline"
      >
        Explore the Bundle <ArrowRight className="w-4 h-4" />
      </Link>
    </div>
  </div>
</section>

  )
}
