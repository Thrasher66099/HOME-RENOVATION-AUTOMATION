"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export function POHeader() {
  return (
    <div className="space-y-6">
      {/* Property Address */}
      <div>
        <h3 className="font-semibold text-lg mb-2">Property Information</h3>
        <Card className="p-4 bg-muted/50">
          <div className="space-y-2">
            <p className="font-medium">123 Oak Street</p>
            <p className="text-sm text-muted-foreground">Chicago, IL 60601</p>
            <p className="text-sm text-muted-foreground">Entity: ENT-2024-001</p>
          </div>
        </Card>
      </div>

      <Separator />

      {/* Fixed Fields */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hdAccount">HD Pro Account</Label>
          <Input id="hdAccount" value="4044674208" readOnly className="bg-muted/50" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" value="Business_Services@homedepot.com" readOnly className="bg-muted/50" />
        </div>
      </div>

      <Separator />

      {/* Contact Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="storeContact">Store Contact</Label>
          <Input id="storeContact" placeholder="Enter store contact name" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="mavContact">MAV Contact</Label>
          <Input id="mavContact" placeholder="Enter MAV contact name" />
        </div>
      </div>
    </div>
  )
}
