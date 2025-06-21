// components/sections/course/course-highlights.tsx
import { Check } from "lucide-react"

const highlights = [
  "Sales Funnels & Automation – Build high-converting sales systems",
  "Branding & Digital Product Creation – Create profitable, authority-building assets",
  "Email Marketing & Lead Generation – Turn leads into loyal customers",
  "Content Creation & Social Media Mastery – Instagram, TikTok, YouTube, and more",
  "Affiliate & Faceless Marketing – Monetize without showing your face",
  "AI-Powered Marketing Strategies – Leverage automation to scale faster",
  "Going Viral & Monetization – Boost visibility and drive real revenue"
]

export default function CourseHighlights() {
  return (
    <section className="bg-[#0f0f1c] px-6 py-20">
      <div className="max-w-5xl mx-auto text-center space-y-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-yellow-300">
          What You'll Master
        </h2>
        <ul className="grid gap-4 text-left text-white text-sm sm:text-base max-w-3xl mx-auto">
          {highlights.map((item, i) => (
            <li key={i} className="flex items-start gap-3">
              <Check className="w-5 h-5 text-accent mt-1" />
              <span className="text-purple-200">{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
