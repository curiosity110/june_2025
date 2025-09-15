// components/sections/course/course-guarantee.tsx
import { ShieldCheck } from "lucide-react"

export default function CourseGuarantee() {
  return (
    <section className="container mx-auto px-6 py-16">
      <div className="max-w-3xl mx-auto text-center">
        <div className="glass-card p-8 rounded-xl border border-accent/30 hover:border-accent/50 transition-all duration-300">
          <ShieldCheck className="w-12 h-12 mx-auto text-accent mb-4" />
          <h2 className="text-2xl md:text-3xl font-heading font-bold text-white mb-4">
            30-Day Money Back Guarantee
          </h2>
          <p className="text-white/80 text-sm leading-relaxed">
            Try the entire course risk-free. If you don't feel it's a good fit, email us within 30 days and we'll refund your payment—no questions asked.
          </p>
        </div>
      </div>
    </section>
  )
}