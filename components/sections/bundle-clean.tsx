"use client";
import { products } from "@/lib/products"
import Link from "next/link"

export default function BundleSection() {
  const bundle = Object.values(products).find(p => p.category === 'bundle')
  if (!bundle) return null

  return (
    <section className="bg-section py-24">
      <div className="container">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-heading font-bold mb-4 animate-fade-up">
            Everything In One Bundle
          </h2>
          <p className="text-xl text-muted animate-fade-up animate-delay-1">
            Save time and money with our complete package
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/products/${bundle.slug}`}
            className="group block card-professional p-8 md:p-12 animate-fade-up animate-delay-2"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative aspect-video w-full rounded-lg overflow-hidden">
                <img 
                  src={bundle.image} 
                  alt={bundle.title} 
                  className="object-cover w-full h-full group-hover:scale-105 transition duration-500" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
              </div>
              
              <div className="space-y-6">
                <h3 className="text-3xl font-heading font-bold text-white group-hover:text-accent transition-colors">
                  {bundle.title}
                </h3>
                <p className="text-muted leading-relaxed">
                  {bundle.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-accent font-bold text-2xl">
                    ${bundle.price}
                  </div>
                  <div className="flex items-center text-accent font-medium">
                    Get Bundle
                    <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
