import type { Metadata } from "next"
import { NotFound } from "@/components/not-found"

export const metadata: Metadata = {
  title: "Page Not Found | Admin Dashboard",
  description:
    "The page you're looking for doesn't exist in the admin dashboard.",
}

export default function AdminNotFoundPage() {
  return (
    <NotFound
      title="Admin Page Not Found"
      description="The admin dashboard page you're looking for doesn't exist."
      backUrl="/admin/dashboard"
      backText="Back to Dashboard"
      homeUrl="/admin/dashboard"
    />
  )
}
