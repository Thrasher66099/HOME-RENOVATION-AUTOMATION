"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Mail, FileText } from "lucide-react"
import { CategoryTree } from "@/components/billing/category-tree"
import { InvoicePreview } from "@/components/billing/invoice-preview"

interface BillingViewProps {
  projectId: string
}

export function BillingView({ projectId }: BillingViewProps) {
  const [initialInvoiceItems, setInitialInvoiceItems] = useState<any[]>([
    { id: "1", category: "General Improvements", description: "Interior Paint - All Rooms", amount: 3500 },
    { id: "2", category: "Flooring-Carpet", description: "Carpet Installation - Bedrooms", amount: 2800 },
  ])

  const [finalInvoiceItems, setFinalInvoiceItems] = useState<any[]>([
    { id: "3", category: "Appliances", description: "Refrigerator - Stainless Steel", amount: 1200 },
    { id: "4", category: "General Improvements", description: "Light Fixtures", amount: 450 },
  ])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Billing & Invoices</h1>
          <p className="text-muted-foreground mt-1">Manage invoices and payment tracking</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Auto-Generate
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email Invoice
          </Button>
        </div>
      </div>

      {/* Property Info */}
      <Card className="p-4 bg-muted/50">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Property</p>
            <p className="font-medium">123 Oak Street, Chicago, IL 60601</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Entity</p>
            <p className="font-medium">ENT-2024-001</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Budget</p>
            <p className="font-medium">$45,000</p>
          </div>
        </div>
      </Card>

      {/* Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Category Tree */}
        <div>
          <CategoryTree
            initialItems={initialInvoiceItems}
            finalItems={finalInvoiceItems}
            onInitialChange={setInitialInvoiceItems}
            onFinalChange={setFinalInvoiceItems}
          />
        </div>

        {/* Right: Invoice Previews */}
        <div className="space-y-6">
          <InvoicePreview type="initial" items={initialInvoiceItems} />
          <InvoicePreview type="final" items={finalInvoiceItems} />
        </div>
      </div>
    </div>
  )
}
