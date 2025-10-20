"use client"

import { ArrowLeft, SlidersHorizontal } from "lucide-react"
import Link from "next/link"
import { useMemo, useState } from "react"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { type Doctor, DoctorCard } from "./_components/doctor-card"
import { MobileFilters, SearchFilters } from "./_components/search-filters"

// Mock data for doctors
const mockDoctors: Doctor[] = [
  {
    id: "1",
    name: "Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    reviewCount: 127,
    experience: 15,
    location: "New York, NY",
    distance: "2.3 miles",
    languages: ["English", "Spanish"],
    image: "/api/placeholder/64/64",
    availability: { today: true, tomorrow: true, thisWeek: true },
    consultationFee: 150,
    insurance: ["Blue Cross", "Aetna", "Cigna"],
    isOnline: true,
    nextAvailable: "Today at 2:30 PM",
    bio: "Experienced cardiologist specializing in preventive cardiology and heart disease management.",
  },
  {
    id: "2",
    name: "Michael Chen",
    specialty: "Dermatology",
    rating: 4.8,
    reviewCount: 89,
    experience: 12,
    location: "Los Angeles, CA",
    distance: "1.8 miles",
    languages: ["English", "Mandarin"],
    image: "/api/placeholder/64/64",
    availability: { today: false, tomorrow: true, thisWeek: true },
    consultationFee: 120,
    insurance: ["UnitedHealth", "Humana"],
    isOnline: true,
    nextAvailable: "Tomorrow at 10:00 AM",
    bio: "Board-certified dermatologist with expertise in medical and cosmetic dermatology.",
  },
  {
    id: "3",
    name: "Emily Davis",
    specialty: "General Practice",
    rating: 4.7,
    reviewCount: 156,
    experience: 8,
    location: "Chicago, IL",
    distance: "3.1 miles",
    languages: ["English", "French"],
    image: "/api/placeholder/64/64",
    availability: { today: true, tomorrow: true, thisWeek: true },
    consultationFee: 100,
    insurance: ["Kaiser Permanente", "Blue Cross"],
    isOnline: true,
    nextAvailable: "Today at 4:15 PM",
    bio: "Family medicine physician providing comprehensive primary care for all ages.",
  },
  {
    id: "4",
    name: "David Wilson",
    specialty: "Psychiatry",
    rating: 4.9,
    reviewCount: 203,
    experience: 20,
    location: "Boston, MA",
    distance: "4.2 miles",
    languages: ["English"],
    image: "/api/placeholder/64/64",
    availability: { today: false, tomorrow: false, thisWeek: true },
    consultationFee: 180,
    insurance: ["Aetna", "Cigna", "UnitedHealth"],
    isOnline: true,
    nextAvailable: "Friday at 11:00 AM",
    bio: "Psychiatrist specializing in anxiety disorders, depression, and cognitive behavioral therapy.",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    specialty: "Pediatrics",
    rating: 4.8,
    reviewCount: 91,
    experience: 10,
    location: "Seattle, WA",
    distance: "2.9 miles",
    languages: ["English", "German"],
    image: "/api/placeholder/64/64",
    availability: { today: true, tomorrow: true, thisWeek: true },
    consultationFee: 130,
    insurance: ["Blue Cross", "Humana"],
    isOnline: true,
    nextAvailable: "Today at 3:45 PM",
    bio: "Pediatrician dedicated to providing comprehensive care for children and adolescents.",
  },
  {
    id: "6",
    name: "Robert Martinez",
    specialty: "Orthopedics",
    rating: 4.6,
    reviewCount: 74,
    experience: 18,
    location: "Miami, FL",
    distance: "5.1 miles",
    languages: ["English", "Spanish", "Portuguese"],
    image: "/api/placeholder/64/64",
    availability: { today: false, tomorrow: true, thisWeek: true },
    consultationFee: 200,
    insurance: ["UnitedHealth", "Aetna"],
    isOnline: false,
    nextAvailable: "Tomorrow at 9:30 AM",
    bio: "Orthopedic surgeon specializing in sports medicine and joint replacement surgery.",
  },
]

export default function SearchPageClient() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("all")
  const [selectedLanguage, setSelectedLanguage] = useState("all")
  const [selectedInsurance, setSelectedInsurance] = useState("all")
  const [location, setLocation] = useState("")
  const [availability, setAvailability] = useState("all")
  const [rating, setRating] = useState("all")
  const [gender, setGender] = useState("all")
  const [experience, setExperience] = useState("all")
  const [onlineOnly, setOnlineOnly] = useState(false)

  const filteredDoctors = useMemo(() => {
    return mockDoctors.filter((doctor) => {
      // Search term filter
      if (
        searchTerm &&
        !doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false
      }

      // Specialty filter
      if (
        selectedSpecialty !== "all" &&
        doctor.specialty !== selectedSpecialty
      ) {
        return false
      }

      // Language filter
      if (
        selectedLanguage !== "all" &&
        !doctor.languages.includes(selectedLanguage)
      ) {
        return false
      }

      // Insurance filter
      if (
        selectedInsurance !== "all" &&
        !doctor.insurance.includes(selectedInsurance)
      ) {
        return false
      }

      // Rating filter
      if (rating !== "all" && doctor.rating < parseFloat(rating)) {
        return false
      }

      // Experience filter
      if (experience !== "all" && doctor.experience < parseInt(experience)) {
        return false
      }

      // Online only filter
      if (onlineOnly && !doctor.isOnline) {
        return false
      }

      // Availability filter
      if (availability === "today" && !doctor.availability.today) {
        return false
      }
      if (availability === "tomorrow" && !doctor.availability.tomorrow) {
        return false
      }
      if (availability === "this-week" && !doctor.availability.thisWeek) {
        return false
      }

      return true
    })
  }, [
    searchTerm,
    selectedSpecialty,
    selectedLanguage,
    selectedInsurance,
    rating,
    experience,
    onlineOnly,
    availability,
  ])

  const filterProps = {
    searchTerm,
    setSearchTerm,
    selectedSpecialty,
    setSelectedSpecialty,
    selectedLanguage,
    setSelectedLanguage,
    selectedInsurance,
    setSelectedInsurance,
    location,
    setLocation,
    availability,
    setAvailability,
    rating,
    setRating,
    gender,
    setGender,
    experience,
    setExperience,
    onlineOnly,
    setOnlineOnly,
  }

  return (
    <div className="flex min-h-screen flex-col ">
      <SiteHeader />

      <main className="flex-1">
        {/* Header */}
        <div className="border-b bg-muted/20 dark:bg-muted/10 px-4 md:px-6 lg:px-8">
          <div className="w-full py-6">
            <div className="flex items-center space-x-4 mb-4">
              <Button variant="ghost" size="sm" asChild>
                <Link href="/">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Home
                </Link>
              </Button>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold">Find Your Doctor</h1>
              <p className="text-muted-foreground">
                Search through our network of qualified healthcare professionals
              </p>
            </div>
          </div>
        </div>

        <div className="w-full  py-8 px-4 md:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Filters Sidebar - Desktop */}
            <div className="hidden lg:block lg:col-span-3">
              <div className="sticky top-8 space-y-6">
                <div className="flex items-center space-x-2">
                  <SlidersHorizontal className="h-5 w-5" />
                  <h2 className="font-semibold">Filters</h2>
                </div>
                <SearchFilters {...filterProps} />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-9 space-y-6">
              {/* Mobile filters and results header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <MobileFilters>
                    <SearchFilters {...filterProps} />
                  </MobileFilters>

                  <div className="text-sm text-muted-foreground">
                    {filteredDoctors.length} doctors found
                  </div>
                </div>

                {/* Active filters */}
                <div className="hidden sm:flex items-center space-x-2">
                  {selectedSpecialty !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedSpecialty}
                    </Badge>
                  )}
                  {selectedLanguage !== "all" && (
                    <Badge variant="secondary" className="text-xs">
                      {selectedLanguage}
                    </Badge>
                  )}
                  {onlineOnly && (
                    <Badge variant="secondary" className="text-xs">
                      Online only
                    </Badge>
                  )}
                </div>
              </div>

              {/* Doctors Grid */}
              {filteredDoctors.length > 0 ? (
                <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
                  {filteredDoctors.map((doctor) => (
                    <DoctorCard key={doctor.id} doctor={doctor} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">No doctors found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters or search criteria
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setSearchTerm("")
                        setSelectedSpecialty("all")
                        setSelectedLanguage("all")
                        setSelectedInsurance("all")
                        setLocation("")
                        setAvailability("all")
                        setRating("all")
                        setGender("all")
                        setExperience("all")
                        setOnlineOnly(false)
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <SiteFooter />
    </div>
  )
}
