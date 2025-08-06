"use client"

import React from "react"
import { Button } from "@/components/ui/button"
import { ArrowRight, Star, Users, Award, Clock } from "lucide-react"
import { ContainerTextFlip } from "./ui/container-text-flip"

export function Hero() {

  const stats = [
    { icon: Star, value: "4.9", label: "Rating", suffix: "/5" },
    { icon: Users, value: "50K+", label: "Happy Customers", suffix: "" },
    { icon: Award, value: "15", label: "Awards Won", suffix: "" },
    { icon: Clock, value: "20", label: "Min Delivery", suffix: "" },
  ]

  return (
    <section
      id="home"
      className="
        relative pt-22 min-h-screen flex items-center justify-center
        bg-gradient-to-br
        light:from-white light:via-gray-100 light:to-gray-200
        dark:from-gray-900 dark:via-gray-800 dark:to-black
        overflow-hidden transition-colors duration-500
      "
    >
      {/* Main Content */}
      <div className="relative z-10 max-w-6xl mx-auto text-center px-4 sm:px-6 lg:px-8">

        {/* Main Heading */}
        <div className="text-6xl md:text-8xl lg:text-9xl font-bold mb-8 leading-tight flex flex-row items-center justify-center">
          <ContainerTextFlip
            words={["Authentic", "Greek", "Street Foods", "RivalRay"]}
            interval={1000}
            lastWordAnimationSpeed={1.5}
            postArrayDelay={3000}
            className="flex flex-row items-center justify-center md:pl-2"
            textClassName="font-bold"
          />
        </div>

        {/* Subtitle */}
        <p className="
          text-xl md:text-2xl lg:text-3xl
          light:text-gray-900
          dark:text-gray-200
          mb-12 max-w-4xl mx-auto leading-relaxed
          transition-colors duration-500
        ">
          Experience the vibrant flavors of Greece with our modern twist on traditional street food classics
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
          <Button
            size="lg"
            className="
              group
              bg-gradient-to-r
              from-blue-600 to-purple-600
              hover:from-blue-700 hover:to-purple-700
              text-white text-lg px-8 py-4 h-auto
              rounded-lg
              shadow-md
              transition-all duration-300 hover:scale-105
              flex items-center justify-center
            "
          >
            <span className="mr-3">Explore Menu</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="
              text-lg px-8 py-4 h-auto border-2
              light:border-gray-400
              dark:border-white/20
              light:text-gray-900
              dark:text-gray-100
              light:bg-white/70
              dark:bg-white/10
              backdrop-blur-sm
              hover:bg-white hover:text-gray-900
              dark:hover:bg-white dark:hover:text-gray-900
              transition-all duration-300 hover:scale-105
            "
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
              <div className="inline-flex items-center justify-center w-16 h-16
                bg-white/90 light:shadow-md
                dark:bg-white/5 backdrop-blur-sm rounded-full mb-4 transition-colors duration-300"
              >
                {React.createElement(stat.icon, { className: "w-8 h-8 text-blue-600 dark:text-blue-300" })}
              </div>
              <div className="
                text-3xl md:text-4xl font-bold
                light:text-gray-900
                dark:text-gray-100
                mb-2
              ">
                {stat.value}
                <span className="text-blue-400 dark:text-blue-300">{stat.suffix}</span>
              </div>
              <div className="light:text-gray-700 dark:text-gray-200 text-sm font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
