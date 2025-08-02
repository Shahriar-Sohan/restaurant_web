"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Quote, ChevronLeft, ChevronRight, Verified, Award, Crown } from "lucide-react"

import Image from "next/image"

export function TestimonialsCarousel() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const testimonials = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Michelin Guide Food Critic",
      company: "Culinary Excellence Magazine",
      avatar: "/placeholder.svg?height=120&width=120&text=SJ",
      rating: 5,
      text: "Zeus Street Greek represents the pinnacle of authentic Mediterranean cuisine. The attention to detail, from ingredient sourcing to presentation, rivals the finest establishments in Athens. This is not just fast-casual dining—this is culinary artistry.",
      location: "New York, NY",
      date: "2 days ago",
      verified: true,
      featured: true,
      credentials: "James Beard Award Winner",
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Executive Chef & Restaurateur",
      company: "Chen's Mediterranean Group",
      avatar: "/placeholder.svg?height=120&width=120&text=MC",
      rating: 5,
      text: "Having traveled extensively through Greece and operated Mediterranean restaurants for over 15 years, I can confidently say Zeus Street Greek captures the soul of authentic Greek street food. The flavors are impeccable, the execution flawless.",
      location: "San Francisco, CA",
      date: "1 week ago",
      verified: true,
      featured: false,
      credentials: "15+ Years Experience",
    },
    {
      id: 3,
      name: "Elena Rodriguez",
      role: "Senior Food & Travel Editor",
      company: "Gourmet Traveler International",
      avatar: "/placeholder.svg?height=120&width=120&text=ER",
      rating: 5,
      text: "Zeus Street Greek has redefined the fast-casual dining landscape. Their commitment to authenticity, combined with modern culinary techniques, creates an experience that transcends typical expectations. A true testament to Greek culinary heritage.",
      location: "Los Angeles, CA",
      date: "3 days ago",
      verified: true,
      featured: true,
      credentials: "International Food Critic",
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Hospitality Industry Consultant",
      company: "Premium Dining Solutions",
      avatar: "/placeholder.svg?height=120&width=120&text=DT",
      rating: 5,
      text: "The consistency in quality and service excellence at Zeus Street Greek is remarkable. As someone who evaluates dining establishments professionally, I'm impressed by their operational excellence and unwavering commitment to customer satisfaction.",
      location: "Chicago, IL",
      date: "5 days ago",
      verified: true,
      featured: false,
      credentials: "Hospitality Expert",
    },
  ]

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 6000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, testimonials.length])

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-blue-900/20 dark:to-indigo-900/20 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-slate-900 dark:text-white mb-2 transition-colors duration-500">Industry</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 dark:from-blue-400 dark:via-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
              Recognition
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-500">
            Trusted by culinary experts, food critics, and industry professionals
            <br className="hidden md:block" />
            who recognize our commitment to authentic Greek excellence
          </p>
        </div>

        {/* Testimonial Display */}
        <div className="relative max-w-6xl mx-auto">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-in-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial, index) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <Card className="relative bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl border-0 shadow-2xl transition-all duration-500 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-20 dark:opacity-30" />
                    <div className="absolute inset-[2px] bg-white dark:bg-gray-900 rounded-lg transition-colors duration-500" />

                    <CardContent className="relative p-12 md:p-16">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-8">
                        <div className="flex items-center gap-4">
                          {testimonial.featured && (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200 dark:border-amber-700 rounded-full px-4 py-2 transition-colors duration-500">
                              <Crown className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                              <span className="text-amber-800 dark:text-amber-200 font-semibold text-sm transition-colors duration-500">
                                FEATURED REVIEW
                              </span>
                            </div>
                          )}
                          {testimonial.verified && (
                            <div className="flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 dark:from-blue-900/30 dark:to-purple-900/30 border border-blue-200 dark:border-blue-700 rounded-full px-4 py-2 transition-colors duration-500">
                              <Verified className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                              <span className="text-blue-800 dark:text-blue-200 font-semibold text-sm transition-colors duration-500">
                                VERIFIED
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Quote Icon */}
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-xl">
                          <Quote className="w-8 h-8 text-white" />
                        </div>
                      </div>

                      {/* Rating */}
                      <div className="flex justify-center mb-8">
                        <div className="flex items-center gap-1 bg-gradient-to-r from-amber-50 to-yellow-50 dark:from-amber-900/30 dark:to-yellow-900/30 border border-amber-200 dark:border-amber-700 rounded-full px-6 py-3 shadow-lg transition-colors duration-500">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-6 h-6 text-amber-500 fill-current" />
                          ))}
                          <span className="ml-2 text-amber-800 dark:text-amber-200 font-bold transition-colors duration-500">
                            EXCEPTIONAL
                          </span>
                        </div>
                      </div>

                      {/* Testimonial Text */}
                      <blockquote className="text-xl md:text-2xl text-slate-700 dark:text-slate-200 text-center mb-12 leading-relaxed font-light italic transition-colors duration-500">
                        "{testimonial.text}"
                      </blockquote>

                      {/* Author Section */}
                      <div className="flex items-center justify-center">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                            <div className="w-20 h-20 rounded-full overflow-hidden ring-4 ring-white dark:ring-gray-700 shadow-2xl transition-colors duration-500">
                              <img
                                src={testimonial.avatar || "/placeholder.svg"}
                                alt={testimonial.name}
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {testimonial.verified && (
                              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
                                <Verified className="w-4 h-4 text-white" />
                              </div>
                            )}
                          </div>

                          <div className="text-left">
                            <h4 className="font-bold text-slate-900 dark:text-white text-xl mb-1 transition-colors duration-500">
                              {testimonial.name}
                            </h4>
                            <p className="text-slate-600 dark:text-slate-300 font-medium mb-1 transition-colors duration-500">
                              {testimonial.role}
                            </p>
                            <p className="text-blue-600 dark:text-blue-400 font-semibold text-sm mb-2 transition-colors duration-500">
                              {testimonial.company}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 transition-colors duration-500">
                              <span className="bg-slate-100 dark:bg-gray-800 px-3 py-1 rounded-full font-medium transition-colors duration-500">
                                {testimonial.credentials}
                              </span>
                              <span>•</span>
                              <span>{testimonial.location}</span>
                              <span>•</span>
                              <span>{testimonial.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer"
            onClick={prevTestimonial}
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-110 cursor-pointer"
            onClick={nextTestimonial}
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        </div>

        {/* Indicators */}
        <div className="flex justify-center mt-12 gap-4">
          {testimonials.map((_, index) => (
            <button
              key={index}
              className={`transition-all duration-300 ${
                index === currentTestimonial
                  ? "w-12 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full scale-110 shadow-lg cursor-pointer"
                  : "w-4 h-4 bg-slate-300 dark:bg-slate-600 hover:bg-slate-400 dark:hover:bg-slate-500 rounded-full transition-colors duration-300 cursor-pointer"
              }`}
              onClick={() => {
                setCurrentTestimonial(index)
                setIsAutoPlaying(false)
              }}
            />
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-16 text-center">
          <div className="inline-flex items-center gap-8 bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl border border-slate-200 dark:border-gray-700 rounded-2xl px-8 py-6 shadow-2xl transition-colors duration-500">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                4.9/5
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Expert Rating
              </div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                100%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Recommended
              </div>
            </div>
            <div className="w-px h-12 bg-slate-200 dark:bg-gray-600" />
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-white transition-colors duration-300">
                15+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400 transition-colors duration-300">
                Industry Awards
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
