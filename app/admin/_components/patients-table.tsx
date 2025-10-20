"use client"

import { Calendar, CreditCard, Eye } from "lucide-react"
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
import type { User } from "@/types/telehealth"

interface PatientsTableProps {
  patients: User[]
  showActions?: boolean
}

export function PatientsTable({
  patients,
  showActions = true,
}: PatientsTableProps) {
  const handleViewPatient = (patientId: string) => {
    window.location.href = `/admin/patients/${patientId}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Patients</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined</TableHead>
              <TableHead>Last Visit</TableHead>
              {showActions && <TableHead>Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={patient.image} />
                      <AvatarFallback>
                        {patient.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{patient.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {patient.email}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    className={
                      patient.banned
                        ? "bg-red-100 text-red-800 hover:bg-red-100"
                        : "bg-green-100 text-green-800 hover:bg-green-100"
                    }
                  >
                    {patient.banned ? "Banned" : "Active"}
                  </Badge>
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {patient.createdAt.toLocaleDateString()}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground">
                  {patient.updatedAt.toLocaleDateString()}
                </TableCell>
                {showActions && (
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleViewPatient(patient.id)}
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        title="View Appointments"
                      >
                        <Calendar className="h-4 w-4" />
                      </Button>
                      <Button size="sm" variant="outline" title="View Payments">
                        <CreditCard className="h-4 w-4" />
                      </Button>
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
