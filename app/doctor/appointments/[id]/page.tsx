import {
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Pill,
  User,
} from "lucide-react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentPaymentStatus, AppointmentStatus } from "@/types"
import { AppointmentDetails } from "./_components/appointment-details"
import { AppointmentOverview } from "./_components/appointment-overview"
import { ChatTab } from "./_components/chat-tab"
import { MedicalHistory } from "./_components/medical-history"
import { PatientInfo } from "./_components/patient-info"
import { Prescription } from "./_components/prescription"

const mockAppointment = {
  id: "1",
  patient: {
    id: "1",
    name: "Sarah Johnson",
    avatar: "",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 0123",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1985-06-15",
    gender: "Female",
    insurance: "Blue Cross Blue Shield",
    emergencyContact: {
      name: "John Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 0124",
    },
  },
  status: AppointmentStatus.COMPLETED,
  paymentStatus: AppointmentPaymentStatus.PAID,
  date: "2024-01-15",
  time: "10:00 AM",
  duration: "30 minutes",
  type: "Consultation",
  chiefComplaint: "Regular checkup and health maintenance",
  symptoms: ["General fatigue", "Occasional headaches"],
  diagnosis: "Overall good health, mild stress-related symptoms",
  prescription: [
    {
      medication: "Multivitamin",
      dosage: "1 tablet daily",
      frequency: "Once daily",
      duration: "30 days",
      instructions: "Take with breakfast",
    },
    {
      medication: "Ibuprofen",
      dosage: "200mg",
      frequency: "As needed",
      duration: "For headaches",
      instructions: "Take with food, max 3 times daily",
    },
  ],
  vitals: {
    bloodPressure: "120/80 mmHg",
    heartRate: "72 bpm",
    temperature: "98.6°F",
    weight: "145 lbs",
    height: "5'6\"",
  },
  medicalHistory: [
    {
      date: "2023-12-15",
      condition: "Annual Physical",
      treatment: "Routine examination, blood work ordered",
    },
    {
      date: "2023-08-20",
      condition: "Minor Cold",
      treatment: "Rest and fluids recommended",
    },
  ],
  notes:
    "Patient is in good health overall. Discussed stress management techniques and recommended regular exercise. Follow-up in 6 months for annual physical.",
}

export default function DoctorAppointmentDetail() {
  const appointment = mockAppointment

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/doctor",
            label: "Dashboard",
          },
          {
            href: "/doctor/appointments",
            label: "Appointments",
          },
          {
            icon: <Calendar size={22} aria-hidden="true" />,
            href: `/doctor/appointments/${appointment.id}`,
            label: "Appointment Details",
            isActive: true,
          },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="mb-6">
          <h1 className="text-3xl font-bold mb-2">Appointment Details</h1>
          <p className="text-muted-foreground">
            View and manage patient appointment information
          </p>
        </div>

        <div className="grid gap-6">
          <AppointmentOverview appointment={appointment} />

          <Tabs defaultValue="details" className="w-full">
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="details" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Details
              </TabsTrigger>
              <TabsTrigger value="patient" className="flex items-center gap-2">
                <User className="h-4 w-4" />
                Patient Info
              </TabsTrigger>
              <TabsTrigger value="history" className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                Medical History
              </TabsTrigger>
              <TabsTrigger
                value="prescription"
                className="flex items-center gap-2"
              >
                <Pill className="h-4 w-4" />
                Prescription
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                Chat
              </TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-4">
              <AppointmentDetails appointment={appointment} />
            </TabsContent>

            <TabsContent value="patient" className="space-y-4">
              <PatientInfo patient={appointment.patient} />
            </TabsContent>

            <TabsContent value="history" className="space-y-4">
              <MedicalHistory medicalHistory={appointment.medicalHistory} />
            </TabsContent>

            <TabsContent value="prescription" className="space-y-4">
              <Prescription prescription={appointment.prescription} />
            </TabsContent>

            <TabsContent value="chat" className="space-y-4">
              <ChatTab />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </>
  )
}
