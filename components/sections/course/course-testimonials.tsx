// components/sections/course/course-testimonials.tsx
import { Quote } from "lucide-react"

const testimonials = [
  {
    quote: "This course completely changed how I approach online marketing. Within two weeks I made my first sale!",
    name: "Alex P."
  },
  {
    quote: "I was skeptical at first but the strategies here really work. The community support keeps me motivated every day.",
    name: "Jamie L."
  },
  {
    quote: "The step-by-step lessons are easy to follow. I've already doubled my side income thanks to the resale rights!",
    name: "Riley K."
  }
]

export default function CourseTestimonials() {
  return (
    <section className="bg-[#0f0f1c] px-6 py-20 text-center text-white">
      <div className="max-w-4xl mx-auto space-y-8">
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-yellow-300">Student Success Stories</h2>
        <div className="grid gap-6 sm:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="bg-[#151525] border border-[#2e2e40] p-6 rounded-xl shadow-md h-full flex flex-col justify-between">
              <p className="text-purple-200 text-sm mb-4 flex-1">"{t.quote}"</p>
              <div className="flex items-center justify-center gap-2 text-yellow-300 text-sm font-medium">
                <Quote className="w-4 h-4" />
                <span>{t.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
}
