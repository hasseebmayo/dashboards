import { Bell, Mail, Phone } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"

export function NotificationsTab() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Notification Preferences</CardTitle>
          <CardDescription>
            Choose what notifications you want to receive
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {[
            {
              title: "Appointment Reminders",
              description:
                "Get reminded about upcoming appointments 24 hours before",
              enabled: true,
            },
            {
              title: "Prescription Refills",
              description: "Notifications when prescriptions need refilling",
              enabled: true,
            },
            {
              title: "Doctor Messages",
              description: "Notifications for new messages from doctors",
              enabled: true,
            },
            {
              title: "Lab Results",
              description: "Get notified when lab results are available",
              enabled: true,
            },
            {
              title: "Payment Reminders",
              description: "Reminders about pending payments",
              enabled: false,
            },
            {
              title: "Health Tips",
              description: "Receive personalized health tips and articles",
              enabled: false,
            },
          ].map((notification) => (
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
          {[
            { method: "Email", icon: Mail, enabled: true },
            { method: "SMS", icon: Phone, enabled: true },
            { method: "Push Notifications", icon: Bell, enabled: false },
          ].map((method) => {
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
