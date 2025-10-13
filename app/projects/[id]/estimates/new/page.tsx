"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { AppHeader } from "@/components/layout/app-header"
import { AppSidebar } from "@/components/layout/app-sidebar"
import { Breadcrumbs } from "@/components/layout/breadcrumbs"
import { EstimateBuilder } from "@/components/estimates/estimate-builder"
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
}

interface PropertyInfo {
  id: string
  project_id: string
  region_id: string | null
  rooms: Array<{
    id: string
    name: string
    length: number
    width: number
    total_sf: number
  }>
}

export default function NewEstimatePage() {
  const params = useParams()
  const router = useRouter()
  const projectId = params.id as string

  const [project, setProject] = useState<Project | null>(null)
  const [propertyInfo, setPropertyInfo] = useState<PropertyInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchData()
  }, [projectId])

  const fetchData = async () => {
    try {
      setLoading(true)

      // Fetch project
      const { data: projectData, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .eq('id', projectId)
        .single()

      if (projectError) throw projectError
      setProject(projectData)

      // Fetch property info with rooms
      const { data: propertyData, error: propertyError } = await supabase
        .from('property_infos')
        .select('*, rooms(*)')
        .eq('project_id', projectId)
        .single()

      if (propertyError && propertyError.code !== 'PGRST116') {
        throw propertyError
      }

      if (propertyData) {
        setPropertyInfo(propertyData)
      } else {
        // No property info yet - show warning
        toast.warning('No property information found. Please complete property details first.')
      }

    } catch (error) {
      console.error('Error fetching data:', error)
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
          <div className="container mx-auto p-6 max-w-7xl">
            <Breadcrumbs
              items={[
                { label: "Projects", href: "/projects" },
                { label: project.name, href: `/projects/${project.id}` },
                { label: "New Estimate" }
              ]}
            />

            <EstimateBuilder
              projectId={projectId}
              project={project}
              propertyInfo={propertyInfo}
            />
          </div>
        </main>
      </div>
    </div>
  )
}
