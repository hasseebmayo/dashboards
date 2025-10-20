"use client"

import { CreditCard, Plus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const paymentMethods = [
  {
    id: "1",
    type: "Visa",
    last4: "4532",
    expiry: "12/25",
    isDefault: true,
  },
  {
    id: "2",
    type: "Mastercard",
    last4: "8901",
    expiry: "08/26",
    isDefault: false,
  },
]

export function PaymentMethods() {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Payment Methods</CardTitle>
        <Button size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Payment Method
        </Button>
      </CardHeader>
      <CardContent className="space-y-4">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex items-center justify-between p-4 border rounded-lg"
          >
            <div className="flex items-center space-x-4">
              <CreditCard className="h-6 w-6 text-muted-foreground" />
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium">
                    {method.type} ending in {method.last4}
                  </span>
                  {method.isDefault && (
                    <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-sm text-muted-foreground">
                  Expires {method.expiry}
                </p>
              </div>
            </div>
            <Button variant="ghost" size="sm">
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
