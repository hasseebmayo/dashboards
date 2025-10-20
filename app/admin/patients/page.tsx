import { Eye, Filter, Search, Users } from "lucide-react"
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
import type { User } from "@/types/telehealth"

export const metadata: Metadata = {
  title: "Patients - Admin Dashboard",
}

function getPatientStats(patient: User) {
  const patientAppointments = mockAppointments.filter(
    (apt) => apt.patientId === patient.id
  )
  const completedAppointments = patientAppointments.filter(
    (apt) => apt.status === "COMPLETED"
  ).length

  return {
    totalAppointments: patientAppointments.length,
    completedAppointments,
    lastAppointment:
      patientAppointments[patientAppointments.length - 1]?.createdAt,
  }
}

export default function PatientsPage() {
  const patients = mockUsers.filter((user) => user.role === "patient")

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/admin",
            label: "Admin Dashboard",
          },
          {
            icon: <Users size={22} aria-hidden="true" />,
            href: "/admin/patients",
            label: "Patients",
            isActive: true,
          },
        ]}
      />

      <DashboardContent>
        <DashboardIntro
          title="Patients Management"
          description="Manage all registered patients and monitor their activities."
        />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search patients..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Registration Date" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Time</SelectItem>
                  <SelectItem value="week">This Week</SelectItem>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Patients</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="banned">Banned</SelectItem>
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
            <CardTitle>All Patients ({patients.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Patient</TableHead>
                  <TableHead>Registration Date</TableHead>
                  <TableHead>Appointments</TableHead>
                  <TableHead>Last Appointment</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patients.map((patient) => {
                  const stats = getPatientStats(patient)
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
                          : "No appointments"}
                      </TableCell>
                      <TableCell>
                        {patient.banned ? (
                          <Badge variant="destructive">Banned</Badge>
                        ) : patient.emailVerified ? (
                          <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                            Active
                          </Badge>
                        ) : (
                          <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            Pending Verification
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <a href={`/admin/patients/${patient.id}`}>
                              <Eye className="h-4 w-4 mr-1" />
                              View Details
                            </a>
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
