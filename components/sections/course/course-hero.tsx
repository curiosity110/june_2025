// components/sections/course/course-hero.tsx
import { Button } from "@/components/ui/button"

export default function CourseHero() {
  return (
    <section className="bg-[#0f0f1c] py-20 px-6">
      <div className="max-w-5xl mx-auto text-center space-y-6">
        <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white">
          Ultimate Branding Course <br /> with <span className="text-purple-400">Master Resell Rights</span>
        </h1>
        <p className="text-lg text-purple-200 font-medium max-w-2xl mx-auto">
          Learn. Earn. Resell Forever. Build Your Digital Empire with 100% Profits, Lifetime Access, and AI-Powered Automation.
        </p>
        <Button className="bg-yellow-400 text-black font-bold text-sm px-8 py-4 hover:scale-105 transition">
          Get Instant Access – $497
        </Button>
        <p className="text-xs text-gray-500 mt-2">One-time payment • No subscriptions • Instant access</p>
      </div>
    </section>
  )
}
