"use client"

import { Calendar, Clock, MapPin } from "lucide-react"
import { useParams } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormModified from "@/components/ui/form-modified"
import { Separator } from "@/components/ui/separator"

const bookingSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  reason: z.string().min(10, "Please provide a reason for your visit"),
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalHistory: z.string().optional(),
  emergencyContact: z.string().min(10, "Emergency contact is required"),
  insuranceProvider: z.string().optional(),
  policyNumber: z.string().optional(),
})

type BookingFormData = z.infer<typeof bookingSchema>

interface BookingPageProps {
  params: { doctorId: string; timeSlot: string }
}

// Mock doctor data
const mockDoctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  image:
    "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=300&h=300&fit=crop&crop=face",
  location: "Heart Care Center, New York",
  consultationFee: 150,
}

export default function BookingPage() {
  const params = useParams<BookingPageProps["params"]>()
  const [currentStep, setCurrentStep] = useState(1)
  const { timeSlot } = params

  // Decode the time slot
  const decodedTimeSlot = decodeURIComponent(timeSlot)
  const [date, time] = decodedTimeSlot.split("_")

  const handleSubmit = (data: BookingFormData) => {
    console.log("Booking data:", data)
    // TODO: Process booking and redirect to payment
    setCurrentStep(3) // Go to payment step
  }

  return (
    <div className="min-h-screen bg-background px-4 md:px-6 lg:px-8 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-center space-x-4">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                      step <= currentStep
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-600"
                    }`}
                  >
                    {step}
                  </div>
                  <span className="ml-2 text-sm font-medium text-gray-600">
                    {step === 1 && "Personal Info"}
                    {step === 2 && "Medical Info"}
                    {step === 3 && "Payment"}
                  </span>
                  {step < 3 && <div className="w-16 h-px bg-gray-300 mx-4" />}
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {currentStep === 1 && "Personal Information"}
                    {currentStep === 2 && "Medical Information"}
                    {currentStep === 3 && "Payment"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {currentStep === 1 && (
                    <FormModified
                      schema={bookingSchema}
                      onSubmit={(data) => {
                        console.log("Step 1 data:", data)
                        setCurrentStep(2)
                      }}
                    >
                      {({ components }) => (
                        <div className="space-y-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <components.Input
                              name="firstName"
                              label="First Name"
                            />
                            <components.Input
                              name="lastName"
                              label="Last Name"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <components.Input
                              name="email"
                              label="Email"
                              type="email"
                            />
                            <components.Input
                              name="phone"
                              label="Phone Number"
                              type="tel"
                            />
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <components.Input
                              name="dateOfBirth"
                              label="Date of Birth"
                              type="date"
                            />
                            <components.Input name="gender" label="Gender" />
                          </div>

                          <components.Input
                            name="emergencyContact"
                            label="Emergency Contact"
                          />

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <components.Input
                              name="insuranceProvider"
                              label="Insurance Provider (Optional)"
                            />
                            <components.Input
                              name="policyNumber"
                              label="Policy Number (Optional)"
                            />
                          </div>

                          <Button type="submit" className="w-full">
                            Continue to Medical Information
                          </Button>
                        </div>
                      )}
                    </FormModified>
                  )}

                  {currentStep === 2 && (
                    <FormModified
                      schema={bookingSchema}
                      onSubmit={handleSubmit}
                    >
                      {({ components }) => (
                        <div className="space-y-6">
                          <components.Textarea
                            name="reason"
                            label="Reason for Visit"
                            description="Please describe your symptoms or reason for the appointment"
                          />

                          <components.Textarea
                            name="allergies"
                            label="Allergies (Optional)"
                            description="List any known allergies"
                          />

                          <components.Textarea
                            name="medications"
                            label="Current Medications (Optional)"
                            description="List all medications you're currently taking"
                          />

                          <components.Textarea
                            name="medicalHistory"
                            label="Medical History (Optional)"
                            description="Briefly describe any relevant medical history"
                          />

                          <div className="flex gap-4">
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => setCurrentStep(1)}
                              className="flex-1"
                            >
                              Back
                            </Button>
                            <Button type="submit" className="flex-1">
                              Continue to Payment
                            </Button>
                          </div>
                        </div>
                      )}
                    </FormModified>
                  )}

                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="text-center py-8">
                        <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                          ✓
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                          Appointment Confirmed!
                        </h3>
                        <p className="text-gray-600 mb-6">
                          Your appointment has been successfully booked. You
                          will receive a confirmation email shortly.
                        </p>
                        <div className="space-y-2">
                          <Button className="w-full">Go to Dashboard</Button>
                          <Button variant="outline" className="w-full">
                            Book Another Appointment
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Appointment Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Doctor Info */}
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-semibold">
                        {mockDoctor.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <h4 className="font-semibold">{mockDoctor.name}</h4>
                      <p className="text-sm text-gray-600">
                        {mockDoctor.specialty}
                      </p>
                    </div>
                  </div>

                  <Separator />

                  {/* Appointment Details */}
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="w-4 h-4 text-gray-500" />
                      <span>{date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Clock className="w-4 h-4 text-gray-500" />
                      <span>{time}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <MapPin className="w-4 h-4 text-gray-500" />
                      <span>{mockDoctor.location}</span>
                    </div>
                  </div>

                  <Separator />

                  {/* Pricing */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Consultation Fee</span>
                      <span>${mockDoctor.consultationFee}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Platform Fee</span>
                      <span>$10</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-semibold">
                      <span>Total</span>
                      <span>${mockDoctor.consultationFee + 10}</span>
                    </div>
                  </div>

                  {/* Payment Method */}
                  {currentStep === 3 && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <h5 className="font-semibold">Payment Method</h5>
                        <div className="p-3 border rounded-lg">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Credit Card</span>
                            <Badge variant="secondary">Secure</Badge>
                          </div>
                          <p className="text-xs text-gray-500 mt-1">
                            •••• •••• •••• 4242
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
