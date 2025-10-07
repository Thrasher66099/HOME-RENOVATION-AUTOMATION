"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Plus, Save } from "lucide-react"
import { EstimateRoom } from "@/components/estimates/estimate-room"
import { EstimateSidebar } from "@/components/estimates/estimate-sidebar"

const defaultRooms = [
  { id: "general", name: "General", icon: "🏠" },
  { id: "exterior", name: "Exterior", icon: "🏡" },
  { id: "garage", name: "Garage", icon: "🚗" },
  { id: "foyer", name: "Foyer", icon: "🚪" },
  { id: "kitchen", name: "Kitchen", icon: "🍳" },
  { id: "bedrooms", name: "Bedrooms", icon: "🛏️" },
  { id: "basement", name: "Basement", icon: "⬇️" },
]

interface EstimateBuilderProps {
  estimateId: string
}

export function EstimateBuilder({ estimateId }: EstimateBuilderProps) {
  const [rooms] = useState(defaultRooms)
  const [activeRoom, setActiveRoom] = useState("general")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Estimate Builder</h1>
          <p className="text-muted-foreground mt-1">Build detailed cost estimates by room and category</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button>Finalize Estimate</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          <Card className="p-6">
            <Tabs value={activeRoom} onValueChange={setActiveRoom}>
              <div className="flex items-center justify-between mb-4">
                <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 max-w-4xl">
                  {rooms.map((room) => (
                    <TabsTrigger key={room.id} value={room.id} className="text-xs">
                      <span className="hidden sm:inline">{room.icon}</span> {room.name}
                    </TabsTrigger>
                  ))}
                </TabsList>
                <Button variant="outline" size="sm">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Room
                </Button>
              </div>

              {rooms.map((room) => (
                <TabsContent key={room.id} value={room.id}>
                  <EstimateRoom roomId={room.id} roomName={room.name} />
                </TabsContent>
              ))}
            </Tabs>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1">
          <EstimateSidebar />
        </div>
      </div>
    </div>
  )
}
