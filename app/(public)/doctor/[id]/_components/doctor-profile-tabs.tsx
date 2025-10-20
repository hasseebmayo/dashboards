import {
  Award,
  Calendar,
  CheckCircle,
  GraduationCap,
  Languages,
  MapPin,
  Shield,
  Star,
} from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface Review {
  id: string
  patientName: string
  patientImage?: string
  rating: number
  date: string
  comment: string
  verified: boolean
  helpful: number
}

interface Education {
  id: string
  degree: string
  institution: string
  year: string
  description?: string
}

interface Certification {
  id: string
  name: string
  issuer: string
  year: string
  status: "active" | "expired"
}

interface DoctorAward {
  id: string
  title: string
  year: string
  description: string
}

interface DoctorProfileHeaderProps {
  doctor: {
    id: string
    name: string
    specialty: string
    rating: number
    reviewCount: number
    experience: number
    location: string
    languages: string[]
    image: string
    consultationFee: number
    insurance: string[]
    isOnline: boolean
    bio: string
    education: Education[]
    certifications: Certification[]
    awards: DoctorAward[]
    availability: {
      today: boolean
      tomorrow: boolean
      thisWeek: boolean
    }
  }
}

export function DoctorProfileHeader({ doctor }: DoctorProfileHeaderProps) {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Doctor Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start space-y-4 sm:space-y-0 sm:space-x-4">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg">
                <AvatarImage src={doctor.image} alt={doctor.name} />
                <AvatarFallback className="text-xl">
                  {doctor.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div>
                  <h1 className="text-2xl sm:text-3xl font-bold">
                    {doctor.name}
                  </h1>
                  <p className="text-lg text-muted-foreground">
                    {doctor.specialty}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center space-x-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium">{doctor.rating}</span>
                    <span className="text-muted-foreground">
                      ({doctor.reviewCount} reviews)
                    </span>
                  </div>

                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    <span>{doctor.experience} years experience</span>
                  </div>

                  <div className="flex items-center space-x-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{doctor.location}</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {doctor.isOnline && (
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800"
                    >
                      <CheckCircle className="mr-1 h-3 w-3" />
                      Video Consultations
                    </Badge>
                  )}

                  <Badge variant="outline">
                    <Languages className="mr-1 h-3 w-3" />
                    {doctor.languages.join(", ")}
                  </Badge>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t">
              <p className="text-muted-foreground leading-relaxed">
                {doctor.bio}
              </p>
            </div>
          </div>

          {/* Quick Info */}
          <div className="space-y-4">
            <Card>
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Consultation Fee</span>
                  <span className="text-xl font-bold">
                    ${doctor.consultationFee}
                  </span>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span>Available Today</span>
                    <Badge
                      variant={
                        doctor.availability.today ? "default" : "secondary"
                      }
                    >
                      {doctor.availability.today ? "Yes" : "No"}
                    </Badge>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <span>Available Tomorrow</span>
                    <Badge
                      variant={
                        doctor.availability.tomorrow ? "default" : "secondary"
                      }
                    >
                      {doctor.availability.tomorrow ? "Yes" : "No"}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">
                      Accepted Insurance
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {doctor.insurance.map((ins) => (
                      <Badge key={ins} variant="outline" className="text-xs">
                        {ins}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

interface ReviewsTabProps {
  reviews: Review[]
  overallRating: number
  reviewCount: number
}

export function ReviewsTab({
  reviews,
  overallRating,
  reviewCount,
}: ReviewsTabProps) {
  const ratingCounts = {
    5: reviews.filter((r) => r.rating === 5).length,
    4: reviews.filter((r) => r.rating === 4).length,
    3: reviews.filter((r) => r.rating === 3).length,
    2: reviews.filter((r) => r.rating === 2).length,
    1: reviews.filter((r) => r.rating === 1).length,
  }

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Patient Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="text-center space-y-2">
              <div className="text-4xl font-bold">{overallRating}</div>
              <div className="flex justify-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    className={`h-5 w-5 ${
                      star <= overallRating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Based on {reviewCount} reviews
              </p>
            </div>

            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((stars) => (
                <div key={stars} className="flex items-center space-x-2">
                  <div className="flex items-center space-x-1">
                    <span className="text-sm">{stars}</span>
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                  </div>
                  <Progress
                    value={
                      (ratingCounts[stars as keyof typeof ratingCounts] /
                        reviewCount) *
                      100
                    }
                    className="flex-1 h-2"
                  />
                  <span className="text-sm text-muted-foreground w-8">
                    {ratingCounts[stars as keyof typeof ratingCounts]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Individual Reviews */}
      <div className="space-y-4">
        {reviews.map((review) => (
          <Card key={review.id}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={review.patientImage} />
                      <AvatarFallback>
                        {review.patientName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()}
                      </AvatarFallback>
                    </Avatar>

                    <div>
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{review.patientName}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="text-xs">
                            <CheckCircle className="mr-1 h-3 w-3" />
                            Verified Patient
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star
                              key={star}
                              className={`h-4 w-4 ${
                                star <= review.rating
                                  ? "fill-yellow-400 text-yellow-400"
                                  : "text-gray-300"
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {review.date}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground leading-relaxed">
                  {review.comment}
                </p>

                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-sm text-muted-foreground">
                    {review.helpful} people found this helpful
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

interface EducationTabProps {
  education: Education[]
  certifications: Certification[]
  awards: DoctorAward[]
}

export function EducationTab({
  education,
  certifications,
  awards,
}: EducationTabProps) {
  return (
    <div className="space-y-6">
      {/* Education */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <GraduationCap className="h-5 w-5" />
            <span>Education</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {education.map((edu) => (
              <div
                key={edu.id}
                className="flex space-x-4 p-4 border rounded-lg"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                </div>

                <div className="flex-1 space-y-1">
                  <h4 className="font-semibold">{edu.degree}</h4>
                  <p className="text-muted-foreground">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.year}</p>
                  {edu.description && (
                    <p className="text-sm text-muted-foreground mt-2">
                      {edu.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Certifications */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span>Certifications & Licenses</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {certifications.map((cert) => (
              <div
                key={cert.id}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div className="flex space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                      <Shield className="h-6 w-6 text-green-600" />
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold">{cert.name}</h4>
                    <p className="text-muted-foreground">{cert.issuer}</p>
                    <p className="text-sm text-muted-foreground">{cert.year}</p>
                  </div>
                </div>

                <Badge
                  variant={cert.status === "active" ? "default" : "secondary"}
                >
                  {cert.status === "active" ? "Active" : "Expired"}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Awards */}
      {awards.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Award className="h-5 w-5" />
              <span>Awards & Recognition</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {awards.map((award) => (
                <div
                  key={award.id}
                  className="flex space-x-4 p-4 border rounded-lg"
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <Award className="h-6 w-6 text-yellow-600" />
                    </div>
                  </div>

                  <div className="flex-1 space-y-1">
                    <h4 className="font-semibold">{award.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {award.year}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {award.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
