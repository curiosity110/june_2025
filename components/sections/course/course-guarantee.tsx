// components/sections/course/course-guarantee.tsx
import { ShieldCheck } from "lucide-react"

export default function CourseGuarantee() {
  return (
    <section className="bg-[#0f0f1c] px-6 py-20 text-center text-white">
      <div className="max-w-3xl mx-auto space-y-6">
        <ShieldCheck className="w-10 h-10 mx-auto text-yellow-300" />
        <h2 className="text-2xl sm:text-3xl font-heading font-bold text-yellow-300">14-Day Money Back Guarantee</h2>
        <p className="text-purple-200 text-sm">
          Try the entire course risk-free. If you don't feel it's a good fit, email us within 14 days and we'll refund your payment—no questions asked.
        </p>
      </div>
    </section>
  )
}
