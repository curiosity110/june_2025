'use client'

import { products } from "@/lib/products"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {
  const freeProducts = Object.values(products).filter(p => p.isFree)
  const paidProducts = Object.values(products).filter(p => !p.isFree)

  return (
    <section className="bg-[#0f0f1c] px-6 py-20">
      <div className="max-w-6xl mx-auto space-y-12">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-yellow-300">Digital Products</h1>
          <p className="text-purple-300 mt-4 max-w-xl mx-auto">
            Premium tools, playbooks, and training to help you build, grow, and automate your brand.
          </p>
        </div>

        <div>
          <h2 className="text-xl text-white font-semibold mb-4">📬 Free Downloads</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {freeProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="block bg-[#151525] border border-[#2c2c40] p-6 rounded-xl shadow-md space-y-4 hover:shadow-xl transition-all duration-200"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg border border-[#2c2c40]"
                />
                <h3 className="text-xl font-bold text-white">{product.title}</h3>
                <p className="text-purple-200 text-sm">{product.description}</p>
                <span className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium hover:underline">
                  Download Free
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl text-white font-semibold mb-4 mt-12">💸 Premium Products</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {paidProducts.map((product) => (
              <Link
                key={product.slug}
                href={`/products/${product.slug}`}
                className="block bg-[#151525] border border-[#2c2c40] p-6 rounded-xl shadow-md space-y-4 hover:shadow-xl transition-all duration-200"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-full rounded-lg border border-[#2c2c40]"
                />
                <h3 className="text-xl font-bold text-white">{product.title}</h3>
                <p className="text-purple-200 text-sm">{product.description}</p>
                <span className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium hover:underline">
                  Read More <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}