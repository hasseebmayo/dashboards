"use client"

import {
  ArrowLeft,
  Calendar,
  Heart,
  Mail,
  MapPin,
  Phone,
  User,
} from "lucide-react"
import Link from "next/link"
import { notFound, useParams } from "next/navigation"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock data - replace with actual API call
const mockPatient = {
  id: "1",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "+1 (555) 987-6543",
  dateOfBirth: "1985-03-15",
  gender: "male",
  status: "active",
  joinedDate: "2024-02-20",
  avatar: "/avatars/patient-1.jpg",
  emergencyContact: {
    name: "Jane Doe",
    phone: "+1 (555) 987-6544",
    relationship: "Spouse",
  },
  address: "123 Main St, New York, NY 10001",
  insuranceProvider: "Blue Cross Blue Shield",
  insuranceNumber: "BC123456789",
  stats: {
    totalAppointments: 12,
    completedAppointments: 10,
    upcomingAppointments: 2,
    totalSpent: 850,
  },
  medicalHistory: {
    allergies: ["Penicillin", "Shellfish"],
    medications: ["Lisinopril 10mg daily", "Metformin 500mg twice daily"],
    conditions: ["Hypertension", "Type 2 Diabetes"],
    surgicalHistory: ["Appendectomy (2010)"],
  },
  recentAppointments: [
    {
      id: "1",
      doctor: "Dr. Sarah Johnson",
      date: "2025-09-10",
      time: "2:00 PM",
      status: "completed",
      type: "Follow-up",
      diagnosis: "Routine check-up",
    },
    {
      id: "2",
      doctor: "Dr. Michael Chen",
      date: "2025-09-15",
      time: "10:30 AM",
      status: "scheduled",
      type: "Consultation",
      diagnosis: "-",
    },
  ],
}

export default function AdminPatientDetailPage() {
  const params = useParams()
  const patientId = params.id as string

  // In real app, fetch patient data based on ID
  if (!mockPatient) {
    notFound()
  }

  const breadcrumbs = [
    {
      icon: <User size={22} aria-hidden="true" />,
      href: "/admin",
      label: "Admin",
    },
    {
      href: "/admin/patients",
      label: "Patients",
    },
    {
      label: mockPatient.name,
      isActive: true,
    },
  ]

  const age =
    new Date().getFullYear() - new Date(mockPatient.dateOfBirth).getFullYear()

  return (
    <div>
      <DashboardHeader breadcrumbs={breadcrumbs} />

      <div className="p-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/admin/patients">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Patients
            </Button>
          </Link>
        </div>

        {/* Patient Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={mockPatient.avatar} />
                <AvatarFallback>
                  {mockPatient.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{mockPatient.name}</h1>
                    <Badge
                      variant={
                        mockPatient.status === "active"
                          ? "default"
                          : "secondary"
                      }
                    >
                      {mockPatient.status}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {age} years old • {mockPatient.gender}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Patient since{" "}
                    {new Date(mockPatient.joinedDate).toLocaleDateString()}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {mockPatient.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {mockPatient.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {mockPatient.address}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  Send Message
                </Button>
                <Button variant="outline" size="sm">
                  View Medical Records
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPatient.stats.totalAppointments}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <Heart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPatient.stats.completedAppointments}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockPatient.stats.upcomingAppointments}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Spent</CardTitle>
              <span className="h-4 w-4 text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockPatient.stats.totalSpent}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="medical">Medical History</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="insurance">Insurance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Personal Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Date of Birth</div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(mockPatient.dateOfBirth).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Gender</div>
                    <p className="text-sm text-muted-foreground capitalize">
                      {mockPatient.gender}
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Address</div>
                    <p className="text-sm text-muted-foreground">
                      {mockPatient.address}
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Emergency Contact</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <div className="text-sm font-medium">Name</div>
                    <p className="text-sm text-muted-foreground">
                      {mockPatient.emergencyContact.name}
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Phone</div>
                    <p className="text-sm text-muted-foreground">
                      {mockPatient.emergencyContact.phone}
                    </p>
                  </div>
                  <div>
                    <div className="text-sm font-medium">Relationship</div>
                    <p className="text-sm text-muted-foreground">
                      {mockPatient.emergencyContact.relationship}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Allergies</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockPatient.medicalHistory.allergies.map((allergy) => (
                      <Badge key={allergy} variant="destructive">
                        {allergy}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Medical Conditions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {mockPatient.medicalHistory.conditions.map((condition) => (
                      <Badge key={condition} variant="secondary">
                        {condition}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Current Medications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockPatient.medicalHistory.medications.map(
                      (medication, index) => (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          • {medication}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Surgical History</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {mockPatient.medicalHistory.surgicalHistory.map(
                      (surgery, index) => (
                        <li
                          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation
                          key={index}
                          className="text-sm text-muted-foreground"
                        >
                          • {surgery}
                        </li>
                      )
                    )}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>Patient's appointment history</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockPatient.recentAppointments.map((appointment, index) => (
                    <div key={appointment.id}>
                      {index > 0 && <Separator />}
                      <div className="flex items-center justify-between py-4">
                        <div className="space-y-1">
                          <p className="font-medium">{appointment.doctor}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            Type: {appointment.type}
                          </p>
                          {appointment.diagnosis !== "-" && (
                            <p className="text-sm text-muted-foreground">
                              Diagnosis: {appointment.diagnosis}
                            </p>
                          )}
                        </div>
                        <Badge
                          variant={
                            appointment.status === "completed"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="insurance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Insurance Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="text-sm font-medium">Insurance Provider</div>
                  <p className="text-sm text-muted-foreground">
                    {mockPatient.insuranceProvider}
                  </p>
                </div>
                <div>
                  <div className="text-sm font-medium">Insurance Number</div>
                  <p className="text-sm text-muted-foreground">
                    {mockPatient.insuranceNumber}
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
