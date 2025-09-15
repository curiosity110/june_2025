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
    <div className="min-h-screen">
      {/* Animated background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-background/80"></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse-slow delay-1000"></div>
      </div>

      <main className="relative">
        <CourseHero />
        <CoursePrice />
        <CourseBenefits />
        <CourseHighlights />
        <CourseReasons />
        <CourseBonuses />
        <CourseGuarantee />
        <CourseInstructor />
        <CourseTestimonials />
        <CourseFooterCTA />
      </main>
    </div>
  )
}
