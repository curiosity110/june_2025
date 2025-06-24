// app/course/page.tsx
import CourseHero from "@/components/sections/course/course-hero"
import CourseBenefits from "@/components/sections/course/course-benefits"
import CourseHighlights from "@/components/sections/course/course-highlights"
import CourseReasons from "@/components/sections/course/course-reasons"
import CourseBonuses from "@/components/sections/course/course-bonuses"
import CoursePrice from "@/components/sections/course/course-price"
import CourseFooterCTA from "@/components/sections/course/course-footer-cta"
import CourseTestimonials from "@/components/sections/course/course-testimonials"
import CourseInstructor from "@/components/sections/course/course-instructor"
import CourseGuarantee from "@/components/sections/course/course-guarantee"

export default function CoursePage() {
  return (
    <main className="bg-[#0f0f1c] text-white">
      {/* <main className="bg-[#0d1522] text-white"> */}
      <CourseHero />
      <CoursePrice />
      <CourseBenefits />
      <CourseHighlights />
      <CourseReasons />
      <CourseInstructor />
      <CourseTestimonials />
      <CourseBonuses />
      <CourseGuarantee />
      <CoursePrice />
      <CourseBonuses />
      <CourseGuarantee />
      <CourseInstructor />
      <CourseTestimonials />
      <CourseFooterCTA />
    </main>
  )
}
