import { Languages, MapPin, Star, Users } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface DoctorHeaderProps {
  doctor: {
    id: string
    name: string
    specialty: string
    image: string
    age: number
    rating: number
    reviewsCount: number
    bio: string
    location: string
    languages: string[]
    experience: string
  }
}

export function DoctorHeader({ doctor }: DoctorHeaderProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col sm:flex-row gap-6">
          {/* Doctor Image */}
          <div className="flex-shrink-0">
            <Avatar className="w-32 h-32">
              <AvatarImage src={doctor.image} alt={doctor.name} />
              <AvatarFallback className="text-2xl">
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
          </div>

          {/* Doctor Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {doctor.name}
              </h1>
              <p className="text-xl text-blue-600 font-medium">
                {doctor.specialty}
              </p>
              <p className="text-sm text-gray-600 mt-1">
                Age: {doctor.age} years
              </p>
            </div>

            {/* Rating and Reviews */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-1">
                <Star
                  className="w-5 h-5 fill-yellow-400 text-yellow-400"
                  aria-hidden="true"
                />
                <span className="font-medium">{doctor.rating}</span>
                <span className="text-gray-600">
                  ({doctor.reviewsCount} reviews)
                </span>
              </div>
              <div className="flex items-center gap-1 text-gray-600">
                <Users className="w-4 h-4" aria-hidden="true" />
                <span className="text-sm">{doctor.experience} experience</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" aria-hidden="true" />
              <span>{doctor.location}</span>
            </div>

            {/* Languages */}
            <div className="flex items-center gap-2">
              <Languages className="w-4 h-4 text-gray-600" aria-hidden="true" />
              <div className="flex gap-2 flex-wrap">
                {doctor.languages.map((language) => (
                  <Badge key={language} variant="secondary" className="text-xs">
                    {language}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Bio */}
            <div className="pt-2">
              <h3 className="font-medium text-gray-900 mb-2">About</h3>
              <p className="text-gray-700 leading-relaxed">{doctor.bio}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
