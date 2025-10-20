interface DashboardIntroProps {
  title: string
  description: string
  action?: React.ReactNode
}

export function DashboardIntro({
  title,
  description,
  action,
}: DashboardIntroProps) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold">{title}</h1>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {action && action}
    </div>
  )
}
