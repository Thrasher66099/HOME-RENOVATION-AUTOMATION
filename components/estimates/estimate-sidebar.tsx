"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { DollarSign, TrendingUp, AlertCircle } from "lucide-react"

export function EstimateSidebar() {
  const [regionalMultiplier, setRegionalMultiplier] = useState(1.21)
  const [feePercent, setFeePercent] = useState(10)

  // Mock data
  const subtotal = 38500
  const withRegional = subtotal * regionalMultiplier
  const fees = withRegional * (feePercent / 100)
  const total = withRegional + fees

  const categoryTotals = [
    { name: "Painting", amount: 11550, percent: 30 },
    { name: "Flooring", amount: 9625, percent: 25 },
    { name: "Kitchen", amount: 7700, percent: 20 },
    { name: "Electrical", amount: 5775, percent: 15 },
    { name: "Other", amount: 3850, percent: 10 },
  ]

  return (
    <div className="space-y-4">
      {/* Regional Multiplier */}
      <Card className="p-4">
        <div className="space-y-4">
          <div>
            <Label className="text-sm font-medium">Regional Multiplier</Label>
            <p className="text-xs text-muted-foreground">Illinois (IL)</p>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-2xl font-bold">{regionalMultiplier.toFixed(2)}x</span>
              <Button variant="outline" size="sm">
                Apply
              </Button>
            </div>
            <Slider
              value={[regionalMultiplier]}
              onValueChange={(value) => setRegionalMultiplier(value[0])}
              min={1}
              max={1.5}
              step={0.01}
              className="w-full"
            />
          </div>
        </div>
      </Card>

      {/* Fee Percentage */}
      <Card className="p-4">
        <div className="space-y-4">
          <Label className="text-sm font-medium">Fee Percentage</Label>
          <div className="flex items-center gap-2">
            <Input
              type="number"
              value={feePercent}
              onChange={(e) => setFeePercent(Number.parseFloat(e.target.value) || 0)}
              className="flex-1"
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
              <span className="text-muted-foreground">Subtotal</span>
              <span className="font-medium">${subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Regional Adj.</span>
              <span className="font-medium">${(withRegional - subtotal).toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Fees ({feePercent}%)</span>
              <span className="font-medium">${fees.toLocaleString()}</span>
            </div>
            <Separator />
            <div className="flex justify-between">
              <span className="font-semibold">Total</span>
              <span className="text-xl font-bold">${total.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Category Breakdown */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <h3 className="font-semibold">By Category</h3>
          </div>
          <div className="space-y-3">
            {categoryTotals.map((category) => (
              <div key={category.name} className="space-y-1">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">{category.name}</span>
                  <span className="font-medium">${category.amount.toLocaleString()}</span>
                </div>
                <Progress value={category.percent} className="h-1" />
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Alerts */}
      <Card className="p-4 border-yellow-500/50 bg-yellow-500/5">
        <div className="flex gap-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 dark:text-yellow-500 flex-shrink-0 mt-0.5" />
          <div className="space-y-1">
            <p className="text-sm font-medium">Mandatory Items</p>
            <p className="text-xs text-muted-foreground">Remember to include smoke detectors in all bedrooms</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
