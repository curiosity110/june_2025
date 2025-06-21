// ✅ app/thank-you/[slug]/page.tsx
import { products } from "@/lib/products"
import { notFound } from "next/navigation"

export default function ThankYouPage({ params }: { params: { slug: string } }) {
  const product = products[params.slug]
  if (!product) return notFound()

  return (
    <section className="px-6 py-24 text-white text-center">
      <h1 className="text-3xl font-bold text-yellow-300 mb-6">You're In!</h1>
      <p className="text-purple-300 text-lg mb-4">
        {product.isFree
          ? `Your free download for ${product.title} is ready:`
          : `Thank you for your purchase of ${product.title}. Your file has also been sent to your email.`}
      </p>
      <a
        href={`/downloads/${product.slug}.pdf`}
        className="text-yellow-300 underline text-lg font-medium"
        download
      >
        Click here to download
      </a>
    </section>
  )
}
