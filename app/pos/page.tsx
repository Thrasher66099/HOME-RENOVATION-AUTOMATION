import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Plus, Eye, Download } from "lucide-react"
import Link from "next/link"

const mockPOs = [
  {
    id: "001",
    property: "123 Oak Street, Chicago, IL",
    scope: "General",
    status: "approved",
    total: 634.36,
    date: "2024-01-15",
  },
  {
    id: "002",
    property: "456 Maple Ave, Springfield, IL",
    scope: "Kitchen",
    status: "ordered",
    total: 1247.82,
    date: "2024-01-14",
  },
  {
    id: "003",
    property: "789 Pine Road, Naperville, IL",
    scope: "Exterior",
    status: "received",
    total: 892.15,
    date: "2024-01-12",
  },
]

export default function POsListPage() {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <Breadcrumbs items={[{ label: "Purchase Orders" }]} />

            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold">Purchase Orders</h1>
                <p className="text-muted-foreground mt-1">Manage and track all purchase orders</p>
              </div>
              <Button asChild>
                <Link href="/pos/new">
                  <Plus className="mr-2 h-4 w-4" />
                  New PO
                </Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {mockPOs.map((po) => (
                <Card key={po.id} className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">PO #{po.id}</h3>
                        <Badge variant={po.status === "received" ? "default" : "secondary"}>{po.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{po.property}</p>
                      <p className="text-xs text-muted-foreground">
                        Scope: {po.scope} • {po.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <p className="text-2xl font-bold">${po.total.toFixed(2)}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/pos/${po.id}`}>
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
