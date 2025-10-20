import type { Metadata } from "next"
import SignInClient from "./client"

export const metadata: Metadata = {
  title: "Sign In | Teleneo",
  description:
    "Sign in to your Teleneo account to access your dashboard, book appointments, and manage your healthcare needs.",
  keywords: [
    "sign in",
    "login",
    "healthcare login",
    "patient portal",
    "doctor portal",
  ],
  openGraph: {
    title: "Sign In | Teleneo",
    description:
      "Sign in to your Teleneo account to access your healthcare dashboard.",
    type: "website",
  },
}

export default function SignInPage() {
  return <SignInClient />
}
