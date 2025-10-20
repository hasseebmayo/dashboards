import { Clock, Heart, MapPin, Star, Video } from "lucide-react"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export interface Doctor {
  id: string
  name: string
  specialty: string
  rating: number
  reviewCount: number
  experience: number
  location: string
  distance: string
  languages: string[]
  image: string
  availability: {
    today: boolean
    tomorrow: boolean
    thisWeek: boolean
  }
  consultationFee: number
  insurance: string[]
  isOnline: boolean
  nextAvailable: string
  bio: string
}

interface DoctorCardProps {
  doctor: Doctor
}

export function DoctorCard({ doctor }: DoctorCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20">
      <CardHeader className="space-y-4">
        <div className="flex items-start space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={doctor.image} alt={doctor.name} />
            <AvatarFallback>
              {doctor.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 space-y-2">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                  Dr. {doctor.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {doctor.specialty}
                </p>
              </div>
              <div className="flex items-center space-x-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium text-sm">{doctor.rating}</span>
                <span className="text-xs text-muted-foreground">
                  ({doctor.reviewCount})
                </span>
              </div>
            </div>

            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Heart className="h-3 w-3" />
                <span>{doctor.experience} years exp.</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{doctor.distance}</span>
              </div>
              {doctor.isOnline && (
                <div className="flex items-center space-x-1">
                  <Video className="h-3 w-3" />
                  <span>Online</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Languages */}
        <div className="flex flex-wrap gap-1">
          {doctor.languages.slice(0, 3).map((language) => (
            <Badge key={language} variant="secondary" className="text-xs">
              {language}
            </Badge>
          ))}
          {doctor.languages.length > 3 && (
            <Badge variant="secondary" className="text-xs">
              +{doctor.languages.length - 3} more
            </Badge>
          )}
        </div>

        {/* Bio snippet */}
        <p className="text-sm text-muted-foreground line-clamp-2">
          {doctor.bio}
        </p>

        {/* Availability */}
        <div className="flex items-center space-x-2">
          <Clock className="h-4 w-4 text-green-500" />
          <span className="text-sm text-green-600 font-medium">
            Next available: {doctor.nextAvailable}
          </span>
        </div>

        {/* Price and buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div>
            <div className="font-semibold">${doctor.consultationFee}</div>
            <div className="text-xs text-muted-foreground">
              Consultation fee
            </div>
          </div>

          <div className="flex space-x-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={`/doctor/${doctor.id}`}>View Profile</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href={`/doctor/${doctor.id}/book`}>Book Now</Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
