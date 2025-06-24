// components/sections/lifetime-access.tsx
import { Button } from "@/components/ui/button"

export default function LifetimeAccess() {
  return (
    <section className="bg-section px-6 py-20 text-center text-white max-w-4xl mx-auto rounded-xl mt-12 shadow-lg">
      <h2 className="text-3xl font-heading font-extrabold text-accent mb-4">
        Get Lifetime Access
      </h2>
      <p className="text-purple-300 mb-6 text-lg">
        Unlock all courses, templates, and future updates — one-time payment.
      </p>
      <div className="inline-block bg-card border border-border px-8 py-6 rounded-xl">
        <p className="text-4xl font-bold text-accent mb-2">€497</p>
        <p className="text-sm text-purple-200 mb-4 line-through">€997 regular price</p>
        <Button>Buy Now</Button>
      </div>
    </section>
  )
}
