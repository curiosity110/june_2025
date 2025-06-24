// app/page.tsx
import Header from "@/components/layout/header"
import HeroSection from "@/components/sections/hero"
import BundleSection from "@/components/sections/bundle"
import Testimonials from "@/components/sections/testimonials"
import Footer from "@/components/layout/footer"
import LifetimeAccess from "@/components/sections/lifetime-access"
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <BundleSection />
      <Testimonials />
      <LifetimeAccess />
      <Footer />
    </>
  )
}
