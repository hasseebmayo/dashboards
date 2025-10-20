import { MessageSquare } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { mockQueries } from "./_components/mock-data"
import { QueriesTable } from "./_components/queries-table"
import { QueryFilters } from "./_components/query-filters"
import { QueryStats } from "./_components/query-stats"

export const metadata: Metadata = {
  title: "User Queries - Admin Dashboard",
}

export default function UserQueriesPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/admin",
            label: "Admin Dashboard",
          },
          {
            icon: <MessageSquare size={22} aria-hidden="true" />,
            href: "/admin/queries",
            label: "User Queries",
            isActive: true,
          },
        ]}
      />

      <DashboardContent>
        <DashboardIntro
          title="User Queries Management"
          description="Manage and respond to user inquiries and support requests."
        />

        <QueryStats queries={mockQueries} />
        <QueryFilters />
        <QueriesTable queries={mockQueries} />
      </DashboardContent>
    </>
  )
}
