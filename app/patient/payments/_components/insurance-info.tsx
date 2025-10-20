import { Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const insuranceInfo = {
  provider: "Blue Cross Blue Shield",
  plan: "Premium Plus",
  policyNumber: "BCBS-123456789",
  groupNumber: "GRP-987654",
  memberId: "MEM-456789123",
  coverage: "80% after deductible",
  deductible: "$500",
  copay: "$25",
  status: "Active",
}

export function InsuranceInfo() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Shield className="h-5 w-5" />
          <span>Insurance Coverage</span>
          <Badge className="bg-green-100 text-green-800">
            {insuranceInfo.status}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Insurance Provider
            </div>
            <p className="font-medium">{insuranceInfo.provider}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Plan Type
            </div>
            <p className="font-medium">{insuranceInfo.plan}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Policy Number
            </div>
            <p className="font-medium">{insuranceInfo.policyNumber}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Group Number
            </div>
            <p className="font-medium">{insuranceInfo.groupNumber}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Member ID
            </div>
            <p className="font-medium">{insuranceInfo.memberId}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Coverage
            </div>
            <p className="font-medium">{insuranceInfo.coverage}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Deductible
            </div>
            <p className="font-medium">{insuranceInfo.deductible}</p>
          </div>
          <div>
            <div className="text-sm font-medium text-muted-foreground">
              Copay
            </div>
            <p className="font-medium">{insuranceInfo.copay}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
