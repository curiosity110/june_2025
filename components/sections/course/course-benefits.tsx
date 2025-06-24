// components/sections/course/course-benefits.tsx
import { CheckCircle } from "lucide-react"

const benefits = [
  "419+ Video Lessons and 37+ Hours of expert-led training",
  "Available in English, Spanish, French, and German",
  "One-Time Payment – No Upsells | Lifetime Access",
  "Unlimited Resale Rights with 100% Profit",
  "Access to Private Community & Lifetime Updates",
  "Weekly Live Calls on Strategy & Growth",
  "Done-for-You Funnels & Email Templates"
]

export default function CourseBenefits() {
  return (
    <section className="bg-card py-16 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-accent mb-6">
          What’s Included
        </h2>

        <ul className="grid gap-4 text-left text-white text-sm sm:text-base max-w-2xl mx-auto">
          {benefits.map((item, idx) => (
            <li key={idx} className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-green-400 mt-1" />
              <span className="text-purple-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
