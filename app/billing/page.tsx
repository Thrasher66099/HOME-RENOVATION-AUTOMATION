import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"
import Link from "next/link"

const mockInvoices = [
  {
    id: "001",
    projectId: "1",
    property: "123 Oak Street, Chicago, IL",
    type: "Initial",
    amount: 6950,
    status: "paid",
    date: "2024-01-15",
  },
  {
    id: "002",
    projectId: "1",
    property: "123 Oak Street, Chicago, IL",
    type: "Final",
    amount: 2230,
    status: "unpaid",
    date: "2024-01-20",
  },
  {
    id: "003",
    projectId: "2",
    property: "456 Maple Ave, Springfield, IL",
    type: "Initial",
    amount: 8500,
    status: "partial",
    date: "2024-01-18",
  },
]

export default function BillingListPage() {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <Breadcrumbs items={[{ label: "Billing" }]} />

            <div className="mb-6">
              <h1 className="text-3xl font-bold">Billing & Invoices</h1>
              <p className="text-muted-foreground mt-1">Track payments and manage invoices</p>
            </div>

            {/* Summary Cards */}
            <div className="grid gap-4 md:grid-cols-3 mb-6">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Total Outstanding</p>
                <p className="text-3xl font-bold mt-2">$10,730</p>
                <p className="text-xs text-muted-foreground mt-1">2 unpaid invoices</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Paid This Month</p>
                <p className="text-3xl font-bold mt-2">$6,950</p>
                <p className="text-xs text-green-600 dark:text-green-500 mt-1">+12% from last month</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Total Invoiced</p>
                <p className="text-3xl font-bold mt-2">$17,680</p>
                <p className="text-xs text-muted-foreground mt-1">3 invoices</p>
              </Card>
            </div>

            {/* Invoice List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Recent Invoices</h2>
              {mockInvoices.map((invoice) => (
                <Card key={invoice.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">Invoice #{invoice.id}</h3>
                        <Badge
                          variant={
                            invoice.status === "paid"
                              ? "default"
                              : invoice.status === "partial"
                                ? "secondary"
                                : "outline"
                          }
                          className={
                            invoice.status === "paid"
                              ? "bg-green-500"
                              : invoice.status === "partial"
                                ? "bg-yellow-500"
                                : ""
                          }
                        >
                          {invoice.status}
                        </Badge>
                        <Badge variant="outline">{invoice.type}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{invoice.property}</p>
                      <p className="text-xs text-muted-foreground">{invoice.date}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">${invoice.amount.toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/billing/${invoice.projectId}`}>
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Link>
                        </Button>
                        <Button variant="outline" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
