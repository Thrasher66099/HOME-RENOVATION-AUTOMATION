"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Trash2, Search } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { UnitCostSearch } from "@/components/estimates/unit-cost-search"

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

interface LineItemsTableProps {
  categoryId: string
  categoryName: string
  roomId: string
  roomName: string
  items: LineItem[]
  onUpdateItems: (items: LineItem[]) => void
  roomTotalSf?: number
}

export function LineItemsTable({
  categoryId,
  categoryName,
  roomId,
  roomName,
  items,
  onUpdateItems,
  roomTotalSf
}: LineItemsTableProps) {
  const [searchOpen, setSearchOpen] = useState(false)

  const addItem = (unitCostData?: any) => {
    const newItem: LineItem = {
      id: `temp-${Date.now()}-${Math.random()}`,
      room_name: roomName,
      category: categoryId,
      is_required: true,
      action_description: unitCostData?.action_item || "",
      sku: unitCostData?.sku || "",
      quantity: roomTotalSf || 0,
      unit: unitCostData?.unit || "SF",
      unit_cost: unitCostData ? calculateUnitCost(unitCostData) : 0,
      notes: "",
      sort_order: items.length,
      unit_cost_id: unitCostData?.id
    }
    onUpdateItems([...items, newItem])
  }

  const calculateUnitCost = (unitCostData: any) => {
    const materialWithTax = unitCostData.material_cost * (1 + (unitCostData.tax_rate || 0.0625))
    const laborWithOverhead = unitCostData.labor_cost * (
      1 +
      (unitCostData.oh_profit || 0.06) +
      (unitCostData.workmans_comp || 0.01) +
      (unitCostData.insurance || 0.01)
    )
    return materialWithTax + laborWithOverhead + (unitCostData.gc_fee || 0)
  }

  const removeItem = (id: string) => {
    onUpdateItems(items.filter((item) => item.id !== id))
  }

  const updateItem = (id: string, field: keyof LineItem, value: any) => {
    onUpdateItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    )
  }

  const calculateTotal = (item: LineItem) => {
    return item.quantity * item.unit_cost
  }

  return (
    <div className="space-y-4">
      {/* Action Bar */}
      <div className="flex items-center gap-2">
        <Button onClick={() => setSearchOpen(true)} size="sm" variant="outline">
          <Search className="h-4 w-4 mr-2" />
          Search Unit Costs
        </Button>
        <Button onClick={() => addItem()} size="sm" variant="outline">
          <Plus className="h-4 w-4 mr-2" />
          Add Custom Item
        </Button>
      </div>

      {/* Table */}
      {items.length > 0 ? (
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">Req</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="w-32">SKU</TableHead>
                <TableHead className="w-24">Qty</TableHead>
                <TableHead className="w-20">Unit</TableHead>
                <TableHead className="w-28">Unit Cost</TableHead>
                <TableHead className="w-28">Total</TableHead>
                <TableHead className="w-12"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((item) => (
                <TableRow key={item.id} className={item.is_required ? "bg-primary/5" : ""}>
                  <TableCell>
                    <Checkbox
                      checked={item.is_required}
                      onCheckedChange={(checked) => updateItem(item.id, "is_required", checked)}
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={item.action_description}
                      onChange={(e) => updateItem(item.id, "action_description", e.target.value)}
                      placeholder="Item description"
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
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, "quantity", Number.parseFloat(e.target.value) || 0)}
                      className="h-8"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Select value={item.unit} onValueChange={(value) => updateItem(item.id, "unit", value)}>
                      <SelectTrigger className="h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="SF">SF</SelectItem>
                        <SelectItem value="LF">LF</SelectItem>
                        <SelectItem value="EA">EA</SelectItem>
                        <SelectItem value="Unit">Unit</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Input
                      type="number"
                      value={item.unit_cost}
                      onChange={(e) => updateItem(item.id, "unit_cost", Number.parseFloat(e.target.value) || 0)}
                      className="h-8 font-mono"
                      step="0.01"
                    />
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="font-mono">
                      ${calculateTotal(item).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ) : (
        <div className="border rounded-lg p-8 text-center text-muted-foreground">
          <p>No items in this category</p>
          <p className="text-sm mt-1">Click "Search Unit Costs" to add items from your library</p>
        </div>
      )}

      {/* Unit Cost Search Dialog */}
      <UnitCostSearch
        open={searchOpen}
        onOpenChange={setSearchOpen}
        onSelectUnitCost={addItem}
        categoryFilter={categoryId}
      />
    </div>
  )
}
