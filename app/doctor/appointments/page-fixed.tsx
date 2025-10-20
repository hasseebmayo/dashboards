import { Calendar, Plus } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { Button } from "@/components/ui/button"
import { mockAppointments } from "@/data/mock-data"
import { DoctorAppointmentFilters } from "./_components/doctor-appointment-filters"
import { DoctorAppointmentStats } from "./_components/doctor-appointment-stats"
import { DoctorAppointmentsTable } from "./_components/doctor-appointments-table"

export const metadata: Metadata = {
  title: "Appointments - Doctor Dashboard",
}

export default function DoctorAppointmentsPage() {
  // Mock current doctor ID
  const currentDoctorId = "doc1"
  const doctorAppointments = mockAppointments.filter(
    (apt) => apt.doctorId === currentDoctorId
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
            icon: <Calendar size={22} aria-hidden="true" />,
            href: "/doctor/appointments",
            label: "Appointments",
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
          title="Appointments Management"
          description="Manage your patient appointments and schedules."
        />

        <DoctorAppointmentStats appointments={doctorAppointments} />
        <DoctorAppointmentFilters />
        <DoctorAppointmentsTable appointments={doctorAppointments} />
      </DashboardContent>
    </>
  )
}
