import { products } from "@/lib/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
export default function BundleSection() {
  const bundle = Object.values(products).find(p => p.category === 'bundle')
  if (!bundle) return null

  return (
    <section className="bg-section px-6 py-20">
      <h2 className="text-accent text-sm font-semibold mb-8">🔥 Everything in One Bundle</h2>
      <Link
        href={`/products/${bundle.slug}`}
        className="block bg-card border border-border p-8 rounded-xl shadow-md grid md:grid-cols-2 gap-8 items-center hover:shadow-xl transition-all duration-200"
      >
        <img src={bundle.image} alt={bundle.title} className="rounded-lg" />
        <div>
          <h3 className="text-2xl font-bold text-white mb-4">{bundle.title}</h3>
          <p className="text-purple-200 text-sm mb-4">{bundle.description}</p>
          <span className="inline-flex items-center gap-2 text-accent text-sm font-medium hover:underline">
            Explore the Bundle <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </section>
  )
}
