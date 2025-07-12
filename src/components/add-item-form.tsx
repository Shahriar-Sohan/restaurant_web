"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import {
  ArrowLeft,
  Upload,
  Plus,
  X,
  Save,
  Eye,
  Clock,
  DollarSign,
  Package,
  Star,
  Flame,
  Leaf,
  Award,
  Check,
} from "lucide-react"
import { useRouter } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

export function AddItemForm() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [ingredients, setIngredients] = useState<string[]>([])
  const [newIngredient, setNewIngredient] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    price: "",
    originalPrice: "",
    image: null as File | null,
    prepTime: "",
    calories: "",
    servingSize: "",
    isPopular: false,
    isSpicy: false,
    isVegetarian: false,
    isVegan: false,
    isGlutenFree: false,
    isAvailable: true,
    stockQuantity: "",
    allergens: [] as string[],
    nutritionalInfo: {
      protein: "",
      carbs: "",
      fat: "",
      fiber: "",
      sodium: "",
    },
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  const categories = [
    { value: "wraps", label: "Signature Wraps" },
    { value: "bowls", label: "Bowls & Salads" },
    { value: "sides", label: "Sides & Dips" },
    { value: "desserts", label: "Desserts" },
    { value: "beverages", label: "Beverages" },
    { value: "appetizers", label: "Appetizers" },
  ]

  const allergenOptions = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Fish", "Shellfish", "Sesame"]

  const handleInputChange = (field: string, value: any) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".")
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value,
        },
      }))
    } else {
      setFormData((prev) => ({ ...prev, [field]: value }))
    }

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData((prev) => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const addIngredient = () => {
    if (newIngredient.trim() && !ingredients.includes(newIngredient.trim())) {
      setIngredients([...ingredients, newIngredient.trim()])
      setNewIngredient("")
    }
  }

  const removeIngredient = (ingredient: string) => {
    setIngredients(ingredients.filter((item) => item !== ingredient))
  }

  const handleAllergenChange = (allergen: string, checked: boolean) => {
    if (checked) {
      setFormData((prev) => ({
        ...prev,
        allergens: [...prev.allergens, allergen],
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        allergens: prev.allergens.filter((item) => item !== allergen),
      }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.name.trim()) newErrors.name = "Item name is required"
    if (!formData.description.trim()) newErrors.description = "Description is required"
    if (!formData.category) newErrors.category = "Category is required"
    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }
    if (!formData.prepTime.trim()) newErrors.prepTime = "Preparation time is required"
    if (!formData.calories) {
      newErrors.calories = "Calories information is required"
    } else if (isNaN(Number(formData.calories)) || Number(formData.calories) < 0) {
      newErrors.calories = "Please enter valid calories"
    }
    if (ingredients.length === 0) {
      newErrors.ingredients = "At least one ingredient is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSuccess(true)
  }

  const handlePreview = () => {
    // This would show a preview of how the item would look on the menu
    alert("Preview functionality would show how this item appears on the customer menu")
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border border-gray-200 dark:border-gray-700 shadow-2xl">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Item Added Successfully!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
              "{formData.name}" has been added to your menu and is now available for customers.
            </p>
            <div className="space-y-3">
              <Button
                onClick={() => router.push("/admin")}
                className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
              >
                Back to Dashboard
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setIsSuccess(false)
                  setFormData({
                    name: "",
                    description: "",
                    category: "",
                    price: "",
                    originalPrice: "",
                    image: null,
                    prepTime: "",
                    calories: "",
                    servingSize: "",
                    isPopular: false,
                    isSpicy: false,
                    isVegetarian: false,
                    isVegan: false,
                    isGlutenFree: false,
                    isAvailable: true,
                    stockQuantity: "",
                    allergens: [],
                    nutritionalInfo: {
                      protein: "",
                      carbs: "",
                      fat: "",
                      fiber: "",
                      sodium: "",
                    },
                  })
                  setIngredients([])
                  setImagePreview(null)
                }}
                className="w-full border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
              >
                Add Another Item
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => router.push("/admin")}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Admin
              </Button>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white transition-colors duration-300">
                Add New Menu Item
              </h1>
            </div>
            <div className="flex items-center gap-4">
              <ThemeToggle />
              <Button
                variant="outline"
                onClick={handlePreview}
                className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors duration-300 bg-transparent"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Package className="w-5 h-5" />
                Basic Information
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Enter the basic details for your menu item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                    Item Name *
                  </Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${
                      errors.name ? "border-red-500 dark:border-red-400" : ""
                    }`}
                    placeholder="e.g., Zeus Chicken Wrap"
                  />
                  {errors.name && <p className="text-red-500 dark:text-red-400 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                    Category *
                  </Label>
                  <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                    <SelectTrigger
                      className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${
                        errors.category ? "border-red-500 dark:border-red-400" : ""
                      }`}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {categories.map((category) => (
                        <SelectItem key={category.value} value={category.value}>
                          {category.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && <p className="text-red-500 dark:text-red-400 text-sm">{errors.category}</p>}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description" className="text-gray-700 dark:text-gray-300">
                  Description *
                </Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md min-h-[100px] ${
                    errors.description ? "border-red-500 dark:border-red-400" : ""
                  }`}
                  placeholder="Describe your menu item in detail..."
                />
                {errors.description && <p className="text-red-500 dark:text-red-400 text-sm">{errors.description}</p>}
              </div>
            </CardContent>
          </Card>

          {/* Pricing & Availability */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5" />
                Pricing & Availability
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">
                    Price *
                  </Label>
                  <Input
                    id="price"
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => handleInputChange("price", e.target.value)}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${
                      errors.price ? "border-red-500 dark:border-red-400" : ""
                    }`}
                    placeholder="0.00"
                  />
                  {errors.price && <p className="text-red-500 dark:text-red-400 text-sm">{errors.price}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="text-gray-700 dark:text-gray-300">
                    Original Price (Optional)
                  </Label>
                  <Input
                    id="originalPrice"
                    type="number"
                    step="0.01"
                    value={formData.originalPrice}
                    onChange={(e) => handleInputChange("originalPrice", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                    placeholder="0.00"
                  />
                  <p className="text-xs text-gray-500 dark:text-gray-400">For showing discounts</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stockQuantity" className="text-gray-700 dark:text-gray-300">
                    Stock Quantity
                  </Label>
                  <Input
                    id="stockQuantity"
                    type="number"
                    value={formData.stockQuantity}
                    onChange={(e) => handleInputChange("stockQuantity", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                    placeholder="Leave empty for unlimited"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  id="isAvailable"
                  checked={formData.isAvailable}
                  onCheckedChange={(checked) => handleInputChange("isAvailable", checked)}
                />
                <Label htmlFor="isAvailable" className="text-gray-700 dark:text-gray-300">
                  Available for ordering
                </Label>
              </div>
            </CardContent>
          </Card>

          {/* Item Details */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Item Details
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="prepTime" className="text-gray-700 dark:text-gray-300">
                    Preparation Time *
                  </Label>
                  <Input
                    id="prepTime"
                    value={formData.prepTime}
                    onChange={(e) => handleInputChange("prepTime", e.target.value)}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${
                      errors.prepTime ? "border-red-500 dark:border-red-400" : ""
                    }`}
                    placeholder="e.g., 8-10 min"
                  />
                  {errors.prepTime && <p className="text-red-500 dark:text-red-400 text-sm">{errors.prepTime}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="calories" className="text-gray-700 dark:text-gray-300">
                    Calories *
                  </Label>
                  <Input
                    id="calories"
                    type="number"
                    value={formData.calories}
                    onChange={(e) => handleInputChange("calories", e.target.value)}
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${
                      errors.calories ? "border-red-500 dark:border-red-400" : ""
                    }`}
                    placeholder="e.g., 520"
                  />
                  {errors.calories && <p className="text-red-500 dark:text-red-400 text-sm">{errors.calories}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="servingSize" className="text-gray-700 dark:text-gray-300">
                    Serving Size
                  </Label>
                  <Input
                    id="servingSize"
                    value={formData.servingSize}
                    onChange={(e) => handleInputChange("servingSize", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                    placeholder="e.g., 1 wrap, 350g"
                  />
                </div>
              </div>

              {/* Item Properties */}
              <div className="space-y-4">
                <Label className="text-gray-700 dark:text-gray-300">Item Properties</Label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isPopular"
                      checked={formData.isPopular}
                      onCheckedChange={(checked) => handleInputChange("isPopular", checked)}
                    />
                    <Label htmlFor="isPopular" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-500" />
                      Popular
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isSpicy"
                      checked={formData.isSpicy}
                      onCheckedChange={(checked) => handleInputChange("isSpicy", checked)}
                    />
                    <Label htmlFor="isSpicy" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <Flame className="w-4 h-4 text-red-500" />
                      Spicy
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isVegetarian"
                      checked={formData.isVegetarian}
                      onCheckedChange={(checked) => handleInputChange("isVegetarian", checked)}
                    />
                    <Label htmlFor="isVegetarian" className="text-gray-700 dark:text-gray-300 flex items-center gap-1">
                      <Leaf className="w-4 h-4 text-green-500" />
                      Vegetarian
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isVegan"
                      checked={formData.isVegan}
                      onCheckedChange={(checked) => handleInputChange("isVegan", checked)}
                    />
                    <Label htmlFor="isVegan" className="text-gray-700 dark:text-gray-300">
                      Vegan
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="isGlutenFree"
                      checked={formData.isGlutenFree}
                      onCheckedChange={(checked) => handleInputChange("isGlutenFree", checked)}
                    />
                    <Label htmlFor="isGlutenFree" className="text-gray-700 dark:text-gray-300">
                      Gluten Free
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Ingredients */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Ingredients</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Add the main ingredients for this item
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  placeholder="Add ingredient..."
                  className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addIngredient())}
                />
                <Button type="button" onClick={addIngredient} variant="outline">
                  <Plus className="w-4 h-4" />
                </Button>
              </div>

              {ingredients.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 hover:bg-blue-200 dark:hover:bg-blue-900/50 transition-colors duration-300"
                    >
                      {ingredient}
                      <button
                        type="button"
                        onClick={() => removeIngredient(ingredient)}
                        className="ml-2 hover:text-red-600 dark:hover:text-red-400"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}

              {errors.ingredients && <p className="text-red-500 dark:text-red-400 text-sm">{errors.ingredients}</p>}
            </CardContent>
          </Card>

          {/* Allergens */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Award className="w-5 h-5" />
                Allergens & Dietary Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-gray-700 dark:text-gray-300 mb-3 block">Contains Allergens</Label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {allergenOptions.map((allergen) => (
                    <div key={allergen} className="flex items-center space-x-2">
                      <Checkbox
                        id={`allergen-${allergen}`}
                        checked={formData.allergens.includes(allergen)}
                        onCheckedChange={(checked) => handleAllergenChange(allergen, checked as boolean)}
                      />
                      <Label htmlFor={`allergen-${allergen}`} className="text-gray-700 dark:text-gray-300">
                        {allergen}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Nutritional Information */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">Nutritional Information (Optional)</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Provide detailed nutritional information per serving
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="protein" className="text-gray-700 dark:text-gray-300">
                    Protein (g)
                  </Label>
                  <Input
                    id="protein"
                    type="number"
                    step="0.1"
                    value={formData.nutritionalInfo.protein}
                    onChange={(e) => handleInputChange("nutritionalInfo.protein", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="carbs" className="text-gray-700 dark:text-gray-300">
                    Carbs (g)
                  </Label>
                  <Input
                    id="carbs"
                    type="number"
                    step="0.1"
                    value={formData.nutritionalInfo.carbs}
                    onChange={(e) => handleInputChange("nutritionalInfo.carbs", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fat" className="text-gray-700 dark:text-gray-300">
                    Fat (g)
                  </Label>
                  <Input
                    id="fat"
                    type="number"
                    step="0.1"
                    value={formData.nutritionalInfo.fat}
                    onChange={(e) => handleInputChange("nutritionalInfo.fat", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="fiber" className="text-gray-700 dark:text-gray-300">
                    Fiber (g)
                  </Label>
                  <Input
                    id="fiber"
                    type="number"
                    step="0.1"
                    value={formData.nutritionalInfo.fiber}
                    onChange={(e) => handleInputChange("nutritionalInfo.fiber", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sodium" className="text-gray-700 dark:text-gray-300">
                    Sodium (mg)
                  </Label>
                  <Input
                    id="sodium"
                    type="number"
                    step="1"
                    value={formData.nutritionalInfo.sodium}
                    onChange={(e) => handleInputChange("nutritionalInfo.sodium", e.target.value)}
                    className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Image Upload */}
          <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 transition-colors duration-300">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Item Image
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Upload a high-quality image of your menu item
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-300"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                          <span className="font-semibold">Click to upload</span> or drag and drop
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">PNG, JPG or JPEG (MAX. 5MB)</p>
                      </div>
                    )}
                    <input
                      id="image-upload"
                      type="file"
                      className="hidden"
                      accept="image/*"
                      onChange={handleImageUpload}
                    />
                  </label>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push("/admin")}
              className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-300"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white font-semibold px-8 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
            >
              {isLoading ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Adding Item...
                </div>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  Add Menu Item
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
