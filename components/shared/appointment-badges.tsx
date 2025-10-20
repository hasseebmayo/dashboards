import { Badge } from "@/components/ui/badge"
import { AppointmentPaymentStatus, AppointmentStatus } from "@/types/telehealth"

export function getStatusBadge(status: AppointmentStatus) {
  switch (status) {
    case AppointmentStatus.SCHEDULED:
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Scheduled
        </Badge>
      )
    case AppointmentStatus.COMPLETED:
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Completed
        </Badge>
      )
    case AppointmentStatus.CANCELED:
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Canceled
        </Badge>
      )
    case AppointmentStatus.NO_SHOW:
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          No Show
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export function getPaymentStatusBadge(status: AppointmentPaymentStatus) {
  switch (status) {
    case AppointmentPaymentStatus.PAID:
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Paid
        </Badge>
      )
    case AppointmentPaymentStatus.PENDING:
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      )
    case AppointmentPaymentStatus.FAILED:
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Failed
        </Badge>
      )
    case AppointmentPaymentStatus.REFUNDED:
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          Refunded
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}
