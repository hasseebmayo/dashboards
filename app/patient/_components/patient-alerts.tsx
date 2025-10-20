import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import type { Appointment } from "@/types/telehealth"
import { AppointmentStatus } from "@/types/telehealth"

interface PatientAlertsProps {
  appointments: Appointment[]
}

export function PatientAlerts({ appointments }: PatientAlertsProps) {
  const upcomingAppointments = appointments.filter(
    (apt) =>
      apt.status === AppointmentStatus.SCHEDULED &&
      new Date(apt.timeSlot.startTime) > new Date()
  )

  const nextAppointment = upcomingAppointments
    .sort(
      (a, b) =>
        new Date(a.timeSlot.startTime).getTime() -
        new Date(b.timeSlot.startTime).getTime()
    )
    .find((apt) => new Date(apt.timeSlot.startTime) > new Date())

  if (!nextAppointment) {
    return null
  }

  const appointmentDate = new Date(nextAppointment.timeSlot.startTime)
  const isToday = appointmentDate.toDateString() === new Date().toDateString()
  const isTomorrow =
    appointmentDate.toDateString() ===
    new Date(Date.now() + 86400000).toDateString()

  let alertText = ""
  if (isToday) {
    alertText = `You have an appointment today at ${appointmentDate.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )} with Dr. ${nextAppointment.doctor.name}.`
  } else if (isTomorrow) {
    alertText = `You have an appointment tomorrow at ${appointmentDate.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )} with Dr. ${nextAppointment.doctor.name}.`
  } else {
    alertText = `Your next appointment is on ${appointmentDate.toLocaleDateString()} at ${appointmentDate.toLocaleTimeString(
      [],
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    )} with Dr. ${nextAppointment.doctor.name}.`
  }

  return (
    <Alert className="border-blue-200 bg-blue-50">
      <AlertCircle className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800">{alertText}</AlertDescription>
    </Alert>
  )
}
