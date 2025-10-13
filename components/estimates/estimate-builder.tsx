"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Save, FileText, Check } from "lucide-react"
import { EstimateRoom } from "@/components/estimates/estimate-room"
import { EstimateSidebar } from "@/components/estimates/estimate-sidebar"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface Room {
  id: string
  name: string
  length?: number
  width?: number
  total_sf?: number
}

interface LineItem {
  id: string
  room_name: string
  category: string
  is_required: boolean
  action_description: string
  sku: string
  quantity: number
  unit: string
  unit_cost: number
  notes: string
  sort_order: number
  unit_cost_id?: string
}

interface Project {
  id: string
  name: string
  address: any
}

interface PropertyInfo {
  id: string
  project_id: string
  region_id: string | null
  rooms: Room[]
}

interface EstimateBuilderProps {
  projectId: string
  project: Project
  propertyInfo: PropertyInfo | null
}

const DEFAULT_ROOMS = [
  { id: "general", name: "General", icon: "🏠" },
  { id: "exterior", name: "Exterior", icon: "🏡" },
  { id: "garage", name: "Garage", icon: "🚗" },
  { id: "foyer", name: "Foyer", icon: "🚪" },
  { id: "family_room", name: "Family Room", icon: "🛋️" },
  { id: "dining_room", name: "Dining Room", icon: "🍽️" },
  { id: "kitchen", name: "Kitchen", icon: "🍳" },
  { id: "master_bedroom", name: "Master Bedroom", icon: "🛏️" },
  { id: "master_bathroom", name: "Master Bathroom", icon: "🛁" },
  { id: "basement", name: "Basement", icon: "⬇️" },
]

export function EstimateBuilder({ projectId, project, propertyInfo }: EstimateBuilderProps) {
  const router = useRouter()
  const supabase = createClient()

  const [rooms, setRooms] = useState(DEFAULT_ROOMS)
  const [activeRoom, setActiveRoom] = useState("general")
  const [lineItems, setLineItems] = useState<Record<string, LineItem[]>>({})
  const [estimateId, setEstimateId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [isFinalizing, setIsFinalizing] = useState(false)

  // Initialize estimate on mount
  useEffect(() => {
    createDraftEstimate()
  }, [projectId])

  // Merge property rooms with default rooms
  useEffect(() => {
    if (propertyInfo?.rooms && propertyInfo.rooms.length > 0) {
      const propertyRoomNames = propertyInfo.rooms.map(r => r.name.toLowerCase().replace(/\s+/g, '_'))
      const mergedRooms = DEFAULT_ROOMS.map(defaultRoom => {
        const matchingRoom = propertyInfo.rooms.find(
          r => r.name.toLowerCase().replace(/\s+/g, '_') === defaultRoom.id
        )
        return matchingRoom ? { ...defaultRoom, ...matchingRoom } : defaultRoom
      })
      setRooms(mergedRooms)
    }
  }, [propertyInfo])

  const createDraftEstimate = async () => {
    try {
      const response = await fetch(`/api/projects/${projectId}/estimates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          spec_package: 'Standard',
          valid_until: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        })
      })

      if (!response.ok) throw new Error('Failed to create estimate')

      const { estimate } = await response.json()
      setEstimateId(estimate.id)
    } catch (error) {
      console.error('Error creating estimate:', error)
      toast.error('Failed to create estimate')
    }
  }

  const updateLineItems = (roomId: string, items: LineItem[]) => {
    setLineItems(prev => ({
      ...prev,
      [roomId]: items
    }))
  }

  const saveEstimate = async (finalize: boolean = false) => {
    if (!estimateId) {
      toast.error('No estimate found')
      return
    }

    try {
      if (finalize) {
        setIsFinalizing(true)
      } else {
        setSaving(true)
      }

      // Flatten all line items from all rooms
      const allLineItems = Object.entries(lineItems).flatMap(([roomId, items]) =>
        items.map((item, index) => ({
          ...item,
          room_name: rooms.find(r => r.id === roomId)?.name || roomId,
          sort_order: index
        }))
      )

      // Update estimate with line items
      const response = await fetch(`/api/estimates/${estimateId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          line_items: allLineItems
        })
      })

      if (!response.ok) throw new Error('Failed to save estimate')

      if (finalize) {
        toast.success('Estimate finalized successfully')
        router.push(`/projects/${projectId}`)
      } else {
        toast.success('Estimate saved as draft')
      }
    } catch (error) {
      console.error('Error saving estimate:', error)
      toast.error('Failed to save estimate')
    } finally {
      setSaving(false)
      setIsFinalizing(false)
    }
  }

  const calculateTotals = () => {
    let subtotal = 0
    Object.values(lineItems).forEach(items => {
      items.forEach(item => {
        if (item.is_required) {
          subtotal += item.quantity * item.unit_cost
        }
      })
    })
    return { subtotal }
  }

  const totals = calculateTotals()

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estimate Builder</h1>
          <p className="text-muted-foreground mt-1">
            {project.name} - Build detailed cost estimates by room and category
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => saveEstimate(false)}
            disabled={saving || isFinalizing}
          >
            <Save className="mr-2 h-4 w-4" />
            {saving ? 'Saving...' : 'Save Draft'}
          </Button>
          <Button
            onClick={() => saveEstimate(true)}
            disabled={saving || isFinalizing}
          >
            <Check className="mr-2 h-4 w-4" />
            {isFinalizing ? 'Finalizing...' : 'Finalize Estimate'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <Tabs value={activeRoom} onValueChange={setActiveRoom}>
              <div className="flex items-center justify-between mb-4 gap-4">
                <div className="overflow-x-auto flex-1">
                  <TabsList className="inline-flex w-auto">
                    {rooms.map((room) => (
                      <TabsTrigger key={room.id} value={room.id} className="text-xs whitespace-nowrap">
                        <span className="hidden sm:inline mr-1">{room.icon}</span>
                        {room.name}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                </div>
                <Button variant="outline" size="sm" className="flex-shrink-0">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </div>

              {rooms.map((room) => (
                <TabsContent key={room.id} value={room.id}>
                  <EstimateRoom
                    roomId={room.id}
                    roomName={room.name}
                    roomData={room}
                    lineItems={lineItems[room.id] || []}
                    onUpdateLineItems={(items) => updateLineItems(room.id, items)}
                    estimateId={estimateId}
                  />
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <EstimateSidebar
            subtotal={totals.subtotal}
            regionId={propertyInfo?.region_id || null}
            lineItems={lineItems}
          />
        </div>
      </div>
    </div>
  )
}
