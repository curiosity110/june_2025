import { Button } from "@/components/ui/button"

export default function CourseStickyCTA() {
  return (
    <div className="sticky top-0 z-20 flex justify-between items-center px-4 py-3 bg-card border-b border-border shadow-md">
      <p className="text-white font-semibold">Enroll today – Only €497</p>
      <Button className="bg-highlight text-black font-bold px-4 py-2">Join Now</Button>
    </div>
  )
}
