import { LayoutDashboard } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"
import UserDropdown from "@/components/user-dropdown"

interface DashboardBreadcrumbItem {
  label?: string
  href?: string
  icon?: React.ReactNode
  isActive?: boolean
}

export type { DashboardBreadcrumbItem }

interface DashboardHeaderProps {
  breadcrumbs?: DashboardBreadcrumbItem[]
  actions?: React.ReactNode
}

export function DashboardHeader({
  breadcrumbs = [
    {
      icon: <LayoutDashboard size={22} aria-hidden="true" />,
      href: "#",
      label: "Dashboard",
    },
  ],
  actions,
}: DashboardHeaderProps) {
  return (
    <header className="flex h-16 shrink-0 items-center gap-2 border-b">
      <div className="flex flex-1 items-center gap-2 px-3">
        <SidebarTrigger className="-ms-4" />
        <Separator
          orientation="vertical"
          className="mr-2 data-[orientation=vertical]:h-4"
        />
        <Breadcrumb>
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <div
                key={`breadcrumb-${breadcrumb.label || index}`}
                className="flex items-center"
              >
                {index > 0 && (
                  <BreadcrumbSeparator className="hidden md:block" />
                )}
                <BreadcrumbItem
                  className={index === 0 ? "hidden md:block" : ""}
                >
                  {breadcrumb.isActive ? (
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={breadcrumb.href || "#"}>
                      {breadcrumb.icon && (
                        <>
                          {breadcrumb.icon}
                          <span className="sr-only">{breadcrumb.label}</span>
                        </>
                      )}
                      {!breadcrumb.icon && breadcrumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </div>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      <div className="flex gap-3 ml-auto">
        {actions}
        <ThemeToggle />
        <UserDropdown />
      </div>
    </header>
  )
}
