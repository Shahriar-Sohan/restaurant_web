import { AboutPage } from "@/components/about-page"
import { Navbar } from "@/components/navbar"

export default function About() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <Navbar />
      <div className="pt-16">
        <AboutPage />
      </div>
    </main>
  )
}
