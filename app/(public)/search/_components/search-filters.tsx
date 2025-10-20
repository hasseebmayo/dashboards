"use client"

import { Filter, MapPin, Search, Star } from "lucide-react"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"

const specialties = [
  "Cardiology",
  "Dermatology",
  "Endocrinology",
  "Gastroenterology",
  "General Practice",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Psychiatry",
  "Pulmonology",
]

const languages = [
  "English",
  "Spanish",
  "French",
  "German",
  "Italian",
  "Portuguese",
]

const insurances = [
  "Blue Cross Blue Shield",
  "Aetna",
  "Cigna",
  "UnitedHealth",
  "Humana",
  "Kaiser Permanente",
]

interface SearchFiltersProps {
  searchTerm: string
  setSearchTerm: (term: string) => void
  selectedSpecialty: string
  setSelectedSpecialty: (specialty: string) => void
  selectedLanguage: string
  setSelectedLanguage: (language: string) => void
  selectedInsurance: string
  setSelectedInsurance: (insurance: string) => void
  location: string
  setLocation: (location: string) => void
  availability: string
  setAvailability: (availability: string) => void
  rating: string
  setRating: (rating: string) => void
  gender: string
  setGender: (gender: string) => void
  experience: string
  setExperience: (experience: string) => void
  onlineOnly: boolean
  setOnlineOnly: (online: boolean) => void
}

export function SearchFilters({
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
}: SearchFiltersProps) {
  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="space-y-2">
        <Label htmlFor="search">Search Doctors</Label>
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="search"
            placeholder="Search by name, specialty, or condition..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <Label htmlFor="location">Location</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            id="location"
            placeholder="City, state, or zip code"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Specialty */}
      <div className="space-y-2">
        <Label>Specialty</Label>
        <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
          <SelectTrigger>
            <SelectValue placeholder="Select specialty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Specialties</SelectItem>
            {specialties.map((specialty) => (
              <SelectItem key={specialty} value={specialty}>
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Availability */}
      <div className="space-y-2">
        <Label>Availability</Label>
        <Select value={availability} onValueChange={setAvailability}>
          <SelectTrigger>
            <SelectValue placeholder="Select availability" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any time</SelectItem>
            <SelectItem value="today">Available today</SelectItem>
            <SelectItem value="tomorrow">Available tomorrow</SelectItem>
            <SelectItem value="this-week">Available this week</SelectItem>
            <SelectItem value="next-week">Available next week</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Rating */}
      <div className="space-y-2">
        <Label>Minimum Rating</Label>
        <Select value={rating} onValueChange={setRating}>
          <SelectTrigger>
            <SelectValue placeholder="Select rating" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any rating</SelectItem>
            <SelectItem value="4">4+ stars</SelectItem>
            <SelectItem value="4.5">4.5+ stars</SelectItem>
            <SelectItem value="4.8">4.8+ stars</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gender */}
      <div className="space-y-2">
        <Label>Gender</Label>
        <Select value={gender} onValueChange={setGender}>
          <SelectTrigger>
            <SelectValue placeholder="Select gender" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any gender</SelectItem>
            <SelectItem value="male">Male</SelectItem>
            <SelectItem value="female">Female</SelectItem>
            <SelectItem value="non-binary">Non-binary</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Experience */}
      <div className="space-y-2">
        <Label>Experience</Label>
        <Select value={experience} onValueChange={setExperience}>
          <SelectTrigger>
            <SelectValue placeholder="Select experience" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any experience</SelectItem>
            <SelectItem value="5">5+ years</SelectItem>
            <SelectItem value="10">10+ years</SelectItem>
            <SelectItem value="15">15+ years</SelectItem>
            <SelectItem value="20">20+ years</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Language */}
      <div className="space-y-2">
        <Label>Language</Label>
        <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any language</SelectItem>
            {languages.map((language) => (
              <SelectItem key={language} value={language}>
                {language}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Insurance */}
      <div className="space-y-2">
        <Label>Insurance</Label>
        <Select value={selectedInsurance} onValueChange={setSelectedInsurance}>
          <SelectTrigger>
            <SelectValue placeholder="Select insurance" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Any insurance</SelectItem>
            {insurances.map((insurance) => (
              <SelectItem key={insurance} value={insurance}>
                {insurance}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Online Only */}
      <div className="flex items-center space-x-2">
        <Checkbox
          id="online-only"
          checked={onlineOnly}
          onCheckedChange={setOnlineOnly}
        />
        <Label htmlFor="online-only" className="text-sm">
          Online consultations only
        </Label>
      </div>
    </div>
  )
}

export function MobileFilters({ children }: { children: React.ReactNode }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="md:hidden">
          <Filter className="mr-2 h-4 w-4" />
          Filters
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Search Filters</SheetTitle>
          <SheetDescription>
            Refine your search to find the perfect doctor
          </SheetDescription>
        </SheetHeader>
        <div className="mt-6">{children}</div>
      </SheetContent>
    </Sheet>
  )
}
