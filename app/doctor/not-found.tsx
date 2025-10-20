import type { Metadata } from "next"
import { NotFound } from "@/components/not-found"

export const metadata: Metadata = {
  title: "Page Not Found | Doctor Dashboard",
  description:
    "The page you're looking for doesn't exist in the doctor dashboard.",
}

export default function DoctorNotFoundPage() {
  return (
    <NotFound
      title="Doctor Page Not Found"
      description="The doctor dashboard page you're looking for doesn't exist."
      backUrl="/doctor/dashboard"
      backText="Back to Dashboard"
      homeUrl="/doctor/dashboard"
    />
  )
}
