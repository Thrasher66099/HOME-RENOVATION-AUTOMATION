"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Edit, Eye, Trash2, MapPin } from "lucide-react"
import Link from "next/link"

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

  return (
    <Card className="p-4 hover:shadow-lg transition-shadow cursor-pointer group">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <Link href={`/projects/${project.id}`}>
            <h4 className="font-medium text-sm leading-tight mb-1 hover:text-primary transition-colors">
              {project.name}
            </h4>
          </Link>
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
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem asChild>
              <Link href={`/projects/${project.id}`}>
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={`/projects/${project.id}/edit`}>
                <Edit className="mr-2 h-4 w-4" />
                Edit Project
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-destructive">
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
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
