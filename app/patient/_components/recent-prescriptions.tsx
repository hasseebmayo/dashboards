import { Eye, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { Prescription } from "@/types/telehealth"

interface RecentPrescriptionsProps {
  prescriptions: Prescription[]
}

export function RecentPrescriptions({
  prescriptions,
}: RecentPrescriptionsProps) {
  const recentPrescriptions = prescriptions
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 3)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Recent Prescriptions
        </CardTitle>
      </CardHeader>
      <CardContent>
        {recentPrescriptions.length > 0 ? (
          <div className="space-y-4">
            {recentPrescriptions.map((prescription) => (
              <div
                key={prescription.id}
                className="flex items-center justify-between p-3 border rounded-lg"
              >
                <div className="flex-1">
                  <div className="font-medium text-sm">
                    {prescription.medicines}
                  </div>
                  {prescription.notes && (
                    <div className="text-xs text-muted-foreground mt-1">
                      {prescription.notes}
                    </div>
                  )}
                  <div className="text-xs text-muted-foreground mt-1">
                    Prescribed on{" "}
                    {new Date(prescription.createdAt).toLocaleDateString()}
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-1" />
                  View
                </Button>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-muted-foreground">
            No prescriptions available.
          </p>
        )}
      </CardContent>
    </Card>
  )
}
