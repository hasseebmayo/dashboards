import { Filter, Plus, Search, UserCheck } from "lucide-react"
import type { Metadata } from "next"
import {
  DashboardContent,
  DashboardHeader,
  DashboardIntro,
} from "@/app/_dashboard"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { mockDoctorsWithStatus } from "@/data/mock-data"
import type { DoctorWithStatus } from "@/types/telehealth"

export const metadata: Metadata = {
  title: "Doctors - Admin Dashboard",
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
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DoctorsPage() {
  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          {
            href: "/admin",
            label: "Admin Dashboard",
          },
          {
            icon: <UserCheck size={22} aria-hidden="true" />,
            href: "/admin/doctors",
            label: "Doctors",
            isActive: true,
          },
        ]}
        actions={
          <Button size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Invite Doctor
          </Button>
        }
      />

      <DashboardContent>
        <DashboardIntro
          title="Doctors Management"
          description="Manage all doctors, review applications, and monitor their status."
        />

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search doctors..." className="pl-10" />
              </div>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Specialization" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Specializations</SelectItem>
                  <SelectItem value="Interventional Cardiology">
                    Interventional Cardiology
                  </SelectItem>
                  <SelectItem value="Clinical Dermatology">
                    Clinical Dermatology
                  </SelectItem>
                  <SelectItem value="Family Medicine">
                    Family Medicine
                  </SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Doctors Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Doctors ({mockDoctorsWithStatus.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialization</TableHead>
                  <TableHead>License</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDoctorsWithStatus.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage
                            src={doctor.user.image}
                            alt={doctor.user.name}
                          />
                          <AvatarFallback>
                            {doctor.user.name
                              .split(" ")
                              .map((n: string) => n[0])
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
                      <div className="font-medium">
                        {doctor.subCategory.name}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        License: {doctor.licenseNumber}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-muted-foreground">
                        License Valid Until
                      </div>
                      <div className="font-medium">
                        {new Date(doctor.licenseExpiry).toLocaleDateString()}
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(doctor.status)}</TableCell>
                    <TableCell>
                      {new Date(doctor.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/admin/doctors/${doctor.id}`}>
                            View Details
                          </a>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </DashboardContent>
    </>
  )
}
