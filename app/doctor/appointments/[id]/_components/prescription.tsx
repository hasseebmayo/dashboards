import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PrescriptionProps {
  prescription: Array<{
    medication: string
    dosage: string
    frequency: string
    duration: string
    instructions: string
  }>
}

export function Prescription({ prescription }: PrescriptionProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Prescription</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {prescription.map((med) => (
            <div
              key={`${med.medication}-${med.dosage}`}
              className="border rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-semibold text-lg">{med.medication}</h4>
                <Badge variant="secondary">{med.dosage}</Badge>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                <div>
                  <span className="font-medium">Frequency:</span>
                  <p>{med.frequency}</p>
                </div>
                <div>
                  <span className="font-medium">Duration:</span>
                  <p>{med.duration}</p>
                </div>
                <div>
                  <span className="font-medium">Instructions:</span>
                  <p>{med.instructions}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
