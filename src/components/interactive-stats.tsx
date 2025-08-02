"use client"

import { Card, CardContent } from "@/components/ui/card"
import { TrendingUp, Users, Clock, Award, MapPin, Utensils, Crown, Shield, Zap } from "lucide-react"

export function InteractiveStats() {
  const stats = [
    {
      icon: TrendingUp,
      value: "125,000",
      label: "Orders Delivered",
      suffix: "+",
      color: "from-blue-600 to-cyan-500",
      bgColor: "from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20",
      description: "Satisfied customers worldwide",
      achievement: "Excellence in Service",
    },
    {
      icon: Users,
      value: "50,000",
      label: "Happy Customers",
      suffix: "+",
      color: "from-emerald-600 to-teal-500",
      bgColor: "from-emerald-50 to-teal-50 dark:from-emerald-900/20 dark:to-teal-900/20",
      description: "Loyal food enthusiasts",
      achievement: "Customer Satisfaction",
    },
    {
      icon: MapPin,
      value: "15",
      label: "Premium Locations",
      suffix: "",
      color: "from-purple-600 to-pink-500",
      bgColor: "from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20",
      description: "Strategic city presence",
      achievement: "Market Leadership",
    },
    {
      icon: Utensils,
      value: "85",
      label: "Signature Dishes",
      suffix: "+",
      color: "from-orange-600 to-red-500",
      bgColor: "from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20",
      description: "Authentic Greek recipes",
      achievement: "Culinary Mastery",
    },
    {
      icon: Award,
      value: "4.9",
      label: "Average Rating",
      suffix: "/5",
      color: "from-amber-600 to-yellow-500",
      bgColor: "from-amber-50 to-yellow-50 dark:from-amber-900/20 dark:to-yellow-900/20",
      description: "Consistently excellent",
      achievement: "Quality Assurance",
    },
    {
      icon: Clock,
      value: "12",
      label: "Years of Excellence",
      suffix: "+",
      color: "from-indigo-600 to-purple-500",
      bgColor: "from-indigo-50 to-purple-50 dark:from-indigo-900/20 dark:to-purple-900/20",
      description: "Proven track record",
      achievement: "Industry Veteran",
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-gray-900 dark:to-blue-900/50 relative overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">

          <h2 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="block text-white dark:text-gray-100 mb-2 transition-colors duration-500">
              Numbers That
            </span>
            <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 dark:from-blue-300 dark:via-purple-300 dark:to-pink-300 bg-clip-text text-transparent">
              Define Excellence
            </span>
          </h2>

          <p className="text-xl md:text-2xl text-blue-100 dark:text-blue-200 max-w-3xl mx-auto leading-relaxed font-light transition-colors duration-500">
            Our commitment to quality and authenticity is reflected in every metric,
            <br className="hidden md:block" />
            from customer satisfaction to culinary innovation
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className={`group relative overflow-hidden bg-gradient-to-br ${stat.bgColor} border-0 hover:shadow-2xl transition-all duration-500 hover:scale-105 cursor-pointer backdrop-blur-xl`}
            >
              {/* Gradient border */}
              <div
                className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`}
              />
              <div className="absolute inset-[1px] bg-white dark:bg-gray-900 rounded-lg transition-colors duration-500" />

              <CardContent className="relative p-8 text-center">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div
                    className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r ${stat.color} shadow-2xl group-hover:scale-110 transition-all duration-500`}
                  >
                    <stat.icon className="w-10 h-10 text-white" />
                  </div>

                  {/* Achievement badge */}
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Shield className="w-4 h-4 text-white" />
                  </div>
                </div>

                {/* Value Display */}
                <div className="mb-4">
                  <span
                    className={`text-5xl md:text-6xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300 inline-block`}
                  >
                    {stat.value}
                  </span>
                  <span className={`text-3xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                    {stat.suffix}
                  </span>
                </div>

                {/* Labels */}
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2 group-hover:text-slate-700 dark:group-hover:text-gray-200 transition-colors duration-300">
                  {stat.label}
                </h3>

                <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 font-medium transition-colors duration-300">
                  {stat.description}
                </p>

                {/* Achievement indicator */}
                <div className="inline-flex items-center gap-2 bg-slate-100 dark:bg-gray-800 rounded-full px-4 py-2 opacity-0 group-hover:opacity-100 transition-all duration-500">
                  <Zap className="w-4 h-4 text-amber-500" />
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wide transition-colors duration-300">
                    {stat.achievement}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Trust Indicators */}
        <div className="mt-20 text-center">
          <div className="inline-flex items-center gap-8 bg-white/10 dark:bg-white/5 backdrop-blur-xl border border-white/20 dark:border-white/10 rounded-2xl px-8 py-6 shadow-2xl transition-colors duration-500">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white dark:text-gray-100 font-semibold transition-colors duration-300">
                  Quality Assured
                </p>
                <p className="text-blue-200 dark:text-blue-300 text-sm transition-colors duration-300">
                  Premium Standards
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/20 dark:bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full flex items-center justify-center">
                <Award className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white dark:text-gray-100 font-semibold transition-colors duration-300">
                  Award Winning
                </p>
                <p className="text-blue-200 dark:text-blue-300 text-sm transition-colors duration-300">
                  Industry Recognition
                </p>
              </div>
            </div>

            <div className="w-px h-12 bg-white/20 dark:bg-white/10" />

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                <Crown className="w-6 h-6 text-white" />
              </div>
              <div className="text-left">
                <p className="text-white dark:text-gray-100 font-semibold transition-colors duration-300">
                  Market Leader
                </p>
                <p className="text-blue-200 dark:text-blue-300 text-sm transition-colors duration-300">
                  Trusted Choice
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
