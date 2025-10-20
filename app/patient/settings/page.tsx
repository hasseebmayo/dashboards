"use client"

import { LayoutDashboard, Settings } from "lucide-react"
import { useState } from "react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BillingTab,
  MedicalInfoTab,
  NotificationsTab,
  ProfileTab,
  SecurityTab,
} from "./_components"

export default function PatientSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)

  const breadcrumbs = [
    {
      icon: <LayoutDashboard size={22} aria-hidden="true" />,
      href: "/patient",
      label: "Dashboard",
    },
    {
      icon: <Settings size={22} aria-hidden="true" />,
      label: "Settings",
      isActive: true,
    },
  ]

  return (
    <div>
      <DashboardHeader breadcrumbs={breadcrumbs} />
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences.
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="medical">Medical Info</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <ProfileTab />
          </TabsContent>

          <TabsContent value="medical" className="space-y-6">
            <MedicalInfoTab />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationsTab />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <SecurityTab
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <BillingTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
