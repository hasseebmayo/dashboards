import { Badge } from "@/components/ui/badge"

interface UserQuery {
  category: "general" | "technical" | "billing" | "medical"
  priority: "low" | "medium" | "high" | "urgent"
  status: "new" | "open" | "pending" | "resolved" | "closed"
}

export function getCategoryBadge(category: UserQuery["category"]) {
  const colors = {
    general: "bg-blue-100 text-blue-800 hover:bg-blue-100",
    technical: "bg-purple-100 text-purple-800 hover:bg-purple-100",
    billing: "bg-orange-100 text-orange-800 hover:bg-orange-100",
    medical: "bg-green-100 text-green-800 hover:bg-green-100",
  }

  return (
    <Badge className={colors[category]}>
      {category.charAt(0).toUpperCase() + category.slice(1)}
    </Badge>
  )
}

export function getPriorityBadge(priority: UserQuery["priority"]) {
  switch (priority) {
    case "urgent":
      return <Badge variant="destructive">Urgent</Badge>
    case "high":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">High</Badge>
      )
    case "medium":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Medium
        </Badge>
      )
    case "low":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Low
        </Badge>
      )
    default:
      return <Badge variant="secondary">{priority}</Badge>
  }
}

export function getStatusBadge(status: UserQuery["status"]) {
  switch (status) {
    case "new":
      return (
        <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-100">
          New
        </Badge>
      )
    case "open":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Open
        </Badge>
      )
    case "pending":
      return (
        <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-100">
          Pending
        </Badge>
      )
    case "resolved":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Resolved
        </Badge>
      )
    case "closed":
      return (
        <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-100">
          Closed
        </Badge>
      )
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}
