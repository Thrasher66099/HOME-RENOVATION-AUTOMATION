"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Download, Mail, FileText, Save } from "lucide-react"
import { POHeader } from "@/components/pos/po-header"
import { POLineItems } from "@/components/pos/po-line-items"
import { POFooter } from "@/components/pos/po-footer"

interface POGeneratorProps {
  poId: string
}

export function POGenerator({ poId }: POGeneratorProps) {
  const [scope, setScope] = useState("general")
  const [status, setStatus] = useState("draft")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Purchase Order #{poId}</h1>
          <p className="text-muted-foreground mt-1">Generate and manage purchase orders</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm">
            <FileText className="mr-2 h-4 w-4" />
            Generate from Estimate
          </Button>
          <Button variant="outline" size="sm">
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export PDF
          </Button>
          <Button variant="outline" size="sm">
            <Mail className="mr-2 h-4 w-4" />
            Email PO
          </Button>
        </div>
      </div>

      {/* Scope & Status */}
      <Card className="p-4">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Scope:</span>
              <Select value={scope} onValueChange={setScope}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="general">General</SelectItem>
                  <SelectItem value="kitchen">Kitchen</SelectItem>
                  <SelectItem value="exterior">Exterior</SelectItem>
                  <SelectItem value="bathroom">Bathroom</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium">Status:</span>
              <Select value={status} onValueChange={setStatus}>
                <SelectTrigger className="w-[150px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">
                    <Badge variant="secondary">Draft</Badge>
                  </SelectItem>
                  <SelectItem value="approved">
                    <Badge variant="default">Approved</Badge>
                  </SelectItem>
                  <SelectItem value="ordered">
                    <Badge className="bg-blue-500">Ordered</Badge>
                  </SelectItem>
                  <SelectItem value="received">
                    <Badge className="bg-green-500">Received</Badge>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <Badge variant="outline" className="text-xs">
            Last updated: 2 hours ago
          </Badge>
        </div>
      </Card>

      {/* PO Content */}
      <Card className="p-6">
        <div className="space-y-6">
          <POHeader />
          <POLineItems />
          <POFooter />
        </div>
      </Card>
    </div>
  )
}
