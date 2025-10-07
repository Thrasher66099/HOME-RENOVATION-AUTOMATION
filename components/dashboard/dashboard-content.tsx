"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { KanbanBoard } from "@/components/dashboard/kanban-board"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { Filter } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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
  created_at: string
  updated_at: string
}

export function DashboardContent() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedRegion, setSelectedRegion] = useState("all")
  const [dateRange, setDateRange] = useState("all")
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    fetchProjects()

    // Subscribe to realtime updates
    const channel = supabase
      .channel('projects_changes')
      .on('postgres_changes',
        { event: '*', schema: 'public', table: 'projects' },
        () => {
          fetchProjects()
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [selectedRegion, dateRange, supabase])

  const fetchProjects = async () => {
    setLoading(true)
    try {
      let query = supabase
        .from('projects')
        .select('*')
        .order('updated_at', { ascending: false })

      // Apply region filter if not "all"
      if (selectedRegion !== 'all') {
        query = query.eq('address->>state', selectedRegion)
      }

      // Apply date range filter
      if (dateRange !== 'all') {
        const now = new Date()
        let startDate: Date

        switch (dateRange) {
          case 'today':
            startDate = new Date(now.setHours(0, 0, 0, 0))
            break
          case 'week':
            startDate = new Date(now.setDate(now.getDate() - 7))
            break
          case 'month':
            startDate = new Date(now.setMonth(now.getMonth() - 1))
            break
          case 'quarter':
            startDate = new Date(now.setMonth(now.getMonth() - 3))
            break
          default:
            startDate = new Date(0)
        }

        query = query.gte('created_at', startDate.toISOString())
      }

      const { data, error } = await query

      if (error) throw error

      setProjects(data || [])
    } catch (error) {
      console.error('Error fetching projects:', error)
    } finally {
      setLoading(false)
    }
  }

  // Filter projects by search query
  const filteredProjects = projects.filter(project => {
    if (!searchQuery) return true
    const searchLower = searchQuery.toLowerCase()
    return (
      project.name.toLowerCase().includes(searchLower) ||
      project.address.street.toLowerCase().includes(searchLower) ||
      project.address.city.toLowerCase().includes(searchLower)
    )
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground mt-1">Welcome back! Here's an overview of your projects.</p>
        </div>
      </div>

      {/* Stats Overview */}
      <DashboardStats />

      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
          <div className="flex-1">
            <Input
              placeholder="Search by address or entity ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-md"
            />
          </div>
          <div className="flex gap-2">
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="IL">Illinois</SelectItem>
                <SelectItem value="CA">California</SelectItem>
                <SelectItem value="TX">Texas</SelectItem>
                <SelectItem value="NY">New York</SelectItem>
              </SelectContent>
            </Select>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Date Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Time</SelectItem>
                <SelectItem value="today">Today</SelectItem>
                <SelectItem value="week">This Week</SelectItem>
                <SelectItem value="month">This Month</SelectItem>
                <SelectItem value="quarter">This Quarter</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Kanban Board */}
      <KanbanBoard projects={filteredProjects} loading={loading} />
    </div>
  )
}
