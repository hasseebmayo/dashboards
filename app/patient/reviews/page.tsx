import {
  Calendar,
  Edit,
  MessageSquare,
  Plus,
  Search,
  Star,
  Trash2,
} from "lucide-react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const mockReviews = [
  {
    id: "R001",
    doctorName: "Dr. Sarah Wilson",
    doctorAvatar: "",
    doctorSpecialty: "Cardiology",
    appointmentDate: "2024-01-15",
    service: "General Consultation",
    rating: 5,
    review:
      "Dr. Wilson was incredibly thorough and took the time to explain everything clearly. I felt heard and well-cared for throughout the entire appointment. Highly recommend!",
    date: "2024-01-16",
    helpful: 12,
    canEdit: true,
  },
  {
    id: "R002",
    doctorName: "Dr. Michael Chen",
    doctorAvatar: "",
    doctorSpecialty: "Cardiology",
    appointmentDate: "2024-01-12",
    service: "Cardiology Consultation",
    rating: 4,
    review:
      "Great expertise in cardiology. The doctor explained my condition well and provided a clear treatment plan. The only issue was the wait time.",
    date: "2024-01-13",
    helpful: 8,
    canEdit: true,
  },
  {
    id: "R003",
    doctorName: "Dr. Emily Davis",
    doctorAvatar: "",
    doctorSpecialty: "Mental Health",
    appointmentDate: "2024-01-10",
    service: "Mental Health Consultation",
    rating: 5,
    review:
      "Compassionate and understanding approach. Dr. Davis created a safe space for me to discuss my concerns. The treatment recommendations have been very helpful.",
    date: "2024-01-11",
    helpful: 15,
    canEdit: false,
  },
]

const pendingReviews = [
  {
    id: "PR001",
    doctorName: "Dr. David Wilson",
    doctorAvatar: "",
    doctorSpecialty: "Primary Care",
    appointmentDate: "2024-01-20",
    service: "Prescription Review",
  },
  {
    id: "PR002",
    doctorName: "Dr. Lisa Anderson",
    doctorAvatar: "",
    doctorSpecialty: "Internal Medicine",
    appointmentDate: "2024-01-18",
    service: "Annual Physical Exam",
  },
]

const stats = [
  {
    title: "Reviews Written",
    value: "3",
    icon: MessageSquare,
    change: "total reviews",
  },
  { title: "Average Rating", value: "4.7", icon: Star, change: "your ratings" },
  {
    title: "Pending Reviews",
    value: "2",
    icon: Calendar,
    change: "awaiting review",
  },
]

export default function PatientReviews() {
  const renderStars = (rating: number, interactive = false) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={`star-${i}-${rating}`}
        className={`h-4 w-4 ${interactive ? "cursor-pointer hover:text-yellow-400" : ""} ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/patient" },
          { label: "Reviews", href: "/patient/reviews", isActive: true },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reviews</h1>
            <p className="text-muted-foreground">
              Share your experience with doctors
            </p>
          </div>
          <Button className="flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Write Review
          </Button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          {stats.map((stat) => (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground">{stat.change}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews by doctor name or specialty..."
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reviews Tabs */}
        <Tabs defaultValue="written" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="written">
              My Reviews ({mockReviews.length})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending Reviews ({pendingReviews.length})
            </TabsTrigger>
            <TabsTrigger value="write">Write New Review</TabsTrigger>
          </TabsList>

          <TabsContent value="written" className="space-y-6">
            {mockReviews.map((review) => (
              <Card
                key={review.id}
                className="hover:shadow-lg transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.doctorAvatar} />
                      <AvatarFallback>
                        {review.doctorName
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1 space-y-3">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{review.doctorName}</h4>
                          <p className="text-sm text-muted-foreground">
                            {review.doctorSpecialty}
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center space-x-1">
                            {renderStars(review.rating)}
                          </div>
                          <p className="text-sm text-muted-foreground mt-1">
                            Reviewed on {review.date}
                          </p>
                        </div>
                      </div>

                      <div className="bg-muted/50 p-3 rounded-lg">
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-2">
                          <span>Appointment: {review.service}</span>
                          <span>Date: {review.appointmentDate}</span>
                        </div>
                      </div>

                      <p className="text-gray-700">{review.review}</p>

                      <div className="flex items-center justify-between pt-3 border-t">
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>
                            {review.helpful} people found this helpful
                          </span>
                        </div>

                        <div className="flex items-center space-x-2">
                          {review.canEdit && (
                            <>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4 mr-1" />
                                Edit
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4 mr-1" />
                                Delete
                              </Button>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pendingReviews.map((appointment) => (
                <Card
                  key={appointment.id}
                  className="hover:shadow-lg transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={appointment.doctorAvatar} />
                        <AvatarFallback>
                          {appointment.doctorName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 space-y-3">
                        <div>
                          <h4 className="font-semibold">
                            {appointment.doctorName}
                          </h4>
                          <p className="text-sm text-muted-foreground">
                            {appointment.doctorSpecialty}
                          </p>
                        </div>

                        <div className="bg-muted/50 p-3 rounded-lg">
                          <div className="text-sm space-y-1">
                            <p>
                              <span className="font-medium">Service:</span>{" "}
                              {appointment.service}
                            </p>
                            <p>
                              <span className="font-medium">Date:</span>{" "}
                              {appointment.appointmentDate}
                            </p>
                          </div>
                        </div>

                        <Button className="w-full">
                          <Star className="h-4 w-4 mr-2" />
                          Write Review
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="write" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Write a New Review</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <label
                      htmlFor="doctor-select"
                      className="text-sm font-medium"
                    >
                      Select Doctor
                    </label>
                    <select
                      id="doctor-select"
                      className="w-full mt-1 p-2 border rounded-md"
                    >
                      <option>Choose a doctor to review...</option>
                      {pendingReviews.map((appointment) => (
                        <option key={appointment.id}>
                          {appointment.doctorName} - {appointment.service} (
                          {appointment.appointmentDate})
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <span className="text-sm font-medium">Rating</span>
                    <div className="flex items-center space-x-1 mt-1">
                      {renderStars(0, true)}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="review-text"
                      className="text-sm font-medium"
                    >
                      Your Review
                    </label>
                    <Textarea
                      id="review-text"
                      placeholder="Share your experience with this doctor..."
                      className="mt-1"
                      rows={6}
                    />
                  </div>

                  <div className="space-y-2">
                    <p className="text-sm font-medium">Review Guidelines</p>
                    <ul className="text-sm text-muted-foreground space-y-1">
                      <li>• Be honest and constructive in your feedback</li>
                      <li>• Focus on your personal experience</li>
                      <li>• Avoid sharing personal medical information</li>
                      <li>• Be respectful and professional</li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <Button className="flex-1">Submit Review</Button>
                  <Button variant="outline" className="flex-1">
                    Save as Draft
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}
