import { MenuPage } from "@/components/menu-page"
import { NavigationBar } from "@/components/navbar"

export default function Menu() {
  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
      <NavigationBar />
      <div className="pt-16">
        <MenuPage />
      </div>
    </main>
  )
}
