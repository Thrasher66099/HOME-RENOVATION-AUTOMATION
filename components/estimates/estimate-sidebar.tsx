"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react"
import { createClient } from "@/lib/supabase/client"

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
}

interface Region {
  id: string
  name: string
  state: string
  location_factor: number
  rsmeans_factor: number
  contingency: number
  traditional: number | null
  tax_rate: number
}

interface EstimateSidebarProps {
  subtotal: number
  regionId: string | null
  lineItems: Record<string, LineItem[]>
}

export function EstimateSidebar({ subtotal, regionId, lineItems }: EstimateSidebarProps) {
  const supabase = createClient()
  const [region, setRegion] = useState<Region | null>(null)
  const [feePercent, setFeePercent] = useState(10)

  useEffect(() => {
    if (regionId) {
      fetchRegion()
    }
  }, [regionId])

  const fetchRegion = async () => {
    try {
      const { data, error } = await supabase
        .from('regions')
        .select('*')
        .eq('id', regionId)
        .single()

      if (error) throw error
      setRegion(data)
    } catch (error) {
      console.error('Error fetching region:', error)
    }
  }

  // Calculate totals
  const regionalMultiplier = region ? (1 + region.location_factor) * region.rsmeans_factor * (1 + region.contingency) : 1.0
  const withRegional = subtotal * regionalMultiplier
  const fees = withRegional * (feePercent / 100)
  const total = withRegional + fees

  // Calculate category breakdown
  const categoryTotals = Object.entries(lineItems).reduce((acc, [roomId, items]) => {
    items.forEach(item => {
      if (item.is_required) {
        const amount = item.quantity * item.unit_cost
        if (!acc[item.category]) {
          acc[item.category] = 0
        }
        acc[item.category] += amount
      }
    })
    return acc
  }, {} as Record<string, number>)

  const sortedCategories = Object.entries(categoryTotals)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5)
    .map(([category, amount]) => ({
      name: category.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase()),
      amount,
      percent: subtotal > 0 ? (amount / subtotal) * 100 : 0
    }))

  return (
    <div className="space-y-4">
      {/* Regional Multiplier */}
      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Regional Multiplier</Label>
            {region ? (
              <>
                <p className="text-xs text-muted-foreground">{region.name} ({region.state})</p>
                <div className="mt-2 text-xs space-y-1 text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Location Factor:</span>
                    <span>{((1 + region.location_factor) * 100).toFixed(1)}%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>RSMeans Factor:</span>
                    <span>{region.rsmeans_factor.toFixed(2)}x</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Contingency:</span>
                    <span>{(region.contingency * 100).toFixed(1)}%</span>
                  </div>
                </div>
              </>
            ) : (
              <p className="text-xs text-muted-foreground mt-1">No region selected</p>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{regionalMultiplier.toFixed(2)}x</span>
              <span className="text-xs text-muted-foreground">
                +${((subtotal * regionalMultiplier) - subtotal).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Fee Percentage */}
      <Card className="p-4">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Additional Fee %</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={feePercent}
              onChange={(e) => setFeePercent(Number.parseFloat(e.target.value) || 0)}
              className="flex-1"
              step="0.1"
            />
            <span className="text-sm text-muted-foreground">%</span>
          </div>
        </div>
      </Card>

      {/* Running Totals */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">Running Totals</h3>
          </div>
          <Separator />
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Base Subtotal</span>
              <span className="font-medium font-mono">
                ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Regional Adj.</span>
              <span className="font-medium font-mono">
                ${(withRegional - subtotal).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fees ({feePercent}%)</span>
              <span className="font-medium font-mono">
                ${fees.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold font-mono">
                ${total.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      {sortedCategories.length > 0 && (
        <Card className="p-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              <h3 className="font-semibold">Top Categories</h3>
            </div>
            <div className="space-y-3">
              {sortedCategories.map((category) => (
                <div key={category.name} className="space-y-1">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{category.name}</span>
                    <span className="font-medium font-mono">
                      ${category.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </span>
                  </div>
                  <Progress value={category.percent} className="h-1" />
                </div>
              ))}
            </div>
          </div>
        </Card>
      )}

      {/* Alerts */}
      <Card className="p-4 border-yellow-500/50 bg-yellow-500/5">
        <div className="flex gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Reminder</p>
            <p className="text-xs text-muted-foreground">
              Check required items like smoke detectors in bedrooms
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}
