import {
  Brain,
  Clock,
  DollarSign,
  Edit,
  Eye,
  Heart,
  Pill,
  Plus,
  Search,
  Shield,
  Stethoscope,
  Users,
} from "lucide-react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockServices = [
  {
    id: "S001",
    name: "General Consultation",
    category: "Primary Care",
    description:
      "Comprehensive health assessment and medical consultation for general health concerns.",
    duration: "30 minutes",
    price: 150,
    status: "Active",
    bookings: 45,
    icon: Stethoscope,
  },
  {
    id: "S002",
    name: "Cardiology Consultation",
    category: "Specialist",
    description:
      "Specialized cardiovascular examination and heart health assessment.",
    duration: "45 minutes",
    price: 250,
    status: "Active",
    bookings: 28,
    icon: Heart,
  },
  {
    id: "S003",
    name: "Mental Health Consultation",
    category: "Mental Health",
    description:
      "Psychological evaluation and mental health counseling sessions.",
    duration: "60 minutes",
    price: 200,
    status: "Active",
    bookings: 32,
    icon: Brain,
  },
  {
    id: "S004",
    name: "Prescription Review",
    category: "Follow-up",
    description:
      "Review and adjustment of current medications and treatment plans.",
    duration: "20 minutes",
    price: 100,
    status: "Active",
    bookings: 15,
    icon: Pill,
  },
  {
    id: "S005",
    name: "Annual Physical Exam",
    category: "Preventive",
    description:
      "Comprehensive annual health screening and preventive care assessment.",
    duration: "60 minutes",
    price: 300,
    status: "Active",
    bookings: 12,
    icon: Shield,
  },
  {
    id: "S006",
    name: "Emergency Consultation",
    category: "Emergency",
    description: "Urgent medical consultation for immediate health concerns.",
    duration: "Variable",
    price: 400,
    status: "Inactive",
    bookings: 3,
    icon: Stethoscope,
  },
]

const categories = [
  "All",
  "Primary Care",
  "Specialist",
  "Mental Health",
  "Follow-up",
  "Preventive",
  "Emergency",
]

const stats = [
  {
    title: "Total Services",
    value: "6",
    icon: Stethoscope,
    change: "+1 this month",
  },
  { title: "Active Services", value: "5", icon: Users, change: "83% active" },
  {
    title: "Average Price",
    value: "$216",
    icon: DollarSign,
    change: "+5% from last month",
  },
  {
    title: "Total Bookings",
    value: "135",
    icon: Clock,
    change: "+12% this week",
  },
]

export default function DoctorServices() {
  const activeServices = mockServices.filter((s) => s.status === "Active")
  const inactiveServices = mockServices.filter((s) => s.status === "Inactive")

  const getStatusVariant = (status: string) => {
    return status === "Active" ? "default" : "secondary"
  }

  const getCategoryColor = (category: string) => {
    const colors: Record<string, string> = {
      "Primary Care": "bg-blue-100 text-blue-800",
      Specialist: "bg-purple-100 text-purple-800",
      "Mental Health": "bg-green-100 text-green-800",
      "Follow-up": "bg-yellow-100 text-yellow-800",
      Preventive: "bg-indigo-100 text-indigo-800",
      Emergency: "bg-red-100 text-red-800",
    }
    return colors[category] || "bg-gray-100 text-gray-800"
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/doctor" },
          { label: "Services", href: "/doctor/services", isActive: true },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Services</h1>
            <p className="text-muted-foreground">
              Manage your medical services and pricing
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            New Service
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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

        {/* Search and Filter */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex items-center space-x-2 flex-1">
                <Search className="h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search services by name, category, or description..."
                  className="flex-1"
                />
              </div>
              <div className="flex gap-2 flex-wrap">
                {categories.map((category) => (
                  <Button key={category} variant="outline" size="sm">
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Services Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="all">All Services</TabsTrigger>
            <TabsTrigger value="active">
              Active ({activeServices.length})
            </TabsTrigger>
            <TabsTrigger value="inactive">
              Inactive ({inactiveServices.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ServiceGrid
              services={mockServices}
              getCategoryColor={getCategoryColor}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>

          <TabsContent value="active">
            <ServiceGrid
              services={activeServices}
              getCategoryColor={getCategoryColor}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>

          <TabsContent value="inactive">
            <ServiceGrid
              services={inactiveServices}
              getCategoryColor={getCategoryColor}
              getStatusVariant={getStatusVariant}
            />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function ServiceGrid({
  services,
  getCategoryColor,
  getStatusVariant,
}: {
  services: typeof mockServices
  getCategoryColor: (category: string) => string
  getStatusVariant: (status: string) => "default" | "secondary"
}) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {services.map((service) => {
        const IconComponent = service.icon
        return (
          <Card key={service.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <IconComponent className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.name}</CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(service.category)}`}
                      >
                        {service.category}
                      </span>
                      <Badge variant={getStatusVariant(service.status)}>
                        {service.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <CardDescription className="mb-4 line-clamp-2">
                {service.description}
              </CardDescription>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{service.duration}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                    <span className="font-semibold">${service.price}</span>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{service.bookings} bookings this month</span>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm">
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button variant="outline" size="sm">
                      <Edit className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <Button variant="ghost" size="sm">
                    Analytics
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
