"use client"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { GripVertical } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const categories = [
  {
    id: "general",
    name: "General Improvements",
    items: [
      { id: "paint", name: "Interior Paint - All Rooms", amount: 3500 },
      { id: "fixtures", name: "Light Fixtures", amount: 450 },
      { id: "hardware", name: "Door Hardware", amount: 280 },
    ],
  },
  {
    id: "flooring",
    name: "Flooring-Carpet",
    items: [
      { id: "carpet-br", name: "Carpet Installation - Bedrooms", amount: 2800 },
      { id: "carpet-stairs", name: "Carpet - Stairs", amount: 650 },
    ],
  },
  {
    id: "appliances",
    name: "Appliances",
    items: [
      { id: "fridge", name: "Refrigerator - Stainless Steel", amount: 1200 },
      { id: "dishwasher", name: "Dishwasher", amount: 650 },
      { id: "microwave", name: "Microwave - Over Range", amount: 380 },
    ],
  },
]

interface CategoryTreeProps {
  initialItems: any[]
  finalItems: any[]
  onInitialChange: (items: any[]) => void
  onFinalChange: (items: any[]) => void
}

export function CategoryTree({ initialItems, finalItems, onInitialChange, onFinalChange }: CategoryTreeProps) {
  const handleAssignToInitial = (item: any) => {
    if (!initialItems.find((i) => i.id === item.id)) {
      onInitialChange([...initialItems, item])
    }
  }

  const handleAssignToFinal = (item: any) => {
    if (!finalItems.find((i) => i.id === item.id)) {
      onFinalChange([...finalItems, item])
    }
  }

  const isInInitial = (itemId: string) => initialItems.some((i) => i.id === itemId)
  const isInFinal = (itemId: string) => finalItems.some((i) => i.id === itemId)

  return (
    <Card className="p-6">
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">Category Assignment</h3>
          <p className="text-sm text-muted-foreground">Drag items to assign to Initial or Final invoice</p>
        </div>

        <Accordion type="multiple" defaultValue={["general", "flooring", "appliances"]}>
          {categories.map((category) => (
            <AccordionItem key={category.id} value={category.id}>
              <AccordionTrigger className="hover:no-underline">
                <div className="flex items-center justify-between w-full pr-4">
                  <span className="font-medium">{category.name}</span>
                  <Badge variant="secondary">{category.items.length} items</Badge>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="space-y-2 pt-2">
                  {category.items.map((item) => (
                    <Card key={item.id} className="p-3 hover:bg-muted/50 transition-colors">
                      <div className="flex items-center gap-3">
                        <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        <div className="flex-1">
                          <p className="text-sm font-medium">{item.name}</p>
                          <p className="text-xs text-muted-foreground">${item.amount.toLocaleString()}</p>
                        </div>
                        <div className="flex gap-1">
                          <Button
                            variant={isInInitial(item.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleAssignToInitial(item)}
                            disabled={isInInitial(item.id)}
                          >
                            Initial
                          </Button>
                          <Button
                            variant={isInFinal(item.id) ? "default" : "outline"}
                            size="sm"
                            onClick={() => handleAssignToFinal(item)}
                            disabled={isInFinal(item.id)}
                          >
                            Final
                          </Button>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Card>
  )
}
