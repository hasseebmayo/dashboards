import { Calendar, Clock, FileText, User } from "lucide-react"
import type { Metadata } from "next"
import { DashboardContent, DashboardIntro } from "@/app/_dashboard"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import {
  getPaymentStatusBadge,
  getStatusBadge,
} from "@/components/shared/appointment-badges"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AppointmentPaymentStatus, AppointmentStatus } from "@/types/telehealth"

export const metadata: Metadata = {
  title: "Appointment Details - Patient Dashboard",
}

interface AppointmentDetailsPageProps {
  params: Promise<{ id: string }>
}

export default async function PatientAppointmentDetailsPage({
  params,
}: AppointmentDetailsPageProps) {
  // In a real app, you would fetch the appointment data using params.id
  const appointmentId = (await params).id

  // Mock appointment data
  const appointment = {
    id: appointmentId,
    status: AppointmentStatus.COMPLETED,
    paymentStatus: AppointmentPaymentStatus.PAID,
    timeSlot: {
      startTime: "2024-01-15T10:00:00Z",
      endTime: "2024-01-15T10:30:00Z",
    },
    doctor: {
      id: "doc1",
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@hospital.com",
      image:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
      specialization: "Cardiologist",
      experience: "15 years",
      phone: "+1 (555) 123-4567",
    },
    patient: {
      id: "pat1",
      name: "John Doe",
      email: "john.doe@email.com",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      age: 35,
      phone: "+1 (555) 987-6543",
    },
    prescription: {
      medicines: "Aspirin 75mg, Metformin 500mg",
      notes:
        "Take aspirin once daily after breakfast. Metformin twice daily with meals.",
    },
    medicalHistory: [
      {
        date: "2024-01-15",
        diagnosis: "Hypertension monitoring",
        notes: "Blood pressure stable, continue current medication",
      },
      {
        date: "2023-12-01",
        diagnosis: "Annual checkup",
        notes: "All vitals normal, maintain healthy lifestyle",
      },
    ],
    notes:
      "Patient reported feeling better. Blood pressure has improved significantly.",
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/patient",
            label: "Dashboard",
          },
          {
            href: "/patient/appointments",
            label: "Appointments",
          },
          {
            icon: <Calendar size={22} aria-hidden="true" />,
            href: `/patient/appointments/${appointmentId}`,
            label: "Appointment Details",
            isActive: true,
          },
        ]}
      />

      <DashboardContent>
        <DashboardIntro
          title="Appointment Details"
          description="View your appointment information and medical records."
        />

        {/* Appointment Overview Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Calendar className="h-6 w-6" />
                Appointment with {appointment.doctor.name}
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(appointment.status)}
                {getPaymentStatusBadge(appointment.paymentStatus)}
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-2">Date & Time</h4>
                <p className="text-sm text-muted-foreground">
                  {new Date(
                    appointment.timeSlot.startTime
                  ).toLocaleDateString()}{" "}
                  at{" "}
                  {new Date(appointment.timeSlot.startTime).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}{" "}
                  -{" "}
                  {new Date(appointment.timeSlot.endTime).toLocaleTimeString(
                    [],
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  )}
                </p>
              </div>
              <div>
                <h4 className="font-medium mb-2">Duration</h4>
                <p className="text-sm text-muted-foreground">
                  {Math.round(
                    (new Date(appointment.timeSlot.endTime).getTime() -
                      new Date(appointment.timeSlot.startTime).getTime()) /
                      (1000 * 60)
                  )}{" "}
                  minutes
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="details" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="details">
              <FileText className="h-4 w-4 mr-2" />
              Details
            </TabsTrigger>
            <TabsTrigger value="doctor">
              <User className="h-4 w-4 mr-2" />
              Doctor Info
            </TabsTrigger>
            <TabsTrigger value="history">
              <Clock className="h-4 w-4 mr-2" />
              Medical History
            </TabsTrigger>
            <TabsTrigger value="prescription">
              <FileText className="h-4 w-4 mr-2" />
              Prescription
            </TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium mb-2">Doctor's Notes</h4>
                  <p className="text-sm text-muted-foreground">
                    {appointment.notes}
                  </p>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h4 className="font-medium mb-2">Appointment Type</h4>
                    <p className="text-sm text-muted-foreground">
                      Consultation
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Payment Status</h4>
                    {getPaymentStatusBadge(appointment.paymentStatus)}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="doctor" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Doctor Information</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-start gap-4">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={appointment.doctor.image}
                      alt={appointment.doctor.name}
                    />
                    <AvatarFallback>
                      {appointment.doctor.name
                        .split(" ")
                        .map((n: string) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="font-medium text-lg">
                        {appointment.doctor.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {appointment.doctor.specialization}
                      </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-1">Email</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor.email}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Phone</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor.phone}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-1">Experience</h4>
                        <p className="text-sm text-muted-foreground">
                          {appointment.doctor.experience}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Medical History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {appointment.medicalHistory.map((record) => (
                    <div
                      key={`${record.date}-${record.diagnosis}`}
                      className="border-l-2 border-primary pl-4 pb-4"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">
                          {new Date(record.date).toLocaleDateString()}
                        </Badge>
                        <h4 className="font-medium">{record.diagnosis}</h4>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {record.notes}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="prescription" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Prescription</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Prescribed Medicines</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.prescription.medicines}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">Instructions</h4>
                    <p className="text-sm text-muted-foreground">
                      {appointment.prescription.notes}
                    </p>
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <p className="text-sm text-blue-800">
                      <strong>Important:</strong> Follow the prescription
                      exactly as directed. Contact your doctor if you experience
                      any side effects.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DashboardContent>
    </>
  )
}
