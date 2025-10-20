import { ArrowRight, Play } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { siteConfig } from "@/lib/config"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-background to-secondary/10 dark:from-primary/5 dark:via-background dark:to-secondary/5">
      <div className="relative z-10 py-20 md:py-32">
        <div className="flex items-center justify-center min-h-[60vh]">
          {/* Content */}
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <div className="inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium">
              <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
              {siteConfig.company.license}
            </div>

            <div className="space-y-4">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
                Your Health, <span className="text-primary">Our Priority</span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Connect with certified healthcare professionals from the comfort
                of your home. Quality healthcare is just a click away.
              </p>
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Button size="lg" asChild className="group">
                <Link href="/search">
                  Book Appointment
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 pt-8 border-t max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-2xl font-bold">1000+</div>
                <div className="text-sm text-muted-foreground">Doctors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">50K+</div>
                <div className="text-sm text-muted-foreground">Patients</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">24/7</div>
                <div className="text-sm text-muted-foreground">Support</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">4.9/5</div>
                <div className="text-sm text-muted-foreground">Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute -top-40 -right-40 h-80 w-80 rounded-full bg-primary/10 dark:bg-primary/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-secondary/10 dark:bg-secondary/5 blur-3xl" />
      </div>
    </section>
  )
}
