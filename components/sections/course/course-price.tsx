// components/sections/course/course-price.tsx
import { Button } from "@/components/ui/button"

export default function CoursePrice() {
  return (
    <section className="bg-card px-6 py-20 text-center">
      <div className="max-w-xl mx-auto space-y-6">
        <h2 className="text-3xl font-heading font-bold text-accent">
          Lifetime Access – One Payment Only
        </h2>

        <p className="text-purple-300 text-lg">
          Get the full Ultimate Branding Course, Resell Rights, bonuses, updates, and access — forever.
        </p>

        <div className="inline-block bg-card border border-border px-10 py-8 rounded-xl shadow-md">
          <p className="text-5xl font-extrabold text-accent mb-2">€497</p>
          <p className="text-sm text-purple-200 mb-4 line-through">€997 regular price</p>
          <Button className="text-black bg-highlight font-bold text-sm px-8 py-4 hover:scale-105 transition">
            Get Instant Access
          </Button>
        </div>

        <p className="text-xs text-gray-500 mt-4">
          🚫 No Refunds — Instant digital access.  
          📩 Login details sent via email after payment.
        </p>
      </div>
    </section>
  )
}
