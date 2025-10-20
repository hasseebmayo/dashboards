/** biome-ignore-all lint/a11y/noLabelWithoutControl: <explanation>= */
"use client"

import {
  ArrowLeft,
  Calendar,
  Mail,
  MapPin,
  Phone,
  Stethoscope,
  User,
  Verified,
} from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
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
const mockDoctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  email: "sarah.johnson@teleneo.com",
  phone: "+1 (555) 123-4567",
  specialization: "Cardiology",
  licenseNumber: "MD123456",
  yearsOfExperience: 12,
  isVerified: true,
  status: "active",
  education: "MD from Harvard Medical School, Residency at Johns Hopkins",
  hospitalAffiliation: "City General Hospital",
  consultationFee: 150,
  joinedDate: "2023-01-15",
  avatar: "/avatars/doctor-1.jpg",
  bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 12 years of experience in cardiovascular medicine. She specializes in preventive cardiology and heart disease management.",
  location: "New York, NY",
  languages: ["English", "Spanish"],
  stats: {
    totalPatients: 342,
    totalAppointments: 1248,
    rating: 4.8,
    totalEarnings: 45670,
  },
  recentAppointments: [
    {
      id: "1",
      patient: "John Doe",
      date: "2025-09-12",
      time: "10:00 AM",
      status: "completed",
    },
    {
      id: "2",
      patient: "Jane Smith",
      date: "2025-09-12",
      time: "2:00 PM",
      status: "scheduled",
    },
    {
      id: "3",
      patient: "Mike Wilson",
      date: "2025-09-11",
      time: "11:30 AM",
      status: "completed",
    },
  ],
}

export default function AdminDoctorDetailPage() {
  // In real app, fetch doctor data based on ID
  if (!mockDoctor) {
    notFound()
  }

  const breadcrumbs = [
    {
      icon: <User size={22} aria-hidden="true" />,
      href: "/admin",
      label: "Admin",
    },
    {
      href: "/admin/doctors",
      label: "Doctors",
    },
    {
      label: mockDoctor.name,
      isActive: true,
    },
  ]

  return (
    <div>
      <DashboardHeader breadcrumbs={breadcrumbs} />

      <div className="p-6 space-y-6">
        {/* Back Button */}
        <div className="flex items-center gap-4">
          <Link href="/admin/doctors">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Doctors
            </Button>
          </Link>
        </div>

        {/* Doctor Header */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-6">
              <Avatar className="w-24 h-24">
                <AvatarImage src={mockDoctor.avatar} />
                <AvatarFallback>
                  {mockDoctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-2xl font-bold">{mockDoctor.name}</h1>
                    {mockDoctor.isVerified && (
                      <Badge variant="secondary" className="gap-1">
                        <Verified className="w-3 h-3" />
                        Verified
                      </Badge>
                    )}
                    <Badge
                      variant={
                        mockDoctor.status === "active" ? "default" : "secondary"
                      }
                    >
                      {mockDoctor.status}
                    </Badge>
                  </div>
                  <p className="text-lg text-muted-foreground">
                    {mockDoctor.specialization}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {mockDoctor.education}
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Mail className="w-4 h-4 text-muted-foreground" />
                    {mockDoctor.email}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    {mockDoctor.phone}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="w-4 h-4 text-muted-foreground" />
                    {mockDoctor.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    Joined{" "}
                    {new Date(mockDoctor.joinedDate).toLocaleDateString()}
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button variant="outline" size="sm">
                  Edit Profile
                </Button>
                <Button variant="outline" size="sm">
                  Suspend Account
                </Button>
                <Button variant="outline" size="sm">
                  View Public Profile
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
                Total Patients
              </CardTitle>
              <User className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDoctor.stats.totalPatients}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDoctor.stats.totalAppointments}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Rating</CardTitle>
              <Stethoscope className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {mockDoctor.stats.rating}/5
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Earnings
              </CardTitle>
              <span className="h-4 w-4 text-muted-foreground">$</span>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                ${mockDoctor.stats.totalEarnings.toLocaleString()}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Professional Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">
                      License Number
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {mockDoctor.licenseNumber}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Years of Experience
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {mockDoctor.yearsOfExperience} years
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Hospital Affiliation
                    </label>
                    <p className="text-sm text-muted-foreground">
                      {mockDoctor.hospitalAffiliation}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">
                      Consultation Fee
                    </label>
                    <p className="text-sm text-muted-foreground">
                      ${mockDoctor.consultationFee}
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Languages</label>
                    <div className="flex gap-1 mt-1">
                      {mockDoctor.languages.map((lang) => (
                        <Badge key={lang} variant="outline">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Bio</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    {mockDoctor.bio}
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Appointments</CardTitle>
                <CardDescription>
                  Latest appointments for this doctor
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDoctor.recentAppointments.map((appointment, index) => (
                    <div key={appointment.id}>
                      {index > 0 && <Separator />}
                      <div className="flex items-center justify-between py-2">
                        <div>
                          <p className="font-medium">{appointment.patient}</p>
                          <p className="text-sm text-muted-foreground">
                            {appointment.date} at {appointment.time}
                          </p>
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

          <TabsContent value="reviews" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Patient Reviews</CardTitle>
                <CardDescription>
                  Reviews and ratings from patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No reviews available yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Uploaded Documents</CardTitle>
                <CardDescription>
                  Medical licenses, certifications, and other documents
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  No documents uploaded yet.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
