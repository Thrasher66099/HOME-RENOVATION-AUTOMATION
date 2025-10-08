"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card } from "@/components/ui/card"

interface BasicInfoStepProps {
  formData: any
  updateFormData: (data: any) => void
}

export function BasicInfoStep({ formData, updateFormData }: BasicInfoStepProps) {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Property Address</h2>
        <p className="text-sm text-muted-foreground">Enter the property location and basic details</p>
      </div>

      {/* Address Fields */}
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="projectName">Project Name *</Label>
          <Input
            id="projectName"
            placeholder="Oak Street Renovation"
            value={formData.projectName}
            onChange={(e) => updateFormData({ projectName: e.target.value })}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="street">Street Address *</Label>
          <Input
            id="street"
            placeholder="123 Main Street"
            value={formData.street}
            onChange={(e) => updateFormData({ street: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="city">City *</Label>
            <Input
              id="city"
              placeholder="Chicago"
              value={formData.city}
              onChange={(e) => updateFormData({ city: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="state">State *</Label>
            <Input
              id="state"
              placeholder="IL"
              value={formData.state}
              onChange={(e) => updateFormData({ state: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="zip">ZIP Code *</Label>
            <Input
              id="zip"
              placeholder="60601"
              value={formData.zip}
              onChange={(e) => updateFormData({ zip: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="grid gap-2">
            <Label htmlFor="entityNumber">Entity Number *</Label>
            <Input
              id="entityNumber"
              placeholder="ENT-2024-001"
              value={formData.entityNumber}
              onChange={(e) => updateFormData({ entityNumber: e.target.value })}
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="rent">Monthly Rent</Label>
            <Input
              id="rent"
              type="number"
              placeholder="1500"
              value={formData.rent}
              onChange={(e) => updateFormData({ rent: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Utilities */}
      <Card className="p-4 bg-muted/50">
        <h3 className="font-medium mb-4">Utilities Status</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="gasOn"
              checked={formData.gasOn}
              onCheckedChange={(checked) => updateFormData({ gasOn: checked })}
            />
            <Label htmlFor="gasOn" className="cursor-pointer">
              Gas ON
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="waterOn"
              checked={formData.waterOn}
              onCheckedChange={(checked) => updateFormData({ waterOn: checked })}
            />
            <Label htmlFor="waterOn" className="cursor-pointer">
              Water ON
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              id="powerOn"
              checked={formData.powerOn}
              onCheckedChange={(checked) => updateFormData({ powerOn: checked })}
            />
            <Label htmlFor="powerOn" className="cursor-pointer">
              Power ON
            </Label>
          </div>
        </div>
      </Card>

      {/* Lockbox */}
      <div className="grid gap-2">
        <Label htmlFor="lockboxCode">Lockbox Code</Label>
        <Input
          id="lockboxCode"
          placeholder="1234"
          value={formData.lockboxCode}
          onChange={(e) => updateFormData({ lockboxCode: e.target.value })}
        />
      </div>
    </div>
  )
}
