import type { Metadata } from "next"
import DoctorDetailClient from "./client"

export const metadata: Metadata = {
  title: "Book Appointment with Dr. Sarah Johnson | Teleneo",
  description:
    "Book an appointment with Dr. Sarah Johnson, an experienced cardiologist with 15+ years of practice. Available for both online and in-person consultations.",
  keywords: [
    "cardiologist",
    "doctor appointment",
    "online consultation",
    "heart specialist",
    "medical consultation",
  ],
  openGraph: {
    title: "Dr. Sarah Johnson - Cardiologist | Teleneo",
    description:
      "Book an appointment with Dr. Sarah Johnson, specializing in cardiology with excellent patient reviews.",
    type: "profile",
  },
}

export default function DoctorDetailPage() {
  return <DoctorDetailClient />
}
