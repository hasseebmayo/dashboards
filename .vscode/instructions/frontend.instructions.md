---
applyTo: "app/**/*.tsx"
---

# Frontend Development Instructions

## Hospital & Organization Management Admin Panel

This is the admin frontend for managing hospitals, organizations, and their subscriptions.

## Code Organization Rules

### File Size Limit
- **Maximum 150 lines per file** - If a file exceeds this limit, break it into smaller components
- Divide large components into smaller, focused components
- Extract logic into custom hooks when appropriate
- Use composition over large monolithic components

### Component Structure
```
components/
├── ui/                          # shadcn/ui components (generated)
├── _feature-name/               # Feature-specific components folder
│   ├── feature-main.tsx         # Main component (< 150 lines)
│   ├── feature-item.tsx         # Sub-component
│   ├── feature-form.tsx         # Form component
│   └── feature-actions.tsx      # Action buttons/logic
└── shared/                      # Reusable components across features
```

### Folder Naming Convention
- Use underscore prefix for component folders: `_organization-management/`
- Use descriptive, kebab-case names: `_subscription-billing/`
- Group related components together in feature folders
- Keep shared components in dedicated folders

## UI Framework Requirements

### shadcn/ui Only
- **ONLY use shadcn/ui components** - No other UI libraries
- Customize shadcn components through CSS variables and Tailwind
- Extend shadcn components when needed, don't replace them
- Use Lucide React icons (included with shadcn)

### Component Examples
```tsx
// ✅ Good - Uses shadcn components
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

// ❌ Bad - External UI library
import { Button } from "antd"
```

## Feature Development Guidelines

### Organization Management
- Organization list with search and filters
- Organization detail view with tabs (info, users, subscriptions)
- Organization creation wizard (multi-step form)
- Organization settings and configuration
- User assignment and role management

### Subscription Management
- Subscription plan comparison
- Billing history and invoices
- Plan upgrade/downgrade flows
- Payment method management
- Usage metrics and limits

### User Management
- User directory (read-only, managed by Better Auth)
- User role assignment within organizations
- User activity and audit logs
- Permission management interface

## Component Architecture

### Page Components (App Router)
```tsx
// app/(protected)/organizations/page.tsx
export default function OrganizationsPage() {
  return (
    <div className="container mx-auto py-6">
      <OrganizationHeader />
      <OrganizationFilters />
      <OrganizationList />
    </div>
  )
}
```

### Feature Components
```tsx
// components/_organization-management/organization-list.tsx (< 150 lines)
import { OrganizationCard } from "./organization-card"
import { OrganizationSkeleton } from "./organization-skeleton"

export function OrganizationList() {
  // Component logic (< 150 lines)
}
```

### Sub-components
```tsx
// components/_organization-management/organization-card.tsx
export function OrganizationCard({ organization }: Props) {
  return (
    <Card>
      <CardHeader>
        <OrganizationActions organization={organization} />
      </CardHeader>
      <CardContent>
        <OrganizationDetails organization={organization} />
      </CardContent>
    </Card>
  )
}
```

## State Management

### Server State
- Use TanStack Query (React Query) for server state
- Implement proper caching strategies



### Client State
- Use React's built-in state (useState, useReducer)
- Lift state up when needed for component communication
- Use Context sparingly for truly global state
- Prefer props drilling for 2-3 component levels

## Form Management

### Form Components
- Use react-hook-form with Zod validation
- Create reusable form field components
- Implement proper error handling and display
- Use form-modified from *components/ui/form-modified.tsx*
```tsx
"use client"

import { GalleryVerticalEnd } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FormModified from "@/components/ui/form-modified"
import { type RegisterFormData, registerSchema } from "@/lib/schema/auth"

export function RegisterForm() {
  const handleSubmit = (data: RegisterFormData) => {
    console.log("Register data:", data)
    // TODO: Implement register logic with MCP server
  }

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Teleneo
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-sm">
            <Card>
              <CardHeader>
                <CardTitle>Create your account</CardTitle>
                <CardDescription>
                  Enter your information to get started
                </CardDescription>
              </CardHeader>
              <CardContent>
                <FormModified
                  schema={registerSchema}
                  onSubmit={handleSubmit}
                  defaultValues={{
                    organizationName: "",
                    username: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                >
                  {({ components }) => (
                    <div className="flex flex-col gap-6">
                      <div className="grid gap-4">
                        <components.Input
                          name="organizationName"
                          label="Organization Name"
                          placeholder="Enter your organization name"
                          autoComplete="organization"
                        />

                        <components.Input
                          name="username"
                          label="Username"
                          placeholder="Enter your username"
                          autoComplete="username"
                        />

                        <components.Input
                          name="email"
                          label="Email"
                          type="email"
                          placeholder="m@example.com"
                          autoComplete="email"
                        />

                        <components.Input
                          name="password"
                          label="Password"
                          type="password"
                          placeholder="Enter your password"
                          autoComplete="new-password"
                        />

                        <components.Input
                          name="confirmPassword"
                          label="Confirm Password"
                          type="password"
                          placeholder="Confirm your password"
                          autoComplete="new-password"
                        />
                      </div>

                      <div className="text-xs text-muted-foreground">
                        By creating an account, you agree to our{" "}
                        <button
                          type="button"
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          Terms of Service
                        </button>{" "}
                        and{" "}
                        <button
                          type="button"
                          className="underline underline-offset-4 hover:text-primary"
                        >
                          Privacy Policy
                        </button>
                        .
                      </div>

                      <Button type="submit" className="w-full">
                        Create account
                      </Button>

                      <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">
                          Or continue with
                        </span>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full"
                        type="button"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          className="mr-2 h-4 w-4"
                          aria-hidden="true"
                        >
                          <title>Google Logo</title>
                          <path
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                            fill="#4285F4"
                          />
                          <path
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                            fill="#34A853"
                          />
                          <path
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                            fill="#FBBC05"
                          />
                          <path
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                            fill="#EA4335"
                          />
                        </svg>
                        Sign up with Google
                      </Button>
                    </div>
                  )}
                </FormModified>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </div>
  )
}

```

### Form Structure Example
```tsx
// components/_organization-management/organization-form.tsx
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormField, FormItem, FormLabel, FormControl } from "@/components/ui/form"

export function OrganizationForm() {
  const form = useForm({
    resolver: zodResolver(organizationSchema)
  })

  // Form logic (< 150 lines)
}
```

### Error Handling
- Display user-friendly error messages
- Implement retry mechanisms for failed requests
- Log errors for debugging (without sensitive data)
- Provide fallback UI for error states

## Responsive Design

### Mobile-First Approach
- Design for mobile screens first
- Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
- Test on various screen sizes
- Ensure touch-friendly interactions

### Layout Guidelines
- Use CSS Grid and Flexbox for layouts
- Implement collapsible sidebars for mobile
- Stack cards vertically on small screens
- Use responsive typography scales

## Performance Optimization

### Component Optimization
- Use React.memo for expensive components
- Implement proper useCallback and useMemo usage
- Lazy load heavy components and pages
- Optimize image loading with Next.js Image

### Bundle Optimization
- Use dynamic imports for large features
- Implement code splitting at route level
- Monitor bundle size with bundlephobia
- Remove unused dependencies regularly

## Accessibility

### ARIA Guidelines
- Use semantic HTML elements
- Add proper ARIA labels and descriptions
- Ensure keyboard navigation works
- Test with screen readers

### Color and Contrast
- Maintain WCAG 2.1 AA compliance
- Use sufficient color contrast ratios
- Don't rely solely on color for information
- Support dark/light mode preferences
