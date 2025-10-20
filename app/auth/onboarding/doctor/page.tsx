"use client"

import { ArrowLeft, Upload } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
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

const doctorOnboardingSchema = z.object({
  specialization: z.string().min(1, "Specialization is required"),
  licenseNumber: z.string().min(1, "License number is required"),
  yearsOfExperience: z.string().min(1, "Years of experience is required"),
  education: z.string().min(1, "Education background is required"),
  hospitalAffiliation: z.string().optional(),
  bio: z.string().optional(),
  consultationFee: z.string().min(1, "Consultation fee is required"),
})

type DoctorOnboardingData = z.infer<typeof doctorOnboardingSchema>

export default function DoctorOnboardingPage() {
  const router = useRouter()
  const [documents, setDocuments] = useState<File[]>([])

  const handleSubmit = (data: DoctorOnboardingData) => {
    console.log("Doctor onboarding data:", data)
    console.log("Documents:", documents)
    // TODO: Implement doctor profile creation
    // After successful onboarding, redirect to dashboard
    router.push("/dashboard")
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || [])
    setDocuments((prev) => [...prev, ...files])
  }

  const removeDocument = (index: number) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index))
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
            Complete Your Doctor Profile
          </h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Help patients find you by providing your professional information
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

        <Card>
          <CardHeader>
            <CardTitle>Professional Information</CardTitle>
            <CardDescription>
              Tell us about your medical background and expertise
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormModified
              schema={doctorOnboardingSchema}
              onSubmit={handleSubmit}
              defaultValues={{
                specialization: "",
                licenseNumber: "",
                yearsOfExperience: "",
                education: "",
                hospitalAffiliation: "",
                bio: "",
                consultationFee: "",
              }}
            >
              {({ components }) => (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <components.Input
                      name="specialization"
                      label="Specialization"
                      placeholder="e.g., Cardiology, Dermatology"
                    />
                    <components.Input
                      name="licenseNumber"
                      label="Medical License Number"
                      placeholder="Enter your license number"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <components.Input
                      name="yearsOfExperience"
                      label="Years of Experience"
                      type="number"
                      placeholder="5"
                    />
                    <components.Input
                      name="consultationFee"
                      label="Consultation Fee ($)"
                      type="number"
                      placeholder="100"
                    />
                  </div>

                  <components.Textarea
                    name="education"
                    label="Education Background"
                    placeholder="e.g., MD from Harvard Medical School, Residency at Johns Hopkins..."
                    rows={3}
                  />

                  <components.Input
                    name="hospitalAffiliation"
                    label="Hospital Affiliation (Optional)"
                    placeholder="e.g., City General Hospital"
                  />

                  <components.Textarea
                    name="bio"
                    label="Professional Bio (Optional)"
                    placeholder="Tell patients about yourself, your approach to healthcare, and what makes you unique..."
                    rows={4}
                  />

                  {/* Document Upload Section */}
                  <div className="space-y-4">
                    <div>
                      <label
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                        htmlFor="document-upload"
                      >
                        Upload Documents
                      </label>
                      <p className="text-sm text-muted-foreground mt-1">
                        Upload your medical license, certifications, and other
                        relevant documents
                      </p>
                    </div>

                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-muted-foreground">
                        PDF, JPG, PNG up to 10MB each
                      </p>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="document-upload"
                      />
                      <label htmlFor="document-upload">
                        <Button variant="outline" className="mt-2" asChild>
                          <span>Choose Files</span>
                        </Button>
                      </label>
                    </div>

                    {/* Uploaded Documents */}
                    {documents.length > 0 && (
                      <div className="space-y-2">
                        <p className="text-sm font-medium">
                          Uploaded Documents:
                        </p>
                        {documents.map((file, index) => (
                          <div
                            // biome-ignore lint/suspicious/noArrayIndexKey: <!-- IGNORE -->
                            key={index}
                            className="flex items-center justify-between p-2 bg-muted rounded-md"
                          >
                            <span className="text-sm">{file.name}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeDocument(index)}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Complete Profile Setup
                  </Button>
                </div>
              )}
            </FormModified>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
