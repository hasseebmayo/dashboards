"use client"

import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FormModified from "@/components/ui/form-modified"

const patientOnboardingSchema = z.object({
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  gender: z.string().min(1, "Gender is required"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  address: z.string().optional(),
  emergencyContactName: z.string().optional(),
  emergencyContactPhone: z.string().optional(),
  // Medical History (Optional)
  allergies: z.string().optional(),
  medications: z.string().optional(),
  medicalConditions: z.string().optional(),
  surgicalHistory: z.string().optional(),
  familyHistory: z.string().optional(),
})

type PatientOnboardingData = z.infer<typeof patientOnboardingSchema>

export default function PatientOnboardingPage() {
  const router = useRouter()

  const handleSubmit = (data: PatientOnboardingData) => {
    console.log("Patient onboarding data:", data)
    // TODO: Implement patient profile creation
    // After successful onboarding, redirect to dashboard
    router.push("/dashboard")
  }

  return (
    <div className="min-h-screen bg-background px-4 md:px-6 lg:px-8 py-12 sm:px-6">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Link href="/auth/role-selection">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
        </div>

        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground">
            Complete Your Patient Profile
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Help us provide you with better healthcare services
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="flex items-center justify-center space-x-2">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-medium">
            1
          </div>
          <div className="w-16 h-1 bg-primary"></div>
          <div className="w-8 h-8 bg-muted rounded-full flex items-center justify-center text-muted-foreground text-sm font-medium">
            2
          </div>
        </div>

        <div className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Required information to set up your profile
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormModified
                schema={patientOnboardingSchema}
                onSubmit={handleSubmit}
                defaultValues={{
                  dateOfBirth: "",
                  gender: "",
                  phoneNumber: "",
                  address: "",
                  emergencyContactName: "",
                  emergencyContactPhone: "",
                  allergies: "",
                  medications: "",
                  medicalConditions: "",
                  surgicalHistory: "",
                  familyHistory: "",
                }}
              >
                {({ components }) => (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <components.Input
                        name="dateOfBirth"
                        label="Date of Birth"
                        type="date"
                      />
                      <components.Field name="gender" label="Gender">
                        {(field) => (
                          <select
                            {...field}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          >
                            <option value="">Select gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                            <option value="prefer-not-to-say">
                              Prefer not to say
                            </option>
                          </select>
                        )}
                      </components.Field>
                    </div>

                    <components.Input
                      name="phoneNumber"
                      label="Phone Number"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                    />

                    <components.Textarea
                      name="address"
                      label="Address (Optional)"
                      placeholder="123 Main St, City, State, ZIP"
                      rows={3}
                    />

                    <div className="space-y-4">
                      <h3 className="text-lg font-medium">
                        Emergency Contact (Optional)
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <components.Input
                          name="emergencyContactName"
                          label="Name"
                          placeholder="John Doe"
                        />
                        <components.Input
                          name="emergencyContactPhone"
                          label="Phone Number"
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                    </div>

                    {/* Medical History Section */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-lg font-medium">Medical History</h3>
                        <p className="text-sm text-muted-foreground">
                          This information is optional but helps doctors provide
                          better care
                        </p>
                      </div>

                      <components.Textarea
                        name="allergies"
                        label="Allergies (Optional)"
                        placeholder="e.g., Penicillin, Peanuts, Shellfish..."
                        rows={2}
                      />

                      <components.Textarea
                        name="medications"
                        label="Current Medications (Optional)"
                        placeholder="e.g., Lisinopril 10mg daily, Metformin 500mg twice daily..."
                        rows={2}
                      />

                      <components.Textarea
                        name="medicalConditions"
                        label="Medical Conditions (Optional)"
                        placeholder="e.g., Hypertension, Diabetes, Asthma..."
                        rows={2}
                      />

                      <components.Textarea
                        name="surgicalHistory"
                        label="Surgical History (Optional)"
                        placeholder="e.g., Appendectomy (2015), Knee replacement (2020)..."
                        rows={2}
                      />

                      <components.Textarea
                        name="familyHistory"
                        label="Family Medical History (Optional)"
                        placeholder="e.g., Heart disease (father), Diabetes (mother)..."
                        rows={2}
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                      <Button
                        type="button"
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => router.push("/dashboard")}
                      >
                        Skip for Now
                      </Button>
                      <Button
                        type="submit"
                        className="w-full sm:flex-1"
                        size="lg"
                      >
                        Complete Profile Setup
                      </Button>
                    </div>
                  </div>
                )}
              </FormModified>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
