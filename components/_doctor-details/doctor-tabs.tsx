import { Award, GraduationCap, MessageSquare, Star } from "lucide-react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Education {
  degree: string
  school: string
  year: string
}

interface Review {
  id: number
  patientName: string
  rating: number
  comment: string
  date: string
}

interface DoctorTabsProps {
  doctor: {
    education: Education[]
    certifications: string[]
    reviews: Review[]
    experience: string
  }
}

export function DoctorTabs({ doctor }: DoctorTabsProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <Tabs defaultValue="reviews" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="reviews" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="education" className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Education
            </TabsTrigger>
            <TabsTrigger value="experience" className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              Experience
            </TabsTrigger>
          </TabsList>

          <TabsContent value="reviews" className="mt-6">
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Patient Reviews</h3>
                <span className="text-sm text-gray-600">
                  {doctor.reviews.length} total reviews
                </span>
              </div>

              <div className="space-y-4">
                {doctor.reviews.map((review) => (
                  <div
                    key={review.id}
                    className="border-b border-gray-200 pb-4 last:border-b-0"
                  >
                    <div className="flex items-start gap-4">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback>
                          {review.patientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-gray-900">
                              {review.patientName}
                            </p>
                            <p className="text-sm text-gray-600">
                              {new Date(review.date).toLocaleDateString()}
                            </p>
                          </div>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={`star-${review.id}-${i}`}
                                className={`w-4 h-4 ${
                                  i < review.rating
                                    ? "fill-yellow-400 text-yellow-400"
                                    : "text-gray-300"
                                }`}
                                aria-hidden="true"
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700">{review.comment}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Education & Training
                </h3>
                <div className="space-y-4">
                  {doctor.education.map((edu) => (
                    <div
                      key={`${edu.school}-${edu.year}`}
                      className="flex items-start gap-4"
                    >
                      <div className="flex-shrink-0">
                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                          <GraduationCap className="w-5 h-5 text-blue-600" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">
                          {edu.degree}
                        </h4>
                        <p className="text-gray-600">{edu.school}</p>
                        <p className="text-sm text-gray-500">
                          Graduated {edu.year}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-4">Certifications</h3>
                <div className="space-y-2">
                  {doctor.certifications.map((cert) => (
                    <div key={cert} className="flex items-center gap-2">
                      <Award className="w-4 h-4 text-green-600" />
                      <span className="text-gray-700">{cert}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4">
                  Professional Experience
                </h3>
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Award className="w-5 h-5 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      {doctor.experience}
                    </span>
                  </div>
                  <p className="text-blue-800">
                    Extensive experience in providing high-quality medical care
                    with a focus on patient-centered treatment and the latest
                    medical advances.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900 mb-3">
                  Areas of Expertise
                </h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">Preventive Care</Badge>
                  <Badge variant="outline">Diagnostic Excellence</Badge>
                  <Badge variant="outline">Patient Communication</Badge>
                  <Badge variant="outline">Advanced Procedures</Badge>
                  <Badge variant="outline">Research & Innovation</Badge>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
