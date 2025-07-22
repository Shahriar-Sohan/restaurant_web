import { CheckoutForm } from "@/components/checkout-form"
import { NavigationBar } from "@/components/navbar"

export default function CheckoutPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavigationBar />
      <div className="pt-16">
        <CheckoutForm />
      </div>
    </main>
  )
}
