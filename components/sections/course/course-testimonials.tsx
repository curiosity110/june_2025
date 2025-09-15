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
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-heading font-black text-white mb-8">
          Student Success Stories
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <div key={i} className="glass-card border border-accent/30 p-5 rounded-xl shadow-md h-full flex flex-col justify-between hover:border-accent/50 transition-all duration-300">
              <p className="text-white/90 text-sm mb-4 flex-1 leading-relaxed">"{t.quote}"</p>
              <div className="flex items-center justify-center gap-2 text-accent text-sm font-medium">
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