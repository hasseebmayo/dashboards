"use client"

import { Settings } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

const appSettings = [
  {
    id: "maintenance-mode",
    label: "Maintenance Mode",
    description: "Put the system in maintenance mode",
    defaultChecked: false,
  },
  {
    id: "new-registrations",
    label: "Allow New Registrations",
    description: "Allow new users to register",
    defaultChecked: true,
  },
  {
    id: "auto-approval",
    label: "Auto-approve Doctors",
    description: "Automatically approve doctor applications",
    defaultChecked: false,
  },
]

const securitySettings = [
  {
    id: "two-factor",
    label: "Require 2FA for Admins",
    description: "Force two-factor authentication for admin users",
    defaultChecked: true,
  },
  {
    id: "session-timeout",
    label: "Auto Session Timeout",
    description: "Automatically log out inactive users",
    defaultChecked: true,
  },
  {
    id: "audit-logs",
    label: "Enable Audit Logs",
    description: "Log all administrative actions",
    defaultChecked: true,
  },
]

export function SystemSettings() {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            Application Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {appSettings.map((setting) => (
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
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Security Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {securitySettings.map((setting) => (
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
        </CardContent>
      </Card>
    </div>
  )
}
