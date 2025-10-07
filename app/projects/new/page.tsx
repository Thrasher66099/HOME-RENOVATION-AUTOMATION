import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { PropertyFormWizard } from "@/components/projects/property-form-wizard"

export default function NewProjectPage() {
  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-5xl">
            <Breadcrumbs items={[{ label: "Projects", href: "/projects" }, { label: "New Project" }]} />
            <PropertyFormWizard />
          </div>
        </main>
      </div>
    </div>
  )
}
