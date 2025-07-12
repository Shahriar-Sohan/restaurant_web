import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, Clock, Mail } from "lucide-react"

export function Contact() {
  const locations = [
    {
      name: "Downtown",
      address: "123 Main Street, City Center",
      phone: "(555) 123-4567",
      hours: "Mon-Sun: 11AM - 10PM",
    },
    {
      name: "Westside",
      address: "456 West Avenue, Westside Mall",
      phone: "(555) 234-5678",
      hours: "Mon-Sun: 10AM - 11PM",
    },
  ]

  return (
    <section id="contact" className="py-20 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-in fade-in-50 slide-in-from-top-4 duration-700">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Visit Us</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">Find us at one of our convenient locations</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-16">
          {locations.map((location, index) => (
            <Card
              key={index}
              className="hover:shadow-xl transition-all duration-500 hover:scale-105 animate-in fade-in-50 slide-in-from-bottom-4"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-2xl">{location.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3 hover:text-blue-600 transition-colors duration-300">
                  <MapPin className="h-5 w-5 text-gray-600 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{location.address}</span>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-300">
                  <Phone className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700">{location.phone}</span>
                </div>
                <div className="flex items-center gap-3 hover:text-blue-600 transition-colors duration-300">
                  <Clock className="h-5 w-5 text-gray-600 flex-shrink-0" />
                  <span className="text-gray-700">{location.hours}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="bg-gray-900 rounded-2xl p-6 md:p-8 lg:p-12 text-center text-white animate-in fade-in-50 slide-in-from-bottom-4 duration-700 delay-400">
          <h3 className="text-2xl lg:text-3xl font-bold mb-4">Ready to Order?</h3>
          <p className="text-lg lg:text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Experience authentic Greek flavors delivered fresh to your door
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 text-lg px-6 lg:px-8 py-3 transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Order Online
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 text-lg px-6 lg:px-8 py-3 bg-transparent transition-all duration-300 hover:scale-105 hover:shadow-lg"
            >
              Call to Order
            </Button>
          </div>
        </div>
      </div>

      <footer className="mt-20 border-t border-gray-200 pt-12 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-center md:text-left">
              <h4 className="text-2xl font-bold text-gray-900">Zeus Street</h4>
              <p className="text-gray-600">Authentic Greek Street Food</p>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="h-5 w-5 text-gray-600" />
              <span className="text-gray-700">hello@zeusstreet.com</span>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600">
            <p>&copy; 2024 Zeus Street Greek. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </section>
  )
}
