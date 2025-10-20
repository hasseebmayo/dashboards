"use client"

import { Calendar, Check, Clock, CreditCard, User } from "lucide-react"
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import FormModified from "@/components/ui/form-modified"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// Zod schemas for form validation
const patientInfoSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Please select a gender"),
})

const medicalInfoSchema = z.object({
  appointmentReason: z
    .string()
    .min(1, "Please provide a reason for the appointment"),
  medicalHistory: z.string().optional(),
  currentMedications: z.string().optional(),
  allergies: z.string().optional(),
})

const paymentSchema = z.object({
  insuranceProvider: z.string().min(1, "Insurance provider is required"),
  insuranceId: z.string().min(1, "Insurance ID is required"),
})

type PatientInfo = z.infer<typeof patientInfoSchema>
type MedicalInfo = z.infer<typeof medicalInfoSchema>
type PaymentInfo = z.infer<typeof paymentSchema>

interface BookingData {
  doctorId: string
  date: string
  time: string
  patientInfo: PatientInfo
  medicalInfo: MedicalInfo
  paymentInfo: PaymentInfo
}

const steps = [
  { id: 1, name: "Patient Info", icon: User },
  { id: 2, name: "Medical Info", icon: Calendar },
  { id: 3, name: "Payment", icon: CreditCard },
  { id: 4, name: "Confirmation", icon: Check },
]

// Mock doctor data
const doctors = [
  { id: "1", name: "Dr. Sarah Johnson", specialty: "Cardiologist" },
  { id: "2", name: "Dr. Michael Chen", specialty: "Neurologist" },
]

export function BookingForm() {
  const searchParams = useSearchParams()
  const [currentStep, setCurrentStep] = useState(1)
  const [bookingData, setBookingData] = useState<BookingData>({
    doctorId: searchParams.get("doctor") || "",
    date: searchParams.get("date") || "",
    time: searchParams.get("time") || "",
    patientInfo: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      dateOfBirth: "",
      gender: "",
    },
    medicalInfo: {
      appointmentReason: "",
      medicalHistory: "",
      currentMedications: "",
      allergies: "",
    },
    paymentInfo: {
      insuranceProvider: "",
      insuranceId: "",
    },
  })

  const doctor = doctors.find((d) => d.id === bookingData.doctorId)

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handlePatientInfoSubmit = (data: PatientInfo) => {
    setBookingData((prev) => ({ ...prev, patientInfo: data }))
    handleNext()
  }

  const handleMedicalInfoSubmit = (data: MedicalInfo) => {
    setBookingData((prev) => ({ ...prev, medicalInfo: data }))
    handleNext()
  }

  const handlePaymentSubmit = (data: PaymentInfo) => {
    setBookingData((prev) => ({ ...prev, paymentInfo: data }))
    handleNext()
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Appointment Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Appointment Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="space-y-1">
              <p className="font-medium">{doctor?.name}</p>
              <p className="text-sm text-muted-foreground">
                {doctor?.specialty}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{formatDate(bookingData.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm">{bookingData.time}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Steps */}
      <div className="overflow-x-auto">
        <div className="flex items-center justify-between min-w-max px-4">
          {steps.map((step, index) => {
            const Icon = step.icon
            const isActive = step.id === currentStep
            const isCompleted = step.id < currentStep

            return (
              <div key={step.id} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                    isActive
                      ? "border-primary bg-primary text-primary-foreground"
                      : isCompleted
                        ? "border-green-600 bg-green-600 text-white"
                        : "border-border bg-background text-muted-foreground"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                </div>
                <span
                  className={`ml-2 text-sm font-medium hidden sm:inline ${
                    isActive
                      ? "text-primary"
                      : isCompleted
                        ? "text-green-600"
                        : "text-muted-foreground"
                  }`}
                >
                  {step.name}
                </span>
                {index < steps.length - 1 && (
                  <div
                    className={`w-16 h-0.5 mx-4 ${
                      isCompleted ? "bg-green-600" : "bg-border"
                    }`}
                  />
                )}
              </div>
            )
          })}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6">
          {currentStep === 1 && (
            <PatientInfoStep
              data={bookingData.patientInfo}
              onSubmit={handlePatientInfoSubmit}
            />
          )}
          {currentStep === 2 && (
            <MedicalInfoStep
              data={bookingData.medicalInfo}
              onSubmit={handleMedicalInfoSubmit}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 3 && (
            <PaymentStep
              data={bookingData.paymentInfo}
              onSubmit={handlePaymentSubmit}
              onPrevious={handlePrevious}
            />
          )}
          {currentStep === 4 && <ConfirmationStep bookingData={bookingData} />}
        </CardContent>
      </Card>
    </div>
  )
}

// Step Components
interface PatientInfoStepProps {
  data: PatientInfo
  onSubmit: (data: PatientInfo) => void
}

function PatientInfoStep({ data, onSubmit }: PatientInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Patient Information</h3>
        <p className="text-sm text-muted-foreground">
          Please provide your personal information
        </p>
      </div>

      <FormModified
        schema={patientInfoSchema}
        onSubmit={onSubmit}
        defaultValues={data}
      >
        {({ components }) => (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <components.Input
                name="firstName"
                label="First Name"
                placeholder="Enter your first name"
              />
              <components.Input
                name="lastName"
                label="Last Name"
                placeholder="Enter your last name"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <components.Input
                name="email"
                label="Email"
                type="email"
                placeholder="Enter your email"
              />
              <components.Input
                name="phone"
                label="Phone Number"
                type="tel"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <components.Input
                name="dateOfBirth"
                label="Date of Birth"
                type="date"
              />
              <components.Field name="gender" label="Gender">
                {(field) => (
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">
                        Prefer not to say
                      </SelectItem>
                    </SelectContent>
                  </Select>
                )}
              </components.Field>
            </div>

            <Button type="submit" className="w-full">
              Continue to Medical Info
            </Button>
          </div>
        )}
      </FormModified>
    </div>
  )
}

interface MedicalInfoStepProps {
  data: MedicalInfo
  onSubmit: (data: MedicalInfo) => void
  onPrevious: () => void
}

function MedicalInfoStep({ data, onSubmit, onPrevious }: MedicalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Medical Information</h3>
        <p className="text-sm text-muted-foreground">
          Help us provide better care by sharing your medical background
        </p>
      </div>

      <FormModified
        schema={medicalInfoSchema}
        onSubmit={onSubmit}
        defaultValues={data}
      >
        {({ components }) => (
          <div className="space-y-4">
            <components.Textarea
              name="appointmentReason"
              label="Reason for Appointment"
              placeholder="Please describe why you're booking this appointment..."
              rows={3}
            />

            <components.Textarea
              name="medicalHistory"
              label="Medical History"
              placeholder="Any relevant medical conditions, surgeries, or treatments..."
              rows={3}
            />

            <components.Textarea
              name="currentMedications"
              label="Current Medications"
              placeholder="List all medications you're currently taking..."
              rows={3}
            />

            <components.Textarea
              name="allergies"
              label="Allergies"
              placeholder="Any known allergies to medications, foods, or other substances..."
              rows={3}
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                className="flex-1"
              >
                Back to Patient Info
              </Button>
              <Button type="submit" className="flex-1">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}
      </FormModified>
    </div>
  )
}

interface PaymentStepProps {
  data: PaymentInfo
  onSubmit: (data: PaymentInfo) => void
  onPrevious: () => void
}

function PaymentStep({ data, onSubmit, onPrevious }: PaymentStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold">Insurance & Payment</h3>
        <p className="text-sm text-muted-foreground">
          Provide your insurance information
        </p>
      </div>

      <FormModified
        schema={paymentSchema}
        onSubmit={onSubmit}
        defaultValues={data}
      >
        {({ components }) => (
          <div className="space-y-4">
            <components.Input
              name="insuranceProvider"
              label="Insurance Provider"
              placeholder="e.g., Blue Cross Blue Shield, Aetna, etc."
            />

            <components.Input
              name="insuranceId"
              label="Insurance ID"
              placeholder="Your insurance member ID"
            />

            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onPrevious}
                className="flex-1"
              >
                Back to Medical Info
              </Button>
              <Button type="submit" className="flex-1">
                Complete Booking
              </Button>
            </div>
          </div>
        )}
      </FormModified>
    </div>
  )
}

function ConfirmationStep({ bookingData }: { bookingData: BookingData }) {
  const doctor = doctors.find((d) => d.id === bookingData.doctorId)

  const handleGoHome = () => {
    window.location.href = "/"
  }

  const handleViewAppointments = () => {
    window.location.href = "/dashboard"
  }

  return (
    <div className="text-center space-y-6">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
        <Check className="w-8 h-8 text-green-600" />
      </div>

      <div>
        <h3 className="text-xl font-semibold">Appointment Confirmed!</h3>
        <p className="text-muted-foreground mt-2">
          Your appointment has been successfully booked. You will receive a
          confirmation email shortly.
        </p>
      </div>

      <div className="bg-muted rounded-lg p-4 space-y-2 text-left">
        <p>
          <strong>Doctor:</strong> {doctor?.name}
        </p>
        <p>
          <strong>Date:</strong>{" "}
          {new Date(bookingData.date).toLocaleDateString()}
        </p>
        <p>
          <strong>Time:</strong> {bookingData.time}
        </p>
        <p>
          <strong>Patient:</strong> {bookingData.patientInfo.firstName}{" "}
          {bookingData.patientInfo.lastName}
        </p>
      </div>

      <div className="space-y-3">
        <Button onClick={handleGoHome} className="w-full">
          Return to Home
        </Button>
        <Button
          variant="outline"
          onClick={handleViewAppointments}
          className="w-full"
        >
          View My Appointments
        </Button>
      </div>
    </div>
  )
}
