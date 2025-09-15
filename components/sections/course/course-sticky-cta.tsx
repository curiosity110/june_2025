import { Button } from "@/components/ui/button"

export default function CourseStickyCTA() {
  return (
    <div className="sticky top-20 z-20 flex justify-between items-center px-4 py-3 glass-strong border-b border-accent/30 shadow-md backdrop-blur-md">
      <p className="text-white font-semibold">Enroll today – Only $499</p>
      <Button className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black font-bold px-4 py-2 shadow-md">Join Now</Button>
    </div>
  )
}
