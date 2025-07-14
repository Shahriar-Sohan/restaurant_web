"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Heart, Users, Award, Clock, Leaf, Globe } from "lucide-react"
import Image from "next/image"

export function AboutPage() {
  const features = [
    {
      icon: Heart,
      title: "Fresh Ingredients",
      description:
        "We source the finest ingredients daily from local suppliers and import authentic Greek products to ensure every dish captures the true essence of Mediterranean cuisine.",
    },
    {
      icon: Users,
      title: "Family Recipes",
      description:
        "Our recipes have been passed down through generations of Greek families, preserving the authentic flavors and traditional cooking methods that make our food special.",
    },
    {
      icon: Award,
      title: "Award Winning",
      description:
        "Recognized by food critics and industry professionals for our commitment to authenticity, quality, and exceptional customer service across all our locations.",
    },
    {
      icon: Clock,
      title: "Fast & Fresh",
      description:
        "Despite our commitment to traditional methods, we've perfected our processes to deliver fresh, hot meals quickly without compromising on quality or taste.",
    },
    {
      icon: Leaf,
      title: "Healthy Options",
      description:
        "Mediterranean cuisine is naturally healthy, and we offer plenty of vegetarian, vegan, and gluten-free options to accommodate all dietary preferences.",
    },
    {
      icon: Globe,
      title: "Authentic Experience",
      description:
        "From our imported olive oil to our traditional cooking techniques, every element is carefully chosen to transport you to the streets of Athens.",
    },
  ]

  const team = [
    {
      name: "Dimitri Kostas",
      role: "Head Chef & Co-Founder",
      image: "/placeholder.svg?height=300&width=300&text=Dimitri",
      bio: "Born in Athens, Dimitri brings 20+ years of culinary expertise and authentic Greek recipes passed down from his grandmother.",
    },
    {
      name: "Maria Papadopoulos",
      role: "Operations Director",
      image: "/placeholder.svg?height=300&width=300&text=Maria",
      bio: "Maria ensures every Zeus Street location maintains our high standards of quality, service, and authentic Greek hospitality.",
    },
    {
      name: "Andreas Stavros",
      role: "Executive Chef",
      image: "/placeholder.svg?height=300&width=300&text=Andreas",
      bio: "Andreas oversees menu development and chef training, ensuring consistency and innovation across all our restaurant locations.",
    },
  ]

  const timeline = [
    {
      year: "2012",
      title: "The Beginning",
      description:
        "Founded by Greek immigrants with a dream to share authentic street food flavors from their homeland.",
    },
    {
      year: "2015",
      title: "First Expansion",
      description:
        "Opened our second location due to overwhelming community support and demand for authentic Greek cuisine.",
    },
    {
      year: "2018",
      title: "Award Recognition",
      description:
        "Received 'Best Mediterranean Restaurant' award and recognition from local food critics and publications.",
    },
    {
      year: "2020",
      title: "Digital Innovation",
      description:
        "Launched online ordering and delivery services, adapting to serve our community during challenging times.",
    },
    {
      year: "2023",
      title: "Continued Growth",
      description:
        "Now serving 15 locations with plans for further expansion while maintaining our commitment to quality.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in-50 slide-in-from-top-4 duration-700">
            Our Story
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-top-4 duration-700 delay-200">
            A journey of authentic Greek flavors, family traditions, and culinary excellence
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="animate-in fade-in-50 slide-in-from-left-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-colors duration-300">
              From Athens to Your Table
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              Zeus Street Greek was born from a simple yet powerful vision: to bring the authentic taste of Greek street
              food to communities around the world. Our founders, immigrants from Athens, carried with them not just
              recipes, but the soul of Greek hospitality and the passion for sharing their culinary heritage.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed transition-colors duration-300">
              Every dish we serve tells a story of tradition, family, and the Mediterranean way of life. From our
              signature wraps to our fresh salads, each item is crafted with the same care and attention that has been
              passed down through generations of Greek families.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed transition-colors duration-300">
              Today, we&apos;re proud to serve thousands of customers across multiple locations, but our commitment remains
              unchanged: to deliver an authentic Greek experience that honors our heritage while embracing the
              communities we serve.
            </p>
            <Button
              size="lg"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-all duration-300 hover:scale-105"
            >
              View Our Menu
            </Button>
          </div>

          <div className="relative animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-300">
            <div className="aspect-square bg-gray-200 dark:bg-gray-700 rounded-2xl overflow-hidden shadow-2xl transition-colors duration-300">
              <Image
                src="/placeholder.svg?height=500&width=500&text=Restaurant+Interior"
                alt="Restaurant interior"
                width={500}
                height={500}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="absolute -bottom-4 -left-4 lg:-bottom-6 lg:-left-6 w-24 h-24 lg:w-32 lg:h-32 bg-blue-600 dark:bg-blue-500 rounded-2xl opacity-20 animate-pulse transition-colors duration-300"></div>
            <div
              className="absolute -top-4 -right-4 lg:-top-6 lg:-right-6 w-16 h-16 lg:w-24 lg:h-24 bg-purple-600 dark:bg-purple-500 rounded-2xl opacity-20 animate-pulse transition-colors duration-300"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-top-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              What Makes Us Special
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Our commitment to authenticity and quality sets us apart in everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="text-center p-6 hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="pt-6">
                  <feature.icon className="h-12 w-12 mx-auto mb-4 text-blue-600 dark:text-blue-400 transition-all duration-300 hover:scale-110" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-3 text-lg transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed transition-colors duration-300">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Timeline Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-top-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Our Journey
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              From humble beginnings to a beloved restaurant chain
            </p>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-blue-600 dark:bg-blue-400 transition-colors duration-300"></div>
            {timeline.map((item, index) => (
              <div
                key={index}
                className={`flex items-center mb-12 animate-in fade-in-50 slide-in-from-bottom-4 ${
                  index % 2 === 0 ? "flex-row" : "flex-row-reverse"
                }`}
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className={`w-1/2 ${index % 2 === 0 ? "pr-8 text-right" : "pl-8 text-left"}`}>
                  <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2 transition-colors duration-300">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </div>
                <div className="w-6 h-6 bg-blue-600 dark:bg-blue-400 rounded-full border-4 border-white dark:border-gray-900 z-10 transition-colors duration-300"></div>
                <div className="w-1/2"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Team Section */}
        <div className="mb-20">
          <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-top-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Meet Our Team
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              The passionate people behind your authentic Greek experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <CardContent className="p-6">
                  <div className="w-32 h-32 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 transition-colors duration-300">
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={300}
                      height={300}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-blue-600 dark:text-blue-400 font-semibold mb-3 transition-colors duration-300">
                    {member.role}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                    {member.bio}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 rounded-2xl p-12 text-white text-center transition-colors duration-300">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
              <div className="text-4xl md:text-5xl font-bold mb-2">15+</div>
              <div className="text-lg opacity-90">Locations</div>
            </div>
            <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-200">
              <div className="text-4xl md:text-5xl font-bold mb-2">50K+</div>
              <div className="text-lg opacity-90">Happy Customers</div>
            </div>
            <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-400">
              <div className="text-4xl md:text-5xl font-bold mb-2">12+</div>
              <div className="text-lg opacity-90">Years Experience</div>
            </div>
            <div className="animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-600">
              <div className="text-4xl md:text-5xl font-bold mb-2">4.9</div>
              <div className="text-lg opacity-90">Average Rating</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
