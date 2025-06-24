// app/page.tsx
import HeroSection from "@/components/sections/hero"
import FreebieSection from "@/components/sections/freebie"
import ProductsSection from "@/components/sections/products"
import BundleSection from "@/components/sections/bundle"
import TestimonialsSection from "@/components/sections/testimonials"
import Footer from "@/components/layout/footer"
import LifetimeAccess from "@/components/sections/lifetime-access"

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FreebieSection />
      <ProductsSection />
      <BundleSection />
      <LifetimeAccess />
      <TestimonialsSection />
      <Footer />
    </>
  )
}
