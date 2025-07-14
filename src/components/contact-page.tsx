"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MapPin, Phone, Clock, Mail, Send, MessageSquare, Users, Award } from "lucide-react"
import Image from "next/image"

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    location: "",
    message: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const locations = [
    {
      name: "Downtown",
      address: "123 Main Street, City Center",
      phone: "(555) 123-4567",
      hours: "Mon-Sun: 11AM - 10PM",
      email: "downtown@zeusstreet.com",
      manager: "Dimitri Kostas",
      image: "/placeholder.svg?height=300&width=400&text=Downtown+Location",
    },
    {
      name: "Westside",
      address: "456 West Avenue, Westside Mall",
      phone: "(555) 234-5678",
      hours: "Mon-Sun: 10AM - 11PM",
      email: "westside@zeusstreet.com",
      manager: "Maria Papadopoulos",
      image: "/placeholder.svg?height=300&width=400&text=Westside+Location",
    },
    {
      name: "University District",
      address: "789 College Road, Near Campus",
      phone: "(555) 345-6789",
      hours: "Mon-Sun: 11AM - 12AM",
      email: "university@zeusstreet.com",
      manager: "Andreas Stavros",
      image: "/placeholder.svg?height=300&width=400&text=University+Location",
    },
  ]

  const contactReasons = [
    { value: "general", label: "General Inquiry" },
    { value: "catering", label: "Catering Services" },
    { value: "franchise", label: "Franchise Opportunities" },
    { value: "feedback", label: "Feedback & Suggestions" },
    { value: "complaint", label: "Complaint or Issue" },
    { value: "media", label: "Media & Press" },
  ]

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to send message");
      }

      setIsSubmitted(true);
    } catch (error) {
      console.error("Error sending message:", error);
      // You might want to set an error state here to display to the user
    } finally {
      setIsSubmitting(false);
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4 transition-colors duration-300">
        <Card className="w-full max-w-md text-center bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
          <CardContent className="pt-8 pb-8">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
              <Send className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2 transition-colors duration-300">
              Message Sent!
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 transition-colors duration-300">
              Thank you {formData.name}! We&apos;ve received your message and will get back to you within 24 hours.
            </p>
            <Button
              onClick={() => {
                setIsSubmitted(false)
                setFormData({
                  name: "",
                  email: "",
                  phone: "",
                  subject: "",
                  location: "",
                  message: "",
                })
              }}
              className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 transition-colors duration-300"
            >
              Send Another Message
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800 text-white transition-colors duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-in fade-in-50 slide-in-from-top-4 duration-700">
            Contact Us
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto animate-in fade-in-50 slide-in-from-top-4 duration-700 delay-200">
            We&apos;d love to hear from you. Get in touch with any questions, feedback, or inquiries
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Form */}
          <div className="animate-in fade-in-50 slide-in-from-left-4 duration-700">
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl text-gray-900 dark:text-white flex items-center gap-2 transition-colors duration-300">
                  <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                  Send us a Message
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-gray-700 dark:text-gray-300">
                        Full Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        required
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700 dark:text-gray-300">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                        placeholder="Enter your email"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-gray-700 dark:text-gray-300">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md"
                        placeholder="Enter your phone number"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location" className="text-gray-700 dark:text-gray-300">
                        Preferred Location
                      </Label>
                      <Select onValueChange={(value) => handleInputChange("location", value)}>
                        <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md">
                          <SelectValue placeholder="Select location" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                          {locations.map((location) => (
                            <SelectItem key={location.name} value={location.name.toLowerCase()}>
                              {location.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject" className="text-gray-700 dark:text-gray-300">
                      Subject *
                    </Label>
                    <Select onValueChange={(value) => handleInputChange("subject", value)} required>
                      <SelectTrigger className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md">
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                      <SelectContent className="bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600">
                        {contactReasons.map((reason) => (
                          <SelectItem key={reason.value} value={reason.value}>
                            {reason.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-gray-700 dark:text-gray-300">
                      Message *
                    </Label>
                    <Textarea
                      id="message"
                      value={formData.message}
                      onChange={(e) => handleInputChange("message", e.target.value)}
                      required
                      placeholder="Tell us how we can help you..."
                      className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white transition-all duration-300 focus:scale-105 focus:shadow-md min-h-[120px]"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-lg py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:hover:scale-100"
                  >
                    {isSubmitting ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Sending...
                      </div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Contact Information */}
          <div className="space-y-8 animate-in fade-in-50 slide-in-from-right-4 duration-700 delay-300">
            {/* Quick Contact */}
            <Card className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-xl">
              <CardHeader>
                <CardTitle className="text-xl text-gray-900 dark:text-white transition-colors duration-300">
                  Quick Contact
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">General Inquiries</p>
                    <p className="text-gray-600 dark:text-gray-300">(555) 123-ZEUS</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Email Us</p>
                    <p className="text-gray-600 dark:text-gray-300">hello@zeusstreet.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                  <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">Customer Service</p>
                    <p className="text-gray-600 dark:text-gray-300">Mon-Sun: 9AM - 9PM</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Business Inquiries */}
            <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 border-blue-200 dark:border-blue-700/50 shadow-xl transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Users className="w-12 h-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg transition-colors duration-300">
                    Business Partnerships
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 transition-colors duration-300">
                    Interested in catering, franchising, or corporate partnerships?
                  </p>
                  <Button
                    variant="outline"
                    className="border-blue-600 dark:border-blue-400 text-blue-600 dark:text-blue-400 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-500 transition-all duration-300 bg-transparent"
                  >
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Awards */}
            <Card className="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-amber-200 dark:border-amber-700/50 shadow-xl transition-colors duration-300">
              <CardContent className="pt-6">
                <div className="text-center">
                  <Award className="w-12 h-12 text-amber-600 dark:text-amber-400 mx-auto mb-4" />
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2 text-lg transition-colors duration-300">
                    Award-Winning Service
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 transition-colors duration-300">
                    Recognized for excellence in authentic Greek cuisine and customer satisfaction
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Locations Section */}
        <div className="mt-20">
          <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-top-4 duration-700">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-colors duration-300">
              Visit Our Locations
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-colors duration-300">
              Find us at one of our convenient locations across the city
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {locations.map((location, index) => (
              <Card
                key={index}
                className="hover:shadow-xl dark:hover:shadow-2xl transition-all duration-500 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700"
                style={{ animationDelay: `${index * 200}ms` }}
              >
                <div className="aspect-video bg-gray-200 dark:bg-gray-700 overflow-hidden transition-colors duration-300">
                  <Image
                    src={location.image || "/placeholder.svg"}
                    alt={`${location.name} location`}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900 dark:text-white transition-colors duration-300">
                    {location.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-start gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    <MapPin className="h-5 w-5 text-gray-600 dark:text-gray-400 mt-1 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{location.address}</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    <Phone className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{location.phone}</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    <Clock className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{location.hours}</span>
                  </div>
                  <div className="flex items-center gap-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-300">
                    <Mail className="h-5 w-5 text-gray-600 dark:text-gray-400 flex-shrink-0" />
                    <span className="text-gray-700 dark:text-gray-300">{location.email}</span>
                  </div>
                  <div className="pt-2 border-t border-gray-200 dark:border-gray-600">
                    <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-300">
                      Manager: <span className="font-medium text-gray-900 dark:text-white">{location.manager}</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
