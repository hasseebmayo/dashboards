import {
  Calendar,
  FileText,
  LayoutDashboard,
  Plus,
  TrendingUp,
  Users,
} from "lucide-react"
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
  title: "Doctor Dashboard - Telehealth Platform",
}

function getStatusBadge(status: AppointmentStatus) {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Scheduled
        </Badge>
      )
    case AppointmentStatus.COMPLETED:
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      )
    case AppointmentStatus.CANCELED:
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Canceled
        </Badge>
      )
    case AppointmentStatus.NO_SHOW:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          No Show
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DoctorDashboard() {
  // Mock data for the current doctor (assuming doc1)
  const currentDoctorId = "doc1"
  const doctorAppointments = mockAppointments.filter(
    (apt) => apt.doctorId === currentDoctorId
  )
  const patients = mockUsers.filter((user) => user.role === "patient")

  // Calculate stats
  const todayAppointments = doctorAppointments.filter((apt) => {
    const today = new Date().toDateString()
    return new Date(apt.timeSlot.startTime).toDateString() === today
  }).length

  const completedAppointments = doctorAppointments.filter(
    (apt) => apt.status === AppointmentStatus.COMPLETED
  ).length

  const totalPatients = patients.length // In reality, this would be patients seen by this doctor

  const upcomingAppointments = doctorAppointments.filter(
    (apt) =>
      apt.status === AppointmentStatus.SCHEDULED &&
      new Date(apt.timeSlot.startTime) > new Date()
  )

  const recentAppointments = doctorAppointments.slice(0, 5)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            icon: <LayoutDashboard size={22} aria-hidden="true" />,
            href: "/doctor",
            label: "Doctor Dashboard",
            isActive: true,
          },
        ]}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            New Appointment
          </Button>
        }
      />

      <DashboardContent>
        <DashboardIntro
          title="Welcome back, Dr. Sarah!"
          description="Here's an overview of your practice today."
        />

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Today's Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{todayAppointments}</div>
              <p className="text-xs text-muted-foreground">+2 from yesterday</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Patients
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalPatients}</div>
              <p className="text-xs text-muted-foreground">
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Today
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedAppointments}</div>
              <p className="text-xs text-muted-foreground">
                +8% from yesterday
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                This Month Revenue
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">$12,580</div>
              <p className="text-xs text-muted-foreground">
                +15% from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button className="h-20 flex-col gap-2">
                <Calendar className="h-6 w-6" />
                <span>Schedule Appointment</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <FileText className="h-6 w-6" />
                <span>Write Prescription</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <Users className="h-6 w-6" />
                <span>View Patients</span>
              </Button>
              <Button variant="outline" className="h-20 flex-col gap-2">
                <TrendingUp className="h-6 w-6" />
                <span>View Analytics</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Appointments and Upcoming */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          {/* Recent Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Patient</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentAppointments.map((appointment) => (
                    <TableRow key={appointment.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={appointment.patient.image}
                              alt={appointment.patient.name}
                            />
                            <AvatarFallback>
                              {appointment.patient.name
                                .split(" ")
                                .map((n: string) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium text-sm">
                              {appointment.patient.name}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {appointment.patient.email}
                            </div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-sm">
                        {new Date(
                          appointment.timeSlot.startTime
                        ).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        {getStatusBadge(appointment.status)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Upcoming Appointments */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              {upcomingAppointments.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Patient</TableHead>
                      <TableHead>Time</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {upcomingAppointments.slice(0, 5).map((appointment) => (
                      <TableRow key={appointment.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarImage
                                src={appointment.patient.image}
                                alt={appointment.patient.name}
                              />
                              <AvatarFallback>
                                {appointment.patient.name
                                  .split(" ")
                                  .map((n: string) => n[0])
                                  .join("")}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-sm">
                                {appointment.patient.name}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">
                          {new Date(
                            appointment.timeSlot.startTime
                          ).toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(appointment.status)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Calendar className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No upcoming appointments</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </DashboardContent>
    </>
  )
}
