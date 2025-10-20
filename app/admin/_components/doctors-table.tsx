"use client"

import { Check, Eye, X } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import type { DoctorWithStatus } from "@/types/telehealth"

interface DoctorsTableProps {
  doctors: DoctorWithStatus[]
  showActions?: boolean
}

function getStatusBadge(status: DoctorWithStatus["status"]) {
  switch (status) {
    case "APPROVED":
      return (
        <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
          Approved
        </Badge>
      )
    case "PENDING":
      return (
        <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
          Pending
        </Badge>
      )
    case "REJECTED":
      return (
        <Badge className="bg-red-100 text-red-800 hover:bg-red-100">
          Rejected
        </Badge>
      )
    default:
      return <Badge variant="secondary">Unknown</Badge>
  }
}

export function DoctorsTable({
  doctors,
  showActions = true,
}: DoctorsTableProps) {
  const handleViewDoctor = (doctorId: string) => {
    window.location.href = `/admin/doctors/${doctorId}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Doctors</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>License</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              {showActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctors.map((doctor) => (
              <TableRow key={doctor.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={doctor.user.image} />
                      <AvatarFallback>
                        {doctor.user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{doctor.user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {doctor.user.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="font-medium">{doctor.subCategory.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {doctor.subCategory.category.name}
                  </div>
                </TableCell>
                <TableCell className="font-mono text-sm">
                  {doctor.licenseNumber}
                </TableCell>
                <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {doctor.createdAt.toLocaleDateString()}
                </TableCell>
                {showActions && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewDoctor(doctor.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      {doctor.status === "PENDING" && (
                        <>
                          <Button
                            size="sm"
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="h-4 w-4" />
                          </Button>
                          <Button size="sm" variant="destructive">
                            <X className="h-4 w-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </TableCell>
                )}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}
