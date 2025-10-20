import { ArrowLeft, FileQuestion, Home } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

interface NotFoundProps {
  title?: string
  description?: string
  showBackButton?: boolean
  backUrl?: string
  backText?: string
  homeUrl?: string
}

export function NotFound({
  title = "Page Not Found",
  description = "Sorry, we couldn't find the page you're looking for.",
  showBackButton = true,
  backUrl = "/",
  backText = "Go Back",
  homeUrl = "/",
}: NotFoundProps) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-6">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-muted">
            <FileQuestion className="h-10 w-10 text-muted-foreground" />
          </div>

          <h1 className="mb-2 text-2xl font-bold">{title}</h1>
          <p className="mb-6 text-muted-foreground">{description}</p>

          <div className="flex flex-col gap-2 sm:flex-row sm:justify-center">
            {showBackButton && (
              <Link href={backUrl}>
                <Button variant="outline" className="w-full sm:w-auto">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  {backText}
                </Button>
              </Link>
            )}
            <Link href={homeUrl}>
              <Button className="w-full sm:w-auto">
                <Home className="mr-2 h-4 w-4" />
                Go Home
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
