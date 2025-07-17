"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import Image from "next/image";

export function Menu() {
  const { dispatch } = useCart()

  const menuCategories = [
    {
      title: "Signature Wraps",
      items: [
        {
          name: "Zeus Chicken Wrap",
          description: "Marinated chicken, tzatziki, tomato, onion, lettuce in warm pita",
          price: "$14.90",
          image: "/placeholder.svg?height=200&width=300",
          popular: true,
        },
        {
          name: "Lamb Souvlaki Wrap",
          description: "Tender lamb skewers, Greek salad, tzatziki, chips in pita",
          price: "$16.90",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          name: "Halloumi Wrap",
          description: "Grilled halloumi, roasted vegetables, hummus, rocket in pita",
          price: "$13.90",
          image: "/placeholder.svg?height=200&width=300",
          vegetarian: true,
        },
      ],
    },
    {
      title: "Bowls & Salads",
      items: [
        {
          name: "Greek Village Bowl",
          description: "Chicken, quinoa, cucumber, tomato, olives, feta, tzatziki",
          price: "$15.90",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          name: "Mediterranean Salad",
          description: "Mixed greens, cherry tomatoes, cucumber, olives, feta, olive oil",
          price: "$12.90",
          image: "/placeholder.svg?height=200&width=300",
          vegetarian: true,
        },
      ],
    },
    {
      title: "Sides & Dips",
      items: [
        {
          name: "Greek Fries",
          description: "Crispy fries with feta, oregano, and lemon",
          price: "$8.90",
          image: "/placeholder.svg?height=200&width=300",
        },
        {
          name: "Mezze Platter",
          description: "Hummus, tzatziki, dolmades, olives, pita bread",
          price: "$16.90",
          image: "/placeholder.svg?height=200&width=300",
          vegetarian: true,
        },
      ],
    },
  ]

  const addToCart = (item: {
    name: string;
    price: string;
    image: string;
    description: string;
    popular?: boolean;
    vegetarian?: boolean;
  }, categoryTitle: string) => {
    const cartItem = {
      id: `${categoryTitle.toLowerCase().replace(/\s+/g, "-")}-${item.name.toLowerCase().replace(/\s+/g, "-")}`,
      name: item.name,
      price: Number.parseFloat(item.price.replace("$", "")),
      image: item.image,
      description: item.description,
      category: categoryTitle,
    }
    dispatch({ type: "ADD_ITEM", payload: cartItem })
  }

  return (
    <section id="menu" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Menu</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Fresh ingredients, authentic flavors, and modern presentation
          </p>
        </div>

        {menuCategories.map((category, categoryIndex) => (
          <div key={categoryIndex} className="mb-16">
            <h3
              className="text-3xl font-bold text-gray-900 mb-8 text-center animate-in fade-in-50 slide-in-from-left-4 duration-700"
              style={{ animationDelay: `${categoryIndex * 200}ms` }}
            >
              {category.title}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {category.items.map((item, itemIndex) => (
                <Card
                  key={itemIndex}
                  className="overflow-hidden hover:shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4 cursor-pointer group"
                  style={{ animationDelay: `${categoryIndex * 200 + itemIndex * 100}ms` }}
                >
                  <div className="aspect-video bg-gray-100 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={300}
                      height={200}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-xl group-hover:text-blue-600 transition-colors duration-300">
                        {item.name}
                      </CardTitle>
                      <div className="flex gap-2 flex-wrap">
                        {item.popular && (
                          <Badge className="bg-red-100 text-red-800 hover:bg-red-100 animate-pulse">Popular</Badge>
                        )}
                        {item.vegetarian && (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Vegetarian</Badge>
                        )}
                      </div>
                    </div>
                    <CardDescription className="text-gray-600 text-sm leading-relaxed">
                      {item.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="flex justify-between items-center">
                      <span className="text-2xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300">
                        {item.price}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 bg-transparent"
                        onClick={() => addToCart(item, category.title)}
                      >
                        Add to Cart
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
