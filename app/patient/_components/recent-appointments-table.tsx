import { Eye } from "lucide-react"
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
import type { Appointment } from "@/types/telehealth"
import { AppointmentStatus } from "@/types/telehealth"

interface RecentAppointmentsTableProps {
  appointments: Appointment[]
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

export function RecentAppointmentsTable({
  appointments,
}: RecentAppointmentsTableProps) {
  const recentAppointments = appointments
    .sort(
      (a, b) =>
        new Date(b.timeSlot.startTime).getTime() -
        new Date(a.timeSlot.startTime).getTime()
    )
    .slice(0, 5)

  return (
    <Card className="col-span-3">
      <CardHeader>
        <CardTitle>Recent Appointments</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentAppointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
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
                    <div>
                      <div className="text-sm font-medium">
                        {appointment.doctor.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {appointment.doctor.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {new Date(
                      appointment.timeSlot.startTime
                    ).toLocaleDateString()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(
                      appointment.timeSlot.startTime
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/patient/appointments/${appointment.id}`}>
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </a>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
