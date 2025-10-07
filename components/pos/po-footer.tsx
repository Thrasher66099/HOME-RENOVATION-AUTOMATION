"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { DollarSign } from "lucide-react"

export function POFooter() {
  // Mock calculations
  const subtotal = 587.37
  const tax = 46.99
  const grandTotal = 634.36

  return (
    <div className="space-y-4">
      <Separator />

      <div className="flex justify-end">
        <Card className="p-6 w-full max-w-md">
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <DollarSign className="h-5 w-5 text-primary" />
              <h3 className="font-semibold text-lg">Order Summary</h3>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold text-lg">Grand Total</span>
                <span className="text-2xl font-bold">${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Notes Section */}
      <Card className="p-4 bg-muted/50">
        <p className="text-xs text-muted-foreground">
          <strong>Note:</strong> All items will be delivered to the property address listed above. Please verify SKU
          numbers before placing order. Contact store representative for any questions or special requests.
        </p>
      </Card>
    </div>
  )
}
