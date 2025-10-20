"use client"

import { ArrowLeft, Search } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function SearchHeader() {
  return (
    <header className="border-b bg-white dark:bg-gray-800 shadow-sm">
      <div className="container mx-auto px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back to Home
            </Link>
          </Button>
        </div>

        <div className="space-y-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
              Find Your Doctor
            </h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Search for healthcare providers by name, specialty, or location
            </p>
          </div>

          {/* Main Search Bar */}
          <div className="relative max-w-2xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" aria-hidden="true" />
            </div>
            <Input
              type="text"
              placeholder="Search doctors, specialties, or locations..."
              className="pl-10 pr-4 py-3 text-lg border-gray-300 focus:ring-primary focus:border-primary"
              aria-label="Search for doctors, specialties, or locations"
            />
          </div>

          {/* Quick Filters */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Popular searches:
            </span>
            {["Cardiologist", "Dentist", "Dermatologist", "Pediatrician"].map(
              (specialty) => (
                <Button
                  key={specialty}
                  variant="outline"
                  size="sm"
                  className="text-xs hover:bg-primary hover:text-primary-foreground"
                >
                  {specialty}
                </Button>
              )
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
