import { Hero } from "@/components/hero"
import { FeaturedSection } from "@/components/featured-section"
import { InteractiveStats } from "@/components/interactive-stats"
import { TestimonialsCarousel } from "@/components/testimonials-carousel"
import { NavigationBar } from "@/components/navbar"

export default function Home() {
  return (
    <main className="min-h-screen">
      <NavigationBar />
      <Hero />
      <FeaturedSection />
      <InteractiveStats />
      <TestimonialsCarousel />
    </main>
  )
}
