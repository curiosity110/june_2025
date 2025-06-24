// components/sections/course/course-footer-cta.tsx
import { Button } from "@/components/ui/button"

export default function CourseFooterCTA() {
  return (
    <section className="bg-section px-6 py-16 text-center">
      <div className="max-w-3xl mx-auto space-y-6">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-accent">
          You’re One Decision Away…
        </h2>

        <p className="text-purple-300 text-base sm:text-lg">
          You can keep figuring this out alone. Or plug into a proven system and start earning today.
        </p>

        <Button className="bg-highlight text-black font-bold px-8 py-4 hover:scale-105 transition">
          Join Now & Start Earning Tonight
        </Button>

        <p className="text-xs text-gray-500 mt-3">
          💡 Faceless businesses are the future. Will you be part of it?
        </p>
      </div>
    </section>
  )
}
