import { CheckCircle, Clock, CreditCard, DollarSign } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
  {
    title: "Total Paid",
    value: "$1,000",
    icon: DollarSign,
    change: "this year",
  },
  { title: "Pending Bills", value: "$250", icon: Clock, change: "1 payment" },
  {
    title: "Insurance Covered",
    value: "$800",
    icon: CheckCircle,
    change: "80% coverage",
  },
  {
    title: "Out of Pocket",
    value: "$200",
    icon: CreditCard,
    change: "your share",
  },
]

export function PaymentStats() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => {
        const IconComponent = stat.icon
        return (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <IconComponent className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">{stat.change}</p>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
