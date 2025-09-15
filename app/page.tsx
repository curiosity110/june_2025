// app/page.tsx
import Hero from "@/components/sections/hero"
import Features from "@/components/sections/features"
import Skills from "@/components/sections/skills"
import SocialProof from "@/components/sections/social-proof"
import Pricing from "@/components/sections/pricing"
import FAQ from "@/components/sections/faq"

export default function HomePage() {
  return (
    <>
      <Hero />
      <Features />
      <Skills />
      <SocialProof />
      <Pricing />
      <FAQ />
    </>
  )
}