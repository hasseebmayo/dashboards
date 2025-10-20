"use client"

import { Suspense } from "react"
import { BookingForm } from "@/components/_booking/booking-form"

export default function BookPage() {
  return (
    <div className="min-h-screen bg-background px-4 md:px-6 lg:px-8 py-8">
      <div className="container mx-auto py-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Book Your Appointment</h1>
          <p className="text-muted-foreground mt-2">
            Complete the form below to schedule your appointment
          </p>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <BookingForm />
        </Suspense>
      </div>
    </div>
  )
}
