import {
  Activity,
  Calendar,
  Clock,
  DollarSign,
  UserCheck,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { DashboardStats } from "@/types/telehealth"

interface AdminStatsProps {
  stats: DashboardStats
}

export function AdminStats({ stats }: AdminStatsProps) {
  const statsData = [
    {
      title: "Total Doctors",
      value: stats.totalDoctors.toLocaleString(),
      icon: UserCheck,
      color: "text-primary",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Total Services",
      value: stats.totalServices.toLocaleString(),
      icon: Activity,
      color: "text-green-600",
    },
    {
      title: "Total Appointments",
      value: stats.totalAppointments.toLocaleString(),
      icon: Calendar,
      color: "text-purple-600",
    },
    {
      title: "Pending Approvals",
      value: stats.pendingApprovals.toLocaleString(),
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Total Revenue",
      value: `$${stats.totalRevenue.toLocaleString()}`,
      icon: DollarSign,
      color: "text-emerald-600",
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
      {statsData.map((stat) => {
        const Icon = stat.icon
        return (
          <Card key={stat.title} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.title}
              </CardTitle>
              <Icon className={`h-4 w-4 ${stat.color}`} />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
