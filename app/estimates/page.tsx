import { AppHeader } from '@/components/layout/app-header'
import { AppSidebar } from '@/components/layout/app-sidebar'
import { Breadcrumbs } from '@/components/layout/breadcrumbs'

export default function EstimatesPage() {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6">
            <Breadcrumbs items={[{ label: 'Estimates' }]} />
            <h1 className="text-3xl font-bold">Estimates</h1>
            <p className="text-muted-foreground mt-2">Build and manage project estimates</p>
          </div>
        </main>
      </div>
    </div>
  )
}
