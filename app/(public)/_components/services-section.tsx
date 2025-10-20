import {
  ArrowRight,
  Award,
  Brain,
  Clock,
  CreditCard,
  Heart,
  Pill,
  Shield,
  Video,
} from "lucide-react"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { featuresConfig, servicesConfig } from "@/lib/config"

const iconMap = {
  video: Video,
  pill: Pill,
  heart: Heart,
  brain: Brain,
  clock: Clock,
  shield: Shield,
  certificate: Award,
  "credit-card": CreditCard,
}

export function ServicesSection() {
  return (
    <section id="services" className="py-20 md:py-32">
      <div className="w-full max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <Badge variant="outline" className="px-3 py-1">
            Our Services
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Comprehensive Healthcare Solutions
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            From routine check-ups to specialized care, we provide a full range
            of healthcare services tailored to your needs.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {servicesConfig.map((service) => {
            const Icon = iconMap[service.icon as keyof typeof iconMap]
            return (
              <Card
                key={service.id}
                className="group hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20"
              >
                <CardHeader className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {service.price}
                    </Badge>
                  </div>
                  <div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm">
                      {service.description}
                    </CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ul className="space-y-2">
                    {service.features.map((feature, index) => (
                      // biome-ignore lint/suspicious/noArrayIndexKey: index
                      <li key={index} className="flex items-center text-sm">
                        <div className="mr-2 h-1.5 w-1.5 rounded-full bg-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    variant="ghost"
                    className="w-full justify-between group-hover:bg-primary/10"
                    asChild
                  >
                    <Link href="/search">
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Features Grid */}
        <div className="space-y-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold tracking-tight">
              Why Choose Us?
            </h3>
            <p className="text-muted-foreground mt-2">
              We're committed to providing the highest quality healthcare
              experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuresConfig.map((feature, index) => {
              const Icon = iconMap[feature.icon as keyof typeof iconMap]
              return (
                // biome-ignore lint/suspicious/noArrayIndexKey: index
                <Card key={index} className="text-center border-0 shadow-none">
                  <CardHeader className="space-y-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 mx-auto">
                      <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {feature.description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              )
            })}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 via-primary/5 to-secondary/10 p-8 md:p-12">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold tracking-tight md:text-3xl">
                Ready to Get Started?
              </h3>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Join thousands of patients who trust us with their healthcare
                needs. Book your first appointment today and experience the
                difference.
              </p>
              <Button size="lg" asChild className="group">
                <Link href="/search">
                  Book Your Appointment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
