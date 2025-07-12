"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Award, Clock } from "lucide-react"

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroImages = [
    "/placeholder.svg?height=800&width=1200&text=Greek+Gyros",
    "/placeholder.svg?height=800&width=1200&text=Fresh+Salads",
    "/placeholder.svg?height=800&width=1200&text=Grilled+Meats",
  ]

  const stats = [
    { icon: Star, value: "4.9", label: "Rating", suffix: "/5" },
    { icon: Users, value: "50K+", label: "Happy Customers", suffix: "" },
    { icon: Award, value: "15", label: "Awards Won", suffix: "" },
    { icon: Clock, value: "20", label: "Min Delivery", suffix: "" },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 4000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black dark:from-black dark:via-gray-900 dark:to-gray-800 overflow-hidden transition-colors duration-500"
    >
      {/* Background Images */}
      <div className="absolute inset-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-30 dark:opacity-20" : "opacity-0"
            }`}
          >
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${image})` }} />
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-white/10 dark:bg-white/5 backdrop-blur-sm border border-white/20 dark:border-white/10 rounded-full px-4 py-2 mb-8 transition-colors duration-500">
          <Star className="w-4 h-4 text-yellow-400 fill-current" />
          <span className="text-white dark:text-gray-100 text-sm font-medium">Authentic Greek Experience</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight">
          <span className="block text-white dark:text-gray-100 transition-colors duration-300">Authentic</span>
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 dark:from-blue-300 dark:via-purple-400 dark:to-pink-400 transition-colors duration-300">
            Greek Street
          </span>
          <span className="block text-white dark:text-gray-100 transition-colors duration-300">Food</span>
        </h1>

        {/* Subtitle */}
        <p className="text-xl md:text-2xl lg:text-3xl text-gray-300 dark:text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed transition-colors duration-500">
          Experience the vibrant flavors of Greece with our modern twist on traditional street food classics
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white text-lg px-8 py-4 h-auto transition-all duration-300 hover:scale-105"
          >
            <span className="mr-3">Explore Menu</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-4 h-auto border-2 border-white/30 dark:border-white/20 text-white dark:text-gray-100 bg-white/10 dark:bg-white/5 backdrop-blur-sm hover:bg-white hover:text-gray-900 dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 hover:scale-105"
          >
            <span>Find Location</span>
          </Button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform transition-all duration-300 hover:scale-105 cursor-default"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/10 dark:bg-white/5 backdrop-blur-sm rounded-full mb-4 transition-colors duration-300">
                <stat.icon className="w-8 h-8 text-white dark:text-gray-100" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white dark:text-gray-100 mb-2">
                {stat.value}
                <span className="text-blue-400 dark:text-blue-300">{stat.suffix}</span>
              </div>
              <div className="text-gray-300 dark:text-gray-200 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 flex gap-2">
        {heroImages.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? "bg-white dark:bg-gray-100 scale-125"
                : "bg-white/30 dark:bg-white/20 hover:bg-white/50 dark:hover:bg-white/40"
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </section>
  )
}
