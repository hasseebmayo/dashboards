import { TrendingUp } from "lucide-react"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string
  change: {
    value: string
    trend: "up" | "down"
  }
  icon: React.ReactNode
  href?: string
}

export function DashboardStatsCard({
  title,
  value,
  change,
  icon,
  href,
}: StatsCardProps) {
  const isPositive = change.trend === "up"
  const trendColor = isPositive ? "text-primary" : "text-red-500"

  return (
    <div className="relative p-4 lg:p-5 group before:absolute before:inset-y-8 before:right-0 before:w-px before:bg-border last:before:hidden">
      <div className="relative flex items-center gap-4">
        <TrendingUp
          className="absolute right-0 top-0 opacity-0 group-has-[a:hover]:opacity-100 transition-opacity text-primary"
          size={20}
          aria-hidden="true"
        />
        {/* Icon */}
        <div className="max-[480px]:hidden size-10 shrink-0 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
          {icon}
        </div>
        {/* Content */}
        <div>
          {href ? (
            <a
              href={href}
              className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60 before:absolute before:inset-0"
            >
              {title}
            </a>
          ) : (
            <div className="font-medium tracking-widest text-xs uppercase text-muted-foreground/60">
              {title}
            </div>
          )}
          <div className="text-2xl font-semibold mb-2">{value}</div>
          <div className="text-xs text-muted-foreground/60">
            <span className={cn("font-medium", trendColor)}>
              {isPositive ? "↗" : "↘"} {change.value}
            </span>{" "}
            vs last week
          </div>
        </div>
      </div>
    </div>
  )
}

interface DashboardStatsGridProps {
  stats: StatsCardProps[]
}

export function DashboardStatsGrid({ stats }: DashboardStatsGridProps) {
  return (
    <div className="grid grid-cols-2 min-[1200px]:grid-cols-4 border border-border rounded-xl bg-card">
      {stats.map((stat) => (
        <DashboardStatsCard key={stat.title} {...stat} />
      ))}
    </div>
  )
}
