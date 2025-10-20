"use client"

import {
  CreditCard,
  LayoutDashboard,
  MessageSquare,
  Settings,
  TrendingUp,
  UserCheck,
  Users,
} from "lucide-react"
import type * as React from "react"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { useCurrentPath } from "@/hooks/use-pathname"

// Admin sidebar data
const adminData = {
  teams: [
    {
      name: "TeleHealth Admin",
      logo: "https://raw.githubusercontent.com/origin-space/origin-images/refs/heads/main/exp1/logo-01_kp2j8x.png",
    },
  ],
  navMain: [
    {
      title: "Overview",
      url: "#",
      items: [
        {
          title: "Dashboard",
          url: "/admin",
          icon: LayoutDashboard,
        },
        {
          title: "Analytics",
          url: "/admin/analytics",
          icon: TrendingUp,
        },
      ],
    },
    {
      title: "Management",
      url: "#",
      items: [
        {
          title: "Doctors",
          url: "/admin/doctors",
          icon: UserCheck,
        },
        {
          title: "Patients",
          url: "/admin/patients",
          icon: Users,
        },
        {
          title: "Payments",
          url: "/admin/payments",
          icon: CreditCard,
        },
        {
          title: "User Queries",
          url: "/admin/queries",
          icon: MessageSquare,
        },
      ],
    },
    {
      title: "System",
      url: "#",
      items: [
        {
          title: "Settings",
          url: "/admin/settings",
          icon: Settings,
        },
      ],
    },
  ],
}

interface AdminSidebarProps extends React.ComponentProps<typeof Sidebar> {}

export function AdminSidebar(props: AdminSidebarProps) {
  const { isActive } = useCurrentPath()

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={adminData.teams} />
        <hr className="border-t border-border mx-2 -mt-px" />
      </SidebarHeader>
      <SidebarContent>
        {adminData.navMain.map((section) => (
          <SidebarGroup key={section.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/60">
              {section.title}
            </SidebarGroupLabel>
            <SidebarGroupContent className="px-2">
              <SidebarMenu>
                {section.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button font-medium gap-3 h-9 rounded-md hover:bg-primary/10 data-[active=true]:bg-primary data-[active=true]:text-primary-foreground [&>svg]:size-auto"
                      isActive={isActive(item.url)}
                    >
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/60 group-data-[active=true]/menu-button:text-primary-foreground"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        <hr className="border-t border-border mx-2 -mt-px" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton className="font-medium gap-3 h-9 rounded-md hover:bg-primary/10 [&>svg]:size-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width={22}
                height={22}
                fill="currentColor"
                className="text-muted-foreground/60"
                viewBox="0 0 24 24"
              >
                <title>Sign Out</title>
                <path d="M17 7l-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.59L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z" />
              </svg>
              <span>Sign Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
