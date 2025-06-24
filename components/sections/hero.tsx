import { Button } from "@/components/ui/button"

export default function HeroSection() {
  return (
    <section className="bg-[#050609] px-6 py-20 rounded-xl max-w-5xl mx-auto shadow-lg mt-10 relative">
      <div className="flex flex-col gap-10 sm:flex-row justify-between items-start sm:items-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-heading font-extrabold text-white mb-4 leading-tight">
            THE ULTIMATE<br /> BRANDING COURSE
          </h1>
          <p className="text-accent text-lg font-medium mb-6">
            AI POWER. SOUL-DRIVEN IMPACT.<br /> ENROLL INSTANTLY.
          </p>
          <Button className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold px-6 py-2 rounded-md">Get Started</Button>
        </div>

        <div className="absolute top-6 left-6 sm:left-72 bg-[#1f1f2e] text-sm text-white px-4 py-3 rounded-lg shadow-md">
          <p className="font-semibold mb-1">Hello</p>
          <p className="text-xs text-text-soft">How can I help you?</p>
        </div>
      </div>
    </section>
  )
}
