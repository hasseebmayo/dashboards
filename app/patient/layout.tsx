import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"
import { PatientSidebar } from "./_components/patient-sidebar"

interface PatientLayoutProps {
  children: React.ReactNode
}

export default function PatientLayout({ children }: PatientLayoutProps) {
  return (
    <SidebarProvider>
      <PatientSidebar />
      <SidebarInset className="overflow-hidden px-4 md:px-6 lg:px-8">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}
