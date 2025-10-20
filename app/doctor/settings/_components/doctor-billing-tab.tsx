import { CreditCard } from "lucide-react"
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
import { Label } from "@/components/ui/label"

export function DoctorBillingTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Billing Information</CardTitle>
        <CardDescription>
          Manage your payment and billing details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h4 className="font-medium">Payment Methods</h4>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <CreditCard className="h-5 w-5" />
                <div>
                  <p className="font-medium">•••• •••• •••• 4567</p>
                  <p className="text-sm text-muted-foreground">Expires 12/25</p>
                </div>
              </div>
              <Badge>Primary</Badge>
            </div>
          </div>
          <Button variant="outline">Add Payment Method</Button>
        </div>

        <div className="space-y-4">
          <h4 className="font-medium">Billing Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="billingAddress">Address</Label>
              <Input id="billingAddress" defaultValue="123 Medical Center Dr" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingCity">City</Label>
              <Input id="billingCity" defaultValue="New York" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingState">State</Label>
              <Input id="billingState" defaultValue="NY" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="billingZip">ZIP Code</Label>
              <Input id="billingZip" defaultValue="10001" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
