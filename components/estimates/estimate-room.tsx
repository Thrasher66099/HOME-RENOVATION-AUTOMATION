"use client"

import { useState, useEffect } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LineItemsTable } from "@/components/estimates/line-items-table"
import { Badge } from "@/components/ui/badge"

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

interface RoomData {
  id: string
  name: string
  length?: number
  width?: number
  total_sf?: number
}

const CATEGORIES = [
  { id: "painting", name: "Painting" },
  { id: "flooring", name: "Flooring" },
  { id: "wall_tile", name: "Wall Tile" },
  { id: "trim", name: "Trim & Molding" },
  { id: "blinds", name: "Blinds & Window Treatments" },
  { id: "windows", name: "Windows" },
  { id: "smoke_detectors", name: "Smoke/CO Detectors" },
  { id: "doors", name: "Doors & Hardware" },
  { id: "electrical", name: "Electrical" },
  { id: "plumbing", name: "Plumbing" },
  { id: "hvac", name: "HVAC" },
  { id: "appliances", name: "Appliances" },
  { id: "cabinets", name: "Cabinets & Countertops" },
  { id: "drywall", name: "Drywall & Repair" },
  { id: "miscellaneous", name: "Miscellaneous" },
]

interface EstimateRoomProps {
  roomId: string
  roomName: string
  roomData?: RoomData
  lineItems: LineItem[]
  onUpdateLineItems: (items: LineItem[]) => void
  estimateId: string | null
}

export function EstimateRoom({
  roomId,
  roomName,
  roomData,
  lineItems,
  onUpdateLineItems,
  estimateId
}: EstimateRoomProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["painting"])

  // Group line items by category
  const getItemsByCategory = (categoryId: string) => {
    return lineItems.filter(item => item.category === categoryId)
  }

  // Update items for a specific category
  const updateCategoryItems = (categoryId: string, newItems: LineItem[]) => {
    // Remove old items for this category
    const otherItems = lineItems.filter(item => item.category !== categoryId)
    // Add new items for this category
    const updatedItems = [...otherItems, ...newItems]
    onUpdateLineItems(updatedItems)
  }

  // Calculate total for each category
  const getCategoryTotal = (categoryId: string) => {
    const items = getItemsByCategory(categoryId)
    return items
      .filter(item => item.is_required)
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0)
  }

  // Calculate room total
  const getRoomTotal = () => {
    return lineItems
      .filter(item => item.is_required)
      .reduce((sum, item) => sum + (item.quantity * item.unit_cost), 0)
  }

  return (
    <div className="space-y-4">
      {/* Room Info Card */}
      {roomData && (roomData.length || roomData.width || roomData.total_sf) && (
        <div className="bg-muted/50 rounded-lg p-4 flex items-center justify-between">
          <div className="grid grid-cols-3 gap-4 text-sm">
            {roomData.length && roomData.width && (
              <div>
                <span className="text-muted-foreground">Dimensions:</span>{" "}
                <span className="font-medium">{roomData.length}' × {roomData.width}'</span>
              </div>
            )}
            {roomData.total_sf && (
              <div>
                <span className="text-muted-foreground">Total SF:</span>{" "}
                <span className="font-medium">{roomData.total_sf} sq ft</span>
              </div>
            )}
          </div>
          <div>
            <span className="text-sm text-muted-foreground">Room Total:</span>{" "}
            <Badge variant="secondary" className="ml-2 font-mono text-base">
              ${getRoomTotal().toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </Badge>
          </div>
        </div>
      )}

      {/* Categories Accordion */}
      <Accordion type="multiple" value={expandedCategories} onValueChange={setExpandedCategories}>
        {CATEGORIES.map((category) => {
          const categoryItems = getItemsByCategory(category.id)
          const categoryTotal = getCategoryTotal(category.id)
          const itemCount = categoryItems.filter(item => item.is_required).length

          return (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    {itemCount > 0 && (
                      <Badge variant="outline" className="text-xs">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                      </Badge>
                    )}
                  </div>
                  <span className="text-sm font-mono text-muted-foreground">
                    ${categoryTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <LineItemsTable
                  categoryId={category.id}
                  categoryName={category.name}
                  roomId={roomId}
                  roomName={roomName}
                  items={categoryItems}
                  onUpdateItems={(items) => updateCategoryItems(category.id, items)}
                  roomTotalSf={roomData?.total_sf}
                />
              </AccordionContent>
            </AccordionItem>
          )
        })}
      </Accordion>
    </div>
  )
}
