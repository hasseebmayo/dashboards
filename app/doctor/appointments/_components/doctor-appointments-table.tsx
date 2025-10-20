import { Eye } from "lucide-react"
import {
  getPaymentStatusBadge,
  getStatusBadge,
} from "@/components/shared/appointment-badges"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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

interface DoctorAppointmentsTableProps {
  appointments: Appointment[]
}

export function DoctorAppointmentsTable({
  appointments,
}: DoctorAppointmentsTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Appointments ({appointments.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Date & Time</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
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
                      <div className="font-medium">
                        {appointment.patient.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {appointment.patient.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">
                      {new Date(
                        appointment.timeSlot.startTime
                      ).toLocaleDateString()}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {new Date(
                        appointment.timeSlot.startTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(
                        appointment.timeSlot.endTime
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getStatusBadge(appointment.status)}</TableCell>
                <TableCell>
                  {getPaymentStatusBadge(appointment.paymentStatus)}
                </TableCell>
                <TableCell>
                  <div className="text-sm">
                    {Math.round(
                      (new Date(appointment.timeSlot.endTime).getTime() -
                        new Date(appointment.timeSlot.startTime).getTime()) /
                        (1000 * 60)
                    )}{" "}
                    min
                  </div>
                </TableCell>
                <TableCell>
                  <Button variant="outline" size="sm" asChild>
                    <a href={`/doctor/appointments/${appointment.id}`}>
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
