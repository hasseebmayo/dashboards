"use client"

import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface UserQuery {
  id: string
  status: "new" | "open" | "pending" | "resolved" | "closed"
  priority: "low" | "medium" | "high" | "urgent"
}

interface QueryStatsProps {
  queries: UserQuery[]
}

export function QueryStats({ queries }: QueryStatsProps) {
  const newQueries = queries.filter((q) => q.status === "new").length
  const openQueries = queries.filter((q) => q.status === "open").length
  const urgentQueries = queries.filter((q) => q.priority === "urgent").length

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Queries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{queries.length}</div>
          <p className="text-xs text-muted-foreground">All time queries</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">New Queries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{newQueries}</div>
          <p className="text-xs text-muted-foreground">Awaiting response</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Open Queries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{openQueries}</div>
          <p className="text-xs text-muted-foreground">In progress</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Urgent Queries</CardTitle>
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{urgentQueries}</div>
          <p className="text-xs text-muted-foreground">
            Need immediate attention
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
