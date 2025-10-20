"use client"

import { Calendar, MapPin, Star, Users } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const specialties = [
  "Cardiology",
  "Dermatology",
  "Family Medicine",
  "Internal Medicine",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
]

const locations = [
  "Downtown",
  "Medical District",
  "Suburbs",
  "West Side",
  "East Side",
]

const availabilityOptions = [
  { id: "today", label: "Available Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
]

export function SearchFilters() {
  const [distance, setDistance] = useState([10])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedAvailability, setSelectedAvailability] = useState<string[]>([])

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    if (checked) {
      setSelectedSpecialties([...selectedSpecialties, specialty])
    } else {
      setSelectedSpecialties(selectedSpecialties.filter((s) => s !== specialty))
    }
  }

  const handleLocationChange = (location: string, checked: boolean) => {
    if (checked) {
      setSelectedLocations([...selectedLocations, location])
    } else {
      setSelectedLocations(selectedLocations.filter((l) => l !== location))
    }
  }

  const handleAvailabilityChange = (availability: string, checked: boolean) => {
    if (checked) {
      setSelectedAvailability([...selectedAvailability, availability])
    } else {
      setSelectedAvailability(
        selectedAvailability.filter((a) => a !== availability)
      )
    }
  }

  const clearAllFilters = () => {
    setSelectedSpecialties([])
    setSelectedLocations([])
    setSelectedAvailability([])
    setDistance([10])
  }

  return (
    <div className="space-y-6">
      {/* Filter Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Filters
        </h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearAllFilters}
          className="text-primary hover:text-primary/80"
        >
          Clear All
        </Button>
      </div>

      {/* Specialty Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Users className="h-4 w-4" aria-hidden="true" />
            Specialty
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {specialties.map((specialty) => (
            <div key={specialty} className="flex items-center space-x-2">
              <Checkbox
                id={`specialty-${specialty}`}
                checked={selectedSpecialties.includes(specialty)}
                onCheckedChange={(checked) =>
                  handleSpecialtyChange(specialty, checked as boolean)
                }
              />
              <Label
                htmlFor={`specialty-${specialty}`}
                className="text-sm cursor-pointer"
              >
                {specialty}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Location Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <MapPin className="h-4 w-4" aria-hidden="true" />
            Location
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {locations.map((location) => (
            <div key={location} className="flex items-center space-x-2">
              <Checkbox
                id={`location-${location}`}
                checked={selectedLocations.includes(location)}
                onCheckedChange={(checked) =>
                  handleLocationChange(location, checked as boolean)
                }
              />
              <Label
                htmlFor={`location-${location}`}
                className="text-sm cursor-pointer"
              >
                {location}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Distance Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base">
            Distance: {distance[0]} miles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 10, 25, 50].map((miles) => (
            <div key={miles} className="flex items-center space-x-2">
              <Checkbox
                id={`distance-${miles}`}
                checked={distance[0] === miles}
                onCheckedChange={(checked) => checked && setDistance([miles])}
              />
              <Label
                htmlFor={`distance-${miles}`}
                className="text-sm cursor-pointer"
              >
                Within {miles} miles
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Availability Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Calendar className="h-4 w-4" aria-hidden="true" />
            Availability
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {availabilityOptions.map((option) => (
            <div key={option.id} className="flex items-center space-x-2">
              <Checkbox
                id={`availability-${option.id}`}
                checked={selectedAvailability.includes(option.id)}
                onCheckedChange={(checked) =>
                  handleAvailabilityChange(option.id, checked as boolean)
                }
              />
              <Label
                htmlFor={`availability-${option.id}`}
                className="text-sm cursor-pointer"
              >
                {option.label}
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Rating Filter */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4" aria-hidden="true" />
            Minimum Rating
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          {[5, 4, 3].map((rating) => (
            <div key={rating} className="flex items-center space-x-2">
              <Checkbox id={`rating-${rating}`} />
              <Label
                htmlFor={`rating-${rating}`}
                className="text-sm cursor-pointer flex items-center gap-1"
              >
                {rating}
                <Star
                  className="h-3 w-3 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
                & up
              </Label>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  )
}
