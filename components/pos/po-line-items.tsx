"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2 } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface POLineItem {
  id: string
  lineNumber: number
  description: string
  quantity: number
  sku: string
  materialCost: number
}

export function POLineItems() {
  const [items, setItems] = useState<POLineItem[]>([
    {
      id: "1",
      lineNumber: 1,
      description: "Interior Paint - Behr Premium Plus (Gallon)",
      quantity: 15,
      sku: "PPU18-15",
      materialCost: 32.98,
    },
    {
      id: "2",
      lineNumber: 2,
      description: "Paint Roller Kit - 9 inch",
      quantity: 5,
      sku: "HDX-RK9",
      materialCost: 12.47,
    },
    {
      id: "3",
      lineNumber: 3,
      description: "Drop Cloth - 9x12 Canvas",
      quantity: 3,
      sku: "HDX-DC912",
      materialCost: 24.98,
    },
  ])

  const TAX_RATE = 0.08

  const addItem = () => {
    const newItem: POLineItem = {
      id: Date.now().toString(),
      lineNumber: items.length + 1,
      description: "",
      quantity: 0,
      sku: "",
      materialCost: 0,
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    const filtered = items.filter((item) => item.id !== id)
    // Renumber items
    const renumbered = filtered.map((item, index) => ({ ...item, lineNumber: index + 1 }))
    setItems(renumbered)
  }

  const updateItem = (id: string, field: keyof POLineItem, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateItemTotal = (item: POLineItem) => {
    const subtotal = item.quantity * item.materialCost
    const tax = subtotal * TAX_RATE
    return subtotal + tax
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-lg">Line Items</h3>
        <Button onClick={addItem} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-16">#</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24">Qty</TableHead>
              <TableHead className="w-32">SKU</TableHead>
              <TableHead className="w-28">Material Cost</TableHead>
              <TableHead className="w-24">Tax (8%)</TableHead>
              <TableHead className="w-28">Total</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                  No items added. Click "Add Item" to get started.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => {
                const subtotal = item.quantity * item.materialCost
                const tax = subtotal * TAX_RATE
                const total = calculateItemTotal(item)

                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium text-muted-foreground">{item.lineNumber}</TableCell>
                    <TableCell>
                      <Input
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        placeholder="Item description"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity}
                        onChange={(e) => updateItem(item.id, "quantity", Number.parseInt(e.target.value) || 0)}
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.sku}
                        onChange={(e) => updateItem(item.id, "sku", e.target.value)}
                        placeholder="SKU"
                        className="h-8"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.materialCost}
                        onChange={(e) => updateItem(item.id, "materialCost", Number.parseFloat(e.target.value) || 0)}
                        className="h-8"
                        step="0.01"
                      />
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="font-mono text-xs">
                        ${tax.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant="default" className="font-mono">
                        ${total.toFixed(2)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )
              })
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
