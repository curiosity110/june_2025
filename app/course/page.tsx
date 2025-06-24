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
import Header from "@/components/layout/header"

export default function CoursePage() {
  return (
    <>
      <Header />
      <main className="bg-[#0f0f1c] text-white">
      {/* <main className="bg-[#0d1522] text-white"> */}
      <CourseHero />
      <CourseBenefits />
      <CourseHighlights />
      <CourseReasons />
      <CourseInstructor />
      <CourseTestimonials />
      <CourseBonuses />
      <CourseGuarantee />
      <CoursePrice />
      <CourseFooterCTA />
      </main>
    </>
  )
}
