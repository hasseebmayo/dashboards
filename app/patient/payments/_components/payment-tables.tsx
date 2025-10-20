"use client"

import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const mockPayments = [
  {
    id: "PAY-001",
    date: "2024-03-15",
    description: "General Consultation",
    amount: "$150",
    status: "paid",
    method: "Health Insurance",
  },
  {
    id: "PAY-002",
    date: "2024-03-10",
    description: "Blood Test",
    amount: "$75",
    status: "paid",
    method: "Credit Card",
  },
  {
    id: "PAY-003",
    date: "2024-03-08",
    description: "Follow-up Appointment",
    amount: "$100",
    status: "pending",
    method: "Health Insurance",
  },
  {
    id: "PAY-004",
    date: "2024-03-05",
    description: "X-Ray Examination",
    amount: "$200",
    status: "failed",
    method: "Credit Card",
  },
]

export function PaymentTables() {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return <Badge className="bg-green-100 text-green-800">Paid</Badge>
      case "pending":
        return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
      case "failed":
        return <Badge className="bg-red-100 text-red-800">Failed</Badge>
      default:
        return <Badge>{status}</Badge>
    }
  }

  const filterPayments = (status?: string) => {
    if (!status) return mockPayments
    return mockPayments.filter((payment) => payment.status === status)
  }

  const PaymentTable = ({ payments }: { payments: typeof mockPayments }) => (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Payment ID</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Payment Method</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {payments.map((payment) => (
          <TableRow key={payment.id}>
            <TableCell className="font-medium">{payment.id}</TableCell>
            <TableCell>{payment.date}</TableCell>
            <TableCell>{payment.description}</TableCell>
            <TableCell>{payment.amount}</TableCell>
            <TableCell>{payment.method}</TableCell>
            <TableCell>{getStatusBadge(payment.status)}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )

  return (
    <Tabs defaultValue="all" className="w-full">
      <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
        <TabsTrigger value="all">All Payments</TabsTrigger>
        <TabsTrigger value="paid">Paid</TabsTrigger>
        <TabsTrigger value="pending">Pending</TabsTrigger>
        <TabsTrigger value="failed">Failed</TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <PaymentTable payments={filterPayments()} />
      </TabsContent>
      <TabsContent value="paid">
        <PaymentTable payments={filterPayments("paid")} />
      </TabsContent>
      <TabsContent value="pending">
        <PaymentTable payments={filterPayments("pending")} />
      </TabsContent>
      <TabsContent value="failed">
        <PaymentTable payments={filterPayments("failed")} />
      </TabsContent>
    </Tabs>
  )
}
