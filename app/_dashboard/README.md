# Dashboard Components

Reusable dashboard components for creating consistent dashboard layouts across the application.

## Components

### DashboardLayout
Provides the main layout structure with sidebar.

```tsx
import { DashboardLayout } from '@/app/_dashboard'

<DashboardLayout>
  {/* Your dashboard content */}
</DashboardLayout>
```

### DashboardHeader
Configurable header with breadcrumbs and actions.

```tsx
import { DashboardHeader } from '@/app/_dashboard'

<DashboardHeader
  breadcrumbs={[
    {
      icon: <YourIcon />,
      href: "#",
      label: "Dashboard"
    },
    {
      label: "Current Page",
      isActive: true
    }
  ]}
  actions={<Button>Action Button</Button>}
/>
```

### DashboardIntro
Page title and description section with optional action button.

```tsx
import { DashboardIntro } from '@/app/_dashboard'

<DashboardIntro
  title="Page Title"
  description="Page description text"
  action={<Button>Primary Action</Button>}
/>
```

### DashboardContent
Wrapper for main dashboard content with proper spacing.

```tsx
import { DashboardContent } from '@/app/_dashboard'

<DashboardContent>
  {/* Your dashboard content */}
</DashboardContent>
```

### DashboardStatsGrid
Grid layout for statistics cards using the primary color theme.

```tsx
import { DashboardStatsGrid } from '@/app/_dashboard'

<DashboardStatsGrid
  stats={[
    {
      title: "Metric Name",
      value: "1,234",
      change: {
        value: "+12%",
        trend: "up" // or "down"
      },
      icon: <YourIcon />,
      href: "/optional-link" // optional
    }
  ]}
/>
```

## Example Usage

See `examples/analytics-dashboard.tsx` for a complete example of how to build a dashboard using these components.

## Color Theme

All components use the application's primary color (`#5bbe5e`) instead of gradients for consistency with the design system. The primary color is applied to:

- Icon backgrounds and borders in stats cards
- Trend indicators (positive trends)
- Interactive elements and accents

## Features

- ✅ Consistent layout across dashboards
- ✅ Responsive design
- ✅ Accessible components
- ✅ TypeScript support
- ✅ Primary color theming
- ✅ No gradients (uses solid colors)
- ✅ Flexible breadcrumb system
- ✅ Optional action buttons
- ✅ Customizable stats display
