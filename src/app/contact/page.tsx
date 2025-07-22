import { ContactPage } from "@/components/contact-page"
import { NavigationBar } from "@/components/navbar"

export default function Contact() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <NavigationBar />
      <div className="pt-16">
        <ContactPage />
      </div>
    </main>
  )
}
