"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { PropertyFormWizard } from "@/components/projects/property-form-wizard"
import { Spinner } from "@/components/ui/spinner"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Project {
  id: string
  name: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  entity_num?: string | null
  status: string
}

interface PropertyInfo {
  id: string
  region_id: string | null
  rent_amount: number | null
  sq_ft_bpo: number | null
  sq_ft_actual: number | null
  bedrooms: number | null
  bathrooms: number | null
  facade_type: string | null
  garage_type: string | null
  garage_size: number | null
  has_basement: boolean | null
  floors: number | null
  foundation_area: number | null
  roof_area: number | null
  roof_age: number | null
  hvac_age: number | null
  water_heater_age: number | null
  utilities: any
  safety_checklist: any
  notes: string | null
  rooms: Array<{
    id: string
    name: string
    length: number
    width: number
    misc_sf: number
    misc_note: string
  }>
}

export default function EditProjectPage() {
  const params = useParams()
  const router = useRouter()
  const [project, setProject] = useState<Project | null>(null)
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProjectData()
  }, [params.id])

  const fetchProjectData = async () => {
    try {
      setLoading(true)

      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', params.id)
        .single()

      if (projectError) throw projectError
      setProject(projectData)

      // Fetch property info with rooms - use maybeSingle to handle 0 or 1 results
      const { data: propertyData, error: propertyError } = await supabase
        .from('property_infos')
        .select('*, rooms(*)')
        .eq('project_id', params.id)
        .maybeSingle()

      if (propertyError) {
        console.error('Error fetching property info:', propertyError)
        // Don't throw - property info might not exist yet
      }

      if (propertyData) {
        setPropertyInfo(propertyData)
      } else {
        console.log('No property info found for project, will create new')
      }

    } catch (error) {
      console.error('Error fetching project data:', error)
      toast.error('Failed to load project data')
      router.push('/projects')
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen flex-col">
        <AppHeader />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar />
          <main className="flex-1 overflow-y-auto">
            <div className="flex items-center justify-center min-h-[400px]">
              <Spinner />
            </div>
          </main>
        </div>
      </div>
    )
  }

  if (!project) {
    return null
  }

  return (
    <div className="flex h-screen flex-col">
      <AppHeader />
      <div className="flex flex-1 overflow-hidden">
        <AppSidebar />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-6 max-w-5xl">
            <Breadcrumbs
              items={[
                { label: "Projects", href: "/projects" },
                { label: project.name, href: `/projects/${project.id}` },
                { label: "Edit" }
              ]}
            />
            <PropertyFormWizard
              mode="edit"
              projectId={project.id}
              initialProject={project}
              initialPropertyInfo={propertyInfo}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
