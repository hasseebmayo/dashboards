import { Quote, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    role: "Patient",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    text: "Exceptional service! The doctors are professional and caring. I got my consultation within minutes and received excellent care.",
    location: "New York",
  },
  {
    id: "2",
    name: "Michael Chen",
    role: "Patient",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    text: "The platform is so easy to use, and the quality of care is outstanding. I can get medical help anytime I need it.",
    location: "California",
  },
  {
    id: "3",
    name: "Emily Davis",
    role: "Patient",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    text: "Great experience! The doctor was thorough and took time to explain everything. Highly recommend this service.",
    location: "Texas",
  },
  {
    id: "4",
    name: "David Wilson",
    role: "Patient",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    text: "Quick, convenient, and professional. This platform has changed how I approach healthcare for the better.",
    location: "Florida",
  },
  {
    id: "5",
    name: "Lisa Anderson",
    role: "Patient",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    text: "The mental health support I received was life-changing. The therapists are compassionate and skilled.",
    location: "Washington",
  },
  {
    id: "6",
    name: "Robert Martinez",
    role: "Patient",
    avatar: "/api/placeholder/40/40",
    rating: 5,
    text: "Excellent platform for getting specialist consultations. Saved me time and provided great medical advice.",
    location: "Colorado",
  },
]

export function TestimonialsSection() {
  return (
    <section className="py-20 md:py-32 bg-muted/20 dark:bg-muted/10">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-3 py-1">
            Testimonials
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            What Our Patients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Don't just take our word for it. Here's what real patients have to
            say about their experience with our platform.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card
              key={testimonial.id}
              className="group hover:shadow-lg transition-all duration-300"
            >
              <CardContent className="p-6 space-y-4">
                {/* Quote icon */}
                <div className="flex justify-between items-start">
                  <Quote className="h-8 w-8 text-primary/20" />
                  <div className="flex">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star
                        key={`star-${testimonial.id}-${i}`}
                        className="h-4 w-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                </div>

                {/* Testimonial text */}
                <p className="text-sm text-muted-foreground leading-relaxed">
                  "{testimonial.text}"
                </p>

                {/* Patient info */}
                <div className="flex items-center space-x-3 pt-4 border-t">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={testimonial.avatar}
                      alt={testimonial.name}
                    />
                    <AvatarFallback>
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="font-medium text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role} • {testimonial.location}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats section */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary">4.9/5</div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">50K+</div>
            <div className="text-sm text-muted-foreground">Happy Patients</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">1000+</div>
            <div className="text-sm text-muted-foreground">Doctors</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary">24/7</div>
            <div className="text-sm text-muted-foreground">Support</div>
          </div>
        </div>
      </div>
    </section>
  )
}
