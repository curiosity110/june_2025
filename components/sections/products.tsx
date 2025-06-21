import { products } from '@/lib/products'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export default function ProductsSection() {
  const paid = Object.values(products).filter(p => !p.isFree && p.category === 'product')

  return (
    <section className="bg-[#0f0f1c] px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-xl text-white font-semibold mb-6">💸 Premium Products</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paid.map(prod => (
            <div key={prod.slug} className="bg-[#151525] border border-[#2c2c40] p-6 rounded-xl shadow-md space-y-4 hover:shadow-xl transition-all duration-200">
              <img src={prod.image} alt={prod.title} className="w-full rounded-lg border border-[#2c2c40]" />
              <h3 className="text-xl font-bold text-white">{prod.title}</h3>
              <p className="text-purple-200 text-sm">{prod.description}</p>
              <Link href={`/products/${prod.slug}`} className="inline-flex items-center gap-2 text-yellow-300 text-sm font-medium hover:underline">
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}