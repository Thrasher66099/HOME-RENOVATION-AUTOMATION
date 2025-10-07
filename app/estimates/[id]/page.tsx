import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { EstimateBuilder } from "@/components/estimates/estimate-builder"

export default function EstimatePage({ params }: { params: { id: string } }) {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-7xl">
            <Breadcrumbs items={[{ label: "Estimates", href: "/estimates" }, { label: `Estimate #${params.id}` }]} />
            <EstimateBuilder estimateId={params.id} />
          </div>
        </main>
      </div>
    </div>
  )
}
