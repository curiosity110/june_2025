import { Button } from "@/components/ui/button"

export default function CourseStickyCTA() {
  return (
    <div className="sticky top-0 z-20 flex justify-between items-center px-4 py-3 bg-[#151525] border-b border-[#2c2c40] shadow-md">
      <p className="text-white font-semibold">Enroll today – Only €497</p>
      <Button className="bg-yellow-400 text-black font-bold px-4 py-2">Join Now</Button>
    </div>
  )
}
