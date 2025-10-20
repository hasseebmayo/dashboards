import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Analytics Dashboard - Crafted.is",
}

import { LayoutDashboard } from "lucide-react"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
  DashboardLayout,
  DashboardStatsGrid,
} from "@/app/_dashboard"
import { Button } from "@/components/ui/button"

export default function AnalyticsDashboard() {
  return (
    <DashboardLayout>
      <DashboardHeader
        breadcrumbs={[
          {
            icon: <LayoutDashboard size={22} aria-hidden="true" />,
            href: "#",
            label: "Dashboard",
          },
          {
            label: "Analytics",
            isActive: true,
          },
        ]}
        actions={
          <Button variant="outline" size="sm">
            Export Data
          </Button>
        }
      />
      <DashboardContent>
        <DashboardIntro
          title="Analytics Overview"
          description="Track your performance metrics and gain insights into your business data."
          action={<Button className="px-3">Generate Report</Button>}
        />

        <DashboardStatsGrid
          stats={[
            {
              title: "Page Views",
              value: "1,234,567",
              change: {
                value: "+23%",
                trend: "up",
              },
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                >
                  <title>Page Views</title>
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" />
                </svg>
              ),
            },
            {
              title: "Sessions",
              value: "89,432",
              change: {
                value: "+18%",
                trend: "up",
              },
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                >
                  <title>Sessions</title>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              ),
            },
            {
              title: "Conversion Rate",
              value: "3.24%",
              change: {
                value: "+0.8%",
                trend: "up",
              },
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                >
                  <title>Conversion Rate</title>
                  <path d="M16 6l2.29 2.29-4.88 4.88-4-4L2 16.59 3.41 18l6-6 4 4 6.3-6.29L22 12V6z" />
                </svg>
              ),
            },
            {
              title: "Bounce Rate",
              value: "32.1%",
              change: {
                value: "-5.2%",
                trend: "up", // Lower bounce rate is good, so trend is up
              },
              icon: (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={20}
                  height={20}
                  fill="currentColor"
                >
                  <title>Bounce Rate</title>
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              ),
            },
          ]}
        />

        <div className="min-h-[50vh] flex-1 md:min-h-min">
          <div className="rounded-lg border bg-card p-6">
            <h3 className="text-lg font-semibold mb-4">Analytics Charts</h3>
            <p className="text-muted-foreground">
              Your analytics charts and detailed data would go here.
            </p>
          </div>
        </div>
      </DashboardContent>
    </DashboardLayout>
  )
}
