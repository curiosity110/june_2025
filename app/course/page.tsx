// app/course/page.tsx
import CourseHero from "@/components/sections/course/course-hero"
import CourseBenefits from "@/components/sections/course/course-benefits"
import CourseHighlights from "@/components/sections/course/course-highlights"
import CourseReasons from "@/components/sections/course/course-reasons"
import CourseBonuses from "@/components/sections/course/course-bonuses"
import CoursePrice from "@/components/sections/course/course-price"
import CourseFooterCTA from "@/components/sections/course/course-footer-cta"

export default function CoursePage() {
  return (
    <main className="bg-[#0f0f1c] text-white">
      <CourseHero />
      <CourseBenefits />
      <CourseHighlights />
      <CourseReasons />
      {/* <CourseBonuses /> */}
      {/* <CoursePrice /> */}
      {/* <CourseFooterCTA /> */}
    </main>
  )
}
