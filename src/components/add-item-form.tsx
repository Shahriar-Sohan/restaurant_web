"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { Switch } from "@/components/ui/switch"
import { ThemeToggle } from "./theme-toggle"
import { useRouter } from "next/navigation"
import Image from "next/image";
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

interface NutritionalInfo {
  protein: string;
  carbs: string;
  fat: string;
  fiber: string;
  sodium: string;
}

interface FormData {
  name: string;
  description: string;
  categoryId: string;
  price: number;
  image: string;
  prepTime: string;
  calories: number;
  servingSize: string;
  isPopular: boolean;
  isSpicy: boolean;
  isVegetarian: boolean;
  isVegan: boolean;
  isGlutenFree: boolean;
  isAvailable: boolean;
  stockQuantity: string;
  allergens: string[]; // you can use a stricter type if you have known allergens
  nutritionalInfo: NutritionalInfo;
  discount: number;
  rating: number;
}



export function AddItemForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [newIngredient, setNewIngredient] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    description: "",
    categoryId: "",
    price: 0,
    image: "",
    prepTime: "0",
    calories: 0,
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
    discount: 0,
    rating: 0,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [categories, setCategories] = useState<{ category_id: number; category_title: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/category");
        if (!res.ok) {
          throw new Error("Failed to fetch categories");
        }
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
        // Optionally, set an error state to display to the user
      }
    };
    fetchCategories();
  }, []);

  const getCategoryIdByTitle = (title: string): number | null => {
    const category = categories.find((cat) => cat.category_title === title);
    return category ? category.category_id : null;
  };

  const allergenOptions = ["Gluten", "Dairy", "Nuts", "Soy", "Eggs", "Fish", "Shellfish", "Sesame"]

  const discountedPrice =
    formData.price && formData.discount >= 0 && formData.discount <= 100
      ? (formData.price * (1 - formData.discount / 100)).toFixed(2)
      : formData.price || 0;

  const handleInputChange = (field: string, value: any) => {

    setFormData((prev) => {
      return { ...prev, [field as keyof FormData]: value as any };
    });

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Image = e.target?.result as string;
        setFormData((prev) => ({ ...prev, image: base64Image }));
        setImagePreview(base64Image);
      };
      reader.readAsDataURL(file);
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
    if (!formData.categoryId || isNaN(Number(formData.categoryId)) || Number(formData.categoryId) <= 0) {
      console.log( "Category is required");
    }
    if (!formData.price) {
      newErrors.price = "Price is required"
    } else if (isNaN(Number(formData.price)) || Number(formData.price) <= 0) {
      newErrors.price = "Please enter a valid price"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log(" submit runnin")
    if (!validateForm()) return console.log("form is not valid")

    setIsLoading(true)

   

    try {
      // Map form data to match the database schema
      const menuData = {
        food_name: formData.name,
        description: formData.description,
        category_id: Number(formData.categoryId),
        price: Number(formData.price),
        image: formData.image,
        availability: formData.isAvailable,
        discount: Number(formData.discount),
        rating: Number(formData.rating),
        prep_time: Number(formData.prepTime),
        calories: Number(formData.calories),
        ingredients: ingredients,
      };
      console.log(" submit runnin")
      const response = await fetch("/api/menu", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(menuData),
      });
      console.log(" submit runnin")
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to add item");
      }
      console.log(" submit runnin")
      const result = await response.json();
      console.log("Menu item created successfully:", result);

      setIsSuccess(true);

      // Reset form after successful submission
      setTimeout(() => {
        setFormData({
          name: "",
          description: "",
          categoryId: "",
          price: 0,
          image: "",
          prepTime: "0",
          calories: 0,
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
          discount: 0,
          rating: 0,
        });
        setIngredients([]);
        setImagePreview(null);
        setIsSuccess(false);
      }, 2000);
      console.log(" submit runnin")
    } catch (error: any) {
      console.error("Error adding menu item:", error);
      setErrors({ api: error.message || "An unexpected error occurred." });
      console.log(" submit runnin")
    } finally {
      setIsLoading(false);
      console.log(" submit runnin")
    }
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
              &quot;{formData.name}&quot; has been added to your menu and is now available for customers.
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
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${errors.name ? "border-red-500 dark:border-red-400" : ""
                      }`}
                    placeholder="e.g., Zeus Chicken Wrap"
                  />
                  {errors.name && <p className="text-red-500 dark:text-red-400 text-sm">{errors.name}</p>}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category" className="text-gray-700 dark:text-gray-300">
                    Category *
                  </Label>
                  <Select value={formData.categoryId} onValueChange={(value) => handleInputChange("categoryId", value)}>
                    <SelectTrigger
                      className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${errors.category ? "border-red-500 dark:border-red-400" : ""
                        }`}
                    >
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                      {categories.map((category, index) => (
                        <SelectItem key={index} value={String(category.category_id)}>
                          {category.category_title}
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
                  className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md min-h-[100px] ${errors.description ? "border-red-500 dark:border-red-400" : ""
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
                {/* Price */}
                <div className="space-y-2">
                  <Label htmlFor="price" className="text-gray-700 dark:text-gray-300">
                    Price *
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      $
                    </span>
                    <Input
                      id="price"
                      type="number"
                      inputMode="decimal"
                      value={formData.price === 0 ? "" : formData.price}
                      onChange={(e) => handleInputChange("price", e.target.value)}
                      className={`pl-8 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${errors.price ? "border-red-500 dark:border-red-400" : ""
                        }`}
                      placeholder="0.00"
                    />
                  </div>
                  {errors.price && (
                    <p className="text-red-500 dark:text-red-400 text-sm">
                      {errors.price}
                    </p>
                  )}
                </div>

                {/* Discount */}
                <div className="space-y-2">
                  <Label htmlFor="originalPrice" className="text-gray-700 dark:text-gray-300">
                    Discount (Optional)
                  </Label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">
                      %
                    </span>
                    <Input
                      id="originalPrice"
                      type="number"
                      inputMode="decimal"
                      value={formData.discount === 0 ? "" : formData.discount}
                      onChange={(e) => handleInputChange("discount", e.target.value)}
                      className="pl-8 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                      placeholder="0"
                    />
                  </div>
                </div>

                {/* Stock Quantity */}
                <div className="space-y-2">
                  <Label htmlFor="stockQuantity" className="text-gray-700 dark:text-gray-300">
                    After Discount Price
                  </Label>
                  <div className="p-1.5 pl-4 rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-md font-semibold text-green-600 dark:text-green-400">
                    ${discountedPrice}
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    This is the final price after discount.
                  </p>
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

              <div className="flex gap-4 pt-4">
                <Button onClick={handleSubmit} className="flex-1">
                  Add Item
                </Button>
                <Button variant="outline" className="flex-1">
                  Cancel
                </Button>
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
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${errors.prepTime ? "border-red-500 dark:border-red-400" : ""
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
                    className={`bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md ${errors.calories ? "border-red-500 dark:border-red-400" : ""
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
                      <Image
                        src={imagePreview || "/placeholder.svg"}
                        alt="Preview"
                        width={256}
                        height={256}
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
              {/* Debug info */}
              <div className="mt-8 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg">
                <h3 className="font-semibold mb-2">Form Data (Debug):</h3>
                <pre className="text-sm text-gray-600 dark:text-gray-300">
                  {JSON.stringify(formData, null, 2)}
                </pre>
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
              onClick={handleSubmit}
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
