import type { Metadata } from "next"
import { NotFound } from "@/components/not-found"

export const metadata: Metadata = {
  title: "Page Not Found | Patient Dashboard",
  description:
    "The page you're looking for doesn't exist in the patient dashboard.",
}

export default function PatientNotFoundPage() {
  return (
    <NotFound
      title="Patient Page Not Found"
      description="The patient dashboard page you're looking for doesn't exist."
      backUrl="/patient/dashboard"
      backText="Back to Dashboard"
      homeUrl="/patient/dashboard"
    />
  )
}
