import type { Metadata } from "next"
import SearchPageClient from "./client"

export const metadata: Metadata = {
  title: "Find Doctors & Healthcare Professionals | Teleneo",
  description:
    "Search and book appointments with qualified doctors and healthcare professionals. Filter by specialty, location, availability, and more. Find the right healthcare provider for your needs.",
  keywords: [
    "find doctors",
    "search doctors",
    "book appointment",
    "healthcare professionals",
    "medical specialists",
    "doctor search",
  ],
  openGraph: {
    title: "Find Doctors & Healthcare Professionals | Teleneo",
    description:
      "Search and book appointments with qualified doctors. Filter by specialty, location, and availability.",
    type: "website",
  },
}

export default function SearchPage() {
  return <SearchPageClient />
}
