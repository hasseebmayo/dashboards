"use client"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DoctorAvailabilityTab } from "./_components/doctor-availability-tab"
import { DoctorBillingTab } from "./_components/doctor-billing-tab"
import { DoctorNotificationsTab } from "./_components/doctor-notifications-tab"
import { DoctorProfileTab } from "./_components/doctor-profile-tab"
import { DoctorSecurityTab } from "./_components/doctor-security-tab"

export default function DoctorSettingsPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/doctor" },
          { label: "Settings", href: "/doctor/settings", isActive: true },
        ]}
      />
      <div className="container mx-auto py-6 px-4">
        <div className="mb-6">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="security">Security</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="availability">Availability</TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="space-y-6">
            <DoctorProfileTab />
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <DoctorNotificationsTab />
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <DoctorSecurityTab />
          </TabsContent>

          <TabsContent value="billing" className="space-y-6">
            <DoctorBillingTab />
          </TabsContent>

          <TabsContent value="availability" className="space-y-6">
            <DoctorAvailabilityTab />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
