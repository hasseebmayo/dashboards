import {
  AlertCircle,
  Calendar,
  CheckCircle,
  Clock,
  Download,
  Pill,
  RefreshCw,
  Search,
} from "lucide-react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockPrescriptions = [
  {
    id: "RX001",
    doctorName: "Dr. Sarah Wilson",
    doctorAvatar: "",
    date: "2024-01-15",
    status: "Active",
    medications: [
      {
        name: "Lisinopril",
        dosage: "10mg",
        frequency: "Once daily",
        instructions: "Take with food",
        quantity: "30 tablets",
        refillsLeft: 2,
        nextRefill: "2024-02-15",
      },
      {
        name: "Metformin",
        dosage: "500mg",
        frequency: "Twice daily",
        instructions: "Take with meals",
        quantity: "60 tablets",
        refillsLeft: 1,
        nextRefill: "2024-02-20",
      },
    ],
    diagnosis: "Hypertension, Type 2 Diabetes",
    pharmacy: "CVS Pharmacy - Main St",
    totalCost: 45.5,
  },
  {
    id: "RX002",
    doctorName: "Dr. Michael Chen",
    doctorAvatar: "",
    date: "2024-01-10",
    status: "Completed",
    medications: [
      {
        name: "Amoxicillin",
        dosage: "500mg",
        frequency: "Three times daily",
        instructions: "Complete full course",
        quantity: "21 tablets",
        refillsLeft: 0,
        nextRefill: null,
      },
    ],
    diagnosis: "Bacterial Infection",
    pharmacy: "Walgreens - Downtown",
    totalCost: 15.25,
  },
  {
    id: "RX003",
    doctorName: "Dr. Emily Davis",
    doctorAvatar: "",
    date: "2024-01-08",
    status: "Ready for Pickup",
    medications: [
      {
        name: "Atorvastatin",
        dosage: "20mg",
        frequency: "Once daily",
        instructions: "Take at bedtime",
        quantity: "30 tablets",
        refillsLeft: 5,
        nextRefill: "2024-02-08",
      },
    ],
    diagnosis: "High Cholesterol",
    pharmacy: "Target Pharmacy",
    totalCost: 12.0,
  },
  {
    id: "RX004",
    doctorName: "Dr. David Wilson",
    doctorAvatar: "",
    date: "2023-12-20",
    status: "Expired",
    medications: [
      {
        name: "Albuterol Inhaler",
        dosage: "90mcg",
        frequency: "As needed",
        instructions: "Use for breathing difficulties",
        quantity: "1 inhaler",
        refillsLeft: 0,
        nextRefill: null,
      },
    ],
    diagnosis: "Asthma",
    pharmacy: "CVS Pharmacy - Main St",
    totalCost: 35.75,
  },
]

const stats = [
  {
    title: "Active Prescriptions",
    value: "3",
    icon: Pill,
    change: "medications",
  },
  {
    title: "Refills Available",
    value: "8",
    icon: RefreshCw,
    change: "remaining",
  },
  {
    title: "Ready for Pickup",
    value: "1",
    icon: CheckCircle,
    change: "prescription",
  },
]

export default function PatientPrescriptions() {
  const activePrescs = mockPrescriptions.filter((p) => p.status === "Active")
  const completedPrescs = mockPrescriptions.filter(
    (p) => p.status === "Completed"
  )
  const readyPrescs = mockPrescriptions.filter(
    (p) => p.status === "Ready for Pickup"
  )
  const expiredPrescs = mockPrescriptions.filter((p) => p.status === "Expired")

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Active":
        return "default"
      case "Ready for Pickup":
        return "secondary"
      case "Completed":
        return "outline"
      case "Expired":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Active":
        return Clock
      case "Ready for Pickup":
        return CheckCircle
      case "Completed":
        return CheckCircle
      case "Expired":
        return AlertCircle
      default:
        return Clock
    }
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/patient" },
          {
            label: "Prescriptions",
            href: "/patient/prescriptions",
            isActive: true,
          },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Prescriptions</h1>
            <p className="text-muted-foreground">
              View and manage your medications
            </p>
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download Summary
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
                <p className="text-xs text-muted-foreground">{stat.change}</p>
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
                placeholder="Search prescriptions by medication name, doctor, or diagnosis..."
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Prescriptions Tabs */}
        <Tabs defaultValue="active" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="active">
              Active ({activePrescs.length})
            </TabsTrigger>
            <TabsTrigger value="ready">
              Ready for Pickup ({readyPrescs.length})
            </TabsTrigger>
            <TabsTrigger value="completed">
              Completed ({completedPrescs.length})
            </TabsTrigger>
            <TabsTrigger value="expired">
              Expired ({expiredPrescs.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="active">
            <PrescriptionGrid
              prescriptions={activePrescs}
              getStatusVariant={getStatusVariant}
              getStatusIcon={getStatusIcon}
            />
          </TabsContent>

          <TabsContent value="ready">
            <PrescriptionGrid
              prescriptions={readyPrescs}
              getStatusVariant={getStatusVariant}
              getStatusIcon={getStatusIcon}
            />
          </TabsContent>

          <TabsContent value="completed">
            <PrescriptionGrid
              prescriptions={completedPrescs}
              getStatusVariant={getStatusVariant}
              getStatusIcon={getStatusIcon}
            />
          </TabsContent>

          <TabsContent value="expired">
            <PrescriptionGrid
              prescriptions={expiredPrescs}
              getStatusVariant={getStatusVariant}
              getStatusIcon={getStatusIcon}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function PrescriptionGrid({
  prescriptions,
  getStatusVariant,
  getStatusIcon,
}: {
  prescriptions: typeof mockPrescriptions
  getStatusVariant: (
    status: string
  ) => "default" | "secondary" | "outline" | "destructive"
  getStatusIcon: (status: string) => React.ComponentType<{ className?: string }>
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {prescriptions.map((prescription) => {
        const StatusIcon = getStatusIcon(prescription.status)
        return (
          <Card
            key={prescription.id}
            className="hover:shadow-lg transition-shadow"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar>
                    <AvatarImage src={prescription.doctorAvatar} />
                    <AvatarFallback>
                      {prescription.doctorName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-lg">
                      {prescription.doctorName}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground">
                      {prescription.date}
                    </p>
                  </div>
                </div>
                <Badge
                  variant={getStatusVariant(prescription.status)}
                  className="flex items-center gap-1"
                >
                  <StatusIcon className="h-3 w-3" />
                  {prescription.status}
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">
                  Diagnosis
                </p>
                <p className="font-medium">{prescription.diagnosis}</p>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Medications:</p>
                {prescription.medications.map((med) => (
                  <div
                    key={`${med.name}-${med.dosage}`}
                    className="border rounded-lg p-3 bg-muted/20"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold">{med.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {med.dosage} • {med.frequency}
                        </p>
                      </div>
                      <Pill className="h-4 w-4 text-primary" />
                    </div>

                    <div className="space-y-1 text-sm">
                      <p>
                        <span className="font-medium">Instructions:</span>{" "}
                        {med.instructions}
                      </p>
                      <p>
                        <span className="font-medium">Quantity:</span>{" "}
                        {med.quantity}
                      </p>
                      {med.refillsLeft > 0 && (
                        <div className="flex items-center justify-between">
                          <p>
                            <span className="font-medium">Refills:</span>{" "}
                            {med.refillsLeft} remaining
                          </p>
                          {med.nextRefill && (
                            <p className="text-xs text-muted-foreground">
                              Next: {med.nextRefill}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Pharmacy:</span>
                  <span>{prescription.pharmacy}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium">Total Cost:</span>
                  <span className="font-bold">${prescription.totalCost}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1"
                >
                  <Calendar className="h-4 w-4" />
                  Refill
                </Button>
                <Button variant="ghost" size="sm">
                  View Details
                </Button>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
