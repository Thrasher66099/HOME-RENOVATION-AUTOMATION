"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, Loader2 } from "lucide-react"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface UnitCost {
  id: string
  category: string
  subcategory: string | null
  action_item: string
  description: string | null
  unit: string
  sku: string | null
  material_cost: number
  labor_cost: number
  labor_hours: number | null
  oh_profit: number
  workmans_comp: number
  insurance: number
  gc_fee: number
  is_active: boolean
  effective_date: string
  notes: string | null
  region_id: string | null
}

interface UnitCostSearchProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSelectUnitCost: (unitCost: UnitCost) => void
  categoryFilter?: string
}

export function UnitCostSearch({
  open,
  onOpenChange,
  onSelectUnitCost,
  categoryFilter
}: UnitCostSearchProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [unitCosts, setUnitCosts] = useState<UnitCost[]>([])
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  useEffect(() => {
    if (open) {
      fetchUnitCosts()
    }
  }, [open, searchQuery])

  const fetchUnitCosts = async () => {
    try {
      setLoading(true)

      let query = supabase
        .from('unit_costs')
        .select('*')
        .eq('is_active', true)
        .order('action_item', { ascending: true })

      if (searchQuery) {
        query = query.or(`action_item.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%,sku.ilike.%${searchQuery}%`)
      }

      const { data, error } = await query

      if (error) throw error
      setUnitCosts(data || [])
    } catch (error) {
      console.error('Error fetching unit costs:', error)
      toast.error('Failed to load unit costs')
    } finally {
      setLoading(false)
    }
  }

  const calculateTotalCost = (unitCost: UnitCost) => {
    const materialWithTax = unitCost.material_cost * 1.0625 // Default tax rate
    const laborWithOverhead = unitCost.labor_cost * (
      1 +
      unitCost.oh_profit +
      unitCost.workmans_comp +
      unitCost.insurance
    )
    return materialWithTax + laborWithOverhead + unitCost.gc_fee
  }

  const handleSelect = (unitCost: UnitCost) => {
    onSelectUnitCost(unitCost)
    onOpenChange(false)
    toast.success(`Added ${unitCost.action_item}`)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Search Unit Costs</DialogTitle>
          <DialogDescription>
            Search and select items from your unit cost library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by name, description, or SKU..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Results */}
          <ScrollArea className="h-[400px] border rounded-lg">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
              </div>
            ) : unitCosts.length === 0 ? (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                <div className="text-center">
                  <p>No unit costs found</p>
                  {searchQuery && (
                    <p className="text-sm mt-1">Try a different search term</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-4 space-y-2">
                {unitCosts.map((unitCost) => {
                  const totalCost = calculateTotalCost(unitCost)

                  return (
                    <div
                      key={unitCost.id}
                      className="border rounded-lg p-4 hover:bg-accent transition-colors"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 space-y-1">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium">{unitCost.action_item}</h4>
                            <Badge variant="outline" className="text-xs">
                              {unitCost.category}
                            </Badge>
                            {unitCost.subcategory && (
                              <Badge variant="secondary" className="text-xs">
                                {unitCost.subcategory}
                              </Badge>
                            )}
                          </div>
                          {unitCost.description && (
                            <p className="text-sm text-muted-foreground">{unitCost.description}</p>
                          )}
                          {unitCost.sku && (
                            <p className="text-xs text-muted-foreground font-mono">SKU: {unitCost.sku}</p>
                          )}
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span>Material: ${unitCost.material_cost.toFixed(2)}/{unitCost.unit}</span>
                            <span>Labor: ${unitCost.labor_cost.toFixed(2)}/{unitCost.unit}</span>
                            {unitCost.labor_hours && (
                              <span>Hours: {unitCost.labor_hours}</span>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2 ml-4">
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">Total Cost</div>
                            <div className="text-lg font-bold font-mono">
                              ${totalCost.toFixed(2)}/{unitCost.unit}
                            </div>
                          </div>
                          <Button size="sm" onClick={() => handleSelect(unitCost)}>
                            <Plus className="h-4 w-4 mr-1" />
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            )}
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  )
}
