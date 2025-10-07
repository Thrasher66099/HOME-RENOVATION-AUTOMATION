"use client"

import { Card } from "@/components/ui/card"
import { ProjectCard } from "@/components/dashboard/project-card"
import { Badge } from "@/components/ui/badge"
import { Spinner } from "@/components/ui/spinner"

interface Project {
  id: string
  name: string
  address: {
    street: string
    city: string
    state: string
    zip: string
  }
  status: string
  budget: number | null
  entity_num?: string | null
  created_at: string
  updated_at: string
}

interface KanbanBoardProps {
  projects: Project[]
  loading: boolean
}

export function KanbanBoard({ projects, loading }: KanbanBoardProps) {
  const statusColumns = [
    { key: 'Draft', label: 'New', color: 'bg-gray-500' },
    { key: 'In Progress', label: 'In Progress', color: 'bg-blue-500' },
    { key: 'Complete', label: 'Complete', color: 'bg-green-500' }
  ]

  const getProjectsByStatus = (status: string) => {
    return projects.filter(p => p.status === status)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner />
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {statusColumns.map((column) => {
        const columnProjects = getProjectsByStatus(column.key)
        return (
          <div key={column.key} className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`h-3 w-3 rounded-full ${column.color}`} />
                <h3 className="font-semibold text-lg">{column.label}</h3>
              </div>
              <Badge variant="secondary">{columnProjects.length}</Badge>
            </div>
            <div className="space-y-4">
              {columnProjects.length === 0 ? (
                <Card className="p-8 text-center border-dashed">
                  <p className="text-sm text-muted-foreground">No projects</p>
                </Card>
              ) : (
                columnProjects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
