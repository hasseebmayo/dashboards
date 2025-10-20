"use client"

import { Stethoscope, User } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card"

export default function RoleSelectionPage() {
  const router = useRouter()

  const handleRoleSelect = (role: "doctor" | "patient") => {
    // Store the selected role (you can use localStorage, context, or state management)
    localStorage.setItem("selectedRole", role)

    // Redirect to the appropriate onboarding flow
    if (role === "doctor") {
      router.push("/auth/onboarding/doctor")
    } else {
      router.push("/auth/onboarding/patient")
    }
  }

  return (
    <div className="min-h-screen bg-background px-4 md:px-6 lg:px-8 py-12 sm:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">Teleneo</h1>
          </Link>
          <h2 className="mt-6 text-3xl font-bold text-foreground">
            You want to join as
          </h2>
          <p className="mt-2 text-lg text-muted-foreground">
            Choose your role to get started with the right experience
          </p>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Card */}
          <Card
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50"
            onClick={() => handleRoleSelect("doctor")}
          >
            <CardContent className="text-center p-8">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <Stethoscope className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Doctor</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Provide healthcare services
              </CardDescription>
            </CardContent>
          </Card>

          {/* Patient Card */}
          <Card
            className="cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02] border-2 hover:border-primary/50"
            onClick={() => handleRoleSelect("patient")}
          >
            <CardContent className="text-center p-8">
              <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                <User className="w-10 h-10 text-primary" />
              </div>
              <CardTitle className="text-2xl mb-2">Patient</CardTitle>
              <CardDescription className="text-base text-muted-foreground">
                Access healthcare services
              </CardDescription>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
