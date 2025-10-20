import { Bell, Settings, Shield } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotificationSettings } from "./_components/notification-settings"
import { RolesPermissions } from "./_components/roles-permissions"
import { SystemSettings } from "./_components/system-settings"

export const metadata: Metadata = {
  title: "Settings - Admin Dashboard",
}

export default function SettingsPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/admin",
            label: "Admin Dashboard",
          },
          {
            icon: <Settings size={22} aria-hidden="true" />,
            href: "/admin/settings",
            label: "Settings",
            isActive: true,
          },
        ]}
      />

      <DashboardContent>
        <DashboardIntro
          title="System Settings"
          description="Configure system preferences, notifications, and user roles."
        />

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="roles" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Roles & Permissions
            </TabsTrigger>
            <TabsTrigger value="system" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              System Settings
            </TabsTrigger>
          </TabsList>

          <TabsContent value="notifications" className="space-y-6">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="roles" className="space-y-6">
            <RolesPermissions />
          </TabsContent>

          <TabsContent value="system" className="space-y-6">
            <SystemSettings />
          </TabsContent>
        </Tabs>
      </DashboardContent>
    </>
  )
}
