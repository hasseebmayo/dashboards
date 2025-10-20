import {
  Calendar,
  Clock,
  DollarSign,
  FileText,
  Star,
  Users,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface DoctorStatsProps {
  stats: {
    totalAppointments: number
    totalPatients: number
    pendingAppointments: number
    completedAppointments: number
    averageRating: number
    monthlyEarnings: number
  }
}

export function DoctorStats({ stats }: DoctorStatsProps) {
  const statsData = [
    {
      title: "Total Appointments",
      value: stats.totalAppointments.toLocaleString(),
      icon: Calendar,
      color: "text-primary",
    },
    {
      title: "Total Patients",
      value: stats.totalPatients.toLocaleString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      title: "Pending",
      value: stats.pendingAppointments.toLocaleString(),
      icon: Clock,
      color: "text-orange-600",
    },
    {
      title: "Completed",
      value: stats.completedAppointments.toLocaleString(),
      icon: FileText,
      color: "text-green-600",
    },
    {
      title: "Average Rating",
      value: `${stats.averageRating.toFixed(1)} ⭐`,
      icon: Star,
      color: "text-yellow-600",
    },
    {
      title: "Monthly Earnings",
      value: `$${stats.monthlyEarnings.toLocaleString()}`,
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
