import {
  Filter,
  MessageSquare,
  Reply,
  Search,
  Star,
  ThumbsUp,
  TrendingUp,
  User,
} from "lucide-react"
import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"

const mockReviews = [
  {
    id: "R001",
    patientName: "Sarah Johnson",
    patientAvatar: "",
    rating: 5,
    date: "2024-01-15",
    service: "General Consultation",
    review:
      "Dr. Smith was incredibly thorough and took the time to explain everything clearly. I felt heard and well-cared for throughout the entire appointment. Highly recommend!",
    response: null,
    helpful: 12,
    verified: true,
  },
  {
    id: "R002",
    patientName: "Michael Chen",
    patientAvatar: "",
    rating: 4,
    date: "2024-01-12",
    service: "Cardiology Consultation",
    review:
      "Great expertise in cardiology. The doctor explained my condition well and provided a clear treatment plan. The only issue was the wait time.",
    response:
      "Thank you for your feedback, Michael. I apologize for the wait time and will work to improve scheduling. I'm glad I could help with your treatment plan.",
    helpful: 8,
    verified: true,
  },
  {
    id: "R003",
    patientName: "Emily Davis",
    patientAvatar: "",
    rating: 5,
    date: "2024-01-10",
    service: "Mental Health Consultation",
    review:
      "Compassionate and understanding approach. Dr. Smith created a safe space for me to discuss my concerns. The treatment recommendations have been very helpful.",
    response: null,
    helpful: 15,
    verified: true,
  },
  {
    id: "R004",
    patientName: "David Wilson",
    patientAvatar: "",
    rating: 3,
    date: "2024-01-08",
    service: "Prescription Review",
    review:
      "The consultation was fine, but I felt rushed. Would have appreciated more time to discuss side effects and alternatives.",
    response: null,
    helpful: 3,
    verified: true,
  },
  {
    id: "R005",
    patientName: "Lisa Anderson",
    patientAvatar: "",
    rating: 5,
    date: "2024-01-05",
    service: "Annual Physical Exam",
    review:
      "Thorough examination and great preventive care advice. Dr. Smith is knowledgeable and professional. Will definitely return for future care.",
    response:
      "Thank you, Lisa! I'm glad you found the examination helpful. Looking forward to seeing you for your next annual checkup.",
    helpful: 9,
    verified: true,
  },
]

const stats = [
  { title: "Overall Rating", value: "4.6", icon: Star, change: "out of 5" },
  {
    title: "Total Reviews",
    value: "127",
    icon: MessageSquare,
    change: "+8 this month",
  },
  {
    title: "Response Rate",
    value: "85%",
    icon: Reply,
    change: "+5% improvement",
  },
  {
    title: "Verified Reviews",
    value: "98%",
    icon: User,
    change: "authenticity",
  },
]

export default function DoctorReviews() {
  const averageRating = 4.6
  const ratingDistribution = [
    { stars: 5, count: 89, percentage: 70 },
    { stars: 4, count: 25, percentage: 20 },
    { stars: 3, count: 8, percentage: 6 },
    { stars: 2, count: 3, percentage: 2 },
    { stars: 1, count: 2, percentage: 2 },
  ]

  const unrespondedReviews = mockReviews.filter((r) => !r.response)
  const respondedReviews = mockReviews.filter((r) => r.response)

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={`star-${i}-${rating}`}
        className={`h-4 w-4 ${
          i < rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
        }`}
      />
    ))
  }

  return (
    <>
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/doctor" },
          { label: "Reviews", href: "/doctor/reviews", isActive: true },
        ]}
      />
      <div className="container mx-auto p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold mb-2">Reviews</h1>
            <p className="text-muted-foreground">
              Manage patient feedback and ratings
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" />
              Analytics
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
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

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Rating Overview */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Rating Overview</CardTitle>
              <CardDescription>Your overall rating breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center mb-6">
                <div className="text-4xl font-bold mb-2">{averageRating}</div>
                <div className="flex justify-center mb-2">
                  {renderStars(Math.round(averageRating))}
                </div>
                <p className="text-sm text-muted-foreground">
                  Based on 127 reviews
                </p>
              </div>

              <div className="space-y-3">
                {ratingDistribution.map((item) => (
                  <div key={item.stars} className="flex items-center space-x-3">
                    <span className="text-sm font-medium w-8">
                      {item.stars}★
                    </span>
                    <div className="flex-1 h-2 bg-muted rounded-full">
                      <div
                        className="h-full bg-yellow-400 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-muted-foreground w-8">
                      {item.count}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Quick Response</CardTitle>
              <CardDescription>Respond to recent reviews</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="review-select"
                    className="text-sm font-medium"
                  >
                    Select Review
                  </label>
                  <select
                    id="review-select"
                    className="w-full mt-1 p-2 border rounded-md"
                  >
                    <option>Select a review to respond to...</option>
                    {unrespondedReviews.map((review) => (
                      <option key={review.id}>
                        {review.patientName} - {review.rating}★ (
                        {review.service})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="response-textarea"
                    className="text-sm font-medium"
                  >
                    Your Response
                  </label>
                  <Textarea
                    id="response-textarea"
                    placeholder="Thank you for your review..."
                    className="mt-1"
                    rows={4}
                  />
                </div>
                <Button className="w-full">Send Response</Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search reviews by patient name, service, or content..."
                className="flex-1"
              />
            </div>
          </CardContent>
        </Card>

        {/* Reviews Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
            <TabsTrigger value="all">All Reviews</TabsTrigger>
            <TabsTrigger value="pending">
              Need Response ({unrespondedReviews.length})
            </TabsTrigger>
            <TabsTrigger value="responded">
              Responded ({respondedReviews.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <ReviewList reviews={mockReviews} renderStars={renderStars} />
          </TabsContent>

          <TabsContent value="pending">
            <ReviewList
              reviews={unrespondedReviews}
              renderStars={renderStars}
            />
          </TabsContent>

          <TabsContent value="responded">
            <ReviewList reviews={respondedReviews} renderStars={renderStars} />
          </TabsContent>
        </Tabs>
      </div>
    </>
  )
}

function ReviewList({
  reviews,
  renderStars,
}: {
  reviews: typeof mockReviews
  renderStars: (rating: number) => React.ReactElement[]
}) {
  return (
    <div className="space-y-6">
      {reviews.map((review) => (
        <Card key={review.id}>
          <CardContent className="p-6">
            <div className="flex items-start space-x-4">
              <Avatar>
                <AvatarImage src={review.patientAvatar} />
                <AvatarFallback>
                  {review.patientName
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold">{review.patientName}</h4>
                      {review.verified && (
                        <Badge variant="secondary" className="text-xs">
                          Verified
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <div className="flex">{renderStars(review.rating)}</div>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {review.date}
                      </span>
                      <span className="text-sm text-muted-foreground">•</span>
                      <span className="text-sm text-muted-foreground">
                        {review.service}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-gray-700">{review.review}</p>

                {review.response && (
                  <div className="bg-muted/50 p-4 rounded-lg mt-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Reply className="h-4 w-4 text-primary" />
                      <span className="font-medium text-sm">Your Response</span>
                    </div>
                    <p className="text-sm text-gray-600">{review.response}</p>
                  </div>
                )}

                <div className="flex items-center justify-between pt-3 border-t">
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.helpful} people found this helpful</span>
                  </div>

                  <div className="flex items-center space-x-2">
                    {!review.response && (
                      <Button variant="outline" size="sm">
                        <Reply className="h-4 w-4 mr-1" />
                        Respond
                      </Button>
                    )}
                    <Button variant="ghost" size="sm">
                      <MessageSquare className="h-4 w-4 mr-1" />
                      Contact
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
