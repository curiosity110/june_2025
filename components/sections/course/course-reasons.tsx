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
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-8">
          Why Choose This Course?
        </h2>
        <ul className="grid gap-4 text-left max-w-2xl mx-auto">
          {reasons.map((item, i) => (
            <li key={i} className="glass-card p-4 rounded-xl border border-accent/30 hover:border-accent/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <BadgeCheck className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-white font-medium text-sm leading-relaxed">{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
