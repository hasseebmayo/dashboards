"use client"

import { Bell } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const notificationSettings = [
  {
    id: "doctor-signup",
    label: "Doctor Signup Notifications",
    description: "Get notified when new doctors sign up for approval",
    defaultChecked: true,
  },
  {
    id: "payment-alerts",
    label: "Payment Alerts",
    description: "Get notified about failed payments and refund requests",
    defaultChecked: true,
  },
  {
    id: "user-queries",
    label: "User Query Notifications",
    description: "Get notified about new user support queries",
    defaultChecked: true,
  },
  {
    id: "system-alerts",
    label: "System Alerts",
    description: "Get notified about system errors and maintenance updates",
    defaultChecked: false,
  },
  {
    id: "daily-reports",
    label: "Daily Reports",
    description: "Receive daily summary reports via email",
    defaultChecked: false,
  },
  {
    id: "appointment-alerts",
    label: "Appointment Alerts",
    description: "Get notified about appointment cancellations and no-shows",
    defaultChecked: true,
  },
]

export function NotificationSettings() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {notificationSettings.map((setting) => (
            <div key={setting.id} className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor={setting.id}>{setting.label}</Label>
                <p className="text-sm text-muted-foreground">
                  {setting.description}
                </p>
              </div>
              <Switch id={setting.id} defaultChecked={setting.defaultChecked} />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
