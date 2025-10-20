import { LayoutDashboard, Plus } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { Button } from "@/components/ui/button"
import {
  mockDashboardStats,
  mockDoctorsWithStatus,
  mockUsers,
} from "@/data/mock-data"
import { AdminStats } from "./_components/admin-stats"
import { DoctorsTable } from "./_components/doctors-table"
import { PatientsTable } from "./_components/patients-table"

export const metadata: Metadata = {
  title: "Admin Dashboard - Telehealth Platform",
}

export default function AdminDashboard() {
  // Filter patients from users
  const patients = mockUsers.filter((user) => user.role === "patient")

  // Get recent doctors (last 5)
  const recentDoctors = mockDoctorsWithStatus.slice(0, 5)

  // Get recent patients (last 5)
  const recentPatients = patients.slice(0, 5)

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            icon: <LayoutDashboard size={22} aria-hidden="true" />,
            href: "/admin",
            label: "Admin Dashboard",
            isActive: true,
          },
        ]}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Service
          </Button>
        }
      />

      <DashboardContent>
        <DashboardIntro
          title="Admin Dashboard"
          description="Welcome back! Here's what's happening with your telehealth platform."
        />

        {/* Stats */}
        <AdminStats stats={mockDashboardStats} />

        {/* Tables */}
        <div className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <DoctorsTable doctors={recentDoctors} />
          <PatientsTable patients={recentPatients} />
        </div>
      </DashboardContent>
    </>
  )
}
