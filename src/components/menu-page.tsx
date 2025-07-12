interface Category {
  category_id: number;
  category_title: string;
  category_description: string;
}

interface MenuItem {
  food_id: number;
  category_id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  prepTime: string | number;
  calories: number;
  ingredients: string[];
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
}

interface MenuCategory {
  id: number;
  title: string;
  description: string;
  items: MenuItem[];
}
"use client"

import { useState, useEffect, useRef } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useCart } from "@/lib/cart-context"
import { Search, Filter, Star, Clock, Flame, Leaf } from "lucide-react"

export function MenuPage() {
  const { dispatch } = useCart()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")

  const [menuDataByCategory, setMenuDataByCategory] = useState<Record<number, MenuItem[]>>({});
  const [offsetByCategory, setOffsetByCategory] = useState<Record<number, number>>({});
  const [loadingByCategory, setLoadingByCategory] = useState<Record<number, boolean>>({});
  const [allLoadedByCategory, setAllLoadedByCategory] = useState<Record<number, boolean>>({});
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([{ id: "all", name: "All Items" }]);
  const ITEMS_PER_PAGE = 8;

  // Track if initial menu fetch was performed
  const didFetchRef = useRef(false);

  useEffect(() => {
    const fetchCategories = async () => {
      const categoryRes = await fetch("http://localhost:3000/api/category");
      const categoryData = await categoryRes.json() as Category[];
      setCategories([
        { id: "all", name: "All Items" },
        ...categoryData.map((category) => ({
          id: String(category.category_id),
          name: category.category_title,
        })),
      ]);
    };
    fetchCategories();
  }, []);

  const fetchMenuItems = async (categoryId: number, offset: number, loadAll = false) => {
    if (allLoadedByCategory[categoryId] && !loadAll) return;
    setLoadingByCategory(prev => ({ ...prev, [categoryId]: true }));
    const limit = loadAll ? 100000 : ITEMS_PER_PAGE;
    const res = await fetch(`http://localhost:3000/api/menu?category_id=${categoryId}&limit=${limit}&offset=${offset}`);
    const newItems = await res.json() as MenuItem[];
    setMenuDataByCategory(prev => {
      const existingItems = prev[categoryId] || [];
      const combinedItems = loadAll ? newItems : [...existingItems, ...newItems];
      return { ...prev, [categoryId]: combinedItems };
    });
    setOffsetByCategory(prev => ({ ...prev, [categoryId]: loadAll ? newItems.length : (prev[categoryId] || 0) + newItems.length }));
    if (loadAll || newItems.length < ITEMS_PER_PAGE) {
      setAllLoadedByCategory(prev => ({ ...prev, [categoryId]: true }));
    }
    setLoadingByCategory(prev => ({ ...prev, [categoryId]: false }));
  };

  useEffect(() => {
    if (didFetchRef.current || categories.length <= 1) return;
    didFetchRef.current = true;

    // categories.forEach(category => {
    //   if (category.id !== "all" && !(menuDataByCategory[Number(category.id)]?.length > 0)) {
    //     fetchMenuItems(Number(category.id), 0);
    //   }
    // });
  }, [categories, menuDataByCategory]);

  const containerRefs = useRef<Record<number, HTMLDivElement | null>>({});
  const onScroll = (categoryId: number) => {
    const container = containerRefs.current[categoryId];
    if (!container || allLoadedByCategory[categoryId]) return;
    const threshold = 100;
    // if (container.scrollWidth - container.scrollLeft - container.clientWidth < threshold && !loadingByCategory[categoryId]) {
    //   fetchMenuItems(categoryId, offsetByCategory[categoryId] || 0);
    // }
  };

  const addToCart = (item: MenuItem, categoryTitle: string) => {
    const cartItem = {
      id: item.food_id,
      name: item.name,
      price: item.price,
      image: item.image,
      description: item.description,
      category: categoryTitle,
    }
    dispatch({ type: "ADD_ITEM", payload: cartItem })
  }

  const filteredCategories = categories
    .filter(category => selectedCategory === "all" || category.id === selectedCategory)
    .map((category) => {
      const items = category.id === "all"
        ? Object.values(menuDataByCategory).flat()
        : menuDataByCategory[Number(category.id)] || [];
      const popularItems = items.filter(item => item.popular);
      const otherItems = items.filter(item => !item.popular);
      const combinedItems = [...popularItems, ...otherItems].filter(item => {
        if (!searchTerm) return true;
        return (
          (item.name && item.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()))
        );
      });
      return { id: category.id, title: category.name, description: "", items: combinedItems };
    });

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Our Menu</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            Discover authentic Greek flavors crafted with the finest ingredients and traditional recipes
          </p>
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
                placeholder="Search menu items..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 transition-colors duration-300"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {categories.map((category, idx) => (
                <Button
                  key={`${category.id}-${idx}`}
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
        {filteredCategories.map((category, categoryIndex) => (
          <div key={`${category.id}-${categoryIndex}`} className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
                {category.title}
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
                {category.description}
              </p>
            </div>

            {category.items.length === 0 ? (
              <p className="text-center text-gray-500 dark:text-gray-400">No items in this category.</p>
            ) : (
              <>
                <div
                  ref={el => (containerRefs.current[Number(category.id)] = el)}
                  onScroll={() => onScroll(Number(category.id))}
                  className="flex space-x-6 overflow-x-auto scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 py-4 snap-x snap-mandatory"
                >
                  {category.items.map(item => (
                    <div key={item.food_id} className="snap-start min-w-[300px]">
                      <Card className="overflow-hidden hover:shadow-xl dark:hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer group bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                        <div className="aspect-video bg-gray-100 dark:bg-gray-700 overflow-hidden transition-colors duration-300">
                          <img
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>

                        <CardHeader className="pb-2">
                          <div className="flex justify-between items-start mb-2">
                            <CardTitle className="text-xl group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300 text-gray-900 dark:text-white">
                              {item.name}
                            </CardTitle>
                            <div className="flex gap-1">
                              {item.popular && <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Popular</Badge>}
                              {item.vegetarian && (
                                <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                  <Leaf className="w-3 h-3 mr-1" />
                                  Veggie
                                </Badge>
                              )}
                              {item.spicy && (
                                <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
                                  <Flame className="w-3 h-3 mr-1" />
                                  Spicy
                                </Badge>
                              )}
                            </div>
                          </div>

                          <CardDescription className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed transition-colors duration-300">
                            {item.description}
                          </CardDescription>
                        </CardHeader>

                        <CardContent className="pt-0">
                          <div className="flex items-center gap-4 mb-4 text-sm text-gray-500 dark:text-gray-400 transition-colors duration-300">
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span>{item.rating}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>{typeof item.prepTime === "number" ? item.prepTime.toString() : item.prepTime}</span>
                            </div>
                            <span>{item.calories} cal</span>
                          </div>

                          <div className="mb-4">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-2 transition-colors duration-300">
                              Ingredients:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {item.ingredients.slice(0, 4).map((ingredient, i) => (
                                <span
                                  key={i}
                                  className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full transition-colors duration-300"
                                >
                                  {ingredient}
                                </span>
                              ))}
                              {item.ingredients.length > 4 && (
                                <span className="text-xs text-gray-500 dark:text-gray-400 px-2 py-1 transition-colors duration-300">
                                  +{item.ingredients.length - 4} more
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="flex justify-between items-center">
                            <span className="text-2xl font-bold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300">
                              ${Number(item.price).toFixed(2)}
                            </span>
                            <Button
                              size="sm"
                              className="opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-105 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                              onClick={() => addToCart(item, category.title)}
                            >
                              Add to Cart
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  ))}
                </div>
                {!allLoadedByCategory[Number(category.id)] && category.id !== "all" && (
                  <div className="text-center mt-4">
                    <Button
                      // onClick={() => fetchMenuItems(Number(category.id), 0, true)}
                      disabled={loadingByCategory[Number(category.id)]}
                    >
                      {loadingByCategory[Number(category.id)] ? "Loading..." : "Show All"}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        ))}

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-xl text-gray-500 dark:text-gray-400 transition-colors duration-300">
              No items found matching your search.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
