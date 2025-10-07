"use client"

import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle2 } from "lucide-react"

interface ReviewStepProps {
  formData: any
}

export function ReviewStep({ formData }: ReviewStepProps) {
  const fullAddress = `${formData.street}, ${formData.city}, ${formData.state} ${formData.zip}`

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold mb-1">Review & Confirm</h2>
        <p className="text-sm text-muted-foreground">Please review all information before creating the project</p>
      </div>

      {/* Basic Info */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Property Information</h3>
        </div>
        <div className="grid gap-4">
          <div>
            <p className="text-sm text-muted-foreground">Address</p>
            <p className="font-medium">{fullAddress}</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Entity Number</p>
              <p className="font-medium">{formData.entityNumber}</p>
            </div>
            {formData.rent && (
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="font-medium">${formData.rent}</p>
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-2">Utilities</p>
            <div className="flex gap-2">
              {formData.gasOn && <Badge variant="secondary">Gas ON</Badge>}
              {formData.waterOn && <Badge variant="secondary">Water ON</Badge>}
              {formData.powerOn && <Badge variant="secondary">Power ON</Badge>}
              {!formData.gasOn && !formData.waterOn && !formData.powerOn && (
                <Badge variant="outline">No utilities active</Badge>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Property Metrics */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <CheckCircle2 className="h-5 w-5 text-green-500" />
          <h3 className="font-semibold">Property Metrics</h3>
        </div>
        <div className="grid gap-4">
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Bedrooms</p>
              <p className="font-medium">{formData.bedrooms}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Sq Ft</p>
              <p className="font-medium">{formData.sqft}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Garage</p>
              <p className="font-medium capitalize">{formData.garageType}</p>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Roof Age</p>
              <p className="font-medium">{formData.roofAge} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">HVAC Age</p>
              <p className="font-medium">{formData.hvacAge} years</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Water Heater Age</p>
              <p className="font-medium">{formData.waterHeaterAge} years</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Region</p>
            <Badge>{formData.region}</Badge>
          </div>
        </div>
      </Card>

      {/* Notes */}
      {formData.notes && (
        <Card className="p-6">
          <h3 className="font-semibold mb-2">Project Notes</h3>
          <p className="text-sm text-muted-foreground">{formData.notes}</p>
        </Card>
      )}
    </div>
  )
}
