// app/page.tsx
import HeroSection from "@/components/sections/hero"
import FreebieSection from "@/components/sections/freebie"
import ProductsSection from "@/components/sections/products"
import BundleSection from "@/components/sections/bundle"
import Testimonials from "@/components/sections/testimonials"
import TestimonialsSection from "@/components/sections/testimonials"
import Footer from "@/components/layout/footer"
export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FreebieSection />
      <ProductsSection />
      <BundleSection />
      <Testimonials />
      <LifetimeAccess />
      <TestimonialsSection />
      <Footer />
    </>
  )
}