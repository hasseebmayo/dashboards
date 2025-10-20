import type { Metadata } from "next"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { HeroSection } from "./(public)/_components/hero-section"
import { ServicesSection } from "./(public)/_components/services-section"
import { TestimonialsSection } from "./(public)/_components/testimonials-section"

export const metadata: Metadata = {
  title: "Teleneo - Connect with Top Healthcare Professionals",
  description:
    "Book appointments with verified doctors and healthcare professionals. Get online consultations, in-person visits, and expert medical advice. Trusted by thousands of patients.",
  keywords: [
    "healthcare",
    "doctor appointment",
    "online consultation",
    "medical advice",
    "telemedicine",
    "healthcare platform",
  ],
  openGraph: {
    title: "Teleneo - Connect with Top Healthcare Professionals",
    description:
      "Book appointments with verified doctors and healthcare professionals. Get expert medical care when you need it.",
    type: "website",
    url: "https://teleneo.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Teleneo - Connect with Top Healthcare Professionals",
    description:
      "Book appointments with verified doctors and healthcare professionals.",
  },
}

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />

      <main className="flex-1">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
      </main>
      <SiteFooter />
    </div>
  )
}
