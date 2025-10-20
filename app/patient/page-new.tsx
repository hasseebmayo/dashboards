import { LayoutDashboard } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import {
  mockAppointments,
  mockPrescriptions,
  mockUsers,
} from "@/data/mock-data"
import { PatientAlerts } from "./_components/patient-alerts"
import { PatientStats } from "./_components/patient-stats"
import { RecentAppointmentsTable } from "./_components/recent-appointments-table"
import { RecentPrescriptions } from "./_components/recent-prescriptions"

export const metadata: Metadata = {
  title: "Patient Dashboard - Telehealth Platform",
}

export default function PatientDashboard() {
  // Mock current patient ID - in real app, this would come from auth
  const currentPatientId = "pat1"

  // Filter data for current patient
  const patientAppointments = mockAppointments.filter(
    (apt) => apt.patientId === currentPatientId
  )

  const patientPrescriptions = mockPrescriptions.filter((prescription) =>
    patientAppointments.some((apt) => apt.id === prescription.appointmentId)
  )

  const currentPatient = mockUsers.find((user) => user.id === currentPatientId)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            icon: <LayoutDashboard size={22} aria-hidden="true" />,
            href: "/patient",
            label: "Dashboard",
            isActive: true,
          },
        ]}
      />

      <DashboardContent>
        <DashboardIntro
          title={`Welcome back, ${currentPatient?.name}!`}
          description="Stay on top of your health with easy access to appointments and medical records."
        />

        <PatientAlerts appointments={patientAppointments} />
        <PatientStats
          appointments={patientAppointments}
          prescriptions={patientPrescriptions}
        />

        <div className="grid gap-4 lg:grid-cols-4">
          <RecentAppointmentsTable appointments={patientAppointments} />
          <RecentPrescriptions prescriptions={patientPrescriptions} />
        </div>
      </DashboardContent>
    </>
  )
}
