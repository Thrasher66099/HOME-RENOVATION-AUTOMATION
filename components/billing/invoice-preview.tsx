"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"

interface InvoicePreviewProps {
  type: "initial" | "final"
  items: any[]
}

export function InvoicePreview({ type, items }: InvoicePreviewProps) {
  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const tax = subtotal * 0.08
  const total = subtotal + tax

  const getStatusColor = () => {
    if (type === "initial") return "bg-blue-500"
    return "bg-green-500"
  }

  return (
    <Card className="p-6">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-semibold text-lg capitalize">{type} Invoice</h3>
            <p className="text-sm text-muted-foreground">Invoice #{type === "initial" ? "001" : "002"}</p>
          </div>
          <Badge className={getStatusColor()}>{items.length > 0 && subtotal > 0 ? "Ready" : "Unpaid"}</Badge>
        </div>

        <Separator />

        {/* Property Header */}
        <div className="bg-muted/50 p-4 rounded-lg">
          <p className="font-medium">Renovation Estimator Pro</p>
          <p className="text-sm text-muted-foreground mt-1">123 Oak Street</p>
          <p className="text-sm text-muted-foreground">Chicago, IL 60601</p>
        </div>

        <Separator />

        {/* Line Items */}
        <div className="space-y-3">
          <p className="text-sm font-medium">Line Items</p>
          {items.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">No items assigned to this invoice</div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-muted-foreground">{item.description}</span>
                <span className="font-medium">${item.amount.toLocaleString()}</span>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <>
            <Separator />

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Tax (8%)</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between">
                <span className="font-semibold">Total</span>
                <span className="text-xl font-bold">${total.toFixed(2)}</span>
              </div>
            </div>

            <Separator />

            {/* Actions */}
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Download className="h-4 w-4 mr-2" />
                PDF
              </Button>
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Mail className="h-4 w-4 mr-2" />
                Email
              </Button>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
