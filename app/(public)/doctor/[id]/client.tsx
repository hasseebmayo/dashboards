"use client"

import { ArrowLeft, MessageCircle, Share2 } from "lucide-react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { useState } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DoctorProfileHeader,
  EducationTab,
  ReviewsTab,
} from "./_components/doctor-profile-tabs"
import { TimeSlotBooking } from "./_components/time-slot-booking"

// Mock doctor data
const mockDoctor = {
  id: "1",
  name: "Dr. Sarah Johnson",
  specialty: "Cardiology",
  rating: 4.9,
  reviewCount: 127,
  experience: 15,
  location: "New York, NY",
  languages: ["English", "Spanish"],
  image: "/api/placeholder/128/128",
  consultationFee: 150,
  insurance: ["Blue Cross", "Aetna", "Cigna"],
  isOnline: true,
  bio: "Dr. Sarah Johnson is a highly experienced cardiologist with over 15 years of practice. She specializes in preventive cardiology, heart disease management, and cardiac rehabilitation. Dr. Johnson is passionate about helping patients maintain optimal heart health through lifestyle modifications and evidence-based medical treatments. She has published numerous research papers and is actively involved in clinical trials for innovative cardiac therapies.",
  availability: { today: true, tomorrow: true, thisWeek: true },
  education: [
    {
      id: "1",
      degree: "Doctor of Medicine (MD)",
      institution: "Harvard Medical School",
      year: "2008",
      description:
        "Graduated Magna Cum Laude with focus on cardiovascular medicine",
    },
    {
      id: "2",
      degree: "Bachelor of Science in Biology",
      institution: "Stanford University",
      year: "2004",
      description:
        "Graduated with honors, completed research in molecular cardiology",
    },
  ],
  certifications: [
    {
      id: "1",
      name: "Board Certification in Cardiology",
      issuer: "American Board of Internal Medicine",
      year: "2011",
      status: "active" as const,
    },
    {
      id: "2",
      name: "Board Certification in Internal Medicine",
      issuer: "American Board of Internal Medicine",
      year: "2009",
      status: "active" as const,
    },
    {
      id: "3",
      name: "Advanced Cardiac Life Support (ACLS)",
      issuer: "American Heart Association",
      year: "2023",
      status: "active" as const,
    },
  ],
  awards: [
    {
      id: "1",
      title: "Top Doctor Award",
      year: "2023",
      description:
        "Recognized by New York Magazine as one of the top cardiologists in NYC",
    },
    {
      id: "2",
      title: "Excellence in Patient Care",
      year: "2022",
      description:
        "Hospital recognition for outstanding patient satisfaction scores",
    },
  ],
}

// Mock reviews data
const mockReviews = [
  {
    id: "1",
    patientName: "John Smith",
    patientImage: "/api/placeholder/40/40",
    rating: 5,
    date: "2 weeks ago",
    comment:
      "Dr. Johnson is an exceptional cardiologist. She took the time to explain my condition thoroughly and developed a comprehensive treatment plan. Her expertise and caring approach made all the difference in my recovery.",
    verified: true,
    helpful: 12,
  },
  {
    id: "2",
    patientName: "Maria Garcia",
    patientImage: "/api/placeholder/40/40",
    rating: 5,
    date: "1 month ago",
    comment:
      "Outstanding doctor! Very knowledgeable and professional. The online consultation was smooth and convenient. Dr. Johnson answered all my questions and provided excellent care.",
    verified: true,
    helpful: 8,
  },
  {
    id: "3",
    patientName: "David Chen",
    patientImage: "/api/placeholder/40/40",
    rating: 4,
    date: "2 months ago",
    comment:
      "Great experience overall. Dr. Johnson is very thorough in her examinations and explanations. The only minor issue was the wait time, but the quality of care made it worthwhile.",
    verified: true,
    helpful: 15,
  },
  {
    id: "4",
    patientName: "Emily Davis",
    patientImage: "/api/placeholder/40/40",
    rating: 5,
    date: "3 months ago",
    comment:
      "Dr. Johnson helped me manage my heart condition effectively. Her preventive care approach and lifestyle recommendations have significantly improved my quality of life. Highly recommended!",
    verified: true,
    helpful: 9,
  },
]

export default function DoctorDetailClient() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")

  const handleBooking = (slotId: string, type: "online" | "in-person") => {
    // Navigate to booking flow
    console.log("Booking appointment:", { slotId, type, doctorId: params.id })
    // This would typically navigate to a booking flow page
    // router.push(`/doctor/${params.id}/book?slot=${slotId}&type=${type}`)
  }

  return (
    <div className="flex min-h-screen flex-col px-4 md:px-6 lg:px-8">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-muted/20 dark:bg-muted/10">
          <div className="w-full max-w-7xl mx-auto py-4">
            <div className="flex items-center justify-between">
              <Link href="/search" className="inline-flex">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Search
                </Button>
              </Link>

              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  Message
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="w-full max-w-7xl mx-auto py-8">
          <div className="space-y-8">
            {/* Doctor Profile Header */}
            <DoctorProfileHeader doctor={mockDoctor} />

            {/* Tabs */}
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="space-y-6"
            >
              <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="reviews">
                  Reviews ({mockDoctor.reviewCount})
                </TabsTrigger>
                <TabsTrigger value="education">Education</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <TimeSlotBooking
                  doctorName={mockDoctor.name}
                  consultationFee={mockDoctor.consultationFee}
                  onBooking={handleBooking}
                />
              </TabsContent>

              <TabsContent value="reviews">
                <ReviewsTab
                  reviews={mockReviews}
                  overallRating={mockDoctor.rating}
                  reviewCount={mockDoctor.reviewCount}
                />
              </TabsContent>

              <TabsContent value="education">
                <EducationTab
                  education={mockDoctor.education}
                  certifications={mockDoctor.certifications}
                  awards={mockDoctor.awards}
                />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
