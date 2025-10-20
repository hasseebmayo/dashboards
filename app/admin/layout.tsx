import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { AdminSidebar } from "./_components/admin-sidebar"

interface AdminLayoutProps {
  children: React.ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  return (
    <SidebarProvider>
      <AdminSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
