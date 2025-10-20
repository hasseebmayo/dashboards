import type { Metadata } from "next"
import { NotFound } from "@/components/not-found"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export const metadata: Metadata = {
  title: "Page Not Found | Teleneo",
  description: "The page you're looking for doesn't exist.",
}

export default function NotFoundPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <NotFound
          title="404 - Page Not Found"
          description="The page you're looking for doesn't exist or has been moved."
          homeUrl="/"
        />
      </main>
      <SiteFooter />
    </div>
  )
}
