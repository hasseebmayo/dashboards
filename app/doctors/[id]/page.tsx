import { notFound } from "next/navigation"
import { DoctorHeader } from "@/components/_doctor-details/doctor-header"
import { DoctorTabs } from "@/components/_doctor-details/doctor-tabs"
import { TimeslotsCard } from "@/components/_doctor-details/timeslots-card"

// Mock doctor data - in a real app, this would come from an API
const doctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    image: "/placeholder-doctor.jpg",
    age: 42,
    rating: 4.9,
    reviewsCount: 156,
    bio: "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating cardiovascular diseases. She specializes in preventive cardiology and minimally invasive procedures.",
    location: "Heart Care Center, Downtown",
    languages: ["English", "Spanish"],
    experience: "15+ years",
    education: [
      {
        degree: "MD",
        school: "Harvard Medical School",
        year: "2008",
      },
      {
        degree: "Residency in Internal Medicine",
        school: "Johns Hopkins Hospital",
        year: "2011",
      },
      {
        degree: "Fellowship in Cardiology",
        school: "Mayo Clinic",
        year: "2014",
      },
    ],
    certifications: [
      "Board Certified in Cardiovascular Disease",
      "Advanced Cardiac Life Support (ACLS)",
      "Nuclear Cardiology Certification",
    ],
    reviews: [
      {
        id: 1,
        patientName: "John D.",
        rating: 5,
        comment:
          "Dr. Johnson is exceptional. She took the time to explain my condition thoroughly and made me feel at ease.",
        date: "2024-01-15",
      },
      {
        id: 2,
        patientName: "Maria S.",
        rating: 5,
        comment:
          "Highly professional and knowledgeable. The best cardiologist I've ever seen.",
        date: "2024-01-10",
      },
    ],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Neurologist",
    image: "/placeholder-doctor.jpg",
    age: 38,
    rating: 4.8,
    reviewsCount: 89,
    bio: "Dr. Michael Chen is a neurologist specializing in epilepsy and seizure disorders. He uses the latest diagnostic techniques and treatment approaches.",
    location: "NeuroCenter, Medical District",
    languages: ["English", "Mandarin"],
    experience: "12+ years",
    education: [
      {
        degree: "MD",
        school: "Stanford University School of Medicine",
        year: "2010",
      },
      {
        degree: "Residency in Neurology",
        school: "UCSF Medical Center",
        year: "2014",
      },
    ],
    certifications: [
      "Board Certified in Neurology",
      "Epilepsy Monitoring Certification",
    ],
    reviews: [
      {
        id: 1,
        patientName: "Lisa T.",
        rating: 5,
        comment:
          "Dr. Chen helped me manage my condition effectively. Very caring and professional.",
        date: "2024-01-12",
      },
    ],
  },
]

interface DoctorPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function DoctorPage({ params }: DoctorPageProps) {
  const paramsResolved = await params
  const doctor = doctors.find((d) => d.id === paramsResolved.id)

  if (!doctor) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            <DoctorHeader doctor={doctor} />
            <DoctorTabs doctor={doctor} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <TimeslotsCard doctorId={doctor.id} doctorName={doctor.name} />
          </div>
        </div>
      </div>
    </div>
  )
}
