import {
  ArrowDownRight,
  ArrowUpRight,
  Calendar,
  CreditCard,
  DollarSign,
  Download,
  Eye,
  Filter,
  Search,
  TrendingUp,
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockEarnings = [
  {
    id: "P001",
    date: "2024-01-15",
    patientName: "Sarah Johnson",
    service: "General Consultation",
    amount: 150,
    status: "Paid",
    paymentMethod: "Credit Card",
    transactionId: "TXN001234",
  },
  {
    id: "P002",
    date: "2024-01-14",
    patientName: "Michael Chen",
    service: "Cardiology Consultation",
    amount: 250,
    status: "Paid",
    paymentMethod: "Insurance",
    transactionId: "TXN001235",
  },
  {
    id: "P003",
    date: "2024-01-13",
    patientName: "Emily Davis",
    service: "Mental Health Consultation",
    amount: 200,
    status: "Pending",
    paymentMethod: "Bank Transfer",
    transactionId: "TXN001236",
  },
  {
    id: "P004",
    date: "2024-01-12",
    patientName: "David Wilson",
    service: "Prescription Review",
    amount: 100,
    status: "Paid",
    paymentMethod: "Credit Card",
    transactionId: "TXN001237",
  },
  {
    id: "P005",
    date: "2024-01-11",
    patientName: "Lisa Anderson",
    service: "Annual Physical Exam",
    amount: 300,
    status: "Failed",
    paymentMethod: "Credit Card",
    transactionId: "TXN001238",
  },
]

const monthlyData = [
  { month: "Jan 2024", earnings: 4250, consultations: 28, growth: 12 },
  { month: "Dec 2023", earnings: 3800, consultations: 25, growth: 8 },
  { month: "Nov 2023", earnings: 3520, consultations: 22, growth: -3 },
  { month: "Oct 2023", earnings: 3630, consultations: 24, growth: 15 },
]

const stats = [
  {
    title: "Total Earnings",
    value: "$12,450",
    icon: DollarSign,
    change: "+12%",
    trend: "up",
  },
  {
    title: "This Month",
    value: "$4,250",
    icon: Calendar,
    change: "+8%",
    trend: "up",
  },
  {
    title: "Pending Payments",
    value: "$850",
    icon: CreditCard,
    change: "-5%",
    trend: "down",
  },
  {
    title: "Success Rate",
    value: "94.2%",
    icon: TrendingUp,
    change: "+2.1%",
    trend: "up",
  },
]

export default function DoctorPayments() {
  const paidPayments = mockEarnings.filter((p) => p.status === "Paid")
  const pendingPayments = mockEarnings.filter((p) => p.status === "Pending")
  const failedPayments = mockEarnings.filter((p) => p.status === "Failed")

  const getStatusVariant = (status: string) => {
    switch (status) {
      case "Paid":
        return "default"
      case "Pending":
        return "secondary"
      case "Failed":
        return "destructive"
      default:
        return "outline"
    }
  }

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? ArrowUpRight : ArrowDownRight
  }

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-600" : "text-red-600"
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/doctor" },
          { label: "Payments", href: "/doctor/payments", isActive: true },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Payments</h1>
            <p className="text-muted-foreground">
              Track your earnings and payment history
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
          {stats.map((stat) => {
            const TrendIcon = getTrendIcon(stat.trend)
            return (
              <Card key={stat.title}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {stat.title}
                  </CardTitle>
                  <stat.icon className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <p className="text-xs flex items-center">
                    <TrendIcon
                      className={`h-3 w-3 mr-1 ${getTrendColor(stat.trend)}`}
                    />
                    <span className={getTrendColor(stat.trend)}>
                      {stat.change}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      from last month
                    </span>
                  </p>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Monthly Earnings Chart */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Earnings</CardTitle>
              <CardDescription>
                Your earnings over the past 4 months
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {monthlyData.map((data) => (
                  <div
                    key={data.month}
                    className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{data.month}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.consultations} consultations
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold">
                        ${data.earnings.toLocaleString()}
                      </p>
                      <p
                        className={`text-sm flex items-center justify-end ${
                          data.growth >= 0 ? "text-green-600" : "text-red-600"
                        }`}
                      >
                        {data.growth >= 0 ? (
                          <ArrowUpRight className="h-3 w-3 mr-1" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 mr-1" />
                        )}
                        {Math.abs(data.growth)}%
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>Payment distribution this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Credit Card</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-3/5 h-full bg-primary rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">60%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Insurance</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-1/3 h-full bg-green-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">30%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Bank Transfer</span>
                  <div className="flex items-center space-x-2">
                    <div className="w-20 h-2 bg-muted rounded-full">
                      <div className="w-1/12 h-full bg-blue-500 rounded-full"></div>
                    </div>
                    <span className="text-sm font-medium">10%</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search payments by patient name, transaction ID, or service..."
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Payment Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="all">All Payments</TabsTrigger>
            <TabsTrigger value="paid">Paid ({paidPayments.length})</TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({pendingPayments.length})
            </TabsTrigger>
            <TabsTrigger value="failed">
              Failed ({failedPayments.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <Card>
              <CardHeader>
                <CardTitle>All Payments</CardTitle>
                <CardDescription>Complete payment history</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentTable
                  payments={mockEarnings}
                  getStatusVariant={getStatusVariant}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="paid">
            <Card>
              <CardHeader>
                <CardTitle>Paid Payments</CardTitle>
                <CardDescription>
                  Successfully processed payments
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentTable
                  payments={paidPayments}
                  getStatusVariant={getStatusVariant}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Payments</CardTitle>
                <CardDescription>Payments awaiting processing</CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentTable
                  payments={pendingPayments}
                  getStatusVariant={getStatusVariant}
                />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="failed">
            <Card>
              <CardHeader>
                <CardTitle>Failed Payments</CardTitle>
                <CardDescription>
                  Payments that failed to process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <PaymentTable
                  payments={failedPayments}
                  getStatusVariant={getStatusVariant}
                />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function PaymentTable({
  payments,
  getStatusVariant,
}: {
  payments: typeof mockEarnings
  getStatusVariant: (
    status: string
  ) => "default" | "secondary" | "destructive" | "outline"
}) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Patient</TableHead>
          <TableHead>Service</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Transaction ID</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell>{payment.date}</TableCell>
            <TableCell className="font-medium">{payment.patientName}</TableCell>
            <TableCell>{payment.service}</TableCell>
            <TableCell className="font-bold">${payment.amount}</TableCell>
            <TableCell>{payment.paymentMethod}</TableCell>
            <TableCell>
              <Badge variant={getStatusVariant(payment.status)}>
                {payment.status}
              </Badge>
            </TableCell>
            <TableCell className="font-mono text-sm">
              {payment.transactionId}
            </TableCell>
            <TableCell>
              <Button variant="ghost" size="sm">
                <Eye className="h-4 w-4" />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
