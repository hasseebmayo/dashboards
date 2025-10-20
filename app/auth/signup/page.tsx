"use client"

import { Eye, EyeOff, Mail, UserPlus } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FormModified from "@/components/ui/form-modified"
import { siteConfig } from "@/lib/config"

const signUpSchema = z
  .object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    agreeToTerms: z.boolean().refine((val) => val === true, {
      message: "You must agree to the terms and conditions",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type SignUpFormData = z.infer<typeof signUpSchema>

export default function SignUpPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const router = useRouter()

  const handleSubmit = (data: SignUpFormData) => {
    console.log("Sign up data:", data)
    // TODO: Implement sign up logic
    // After successful signup, redirect to role selection
    router.push("/auth/role-selection")
  }

  return (
    <div className="min-h-screen bg-background px-4 md:px-6 lg:px-8 py-12 sm:px-6 flex items-center justify-center">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary">
              {siteConfig.name}
            </h1>
          </Link>
          <h2 className="mt-6 text-2xl font-bold text-foreground">
            Create your account
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/auth/signin"
              className="font-medium text-primary hover:text-primary/80"
            >
              Sign in
            </Link>
          </p>
        </div>

        <Card>
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl text-center">Get started</CardTitle>
            <CardDescription className="text-center">
              Create your account to access healthcare services
            </CardDescription>
          </CardHeader>
          <CardContent>
            <FormModified
              schema={signUpSchema}
              onSubmit={handleSubmit}
              defaultValues={{
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                agreeToTerms: false,
              }}
            >
              {({ components }) => (
                <div className="space-y-4">
                  <components.Input
                    name="name"
                    label="Full Name"
                    placeholder="John Doe"
                    autoComplete="name"
                  />

                  <components.Input
                    name="email"
                    label="Email"
                    type="email"
                    placeholder="john.doe@example.com"
                    autoComplete="email"
                  />

                  <components.Field name="password" label="Password">
                    {(field) => (
                      <div className="relative">
                        <input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Create a secure password"
                          autoComplete="new-password"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                          aria-label={
                            showPassword ? "Hide password" : "Show password"
                          }
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    )}
                  </components.Field>

                  <components.Field
                    name="confirmPassword"
                    label="Confirm Password"
                  >
                    {(field) => (
                      <div className="relative">
                        <input
                          {...field}
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 pr-10"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                          aria-label={
                            showConfirmPassword
                              ? "Hide password"
                              : "Show password"
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </button>
                      </div>
                    )}
                  </components.Field>

                  <components.Field name="agreeToTerms">
                    {(field) => (
                      <div className="flex items-start space-x-2">
                        <input
                          {...field}
                          type="checkbox"
                          id="agreeToTerms"
                          className="h-4 w-4 text-primary focus:ring-primary border-input rounded mt-0.5"
                        />
                        <label
                          htmlFor="agreeToTerms"
                          className="text-sm text-muted-foreground"
                        >
                          I agree to the{" "}
                          <a
                            href="/terms"
                            className="font-medium text-primary hover:text-primary/80"
                          >
                            Terms and Conditions
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="font-medium text-primary hover:text-primary/80"
                          >
                            Privacy Policy
                          </a>
                        </label>
                      </div>
                    )}
                  </components.Field>

                  <Button type="submit" className="w-full" size="lg">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Create Account
                  </Button>

                  <div className="mt-6">
                    <div className="relative">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full border-t border-border" />
                      </div>
                      <div className="relative flex justify-center text-sm">
                        <span className="px-2 bg-background text-muted-foreground">
                          Or continue with
                        </span>
                      </div>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        <svg
                          className="w-4 h-4 mr-2"
                          viewBox="0 0 24 24"
                          role="img"
                          aria-labelledby="google-signup-icon"
                        >
                          <title id="google-signup-icon">Google</title>
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Google
                      </Button>

                      <Button
                        variant="outline"
                        type="button"
                        className="w-full"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Microsoft
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </FormModified>
          </CardContent>
        </Card>

        <p className="text-center text-xs text-muted-foreground">
          By creating an account, you agree to our{" "}
          <a
            href="/terms"
            className="font-medium text-primary hover:text-primary/80"
          >
            Terms of Service
          </a>{" "}
          and{" "}
          <a
            href="/privacy"
            className="font-medium text-primary hover:text-primary/80"
          >
            Privacy Policy
          </a>
        </p>
      </div>
    </div>
  )
}
