import { Bell, Mail, Phone } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function DoctorNotificationsTab() {
  const notificationPreferences = [
    {
      title: "New Appointments",
      description: "Get notified when patients book new appointments",
      enabled: true,
    },
    {
      title: "Appointment Reminders",
      description: "Receive reminders before your appointments",
      enabled: true,
    },
    {
      title: "Patient Messages",
      description: "Notifications for new patient messages",
      enabled: true,
    },
    {
      title: "Payment Notifications",
      description: "Get notified about payment status updates",
      enabled: false,
    },
    {
      title: "Review Alerts",
      description: "Notifications when patients leave reviews",
      enabled: true,
    },
    {
      title: "System Updates",
      description: "Important system updates and maintenance notices",
      enabled: true,
    },
  ]

  const notificationMethods = [
    { method: "Email", icon: Mail, enabled: true },
    { method: "SMS", icon: Phone, enabled: false },
    { method: "Push Notifications", icon: Bell, enabled: true },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>Choose how you want to be notified</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {notificationPreferences.map((notification) => (
            <div
              key={notification.title}
              className="flex items-center justify-between"
            >
              <div className="space-y-1">
                <h4 className="font-medium">{notification.title}</h4>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
              <Switch defaultChecked={notification.enabled} />
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Methods</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {notificationMethods.map((method) => {
            const IconComponent = method.icon
            return (
              <div
                key={method.method}
                className="flex items-center justify-between"
              >
                <div className="flex items-center space-x-3">
                  <IconComponent className="h-5 w-5 text-muted-foreground" />
                  <span className="font-medium">{method.method}</span>
                </div>
                <Switch defaultChecked={method.enabled} />
              </div>
            )
          })}
        </CardContent>
      </Card>
    </div>
  )
}
