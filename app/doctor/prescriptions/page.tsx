import { Calendar, Edit, Eye, Pill, Plus, Search, User } from "lucide-react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockPrescriptions = [
  {
    id: "RX001",
    patientName: "Sarah Johnson",
    patientId: "P001",
    date: "2024-01-15",
    status: "Active",
    medications: [
      { name: "Lisinopril", dosage: "10mg", frequency: "Once daily" },
      { name: "Metformin", dosage: "500mg", frequency: "Twice daily" },
    ],
    diagnosis: "Hypertension, Type 2 Diabetes",
    refills: 2,
  },
  {
    id: "RX002",
    patientName: "Michael Chen",
    patientId: "P002",
    date: "2024-01-14",
    status: "Completed",
    medications: [
      { name: "Amoxicillin", dosage: "500mg", frequency: "Three times daily" },
    ],
    diagnosis: "Bacterial Infection",
    refills: 0,
  },
  {
    id: "RX003",
    patientName: "Emily Davis",
    patientId: "P003",
    date: "2024-01-13",
    status: "Active",
    medications: [
      { name: "Atorvastatin", dosage: "20mg", frequency: "Once daily" },
      { name: "Aspirin", dosage: "81mg", frequency: "Once daily" },
    ],
    diagnosis: "High Cholesterol",
    refills: 5,
  },
  {
    id: "RX004",
    patientName: "David Wilson",
    patientId: "P004",
    date: "2024-01-12",
    status: "Expired",
    medications: [
      { name: "Albuterol", dosage: "90mcg", frequency: "As needed" },
    ],
    diagnosis: "Asthma",
    refills: 0,
  },
  {
    id: "RX005",
    patientName: "Lisa Anderson",
    patientId: "P005",
    date: "2024-01-11",
    status: "Active",
    medications: [
      { name: "Sertraline", dosage: "50mg", frequency: "Once daily" },
    ],
    diagnosis: "Depression",
    refills: 3,
  },
]

const stats = [
  { title: "Total Prescriptions", value: "156", icon: Pill, change: "+12%" },
  { title: "Active Prescriptions", value: "89", icon: Calendar, change: "+5%" },
  { title: "This Month", value: "24", icon: User, change: "+8%" },
]

export default function DoctorPrescriptions() {
  const activePrescriptions = mockPrescriptions.filter(
    (p) => p.status === "Active"
  )
  const completedPrescriptions = mockPrescriptions.filter(
    (p) => p.status === "Completed"
  )
  const expiredPrescriptions = mockPrescriptions.filter(
    (p) => p.status === "Expired"
  )

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/doctor" },
          {
            label: "Prescriptions",
            href: "/doctor/prescriptions",
            isActive: true,
          },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Prescriptions</h1>
            <p className="text-muted-foreground">
              Manage patient prescriptions and medications
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Prescription
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">
                  <span className="text-green-600">{stat.change}</span> from
                  last month
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search prescriptions by patient name, medication, or prescription ID..."
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="all">All Prescriptions</TabsTrigger>
            <TabsTrigger value="active">
              Active ({activePrescriptions.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedPrescriptions.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({expiredPrescriptions.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Prescriptions</CardTitle>
                <CardDescription>
                  Complete list of prescriptions you've written
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionTable prescriptions={mockPrescriptions} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Prescriptions</CardTitle>
                <CardDescription>
                  Currently active prescriptions for patients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionTable prescriptions={activePrescriptions} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Completed Prescriptions</CardTitle>
                <CardDescription>
                  Prescriptions that have been fulfilled
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionTable prescriptions={completedPrescriptions} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="expired">
            <Card>
              <CardHeader>
                <CardTitle>Expired Prescriptions</CardTitle>
                <CardDescription>
                  Prescriptions that are no longer valid
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PrescriptionTable prescriptions={expiredPrescriptions} />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function PrescriptionTable({
  prescriptions,
}: {
  prescriptions: typeof mockPrescriptions
}) {
  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Completed":
        return "secondary"
      case "Expired":
        return "destructive"
      default:
        return "outline"
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Prescription ID</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Medications</TableHead>
          <TableHead>Diagnosis</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Refills</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {prescriptions.map((prescription) => (
          <TableRow key={prescription.id}>
            <TableCell className="font-medium">{prescription.id}</TableCell>
            <TableCell>
              <div>
                <p className="font-medium">{prescription.patientName}</p>
                <p className="text-sm text-muted-foreground">
                  {prescription.patientId}
                </p>
              </div>
            </TableCell>
            <TableCell>{prescription.date}</TableCell>
            <TableCell>
              <div className="space-y-1">
                {prescription.medications.map((med) => (
                  <div key={`${med.name}-${med.dosage}`} className="text-sm">
                    <span className="font-medium">{med.name}</span>
                    <span className="text-muted-foreground">
                      {" "}
                      - {med.dosage}, {med.frequency}
                    </span>
                  </div>
                ))}
              </div>
            </TableCell>
            <TableCell className="max-w-48">
              <p className="text-sm truncate" title={prescription.diagnosis}>
                {prescription.diagnosis}
              </p>
            </TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(prescription.status)}>
                {prescription.status}
              </Badge>
            </TableCell>
            <TableCell>{prescription.refills}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Button variant="ghost" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
