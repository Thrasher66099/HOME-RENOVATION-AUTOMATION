"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"

interface PropertyMetricsStepProps {
  formData: any
  updateFormData: (data: any) => void
}

const defaultRooms = [
  { id: "foyer", name: "Foyer", length: 0, width: 0, miscSf: 0 },
  { id: "family", name: "Family Room", length: 0, width: 0, miscSf: 0 },
  { id: "kitchen", name: "Kitchen", length: 0, width: 0, miscSf: 0 },
  { id: "bedroom1", name: "Bedroom 1", length: 0, width: 0, miscSf: 0 },
  { id: "bedroom2", name: "Bedroom 2", length: 0, width: 0, miscSf: 0 },
  { id: "bedroom3", name: "Bedroom 3", length: 0, width: 0, miscSf: 0 },
  { id: "basement", name: "Basement", length: 0, width: 0, miscSf: 0 },
]

export function PropertyMetricsStep({ formData, updateFormData }: PropertyMetricsStepProps) {
  const [rooms, setRooms] = useState(formData.rooms.length > 0 ? formData.rooms : defaultRooms)

  const updateRoom = (roomId: string, field: string, value: number) => {
    const updatedRooms = rooms.map((room: any) => (room.id === roomId ? { ...room, [field]: value } : room))
    setRooms(updatedRooms)
    updateFormData({ rooms: updatedRooms })
  }

  const getTotalSf = (room: any) => {
    return room.length * room.width + room.miscSf
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
        <h3 className="font-medium mb-4">Room Dimensions</h3>
        <Tabs defaultValue="foyer" className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7">
            {rooms.map((room: any) => (
              <TabsTrigger key={room.id} value={room.id} className="text-xs">
                {room.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {rooms.map((room: any) => (
            <TabsContent key={room.id} value={room.id} className="space-y-4 mt-4">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-length`}>Length (LF)</Label>
                  <Input
                    id={`${room.id}-length`}
                    type="number"
                    value={room.length}
                    onChange={(e) => updateRoom(room.id, "length", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-width`}>Width (LF)</Label>
                  <Input
                    id={`${room.id}-width`}
                    type="number"
                    value={room.width}
                    onChange={(e) => updateRoom(room.id, "width", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor={`${room.id}-misc`}>Misc SF</Label>
                  <Input
                    id={`${room.id}-misc`}
                    type="number"
                    value={room.miscSf}
                    onChange={(e) => updateRoom(room.id, "miscSf", Number.parseFloat(e.target.value) || 0)}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Total SF</Label>
                  <div className="h-10 px-3 py-2 rounded-md border bg-muted flex items-center">
                    <Badge variant="secondary">{getTotalSf(room).toFixed(0)} SF</Badge>
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
