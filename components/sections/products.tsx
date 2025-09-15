"use client";
import { products } from '@/lib/products'
import Link from 'next/link'

export default function ProductsSection() {
  const paid = Object.values(products).filter(p => !p.isFree && p.category === 'product')

  return (
    <section className="bg-section py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold text-white mb-4 animate-fade-up">
            What You'll Learn
          </h2>
          <p className="text-xl text-muted max-w-2xl mx-auto animate-fade-up animate-delay-1">
            Master the skills you need to maximize your income
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {paid.map((prod, i) => (
            <div
              key={prod.slug}
              className={`animate-fade-up animate-delay-${Math.min(i % 3, 3)}`}
            >
              <Link
                href={`/products/${prod.slug}`}
                className="group block card-professional h-full space-y-4"
              >
                <div className="aspect-video w-full rounded-lg overflow-hidden relative">
                  <img
                    src={prod.image}
                    alt={prod.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
                </div>
                
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-white group-hover:text-accent transition-colors">
                    {prod.title}
                  </h3>
                  <p className="text-muted text-sm leading-relaxed line-clamp-3">
                    {prod.description}
                  </p>
                  
                  <div className="flex items-center text-accent text-sm font-medium">
                    Learn More
                    <svg className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
