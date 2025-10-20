import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface AppointmentDetailsProps {
  appointment: {
    chiefComplaint: string
    symptoms: string[]
    diagnosis: string
    vitals: {
      bloodPressure: string
      heartRate: string
      temperature: string
      weight: string
      height: string
    }
    notes: string
  }
}

export function AppointmentDetails({ appointment }: AppointmentDetailsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Appointment Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="font-semibold mb-2">Chief Complaint</h4>
          <p className="text-muted-foreground">{appointment.chiefComplaint}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Symptoms</h4>
          <ul className="list-disc list-inside text-muted-foreground">
            {appointment.symptoms.map((symptom) => (
              <li key={symptom}>{symptom}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Diagnosis</h4>
          <p className="text-muted-foreground">{appointment.diagnosis}</p>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Vital Signs</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="font-medium">Blood Pressure:</span>
              <p>{appointment.vitals.bloodPressure}</p>
            </div>
            <div>
              <span className="font-medium">Heart Rate:</span>
              <p>{appointment.vitals.heartRate}</p>
            </div>
            <div>
              <span className="font-medium">Temperature:</span>
              <p>{appointment.vitals.temperature}</p>
            </div>
            <div>
              <span className="font-medium">Weight:</span>
              <p>{appointment.vitals.weight}</p>
            </div>
            <div>
              <span className="font-medium">Height:</span>
              <p>{appointment.vitals.height}</p>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Doctor's Notes</h4>
          <p className="text-muted-foreground">{appointment.notes}</p>
        </div>
      </CardContent>
    </Card>
  )
}
