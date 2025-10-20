import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"

export function DoctorAvailabilityTab() {
  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Working Hours</CardTitle>
          <CardDescription>
            Set your availability for appointments
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {weekDays.map((day) => (
            <div key={day} className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <Switch defaultChecked={day !== "Sunday"} />
                <span className="font-medium w-20">{day}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Input
                  type="time"
                  defaultValue="09:00"
                  className="w-32"
                  disabled={day === "Sunday"}
                />
                <span>to</span>
                <Input
                  type="time"
                  defaultValue="17:00"
                  className="w-32"
                  disabled={day === "Sunday"}
                />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Appointment Settings</CardTitle>
          <CardDescription>
            Configure your appointment preferences
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="slotDuration">Default Slot Duration</Label>
              <select
                id="slotDuration"
                className="w-full p-2 border rounded-md"
              >
                <option value="30">30 minutes</option>
                <option value="45">45 minutes</option>
                <option value="60">60 minutes</option>
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="advanceBooking">Advance Booking (days)</Label>
              <Input id="advanceBooking" type="number" defaultValue="30" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="bufferTime">Buffer Time (minutes)</Label>
              <Input id="bufferTime" type="number" defaultValue="15" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxDaily">Max Appointments/Day</Label>
              <Input id="maxDaily" type="number" defaultValue="12" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
