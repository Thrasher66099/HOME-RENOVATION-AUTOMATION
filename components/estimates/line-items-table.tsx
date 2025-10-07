"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface LineItem {
  id: string
  required: boolean
  action: string
  description: string
  quantity: number
  material: string
  costPer: number
  tax: number
  labor: number
  notes: string
}

interface LineItemsTableProps {
  categoryId: string
  roomId: string
}

export function LineItemsTable({ categoryId, roomId }: LineItemsTableProps) {
  const [items, setItems] = useState<LineItem[]>([
    {
      id: "1",
      required: true,
      action: "install",
      description: "Interior Paint - Walls",
      quantity: 250,
      material: "Behr Premium Plus",
      costPer: 0.85,
      tax: 0.08,
      labor: 1.2,
      notes: "",
    },
  ])

  const [searchQuery, setSearchQuery] = useState("")

  const addItem = () => {
    const newItem: LineItem = {
      id: Date.now().toString(),
      required: false,
      action: "install",
      description: "",
      quantity: 0,
      material: "",
      costPer: 0,
      tax: 0.08,
      labor: 0,
      notes: "",
    }
    setItems([...items, newItem])
  }

  const removeItem = (id: string) => {
    setItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const calculateTotal = (item: LineItem) => {
    const materialCost = item.quantity * item.costPer
    const taxAmount = materialCost * item.tax
    const laborCost = item.quantity * item.labor
    return materialCost + taxAmount + laborCost
  }

  return (
    <div className="space-y-4">
      {/* Search Bar */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search item library..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button onClick={addItem} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Item
        </Button>
      </div>

      {/* Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">Req</TableHead>
              <TableHead className="w-32">Action</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-24">Qty/SF</TableHead>
              <TableHead className="w-40">Material/SKU</TableHead>
              <TableHead className="w-24">Cost Per</TableHead>
              <TableHead className="w-24">Labor</TableHead>
              <TableHead className="w-28">Total</TableHead>
              <TableHead className="w-12"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No items added. Click "Add Item" to get started.
                </TableCell>
              </TableRow>
            ) : (
              items.map((item) => (
                <TableRow key={item.id} className={item.required ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={item.required}
                      onCheckedChange={(checked) => updateItem(item.id, "required", checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={item.action} onValueChange={(value) => updateItem(item.id, "action", value)}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="install">Install</SelectItem>
                        <SelectItem value="replace">Replace</SelectItem>
                        <SelectItem value="repair">Repair</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
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
                      onChange={(e) => updateItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.material}
                      onChange={(e) => updateItem(item.id, "material", e.target.value)}
                      placeholder="Material/SKU"
                      className="h-8"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.costPer}
                      onChange={(e) => updateItem(item.id, "costPer", Number.parseFloat(e.target.value) || 0)}
                      className="h-8"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.labor}
                      onChange={(e) => updateItem(item.id, "labor", Number.parseFloat(e.target.value) || 0)}
                      className="h-8"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono">
                      ${calculateTotal(item).toFixed(2)}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
