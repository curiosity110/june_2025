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
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-8">
          What You'll Master
        </h2>
        <ul className="grid gap-4 max-w-3xl mx-auto">
          {highlights.map((item, i) => (
            <li key={i} className="glass-card p-4 rounded-xl border border-accent/30 hover:border-accent/50 transition-all duration-300">
              <div className="flex items-start gap-3">
                <Check className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                <span className="text-white font-medium text-sm leading-relaxed text-left">{item}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
