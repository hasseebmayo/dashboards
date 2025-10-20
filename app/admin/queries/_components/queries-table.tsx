"use client"

import { Archive, MoreHorizontal, Reply, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  getCategoryBadge,
  getPriorityBadge,
  getStatusBadge,
} from "./query-badges"

interface UserQuery {
  id: string
  name: string
  email: string
  subject: string
  message: string
  category: "general" | "technical" | "billing" | "medical"
  priority: "low" | "medium" | "high" | "urgent"
  status: "new" | "open" | "pending" | "resolved" | "closed"
  createdAt: Date
  updatedAt: Date
}

interface QueriesTableProps {
  queries: UserQuery[]
}

export function QueriesTable({ queries }: QueriesTableProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>All Queries ({queries.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Subject</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Priority</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {queries.map((query) => (
              <TableRow key={query.id}>
                <TableCell>
                  <div>
                    <div className="font-medium">{query.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {query.email}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px]">
                    <div className="font-medium truncate">{query.subject}</div>
                    <div className="text-sm text-muted-foreground truncate">
                      {query.message}
                    </div>
                  </div>
                </TableCell>
                <TableCell>{getCategoryBadge(query.category)}</TableCell>
                <TableCell>{getPriorityBadge(query.priority)}</TableCell>
                <TableCell>{getStatusBadge(query.status)}</TableCell>
                <TableCell>
                  {new Date(query.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {new Date(query.updatedAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>
                        <Reply className="mr-2 h-4 w-4" />
                        Reply
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Archive className="mr-2 h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
