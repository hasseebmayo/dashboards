import { Plus, Trash2 } from "lucide-react"
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

export function MedicalInfoTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Medical Information</CardTitle>
        <CardDescription>
          Manage your health information and preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="bloodType">Blood Type</Label>
            <select id="bloodType" className="w-full p-2 border rounded-md">
              <option value="">Select blood type</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (ft/in)</Label>
            <Input id="height" defaultValue="5'6" placeholder="e.g., 5'8" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="weight">Weight (lbs)</Label>
            <Input
              id="weight"
              type="number"
              defaultValue="145"
              placeholder="e.g., 150"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="insurance">Insurance Provider</Label>
            <Input id="insurance" defaultValue="Blue Cross Blue Shield" />
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Allergies</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Penicillin</p>
                <p className="text-sm text-muted-foreground">
                  Severe reaction - rash and swelling
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Shellfish</p>
                <p className="text-sm text-muted-foreground">
                  Mild reaction - hives
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Allergy
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Current Medications</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Lisinopril 10mg</p>
                <p className="text-sm text-muted-foreground">
                  Once daily - for hypertension
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 border rounded-lg">
              <div>
                <p className="font-medium">Metformin 500mg</p>
                <p className="text-sm text-muted-foreground">
                  Twice daily - for diabetes
                </p>
              </div>
              <Button variant="outline" size="sm">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
            <Button variant="outline" className="w-full">
              <Plus className="h-4 w-4 mr-2" />
              Add Medication
            </Button>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold">Emergency Contact</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="emergencyName">Full Name</Label>
              <Input id="emergencyName" defaultValue="John Johnson" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyRelation">Relationship</Label>
              <Input id="emergencyRelation" defaultValue="Spouse" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="emergencyPhone">Phone Number</Label>
              <Input id="emergencyPhone" defaultValue="+1 (555) 0124" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
