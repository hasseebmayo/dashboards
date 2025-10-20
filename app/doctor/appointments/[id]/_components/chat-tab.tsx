import { MessageSquare } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function ChatTab() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patient Communication</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">
            Chat Feature Coming Soon
          </h3>
          <p className="text-muted-foreground">
            Real-time communication with patients will be available in a future
            update.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
