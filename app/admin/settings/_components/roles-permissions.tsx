"use client"

import { Edit, Plus, Shield, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  createdAt: Date
}

const mockRoles: Role[] = [
  {
    id: "1",
    name: "Admin",
    description: "Full system access and management capabilities",
    permissions: [
      "manage_users",
      "manage_doctors",
      "manage_payments",
      "system_settings",
    ],
    userCount: 2,
    createdAt: new Date("2024-01-01"),
  },
  {
    id: "2",
    name: "Manager",
    description: "Can manage doctors and view analytics",
    permissions: ["manage_doctors", "view_analytics", "manage_appointments"],
    userCount: 5,
    createdAt: new Date("2024-01-15"),
  },
  {
    id: "3",
    name: "Support Staff",
    description: "Can handle user queries and basic support tasks",
    permissions: ["manage_queries", "view_users", "basic_support"],
    userCount: 8,
    createdAt: new Date("2024-02-01"),
  },
  {
    id: "4",
    name: "Nurse",
    description: "Can assist doctors and manage patient records",
    permissions: [
      "view_patients",
      "manage_medical_records",
      "assist_appointments",
    ],
    userCount: 12,
    createdAt: new Date("2024-02-15"),
  },
]

const permissions = [
  "Manage Users",
  "Manage Doctors",
  "Manage Patients",
  "View Analytics",
  "Manage Payments",
  "Handle Queries",
  "System Settings",
  "Manage Appointments",
]

export function RolesPermissions() {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Roles & Permissions
          </CardTitle>
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="h-4 w-4 mr-2" />
                Add Role
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New Role</DialogTitle>
                <DialogDescription>
                  Define a new role with specific permissions for your team
                  members.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="role-name">Role Name</Label>
                  <Input id="role-name" placeholder="e.g., Nurse, Manager" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role-description">Description</Label>
                  <Textarea
                    id="role-description"
                    placeholder="Describe the role responsibilities..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Permissions</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {permissions.map((permission) => (
                      <div
                        key={permission}
                        className="flex items-center space-x-2"
                      >
                        <input
                          type="checkbox"
                          id={permission.toLowerCase().replace(" ", "-")}
                          className="rounded"
                        />
                        <Label
                          htmlFor={permission.toLowerCase().replace(" ", "-")}
                          className="text-sm"
                        >
                          {permission}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline">Cancel</Button>
                <Button>Create Role</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead>Created</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {mockRoles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div className="font-medium">{role.name}</div>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] text-sm text-muted-foreground">
                    {role.description}
                  </div>
                </TableCell>
                <TableCell>
                  <Badge variant="secondary">{role.userCount} users</Badge>
                </TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {role.permissions.slice(0, 2).map((permission) => (
                      <Badge
                        key={permission}
                        variant="outline"
                        className="text-xs"
                      >
                        {permission.replace("_", " ")}
                      </Badge>
                    ))}
                    {role.permissions.length > 2 && (
                      <Badge variant="outline" className="text-xs">
                        +{role.permissions.length - 2} more
                      </Badge>
                    )}
                  </div>
                </TableCell>
                <TableCell>
                  {new Date(role.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-red-600">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
