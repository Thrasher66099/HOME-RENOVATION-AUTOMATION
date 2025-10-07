"use client"

import { useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { LineItemsTable } from "@/components/estimates/line-items-table"

const categories = [
  { id: "painting", name: "Painting", items: [] },
  { id: "flooring", name: "Flooring", items: [] },
  { id: "trim", name: "Trim & Molding", items: [] },
  { id: "blinds", name: "Blinds & Window Treatments", items: [] },
  { id: "windows", name: "Windows", items: [] },
  { id: "electrical", name: "Electrical", items: [] },
  { id: "doors", name: "Doors & Hardware", items: [] },
  { id: "hvac", name: "HVAC", items: [] },
  { id: "drywall", name: "Drywall & Repair", items: [] },
]

interface EstimateRoomProps {
  roomId: string
  roomName: string
}

export function EstimateRoom({ roomId, roomName }: EstimateRoomProps) {
  const [expandedCategories, setExpandedCategories] = useState<string[]>(["painting"])

  return (
    <div className="space-y-4">
      <Accordion type="multiple" value={expandedCategories} onValueChange={setExpandedCategories}>
        {categories.map((category) => (
          <AccordionItem key={category.id} value={category.id}>
            <AccordionTrigger className="hover:no-underline">
              <div className="flex items-center justify-between w-full pr-4">
                <span className="font-medium">{category.name}</span>
                <span className="text-sm text-muted-foreground">$0.00</span>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <LineItemsTable categoryId={category.id} roomId={roomId} />
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}
