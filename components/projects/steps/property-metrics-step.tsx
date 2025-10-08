"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { AlertCircle, Plus, X } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface PropertyMetricsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

const generateDefaultRooms = (bedroomCount: number) => {
  const baseRooms = [
    { id: "foyer", name: "Foyer", length: 0, width: 0, miscSf: 0, miscNote: "", isCustom: false },
    { id: "family", name: "Family Room", length: 0, width: 0, miscSf: 0, miscNote: "", isCustom: false },
    { id: "kitchen", name: "Kitchen", length: 0, width: 0, miscSf: 0, miscNote: "", isCustom: false },
  ]

  // Add bedrooms based on count
  for (let i = 1; i <= bedroomCount; i++) {
    baseRooms.push({
      id: `bedroom${i}`,
      name: `Bedroom ${i}`,
      length: 0,
      width: 0,
      miscSf: 0,
      miscNote: "",
      isCustom: false
    })
  }

  baseRooms.push({ id: "basement", name: "Basement", length: 0, width: 0, miscSf: 0, miscNote: "", isCustom: false })

  return baseRooms
}

export function PropertyMetricsStep({ formData, updateFormData }: PropertyMetricsStepProps) {
  const [rooms, setRooms] = useState(
    formData.rooms.length > 0 ? formData.rooms : generateDefaultRooms(formData.bedrooms || 3)
  )
  const [customRoomName, setCustomRoomName] = useState("")

  // Update rooms when bedroom count changes
  useEffect(() => {
    const currentBedrooms = rooms.filter((r: any) => r.id.startsWith('bedroom')).length
    const targetBedrooms = formData.bedrooms || 3

    if (currentBedrooms !== targetBedrooms) {
      const nonBedroomRooms = rooms.filter((r: any) => !r.id.startsWith('bedroom'))
      const newBedroomRooms = []

      for (let i = 1; i <= targetBedrooms; i++) {
        const existingBedroom = rooms.find((r: any) => r.id === `bedroom${i}`)
        newBedroomRooms.push(existingBedroom || {
          id: `bedroom${i}`,
          name: `Bedroom ${i}`,
          length: 0,
          width: 0,
          miscSf: 0,
          miscNote: "",
          isCustom: false
        })
      }

      // Insert bedrooms after kitchen (index 2)
      const updatedRooms = [
        ...nonBedroomRooms.slice(0, 3),
        ...newBedroomRooms,
        ...nonBedroomRooms.slice(3)
      ]

      setRooms(updatedRooms)
      updateFormData({ rooms: updatedRooms })
    }
  }, [formData.bedrooms])

  const updateRoom = (roomId: string, field: string, value: any) => {
    const updatedRooms = rooms.map((room: any) => (room.id === roomId ? { ...room, [field]: value } : room))
    setRooms(updatedRooms)
    updateFormData({ rooms: updatedRooms })
  }

  const addCustomRoom = () => {
    if (!customRoomName.trim()) return

    const newRoom = {
      id: `custom-${Date.now()}`,
      name: customRoomName,
      length: 0,
      width: 0,
      miscSf: 0,
      miscNote: "",
      isCustom: true
    }

    const updatedRooms = [...rooms, newRoom]
    setRooms(updatedRooms)
    updateFormData({ rooms: updatedRooms })
    setCustomRoomName("")
  }

  const removeCustomRoom = (roomId: string) => {
    const updatedRooms = rooms.filter((room: any) => room.id !== roomId)
    setRooms(updatedRooms)
    updateFormData({ rooms: updatedRooms })
  }

  const getTotalSf = (room: any) => {
    return (room.length || 0) * (room.width || 0) + (room.miscSf || 0)
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Property Metrics</h2>
        <p className="text-sm text-muted-foreground">Enter room dimensions and property details</p>
      </div>

      {/* Basic Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input
            id="bedrooms"
            type="number"
            value={formData.bedrooms}
            onChange={(e) => updateFormData({ bedrooms: Number.parseInt(e.target.value) })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="sqft">Total Sq Ft</Label>
          <Input
            id="sqft"
            type="number"
            value={formData.sqft}
            onChange={(e) => updateFormData({ sqft: Number.parseInt(e.target.value) })}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="garageType">Garage Type</Label>
          <Select value={formData.garageType} onValueChange={(value) => updateFormData({ garageType: value })}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              <SelectItem value="attached">Attached</SelectItem>
              <SelectItem value="detached">Detached</SelectItem>
              <SelectItem value="carport">Carport</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Room Dimensions */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-medium">Room Dimensions</h3>
          <div className="flex items-center gap-2">
            <Input
              placeholder="Custom room name..."
              value={customRoomName}
              onChange={(e) => setCustomRoomName(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && addCustomRoom()}
              className="w-48"
            />
            <Button onClick={addCustomRoom} size="sm" variant="outline">
              <Plus className="h-4 w-4 mr-1" />
              Add Room
            </Button>
          </div>
        </div>
        <Tabs defaultValue={rooms[0]?.id} className="w-full">
          <TabsList className="grid w-full gap-1 h-auto py-1" style={{ gridTemplateColumns: `repeat(auto-fill, minmax(120px, 1fr))` }}>
            {rooms.map((room: any) => (
              <TabsTrigger key={room.id} value={room.id} className="text-xs relative group h-9">
                {room.name}
                {room.isCustom && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      removeCustomRoom(room.id)
                    }}
                    className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                  >
                    <X className="h-3 w-3" />
                  </button>
                )}
              </TabsTrigger>
            ))}
          </TabsList>
          {rooms.map((room: any) => (
            <TabsContent key={room.id} value={room.id} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-length`}>Length (LF)</Label>
                  <Input
                    id={`${room.id}-length`}
                    type="number"
                    step="0.1"
                    value={room.length || ''}
                    onChange={(e) => updateRoom(room.id, "length", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-width`}>Width (LF)</Label>
                  <Input
                    id={`${room.id}-width`}
                    type="number"
                    step="0.1"
                    value={room.width || ''}
                    onChange={(e) => updateRoom(room.id, "width", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-misc`}>Misc SF</Label>
                  <Input
                    id={`${room.id}-misc`}
                    type="number"
                    step="0.1"
                    value={room.miscSf || ''}
                    onChange={(e) => updateRoom(room.id, "miscSf", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-miscNote`}>Misc Note</Label>
                  <Input
                    id={`${room.id}-miscNote`}
                    placeholder="Optional note..."
                    value={room.miscNote || ''}
                    onChange={(e) => updateRoom(room.id, "miscNote", e.target.value)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Total SF</Label>
                  <div className="h-10 px-3 py-2 rounded-md border bg-muted flex items-center justify-center">
                    <Badge variant="secondary" className="text-base font-semibold">
                      {getTotalSf(room).toFixed(1)} SF
                    </Badge>
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Card>

      {/* Ages */}
      <Card className="p-4 bg-muted/50">
        <h3 className="font-medium mb-4">Equipment Ages</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="roofAge">Roof Age (years)</Label>
            <Input
              id="roofAge"
              type="number"
              value={formData.roofAge}
              onChange={(e) => updateFormData({ roofAge: Number.parseInt(e.target.value) })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="hvacAge">HVAC Age (years)</Label>
            <Input
              id="hvacAge"
              type="number"
              value={formData.hvacAge}
              onChange={(e) => updateFormData({ hvacAge: Number.parseInt(e.target.value) })}
              className={formData.hvacAge >= 13 ? "border-destructive" : ""}
            />
            {formData.hvacAge >= 13 && (
              <Alert variant="destructive" className="mt-2">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription className="text-xs">HVAC system may need replacement</AlertDescription>
              </Alert>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="waterHeaterAge">Water Heater Age (years)</Label>
            <Input
              id="waterHeaterAge"
              type="number"
              value={formData.waterHeaterAge}
              onChange={(e) => updateFormData({ waterHeaterAge: Number.parseInt(e.target.value) })}
            />
          </div>
        </div>
      </Card>

      {/* Regional Adjustments */}
      <Card className="p-4">
        <h3 className="font-medium mb-4">Regional Adjustments</h3>
        <div className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="region">Region</Label>
            <Select value={formData.region} onValueChange={(value) => updateFormData({ region: value })}>
              <SelectTrigger className="max-w-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IL">Illinois (1.21x)</SelectItem>
                <SelectItem value="CA">California (1.35x)</SelectItem>
                <SelectItem value="TX">Texas (1.08x)</SelectItem>
                <SelectItem value="NY">New York (1.42x)</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Alert>
            <AlertDescription className="text-sm">
              Regional multiplier will be applied to all cost estimates. This accounts for local labor rates and
              material costs.
            </AlertDescription>
          </Alert>
        </div>
      </Card>

      {/* Notes */}
      <div className="grid gap-2">
        <Label htmlFor="notes">Project Notes</Label>
        <Textarea
          id="notes"
          placeholder="Add any additional notes about the property..."
          rows={4}
          value={formData.notes}
          onChange={(e) => updateFormData({ notes: e.target.value })}
        />
      </div>
    </div>
  )
}
