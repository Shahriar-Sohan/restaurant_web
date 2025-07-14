"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, Heart, Clock, Flame, ArrowRight, Award, ChefHat, Sparkles } from "lucide-react"
import Image from "next/image"

export function FeaturedSection() {
  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  const featuredItems = [
    {
      id: 1,
      name: "Zeus Signature Wrap",
      description:
        "Masterfully crafted with premium marinated chicken, house-made tzatziki, and garden-fresh vegetables",
      price: "$14.90",
      originalPrice: "$16.90",
      image: "/placeholder.svg?height=400&width=600&text=Zeus+Signature+Wrap",
      rating: 4.9,
      reviews: 1250,
      cookTime: "8 min",
      isSpicy: false,
      isPopular: true,
      discount: "15% OFF",
      chef: "Chef's Choice",
      ingredients: ["Premium Chicken", "House Tzatziki", "Fresh Vegetables", "Artisan Pita"],
    },
    {
      id: 2,
      name: "Mediterranean Royale Bowl",
      description:
        "An exquisite blend of quinoa, grilled chicken, imported feta, Kalamata olives, and signature dressing",
      price: "$15.90",
      originalPrice: null,
      image: "/placeholder.svg?height=400&width=600&text=Mediterranean+Royale+Bowl",
      rating: 4.8,
      reviews: 890,
      cookTime: "12 min",
      isSpicy: false,
      isPopular: false,
      discount: null,
      chef: "Artisan Crafted",
      ingredients: ["Organic Quinoa", "Grilled Chicken", "Imported Feta", "Kalamata Olives"],
    },
    {
      id: 3,
      name: "Spartan Lamb Souvlaki",
      description: "Tender lamb skewers with authentic Greek spices, served with warm pita and cooling tzatziki",
      price: "$18.90",
      originalPrice: null,
      image: "/placeholder.svg?height=400&width=600&text=Spartan+Lamb+Souvlaki",
      rating: 4.7,
      reviews: 650,
      cookTime: "15 min",
      isSpicy: true,
      isPopular: false,
      discount: null,
      chef: "Traditional Recipe",
      ingredients: ["Premium Lamb", "Greek Spices", "Artisan Pita", "House Tzatziki"],
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900/20 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-3 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/30 dark:to-orange-900/30 border border-amber-200/50 dark:border-amber-700/50 rounded-full px-6 py-3 mb-6 shadow-lg backdrop-blur-sm transition-colors duration-500">
            <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <span className="text-amber-800 dark:text-amber-200 font-semibold tracking-wide transition-colors duration-500">
              SIGNATURE COLLECTION
            </span>
          </div>

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-slate-900 dark:text-white mb-2 transition-colors duration-500">Culinary</span>
            <span className="block bg-gradient-to-r from-blue-600 via-purple-600 to-amber-600 dark:from-blue-400 dark:via-purple-400 dark:to-amber-400 bg-clip-text text-transparent">
              Masterpieces
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-500">
            Each dish is a testament to our commitment to authentic Greek flavors,
            <br className="hidden md:block" />
            crafted with premium ingredients and traditional techniques
          </p>
        </div>

        {/* Featured Items Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
          {featuredItems.map((item, index) => (
            <div
              key={item.id}
              className={`group relative transform transition-all duration-500 ${
                hoveredItem === index ? "scale-105 z-20" : "hover:scale-105"
              }`}
              onMouseEnter={() => setHoveredItem(index)}
              onMouseLeave={() => setHoveredItem(null)}
            >
              <Card className="overflow-hidden bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-0 shadow-2xl hover:shadow-3xl transition-all duration-500">
                {/* Image Container */}
                <div className="relative overflow-hidden">
                  <div className="aspect-[4/3] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-700">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={600}
                      height={400}
                      className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                    />
                  </div>

                  {/* Badges */}
                  <div className="absolute top-6 left-6 flex flex-col gap-3">
                    {item.discount && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-semibold px-3 py-1 shadow-lg">
                        {item.discount}
                      </Badge>
                    )}
                    {item.isPopular && (
                      <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-semibold px-3 py-1 shadow-lg">
                        <Flame className="w-3 h-3 mr-1" />
                        TRENDING
                      </Badge>
                    )}
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold px-3 py-1 shadow-lg">
                      <ChefHat className="w-3 h-3 mr-1" />
                      {item.chef}
                    </Badge>
                  </div>

                  {/* Heart Button */}
                  <button className="absolute top-6 right-6 w-12 h-12 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 shadow-lg">
                    <Heart className="w-5 h-5 text-slate-600 dark:text-slate-300 hover:text-red-500 transition-colors duration-300" />
                  </button>

                  {/* Info Overlay */}
                  <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-800/95 backdrop-blur-xl rounded-2xl p-4 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 shadow-xl border border-white/50 dark:border-gray-700/50">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(item.rating)
                                  ? "text-amber-400 fill-current"
                                  : "text-slate-300 dark:text-slate-600"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold text-slate-900 dark:text-white">{item.rating}</span>
                        <span className="text-slate-500 dark:text-slate-400 text-sm">
                          ({item.reviews.toLocaleString()})
                        </span>
                      </div>
                      <Award className="w-5 h-5 text-amber-500" />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-1 text-slate-600 dark:text-slate-300">
                        <Clock className="w-4 h-4" />
                        <span>{item.cookTime}</span>
                      </div>
                      {item.isSpicy && (
                        <div className="flex items-center gap-1 text-red-500">
                          <Flame className="w-4 h-4" />
                          <span className="text-xs font-medium">SPICY</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                    {item.name}
                  </h3>

                  <p className="text-slate-600 dark:text-slate-300 mb-6 leading-relaxed font-light transition-colors duration-300">
                    {item.description}
                  </p>

                  {/* Ingredients */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 uppercase tracking-wide transition-colors duration-300">
                      Key Ingredients
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map((ingredient, i) => (
                        <span
                          key={i}
                          className="text-xs bg-slate-100 dark:bg-gray-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full font-medium transition-colors duration-300"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Price and CTA */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-blue-600 dark:from-white dark:to-blue-400 bg-clip-text text-transparent">
                        {item.price}
                      </span>
                      {item.originalPrice && (
                        <span className="text-lg text-slate-400 dark:text-slate-500 line-through font-medium">
                          {item.originalPrice}
                        </span>
                      )}
                    </div>

                    <Button
                      size="lg"
                      className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 dark:from-blue-500 dark:to-purple-500 dark:hover:from-blue-600 dark:hover:to-purple-600 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 opacity-0 group-hover:opacity-100 shadow-lg"
                    >
                      Add to Cart
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Button
            size="lg"
            className="group bg-gradient-to-r from-slate-900 to-blue-900 hover:from-slate-800 hover:to-blue-800 dark:from-white dark:to-blue-100 dark:hover:from-gray-100 dark:hover:to-blue-200 text-white dark:text-gray-900 font-semibold px-8 py-4 rounded-xl transition-all duration-300 hover:scale-105 shadow-xl"
          >
            <span className="mr-3 text-lg">Explore Complete Menu</span>
            <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
