"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

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

interface ProjectCardProps {
  project: Project
}

export function ProjectCard({ project }: ProjectCardProps) {
  const router = useRouter()

  const formatCurrency = (amount: number | null) => {
    if (!amount) return '$0'
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const handleCardClick = () => {
    router.push(`/projects/${project.id}`)
  }

  return (
    <Card
      className="p-4 hover:shadow-lg transition-all cursor-pointer hover:border-primary/50"
      onClick={handleCardClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-medium text-sm leading-tight mb-1 group-hover:text-primary transition-colors">
            {project.name}
          </h4>
          <div className="flex items-start gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3 w-3 mt-0.5 flex-shrink-0" />
            <span>
              {project.address.street}, {project.address.city}, {project.address.state}
            </span>
          </div>
          {project.entity_num && (
            <p className="text-xs text-muted-foreground mt-1">{project.entity_num}</p>
          )}
        </div>
      </div>

      {/* Budget Info */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div>
          <p className="text-xs text-muted-foreground">Budget</p>
          <p className="text-sm font-semibold">{formatCurrency(project.budget)}</p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Status</p>
          <Badge variant="secondary" className="text-xs">{project.status}</Badge>
        </div>
      </div>

      {/* Dates */}
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>Created: {formatDate(project.created_at)}</span>
          <span>Updated: {formatDate(project.updated_at)}</span>
        </div>
      </div>
    </Card>
  )
}
