// components/sections/course/course-bonuses.tsx
import { Gift } from "lucide-react"

const bonuses = [
  {
    title: "🎁 Bonus: AI Automation Course ($97 Value)",
    description: "Buy within 48 hours and get access to a step-by-step AI automation training — included FREE.",
  },
  {
    title: "🎁 Bonus: Pre-Built Sales Funnel",
    description: "Skip the setup. Get a plug-and-play funnel ready to start selling instantly.",
  },
  {
    title: "🎁 Bonus: Email Marketing Templates",
    description: "Just copy, paste, and profit — done-for-you email sequences that convert.",
  }
]

export default function CourseBonuses() {
  return (
    <section className="bg-[#0f0f1c] px-6 py-20">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-yellow-300 mb-10">
          Fast-Action Bonuses
        </h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {bonuses.map((bonus, i) => (
            <div
              key={i}
              className="bg-[#1f1f2e] border border-[#2e2e40] p-6 rounded-xl text-left shadow-md"
            >
              <div className="flex items-start gap-3 mb-2">
                <Gift className="w-5 h-5 text-yellow-300 mt-1" />
                <h3 className="text-white font-semibold text-md">{bonus.title}</h3>
              </div>
              <p className="text-purple-300 text-sm">{bonus.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
