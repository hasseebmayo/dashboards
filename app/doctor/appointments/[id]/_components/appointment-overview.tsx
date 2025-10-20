import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AppointmentPaymentStatus, AppointmentStatus } from "@/types"

interface AppointmentOverviewProps {
  appointment: {
    id: string
    status: AppointmentStatus
    paymentStatus: AppointmentPaymentStatus
    date: string
    time: string
    duration: string
    type: string
  }
}

export function AppointmentOverview({ appointment }: AppointmentOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>Appointment Overview</span>
          <div className="flex gap-2">
            <Badge
              variant={
                appointment.status === AppointmentStatus.COMPLETED
                  ? "default"
                  : "secondary"
              }
            >
              {appointment.status}
            </Badge>
            <Badge
              variant={
                appointment.paymentStatus === AppointmentPaymentStatus.PAID
                  ? "default"
                  : "destructive"
              }
            >
              {appointment.paymentStatus}
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-sm font-medium text-muted-foreground">Date</p>
            <p className="text-lg">{appointment.date}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Time</p>
            <p className="text-lg">{appointment.time}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">
              Duration
            </p>
            <p className="text-lg">{appointment.duration}</p>
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">Type</p>
            <p className="text-lg">{appointment.type}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
