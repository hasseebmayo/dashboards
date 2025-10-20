import { Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Appointment } from "@/types/telehealth"
import { AppointmentStatus } from "@/types/telehealth"

interface DoctorAppointmentStatsProps {
  appointments: Appointment[]
}

export function DoctorAppointmentStats({
  appointments,
}: DoctorAppointmentStatsProps) {
  const todayAppointments = appointments.filter((apt) => {
    const today = new Date()
    const appointmentDate = new Date(apt.timeSlot.startTime)
    return appointmentDate.toDateString() === today.toDateString()
  })

  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === AppointmentStatus.SCHEDULED &&
      new Date(apt.timeSlot.startTime) > new Date()
  )

  const completedToday = todayAppointments.filter(
    (apt) => apt.status === AppointmentStatus.COMPLETED
  )

  const totalPatients = new Set(appointments.map((apt) => apt.patientId)).size

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Today's Appointments
          </CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{todayAppointments.length}</div>
          <p className="text-xs text-muted-foreground">Scheduled for today</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Upcoming</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {upcomingAppointments.length}
          </div>
          <p className="text-xs text-muted-foreground">Future appointments</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Completed Today</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{completedToday.length}</div>
          <p className="text-xs text-muted-foreground">Finished sessions</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Patients</CardTitle>
          <Calendar className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{totalPatients}</div>
          <p className="text-xs text-muted-foreground">Unique patients</p>
        </CardContent>
      </Card>
    </div>
  )
}
