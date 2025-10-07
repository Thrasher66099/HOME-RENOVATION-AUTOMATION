import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { POGenerator } from "@/components/pos/po-generator"

export default function POPage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            <Breadcrumbs items={[{ label: "Purchase Orders", href: "/pos" }, { label: `PO #${params.id}` }]} />
            <POGenerator poId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}
