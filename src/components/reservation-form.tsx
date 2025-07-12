"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Users, Phone, Mail, ArrowLeft, Check } from "lucide-react"
import { useRouter } from "next/navigation"

export function ReservationForm() {
  const router = useRouter()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    time: "",
    guests: "",
    location: "",
    specialRequests: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsLoading(false)
    setIsSubmitted(true)
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md text-center animate-in fade-in-50 slide-in-from-bottom-4 duration-700">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 animate-in zoom-in-50 duration-500 delay-300">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Reservation Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Thank you {formData.name}! We've received your reservation and will send a confirmation email shortly.
            </p>
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
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Make a Reservation</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Book your table and experience authentic Greek flavors in a modern setting
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Reservation Form */}
          <div className="lg:col-span-2">
            <Card className="animate-in fade-in-50 slide-in-from-left-4 duration-700 delay-200">
              <CardHeader>
                <CardTitle className="text-2xl">Reservation Details</CardTitle>
                <CardDescription>Please fill in your information to secure your table</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      required
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      placeholder="Enter your phone number"
                    />
                  </div>

                  {/* Reservation Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={formData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        required
                        min={new Date().toISOString().split("T")[0]}
                        className="transition-all duration-300 focus:scale-105 focus:shadow-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="time">Time *</Label>
                      <Select onValueChange={(value) => handleInputChange("time", value)} required>
                        <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-md">
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="11:00">11:00 AM</SelectItem>
                          <SelectItem value="11:30">11:30 AM</SelectItem>
                          <SelectItem value="12:00">12:00 PM</SelectItem>
                          <SelectItem value="12:30">12:30 PM</SelectItem>
                          <SelectItem value="13:00">1:00 PM</SelectItem>
                          <SelectItem value="13:30">1:30 PM</SelectItem>
                          <SelectItem value="14:00">2:00 PM</SelectItem>
                          <SelectItem value="18:00">6:00 PM</SelectItem>
                          <SelectItem value="18:30">6:30 PM</SelectItem>
                          <SelectItem value="19:00">7:00 PM</SelectItem>
                          <SelectItem value="19:30">7:30 PM</SelectItem>
                          <SelectItem value="20:00">8:00 PM</SelectItem>
                          <SelectItem value="20:30">8:30 PM</SelectItem>
                          <SelectItem value="21:00">9:00 PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="guests">Guests *</Label>
                      <Select onValueChange={(value) => handleInputChange("guests", value)} required>
                        <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-md">
                          <SelectValue placeholder="Number of guests" />
                        </SelectTrigger>
                        <SelectContent>
                          {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                            <SelectItem key={num} value={num.toString()}>
                              {num} {num === 1 ? "Guest" : "Guests"}
                            </SelectItem>
                          ))}
                          <SelectItem value="9+">9+ Guests</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Preferred Location *</Label>
                    <Select onValueChange={(value) => handleInputChange("location", value)} required>
                      <SelectTrigger className="transition-all duration-300 focus:scale-105 focus:shadow-md">
                        <SelectValue placeholder="Select location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="downtown">Downtown - 123 Main Street</SelectItem>
                        <SelectItem value="westside">Westside - 456 West Avenue</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requests">Special Requests</Label>
                    <Textarea
                      id="requests"
                      value={formData.specialRequests}
                      onChange={(e) => handleInputChange("specialRequests", e.target.value)}
                      placeholder="Any dietary restrictions, special occasions, or other requests..."
                      className="transition-all duration-300 focus:scale-105 focus:shadow-md min-h-[100px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-gray-900 hover:bg-gray-800 text-lg py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Processing...
                      </div>
                    ) : (
                      "Confirm Reservation"
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar Information */}
          <div className="space-y-6">
            <Card className="animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-400">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  Reservation Info
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-medium">Operating Hours</p>
                    <p className="text-sm text-gray-600">Mon-Sun: 11:00 AM - 10:00 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Users className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-medium">Group Reservations</p>
                    <p className="text-sm text-gray-600">For parties of 9+, please call us directly</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-gray-600 mt-1" />
                  <div>
                    <p className="font-medium">Need Help?</p>
                    <p className="text-sm text-gray-600">Call us at (555) 123-4567</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-500">
              <CardHeader>
                <CardTitle>Cancellation Policy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Please provide at least 2 hours notice for cancellations. For large groups (6+), we require 24 hours
                  notice.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-600">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Mail className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <h3 className="font-semibold text-gray-900 mb-2">Confirmation Email</h3>
                  <p className="text-sm text-gray-600">
                    You'll receive a confirmation email with all the details of your reservation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
