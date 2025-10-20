import { Calendar, Clock, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Appointment, Prescription } from "@/types/telehealth"
import { AppointmentStatus } from "@/types/telehealth"

interface PatientStatsProps {
  appointments: Appointment[]
  prescriptions: Prescription[]
}

export function PatientStats({
  appointments,
  prescriptions,
}: PatientStatsProps) {
  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === AppointmentStatus.SCHEDULED &&
      new Date(apt.timeSlot.startTime) > new Date()
  )

  const completedAppointments = appointments.filter(
    (apt) => apt.status === AppointmentStatus.COMPLETED
  )

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Upcoming Appointments
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {upcomingAppointments.length}
          </div>
          <p className="text-xs text-muted-foreground">Next in your schedule</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Visits</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{appointments.length}</div>
          <p className="text-xs text-muted-foreground">All time appointments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Completed Visits
          </CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {completedAppointments.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Successfully completed
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Prescriptions</CardTitle>
          <FileText className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{prescriptions.length}</div>
          <p className="text-xs text-muted-foreground">Total prescribed</p>
        </CardContent>
      </Card>
    </div>
  )
}
