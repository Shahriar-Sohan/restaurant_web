"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Star, Clock, Flame, Leaf, ShoppingCart, Loader2 } from "lucide-react"

// Type definitions
interface Category {
  category_id: number
  category_title: string
  category_description: string
}

interface MenuItem {
  food_id: number
  category_id: number
  name: string
  description: string
  price: number
  image: string
  rating: number
  prepTime: string | number
  calories: number
  ingredients: string[]
  popular?: boolean
  spicy?: boolean
  vegetarian?: boolean
}

interface CartItem {
  id: number
  name: string
  price: number
  image: string
  description: string
  category: string
  quantity: number
}

interface CategoryData {
  id: string
  name: string
  description: string
  items: MenuItem[]
}

// Custom hook for cart management
const useCart = () => {
  const [cart, setCart] = useState<CartItem[]>([])
  
  const addToCart = useCallback((item: MenuItem, categoryTitle: string) => {
    setCart(prev => {
      const existing = prev.find(cartItem => cartItem.id === item.food_id)
      if (existing) {
        return prev.map(cartItem =>
          cartItem.id === item.food_id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      } else {
        return [...prev, {
          id: item.food_id,
          name: item.name,
          price: item.price,
          image: item.image,
          description: item.description,
          category: categoryTitle,
          quantity: 1
        }]
      }
    })
  }, [])

  const getCartTotal = useCallback(() => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }, [cart])

  const getCartItemCount = useCallback(() => {
    return cart.reduce((total, item) => total + item.quantity, 0)
  }, [cart])

  return { cart, addToCart, getCartTotal, getCartItemCount }
}

// Custom hook for menu data management
const useMenuData = () => {
  const [menuDataByCategory, setMenuDataByCategory] = useState<Record<number, MenuItem[]>>({})
  const [offsetByCategory, setOffsetByCategory] = useState<Record<number, number>>({})
  const [loadingByCategory, setLoadingByCategory] = useState<Record<number, boolean>>({})
  const [allLoadedByCategory, setAllLoadedByCategory] = useState<Record<number, boolean>>({})
  const [categories, setCategories] = useState<{ id: string; name: string; description: string }[]>([])
  const [isInitialLoading, setIsInitialLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const ITEMS_PER_PAGE = 8

  const fetchCategories = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:3000/api/category")
      if (!response.ok) throw new Error('Failed to fetch categories')
      
      const categoryData: Category[] = await response.json()
      setCategories([
        { id: "all", name: "All Items", description: "Browse all our delicious menu items" },
        ...categoryData.map(category => ({
          id: String(category.category_id),
          name: category.category_title,
          description: category.category_description
        }))
      ])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch categories')
    }
  }, [])

  const fetchMenuItems = useCallback(async (categoryId: number, offset: number, loadAll = false) => {
    if (allLoadedByCategory[categoryId] && !loadAll) return

    setLoadingByCategory(prev => ({ ...prev, [categoryId]: true }))
    
    try {
      const limit = loadAll ? 100000 : ITEMS_PER_PAGE
      const categoryParam = categoryId !== 0 ? `categoryId=${categoryId}&` : ''
      const response = await fetch(
        `http://localhost:3000/api/menu?${categoryParam}limit=${limit}&offset=${offset}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch menu items')
      
      const newItems: MenuItem[] = await response.json()

      setMenuDataByCategory(prev => {
        const existingItems = prev[categoryId] || []
        const combinedItems = loadAll ? newItems : [...existingItems, ...newItems]
        return { ...prev, [categoryId]: combinedItems }
      })

      setOffsetByCategory(prev => ({
        ...prev,
        [categoryId]: loadAll ? newItems.length : (prev[categoryId] || 0) + newItems.length
      }))

      if (loadAll || newItems.length < ITEMS_PER_PAGE) {
        setAllLoadedByCategory(prev => ({ ...prev, [categoryId]: true }))
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch menu items')
    } finally {
      setLoadingByCategory(prev => ({ ...prev, [categoryId]: false }))
    }
  }, [allLoadedByCategory, ITEMS_PER_PAGE])

  return {
    menuDataByCategory,
    offsetByCategory,
    loadingByCategory,
    allLoadedByCategory,
    categories,
    isInitialLoading,
    error,
    setIsInitialLoading,
    fetchCategories,
    fetchMenuItems
  }
}

// Menu item card component
const MenuItemCard = ({ item, categoryTitle, onAddToCart }: {
  item: MenuItem
  categoryTitle: string
  onAddToCart: (item: MenuItem, categoryTitle: string) => void
}) => (
  <div className="snap-start min-w-[320px] max-w-[320px]">
    <Card className="h-full overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105 group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
      <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden">
        <img
          src={item.image || "https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      <CardHeader className="pb-2">
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-gray-900 dark:text-white line-clamp-2">
            {item.name}
          </CardTitle>
          <div className="flex gap-1 flex-wrap">
            {item.popular && (
              <Badge className="bg-red-100 text-red-800 hover:bg-red-100 text-xs">
                Popular
              </Badge>
            )}
            {item.vegetarian && (
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100 text-xs">
                <Leaf className="w-3 h-3 mr-1" />
                Veggie
              </Badge>
            )}
            {item.spicy && (
              <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100 text-xs">
                <Flame className="w-3 h-3 mr-1" />
                Spicy
              </Badge>
            )}
          </div>
        </div>

        <CardDescription className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed line-clamp-3">
          {item.description}
        </CardDescription>
      </CardHeader>

      <CardContent className="pt-0 flex flex-col justify-between flex-1">
        <div className="space-y-4">
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span>{item.rating != null ? Number(item.rating).toFixed(1) : 'N/A'}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{typeof item.prepTime === "number" ? `${item.prepTime}min` : item.prepTime}</span>
            </div>
            <span>{item.calories} cal</span>
          </div>

          <div>
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">
              Ingredients:
            </p>
            <div className="flex flex-wrap gap-1">
              {item.ingredients?.slice(0, 4).map((ingredient, i) => (
                <span
                  key={i}
                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full"
                >
                  {ingredient}
                </span>
              ))}
              {item.ingredients?.length > 4 && (
                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1">
                  +{item.ingredients.length - 4} more
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
            ${Number(item.price).toFixed(2)}
          </span>
          <Button
            size="sm"
            className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
            onClick={() => onAddToCart(item, categoryTitle)}
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </CardContent>
    </Card>
  </div>
)

// Main component
export function MenuPage() {
  const { cart, addToCart, getCartTotal, getCartItemCount } = useCart()
  const {
    menuDataByCategory,
    offsetByCategory,
    loadingByCategory,
    allLoadedByCategory,
    categories,
    isInitialLoading,
    error,
    setIsInitialLoading,
    fetchCategories,
    fetchMenuItems
  } = useMenuData()

  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({})
  const didInitialFetch = useRef(false)

  // Initialize data
  useEffect(() => {
    const initialize = async () => {
      await fetchCategories()
      setIsInitialLoading(false)
    }
    initialize()
  }, [fetchCategories, setIsInitialLoading])

  // Load initial menu items
  useEffect(() => {
    if (didInitialFetch.current || categories.length <= 1) return
    didInitialFetch.current = true

    const loadInitialItems = async () => {
      // Load all items for "All Items" category
      await fetchMenuItems(0, 0, true)
      
      // Load initial items for each specific category
      for (const category of categories) {
        if (category.id !== "all") {
          await fetchMenuItems(Number(category.id), 0)
        }
      }
    }
    
    loadInitialItems()
  }, [categories, fetchMenuItems])

  // Infinite scroll handler
  const handleScroll = useCallback((categoryId: number) => {
    const container = containerRefs.current[categoryId]
    if (!container || allLoadedByCategory[categoryId] || loadingByCategory[categoryId]) return

    const threshold = 100
    const { scrollWidth, scrollLeft, clientWidth } = container
    
    if (scrollWidth - scrollLeft - clientWidth < threshold) {
      fetchMenuItems(categoryId, offsetByCategory[categoryId] || 0)
    }
  }, [allLoadedByCategory, loadingByCategory, offsetByCategory, fetchMenuItems])

  // Process categories for display
  const processedCategories: CategoryData[] = categories
    .filter(category => selectedCategory === "all" || category.id === selectedCategory)
    .map(category => {
      let items: MenuItem[] = []
      
      if (category.id === "all") {
        // For "All Items", get unique items by food_id to prevent duplicates
        const allItems = Object.values(menuDataByCategory).flat()
        const uniqueItems = new Map<number, MenuItem>()
        allItems.forEach(item => {
          uniqueItems.set(item.food_id, item)
        })
        items = Array.from(uniqueItems.values())
      } else {
        items = menuDataByCategory[Number(category.id)] || []
      }
      
      const filteredItems = items.filter(item => {
        if (!searchTerm) return true
        const searchLower = searchTerm.toLowerCase()
        return (
          item.name?.toLowerCase().includes(searchLower) ||
          item.description?.toLowerCase().includes(searchLower) ||
          item.ingredients?.some(ingredient => ingredient.toLowerCase().includes(searchLower))
        )
      })

      // Sort: popular items first, then by rating
      const sortedItems = filteredItems.sort((a, b) => {
        if (a.popular && !b.popular) return -1
        if (!a.popular && b.popular) return 1
        return (b.rating || 0) - (a.rating || 0)
      })

      return {
        id: category.id,
        name: category.name,
        description: category.description,
        items: sortedItems
      }
    })

  if (isInitialLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-xl text-gray-600 dark:text-gray-300">Loading menu...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-600 dark:text-red-400 mb-4">Error: {error}</p>
          <Button onClick={() => window.location.reload()}>
            Retry
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Our Menu</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Discover authentic Greek flavors crafted with the finest ingredients and traditional recipes
          </p>
          
          {/* Cart indicator */}
          {getCartItemCount() > 0 && (
            <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 text-white">
              <ShoppingCart className="w-5 h-5" />
              <span>{getCartItemCount()} items • ${getCartTotal().toFixed(2)}</span>
            </div>
          )}
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search and Filter */}
        <div className="mb-12">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search menu items, ingredients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map(category => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category.id)}
                  className="transition-all duration-300 hover:scale-105"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  {category.name}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Menu Categories */}
        {processedCategories.map(category => (
          <div key={category.id} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {category.name}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                {category.description}
              </p>
            </div>

            {category.items.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-gray-500 dark:text-gray-400">
                  {searchTerm ? "No items found matching your search." : "No items in this category."}
                </p>
              </div>
            ) : (
              <div
                ref={el => (containerRefs.current[Number(category.id)] = el)}
                onScroll={() => handleScroll(Number(category.id))}
                className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 py-4 snap-x snap-mandatory"
              >
                {category.items.map(item => (
                  <MenuItemCard
                    key={`${category.id}-menu-item-${item.food_id}`}
                    item={item}
                    categoryTitle={category.name}
                    onAddToCart={addToCart}
                  />
                ))}
                
                {/* Loading indicator */}
                {loadingByCategory[Number(category.id)] && (
                  <div className="snap-start min-w-[320px] max-w-[320px] flex items-center justify-center">
                    <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-lg">
                      <Loader2 className="w-8 h-8 animate-spin text-blue-600 mx-auto" />
                      <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Loading more...</p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}

        {/* No results message */}
        {processedCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400">
              No categories found.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}