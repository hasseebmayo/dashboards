import { Calendar, Plus } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { Button } from "@/components/ui/button"
import { mockAppointments } from "@/data/mock-data"
import { AppointmentFilters } from "./_components/appointment-filters"
import { AppointmentStats } from "./_components/appointment-stats"
import { AppointmentsTable } from "./_components/appointments-table"

export const metadata: Metadata = {
  title: "Appointments - Patient Dashboard",
}

export default function PatientAppointmentsPage() {
  // Mock current patient ID
  const currentPatientId = "pat1"
  const patientAppointments = mockAppointments.filter(
    (apt) => apt.patientId === currentPatientId
  )

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/patient",
            label: "Dashboard",
          },
          {
            icon: <Calendar size={22} aria-hidden="true" />,
            href: "/patient/appointments",
            label: "Appointments",
            isActive: true,
          },
        ]}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Book Appointment
          </Button>
        }
      />

      <DashboardContent>
        <DashboardIntro
          title="My Appointments"
          description="View and manage your medical appointments with healthcare providers."
        />

        <AppointmentStats appointments={patientAppointments} />
        <AppointmentFilters />
        <AppointmentsTable appointments={patientAppointments} />
      </DashboardContent>
    </>
  )
}
