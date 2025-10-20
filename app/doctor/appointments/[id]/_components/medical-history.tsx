import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface MedicalHistoryProps {
  medicalHistory: Array<{
    date: string
    condition: string
    treatment: string
  }>
}

export function MedicalHistory({ medicalHistory }: MedicalHistoryProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical History</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {medicalHistory.map((record) => (
            <div
              key={`${record.date}-${record.condition}`}
              className="border-l-2 border-primary pl-4 pb-4"
            >
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold">{record.condition}</h4>
                <span className="text-sm text-muted-foreground">
                  {record.date}
                </span>
              </div>
              <p className="text-muted-foreground">{record.treatment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
