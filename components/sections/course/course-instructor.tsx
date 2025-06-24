// components/sections/course/course-instructor.tsx
import Image from "next/image"

export default function CourseInstructor() {
  return (
    <section className="bg-card px-6 py-20 text-white">
      <div className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8 items-center">
        <div className="text-center md:text-left space-y-4">
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-accent">Meet Your Instructor</h2>
          <p className="text-purple-200 text-sm">
            I'm Jordan, a digital strategist with over 10 years of branding experience. I've helped hundreds of creators build profitable online businesses.
          </p>
          <p className="text-purple-200 text-sm">
            In this course I distill everything I've learned so you can skip the trial and error and start seeing results faster.
          </p>
        </div>
        <div className="flex justify-center md:justify-end">
          <Image
            src="/instructor.jpg"
            alt="Instructor portrait"
            width={200}
            height={200}
            className="rounded-full border-border border-accent"
          />
        </div>
      </div>
    </section>
  )
}