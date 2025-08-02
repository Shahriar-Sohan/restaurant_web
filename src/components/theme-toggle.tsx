"use client"
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative transition-all duration-300 hover:scale-110 bg-white border-gray-300 hover:border-gray-400 dark:bg-transparent dark:border-gray-600 hover:dark:border-gray-500 hover:shadow-lg cursor-pointer"
    >
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 text-yellow-500 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 text-gray-700 transition-all dark:rotate-0 dark:scale-100 dark:text-gray-300" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}
