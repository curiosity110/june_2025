// components/sections/course/course-reasons.tsx
import { BadgeCheck } from "lucide-react"

const reasons = [
  "100% Resell Profit – Keep every dollar from every sale",
  "Recoup Your Investment Instantly – Just one sale pays for the course",
  "No Subscriptions – One-time payment, no hidden fees ever",
  "Earn While You Learn – Start reselling even before you finish",
  "Supportive Entrepreneur Community – You're never building alone"
]

export default function CourseReasons() {
  return (
    <section className="bg-card px-6 py-20">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-accent mb-8">
          Why Choose This Course?
        </h2>
        <ul className="grid gap-4 text-left text-white text-sm sm:text-base max-w-2xl mx-auto">
          {reasons.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <BadgeCheck className="w-5 h-5 text-green-400 mt-1" />
              <span className="text-purple-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
