import { Hero } from "@/components/hero"
import { FeaturedSection } from "@/components/featured-section"
import { InteractiveStats } from "@/components/interactive-stats"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { Navbar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <FeaturedSection />
      <InteractiveStats />
      <TestimonialsCarousel />
    </main>
  )
}
