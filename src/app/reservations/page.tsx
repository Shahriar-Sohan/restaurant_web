import { ReservationForm } from "@/components/reservation-form"
import { NavigationBar } from "@/components/navbar"

export default function ReservationsPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <NavigationBar />
      <div className="pt-16">
        <ReservationForm />
      </div>
    </main>
  )
}
