"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CreditCard, MapPin, ArrowLeft, Check, Truck, Store, Minus, Plus, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useCart } from "@/lib/cart-context"
import Image from "next/image"

export function CheckoutForm() {
  const router = useRouter()
  const { state, dispatch } = useCart()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [orderType, setOrderType] = useState<"delivery" | "pickup">("delivery")

  const [formData, setFormData] = useState({
    // Customer Info
    firstName: "",
    lastName: "",
    email: "",
    phone: "",

    // Delivery Info
    address: "",
    apartment: "",
    city: "",
    zipCode: "",
    deliveryInstructions: "",

    // Pickup Info
    location: "",
    pickupTime: "",

    // Payment Info
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",

    // Order Notes
    specialInstructions: "",
  })

  const deliveryFee = orderType === "delivery" ? 3.99 : 0
  const tax = (state.total + deliveryFee) * 0.08875 // 8.875% tax
  const finalTotal = state.total + deliveryFee + tax

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const orderItems = state.items.map(item => ({
        food_id: item.id,
        quantity: item.quantity,
        price_at_purchase: item.price,
      }));

      const orderData = {
        user_id: 1, // Placeholder for now, assuming a default user or anonymous order
        total_price: finalTotal,
        status: "pending",
        order_items: orderItems,
        // Include payment and address details if your backend expects them with the order creation
        // For simplicity, I'm assuming these might be handled separately or are optional for initial order creation
        address_line: formData.address,
        city: formData.city,
        postal_code: formData.zipCode,
        country: "USA", // Assuming a default country for now
        payment_method: "card", // Assuming card payment for now
        payment_status: "pending",
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to place order");
      }

      setIsSubmitted(true);
      dispatch({ type: "CLEAR_CART" });
    } catch (error) {
      console.error("Error placing order:", error);
      // You might want to set an error state here to display to the user
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  if (state.items.length === 0 && !isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-600 mb-6">Add some delicious items to your cart before checking out.</p>
            <Button onClick={() => router.push("/")} className="w-full bg-gray-900 hover:bg-gray-800">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Menu
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-500 delay-300">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Order Confirmed!</h2>
            <p className="text-gray-600 mb-4">
              Thank you {formData.firstName}! Your order has been placed successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-600 mb-1">Order Total</p>
              <p className="text-2xl font-bold text-gray-900">${finalTotal.toFixed(2)}</p>
              <p className="text-sm text-gray-600 mt-2">
                {orderType === "delivery" ? `Estimated delivery: 30-45 minutes` : `Ready for pickup in 15-20 minutes`}
              </p>
            </div>
            <Button
              onClick={() => router.push("/")}
              className="w-full bg-gray-900 hover:bg-gray-800 transition-all duration-300 hover:scale-105"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">Checkout</h1>
          <p className="text-gray-600">Complete your order and enjoy authentic Greek flavors</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Order Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Order Type Selection */}
            <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700">
              <CardHeader>
                <CardTitle>Order Type</CardTitle>
                <CardDescription>Choose how you&apos;d like to receive your order</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <Button
                    variant={orderType === "delivery" ? "default" : "outline"}
                    className="h-20 flex-col gap-2 transition-all duration-300 hover:scale-105"
                    onClick={() => setOrderType("delivery")}
                  >
                    <Truck className="h-6 w-6" />
                    <span>Delivery</span>
                  </Button>
                  <Button
                    variant={orderType === "pickup" ? "default" : "outline"}
                    className="h-20 flex-col gap-2 transition-all duration-300 hover:scale-105"
                    onClick={() => setOrderType("pickup")}
                  >
                    <Store className="h-6 w-6" />
                    <span>Pickup</span>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Customer Information */}
            <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-100">
              <CardHeader>
                <CardTitle>Contact Information</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone *</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Delivery/Pickup Information */}
            {orderType === "delivery" ? (
              <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Delivery Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Street Address *</Label>
                    <Input
                      id="address"
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      required
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="apartment">Apt/Suite</Label>
                      <Input
                        id="apartment"
                        value={formData.apartment}
                        onChange={(e) => handleInputChange("apartment", e.target.value)}
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City *</Label>
                      <Input
                        id="city"
                        value={formData.city}
                        onChange={(e) => handleInputChange("city", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zipCode">ZIP Code *</Label>
                      <Input
                        id="zipCode"
                        value={formData.zipCode}
                        onChange={(e) => handleInputChange("zipCode", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryInstructions">Delivery Instructions</Label>
                    <Textarea
                      id="deliveryInstructions"
                      value={formData.deliveryInstructions}
                      onChange={(e) => handleInputChange("deliveryInstructions", e.target.value)}
                      placeholder="Any special delivery instructions..."
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-200">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Store className="h-5 w-5" />
                    Pickup Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="location">Pickup Location *</Label>
                    <Select onValueChange={(value) => handleInputChange("location", value)} required>
                      <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-md">
                        <SelectValue placeholder="Select pickup location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown - 123 Main Street</SelectItem>
                        <SelectItem value="westside">Westside - 456 West Avenue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="pickupTime">Preferred Pickup Time</Label>
                    <Select onValueChange={(value) => handleInputChange("pickupTime", value)}>
                      <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-md">
                        <SelectValue placeholder="ASAP (15-20 minutes)" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="asap">ASAP (15-20 minutes)</SelectItem>
                        <SelectItem value="30min">In 30 minutes</SelectItem>
                        <SelectItem value="1hour">In 1 hour</SelectItem>
                        <SelectItem value="1.5hour">In 1.5 hours</SelectItem>
                        <SelectItem value="2hour">In 2 hours</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Payment Information */}
            <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-300">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Payment Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                    className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      required
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      required
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nameOnCard">Name on Card *</Label>
                  <Input
                    id="nameOnCard"
                    value={formData.nameOnCard}
                    onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                    required
                    className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Special Instructions */}
            <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-400">
              <CardHeader>
                <CardTitle>Special Instructions</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea
                  value={formData.specialInstructions}
                  onChange={(e) => handleInputChange("specialInstructions", e.target.value)}
                  placeholder="Any special requests or dietary restrictions..."
                  className="transition-all duration-300 focus:scale-105 focus:shadow-md min-h-[100px]"
                />
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            <Card className="animate-in fade-in-50 slide-in-from-right-4 duration-700 sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Order Items */}
                <div className="space-y-3 max-h-60 overflow-y-auto">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={48}
                          height={48}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm truncate">{item.name}</h4>
                        <p className="text-xs text-gray-500">${item.price.toFixed(2)} each</p>

                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-1">
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              size="icon"
                              variant="outline"
                              className="h-6 w-6 bg-transparent"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>

                          <Button
                            size="icon"
                            variant="ghost"
                            className="h-6 w-6 text-red-500 hover:text-red-700"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Totals */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>${state.total.toFixed(2)}</span>
                  </div>

                  {orderType === "delivery" && (
                    <div className="flex justify-between text-sm">
                      <span>Delivery Fee</span>
                      <span>${deliveryFee.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-sm">
                    <span>Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>

                  <Separator />

                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>${finalTotal.toFixed(2)}</span>
                  </div>
                </div>

                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gray-900 hover:bg-gray-800 text-lg py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Processing Order...
                    </div>
                  ) : (
                    `Place Order - $${finalTotal.toFixed(2)}`
                  )}
                </Button>

                <div className="text-xs text-gray-500 text-center">
                  {orderType === "delivery"
                    ? "Estimated delivery time: 30-45 minutes"
                    : "Order will be ready for pickup in 15-20 minutes"}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
