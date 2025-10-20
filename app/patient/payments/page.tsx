import { DashboardHeader } from "@/app/_dashboard/dashboard-header"
import { InsuranceInfo } from "./_components/insurance-info"
import { PaymentMethods } from "./_components/payment-methods"
import { PaymentStats } from "./_components/payment-stats"
import { PaymentTables } from "./_components/payment-tables"

export default function PatientPaymentsPage() {
  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <DashboardHeader
        breadcrumbs={[
          { label: "Dashboard", href: "/patient" },
          {
            label: "Billing & Payments",
            href: "/patient/payments",
            isActive: true,
          },
        ]}
      />

      {/* Payment Stats */}
      <PaymentStats />

      {/* Payment History */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Payment History</h3>
        <PaymentTables />
      </div>

      {/* Payment Methods and Insurance */}
      <div className="grid gap-6 md:grid-cols-2">
        <PaymentMethods />
        <InsuranceInfo />
      </div>
    </div>
  )
}
