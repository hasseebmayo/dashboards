import { Calendar, Mail, MapPin, Phone } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface PatientInfoProps {
  patient: {
    id: string
    name: string
    avatar: string
    email: string
    phone: string
    address: string
    dateOfBirth: string
    gender: string
    insurance: string
    emergencyContact: {
      name: string
      relationship: string
      phone: string
    }
  }
}

export function PatientInfo({ patient }: PatientInfoProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Information</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-start space-x-4 mb-6">
          <Avatar className="h-16 w-16">
            <AvatarImage src={patient.avatar} />
            <AvatarFallback>
              {patient.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold">{patient.name}</h3>
            <p className="text-muted-foreground">Patient ID: {patient.id}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{patient.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="h-4 w-4 text-muted-foreground" />
              <span>{patient.phone}</span>
            </div>
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-muted-foreground mt-1" />
              <span>{patient.address}</span>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span>DOB: {patient.dateOfBirth}</span>
            </div>
            <div>
              <span className="font-medium">Gender: </span>
              <span>{patient.gender}</span>
            </div>
            <div>
              <span className="font-medium">Insurance: </span>
              <span>{patient.insurance}</span>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <h4 className="font-semibold mb-2">Emergency Contact</h4>
          <div className="space-y-2">
            <p>
              <span className="font-medium">Name:</span>{" "}
              {patient.emergencyContact.name}
            </p>
            <p>
              <span className="font-medium">Relationship:</span>{" "}
              {patient.emergencyContact.relationship}
            </p>
            <p>
              <span className="font-medium">Phone:</span>{" "}
              {patient.emergencyContact.phone}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
