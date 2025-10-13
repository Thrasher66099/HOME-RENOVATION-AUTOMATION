"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { BasicInfoStep } from "@/components/projects/steps/basic-info-step"
import { PropertyMetricsStep } from "@/components/projects/steps/property-metrics-step"
import { ReviewStep } from "@/components/projects/steps/review-step"
import { useToast } from "@/hooks/use-toast"

const steps = [
  { id: 1, name: "Basic Info", description: "Address & Utilities" },
  { id: 2, name: "Property Metrics", description: "Rooms & Dimensions" },
  { id: 3, name: "Review & Save", description: "Confirm Details" },
]

interface Room {
  name: string
  length: number | null
  width: number | null
  misc_sf: number | null
  misc_note: string
}

interface PropertyFormWizardProps {
  mode?: 'create' | 'edit'
  projectId?: string
  initialProject?: any
  initialPropertyInfo?: any
}

export function PropertyFormWizard({
  mode = 'create',
  projectId,
  initialProject,
  initialPropertyInfo
}: PropertyFormWizardProps = {}) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentStep, setCurrentStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    // Basic Info
    projectName: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    entityNumber: "",
    rent: "",
    gasOn: false,
    waterOn: false,
    powerOn: false,
    breakers_off: false,
    water_main_off: false,
    lockboxCode: "",

    // Property Metrics
    region: "",
    bedrooms: 3,
    bathrooms: 2,
    sqft_bpo: 0,
    sqft_actual: 0,
    facade_type: "",
    garage_type: "",
    garage_size: 0,
    has_basement: false,
    floors: 1,
    foundation_area: 0,
    roof_area: 0,
    roof_age: 0,
    hvac_age: 0,
    water_heater_age: 0,
    notes: "",

    // Rooms
    rooms: [] as Room[],
  })

  // Initialize form data with existing project data in edit mode
  useEffect(() => {
    if (mode === 'edit' && initialProject && initialPropertyInfo) {
      setFormData({
        projectName: initialProject.name || "",
        street: initialProject.address?.street || "",
        city: initialProject.address?.city || "",
        state: initialProject.address?.state || "",
        zip: initialProject.address?.zip || "",
        entityNumber: initialProject.entity_num || "",
        rent: initialPropertyInfo.rent_amount?.toString() || "",
        gasOn: initialPropertyInfo.utilities?.gas_on || false,
        waterOn: initialPropertyInfo.utilities?.water_on || false,
        powerOn: initialPropertyInfo.utilities?.power_on || false,
        breakers_off: initialPropertyInfo.safety_checklist?.breakers_off || false,
        water_main_off: initialPropertyInfo.safety_checklist?.water_main_off || false,
        lockboxCode: initialPropertyInfo.safety_checklist?.lockbox_code || "",
        region: initialPropertyInfo.region_id || "",
        bedrooms: initialPropertyInfo.bedrooms || 3,
        bathrooms: initialPropertyInfo.bathrooms || 2,
        sqft_bpo: initialPropertyInfo.sq_ft_bpo || 0,
        sqft_actual: initialPropertyInfo.sq_ft_actual || 0,
        facade_type: initialPropertyInfo.facade_type || "",
        garage_type: initialPropertyInfo.garage_type || "",
        garage_size: initialPropertyInfo.garage_size || 0,
        has_basement: initialPropertyInfo.has_basement || false,
        floors: initialPropertyInfo.floors || 1,
        foundation_area: initialPropertyInfo.foundation_area || 0,
        roof_area: initialPropertyInfo.roof_area || 0,
        roof_age: initialPropertyInfo.roof_age || 0,
        hvac_age: initialPropertyInfo.hvac_age || 0,
        water_heater_age: initialPropertyInfo.water_heater_age || 0,
        notes: initialPropertyInfo.notes || "",
        rooms: initialPropertyInfo.rooms?.map((room: any) => ({
          name: room.name,
          length: room.length,
          width: room.width,
          misc_sf: room.misc_sf,
          misc_note: room.misc_note || ""
        })) || [],
      })
    }
  }, [mode, initialProject, initialPropertyInfo])

  const updateFormData = (data: Partial<typeof formData>) => {
    setFormData((prev) => ({ ...prev, ...data }))
  }

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    setLoading(true)

    try {
      let currentProjectId = projectId

      if (mode === 'edit') {
        // Update existing project
        const projectResponse = await fetch(`/api/projects/${projectId}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.projectName,
            address: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zip: formData.zip
            },
            entity_num: formData.entityNumber,
            status: initialProject?.status || 'Draft'
          })
        })

        if (!projectResponse.ok) {
          const errorData = await projectResponse.json()
          console.error('Project update failed:', errorData)
          throw new Error(errorData.error || 'Failed to update project')
        }
      } else {
        // Create new project
        const projectResponse = await fetch('/api/projects', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.projectName,
            address: {
              street: formData.street,
              city: formData.city,
              state: formData.state,
              zip: formData.zip
            },
            entity_num: formData.entityNumber,
            status: 'Draft'
          })
        })

        if (!projectResponse.ok) {
          const errorData = await projectResponse.json()
          console.error('Project creation failed:', errorData)
          throw new Error(errorData.error || 'Failed to create project')
        }

        const { project } = await projectResponse.json()
        currentProjectId = project.id
      }

      // Create or update property info
      const propertyResponse = await fetch(`/api/projects/${currentProjectId}/property-info`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region_id: formData.region || null,
          rent_amount: formData.rent ? parseFloat(formData.rent) : null,
          sq_ft_bpo: formData.sqft_bpo,
          sq_ft_actual: formData.sqft_actual,
          bedrooms: formData.bedrooms,
          bathrooms: formData.bathrooms,
          facade_type: formData.facade_type,
          garage_type: formData.garage_type,
          garage_size: formData.garage_size,
          has_basement: formData.has_basement,
          floors: formData.floors,
          foundation_area: formData.foundation_area,
          roof_area: formData.roof_area,
          roof_age: formData.roof_age,
          hvac_age: formData.hvac_age,
          water_heater_age: formData.water_heater_age,
          utilities: {
            gas_on: formData.gasOn,
            water_on: formData.waterOn,
            power_on: formData.powerOn
          },
          safety_checklist: {
            breakers_off: formData.breakers_off,
            water_main_off: formData.water_main_off,
            lockbox_code: formData.lockboxCode
          },
          notes: formData.notes,
          rooms: formData.rooms
        })
      })

      if (!propertyResponse.ok) {
        const errorData = await propertyResponse.json()
        console.error('Property info save failed:', errorData)
        throw new Error(errorData.error || 'Failed to save property info')
      }

      toast({
        title: "Success!",
        description: mode === 'edit' ? "Project updated successfully" : "Project created successfully"
      })

      // Redirect to project page
      router.push(`/projects/${currentProjectId}`)
    } catch (error) {
      console.error('Error saving project:', error)
      toast({
        title: "Error",
        description: mode === 'edit' ? "Failed to update project. Please try again." : "Failed to create project. Please try again.",
        variant: "destructive"
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          {mode === 'edit' ? 'Edit Project' : 'New Project'}
        </h1>
        <p className="text-muted-foreground mt-1">
          {mode === 'edit' ? 'Update project details and property information' : 'Create a new renovation project'}
        </p>
      </div>

      {/* Stepper */}
      <Card className="p-6">
        <nav aria-label="Progress">
          <ol className="flex items-center justify-between">
            {steps.map((step, index) => (
              <li key={step.id} className={cn("flex items-center", index !== steps.length - 1 && "flex-1")}>
                <div className="flex flex-col items-center flex-1">
                  <div className="flex items-center w-full">
                    <div
                      className={cn(
                        "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors",
                        currentStep > step.id
                          ? "border-primary bg-primary text-primary-foreground"
                          : currentStep === step.id
                            ? "border-primary bg-background text-primary"
                            : "border-muted bg-background text-muted-foreground",
                      )}
                    >
                      {currentStep > step.id ? <Check className="h-5 w-5" /> : <span>{step.id}</span>}
                    </div>
                    {index !== steps.length - 1 && (
                      <div
                        className={cn(
                          "h-0.5 flex-1 transition-colors",
                          currentStep > step.id ? "bg-primary" : "bg-muted",
                        )}
                      />
                    )}
                  </div>
                  <div className="mt-2 text-center">
                    <p className="text-sm font-medium">{step.name}</p>
                    <p className="text-xs text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </li>
            ))}
          </ol>
        </nav>
      </Card>

      {/* Step Content */}
      <Card className="p-6">
        {currentStep === 1 && <BasicInfoStep formData={formData} updateFormData={updateFormData} />}
        {currentStep === 2 && <PropertyMetricsStep formData={formData} updateFormData={updateFormData} />}
        {currentStep === 3 && <ReviewStep formData={formData} />}
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1 || loading}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={nextStep} disabled={loading}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit} disabled={loading}>
            {loading
              ? (mode === 'edit' ? "Updating..." : "Creating...")
              : (mode === 'edit' ? "Update Project" : "Create Project")
            }
          </Button>
        )}
      </div>
    </div>
  )
}
