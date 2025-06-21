// components/sections/lifetime-access.tsx
import { Button } from "@/components/ui/button"

export default function LifetimeAccess() {
  return (
    <section className="bg-[#151525] px-6 py-20 text-center text-white max-w-4xl mx-auto rounded-xl mt-12 shadow-lg">
      <h2 className="text-3xl font-heading font-extrabold text-yellow-300 mb-4">
        Get Lifetime Access
      </h2>
      <p className="text-purple-300 mb-6 text-lg">
        Unlock all courses, templates, and future updates — one-time payment.
      </p>
      <div className="inline-block bg-[#1f1f2e] border border-[#2c2c40] px-8 py-6 rounded-xl">
        <p className="text-4xl font-bold text-yellow-400 mb-2">€497</p>
        <p className="text-sm text-purple-200 mb-4 line-through">€997 regular price</p>
        <Button>Buy Now</Button>
      </div>
    </section>
  )
}
