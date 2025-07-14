import { Card, CardContent } from "@/components/ui/card"
import { Heart, Users, Award } from "lucide-react"
import Image from "next/image"

export function About() {
  const features = [
    {
      icon: Heart,
      title: "Fresh Ingredients",
      description: "We source the finest ingredients daily to ensure authentic flavors in every bite",
    },
    {
      icon: Users,
      title: "Family Recipes",
      description: "Traditional Greek recipes passed down through generations, perfected over time",
    },
    {
      icon: Award,
      title: "Award Winning",
      description: "Recognized for excellence in authentic Greek cuisine and customer service",
    },
  ]

  return (
    <section id="about" className="py-20 bg-gray-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="animate-in fade-in-50 slide-in-from-left-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Our Story</h2>
            <p className="text-lg text-gray-600 mb-6 leading-relaxed">
              Zeus Street Greek brings the authentic taste of Greece to your neighborhood. Founded with a passion for
              sharing traditional Greek street food, we&apos;ve created a modern dining experience that honors our heritage
              while embracing contemporary flavors.
            </p>
            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              Every dish is crafted with love, using time-honored recipes and the freshest ingredients. From our
              signature wraps to our Mediterranean bowls, we&apos;re committed to delivering an unforgettable culinary
              journey.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 lg:gap-6">
              {features.map((feature, index) => (
                <Card
                  key={index}
                  className="text-center p-3 lg:p-4 hover:shadow-lg transition-all duration-500 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <CardContent className="pt-4">
                    <feature.icon className="h-6 w-6 lg:h-8 lg:w-8 mx-auto mb-3 text-blue-600 transition-transform duration-300 hover:scale-110" />
                    <h3 className="font-semibold text-gray-900 mb-2 text-sm lg:text-base">{feature.title}</h3>
                    <p className="text-xs lg:text-sm text-gray-600 leading-relaxed">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="relative animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-300">
            <div className="aspect-square bg-gray-200 rounded-2xl overflow-hidden shadow-2xl">
              <Image
                src="/placeholder.svg?height=500&width=500"
                alt="Restaurant interior"
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-24 h-24 lg:w-32 lg:h-32 bg-blue-600 rounded-2xl opacity-20 animate-pulse"></div>
            <div
              className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 bg-indigo-600 rounded-2xl opacity-20 animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>
    </section>
  )
}
