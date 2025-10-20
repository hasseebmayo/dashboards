import { Eye, Filter, MessageSquare, Search, Users } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockAppointments, mockUsers } from "@/data/mock-data"
import { AppointmentStatus } from "@/types/telehealth"

export const metadata: Metadata = {
  title: "Patients - Doctor Dashboard",
}

function getPatientStats(patientId: string) {
  const currentDoctorId = "doc1" // Mock current doctor
  const patientAppointments = mockAppointments.filter(
    (apt) => apt.patientId === patientId && apt.doctorId === currentDoctorId
  )

  const completedAppointments = patientAppointments.filter(
    (apt) => apt.status === AppointmentStatus.COMPLETED
  ).length

  const lastAppointment = patientAppointments.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  )[0]

  return {
    totalAppointments: patientAppointments.length,
    completedAppointments,
    lastAppointment: lastAppointment?.createdAt,
  }
}

export default function DoctorPatientsPage() {
  const patients = mockUsers.filter((user) => user.role === "patient")
  const currentDoctorId = "doc1"

  // Filter patients who have had appointments with this doctor
  const doctorPatients = patients.filter((patient) =>
    mockAppointments.some(
      (apt) => apt.patientId === patient.id && apt.doctorId === currentDoctorId
    )
  )

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/doctor",
            label: "Dashboard",
          },
          {
            icon: <Users size={22} aria-hidden="true" />,
            href: "/doctor/patients",
            label: "Patients",
            isActive: true,
          },
        ]}
      />

      <DashboardContent>
        <DashboardIntro
          title="My Patients"
          description="Manage your patients and their medical records."
        />

        {/* Patient Summary */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{doctorPatients.length}</div>
              <p className="text-xs text-muted-foreground">Under your care</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {doctorPatients.filter((p) => !p.banned).length}
              </div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                New This Month
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">8</div>
              <p className="text-xs text-muted-foreground">
                +25% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Avg. Consultations
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">2.4</div>
              <p className="text-xs text-muted-foreground">Per patient</p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search patients by name or email..."
                  className="pl-10"
                />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Last Visit" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Patients Table */}
        <Card>
          <CardHeader>
            <CardTitle>My Patients ({doctorPatients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead>Last Visit</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {doctorPatients.map((patient) => {
                  const stats = getPatientStats(patient.id)
                  return (
                    <TableRow key={patient.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-10 w-10">
                            <AvatarImage
                              src={patient.image}
                              alt={patient.name}
                            />
                            <AvatarFallback>
                              {patient.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{patient.name}</div>
                            <div className="text-sm text-muted-foreground">
                              {patient.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        {new Date(patient.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium">
                            {stats.totalAppointments}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {stats.completedAppointments} completed
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        {stats.lastAppointment
                          ? new Date(stats.lastAppointment).toLocaleDateString()
                          : "No visits"}
                      </TableCell>
                      <TableCell>
                        {patient.banned ? (
                          <Badge variant="destructive">Inactive</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/doctor/patients/${patient.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View
                            </a>
                          </Button>
                          <Button variant="outline" size="sm">
                            <MessageSquare className="h-4 w-4 mr-1" />
                            Message
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  )
}
