"use client"

import { Calendar, Clock, MapPin, Star } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const mockDoctors = [
  {
    id: "1",
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 4.9,
    reviewCount: 127,
    location: "Medical District",
    distance: "2.3 miles",
    nextAvailable: "Today at 2:30 PM",
    image: "",
    bio: "Board-certified cardiologist with 15 years of experience in preventive cardiology.",
    acceptingNewPatients: true,
    languages: ["English", "Spanish"],
  },
  {
    id: "2",
    name: "Dr. Michael Chen",
    specialty: "Family Medicine",
    rating: 4.8,
    reviewCount: 93,
    location: "Downtown",
    distance: "1.8 miles",
    nextAvailable: "Tomorrow at 9:00 AM",
    image: "",
    bio: "Experienced family physician focused on comprehensive primary care for all ages.",
    acceptingNewPatients: true,
    languages: ["English", "Mandarin"],
  },
  {
    id: "3",
    name: "Dr. Emily Davis",
    specialty: "Dermatology",
    rating: 4.7,
    reviewCount: 156,
    location: "West Side",
    distance: "4.1 miles",
    nextAvailable: "Next week",
    image: "",
    bio: "Specialized in medical and cosmetic dermatology with cutting-edge treatments.",
    acceptingNewPatients: false,
    languages: ["English"],
  },
]

const sortOptions = [
  { value: "relevance", label: "Most Relevant" },
  { value: "rating", label: "Highest Rated" },
  { value: "distance", label: "Nearest" },
  { value: "availability", label: "Soonest Available" },
]

export function SearchResults() {
  const [sortBy, setSortBy] = useState("relevance")

  return (
    <div className="space-y-6">
      {/* Results Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            {mockDoctors.length} doctors found
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Showing healthcare providers near you
          </p>
        </div>

        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results List */}
      <div className="space-y-4">
        {mockDoctors.map((doctor) => (
          <Card
            key={doctor.id}
            className="hover:shadow-lg transition-shadow duration-200"
          >
            <CardHeader className="pb-4">
              <div className="flex items-start gap-4">
                {/* Doctor Avatar */}
                <Avatar className="h-16 w-16">
                  <AvatarImage
                    src={doctor.image}
                    alt={`${doctor.name}'s profile`}
                  />
                  <AvatarFallback className="text-lg bg-primary/10 text-primary">
                    {doctor.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                {/* Doctor Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {doctor.name}
                      </h3>
                      <p className="text-primary font-medium">
                        {doctor.specialty}
                      </p>
                    </div>

                    {doctor.acceptingNewPatients && (
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        Accepting New Patients
                      </Badge>
                    )}
                  </div>

                  {/* Rating and Reviews */}
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1">
                      <Star
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                        aria-hidden="true"
                      />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                    <span className="text-sm text-gray-500">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>

                  {/* Bio */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-2 line-clamp-2">
                    {doctor.bio}
                  </p>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-0">
              {/* Location and Availability */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <MapPin className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {doctor.location} • {doctor.distance}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Clock className="h-4 w-4" aria-hidden="true" />
                  <span>{doctor.nextAvailable}</span>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <span>Languages: {doctor.languages.join(", ")}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <Button asChild className="flex-1 sm:flex-none">
                  <Link
                    href={`/doctors/${doctor.id}`}
                    className="flex items-center gap-2"
                  >
                    <Calendar className="h-4 w-4" aria-hidden="true" />
                    Book Appointment
                  </Link>
                </Button>

                <Button variant="outline" asChild>
                  <Link href={`/doctors/${doctor.id}`}>View Profile</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Load More Button */}
      <div className="text-center pt-8">
        <Button variant="outline" size="lg">
          Load More Results
        </Button>
      </div>
    </div>
  )
}
