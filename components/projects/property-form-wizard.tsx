"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { cn } from "@/lib/utils"
import { BasicInfoStep } from "@/components/projects/steps/basic-info-step"
import { PropertyMetricsStep } from "@/components/projects/steps/property-metrics-step"
import { ReviewStep } from "@/components/projects/steps/review-step"

const steps = [
  { id: 1, name: "Basic Info", description: "Address & Utilities" },
  { id: 2, name: "Property Metrics", description: "Rooms & Dimensions" },
  { id: 3, name: "Review & Save", description: "Confirm Details" },
]

export function PropertyFormWizard() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    street: "",
    city: "",
    state: "",
    zip: "",
    entityNumber: "",
    rent: "",
    gasOn: false,
    waterOn: false,
    powerOn: false,
    lockboxCode: "",
    // Property Metrics
    bedrooms: 3,
    sqft: 1500,
    garageType: "attached",
    roofAge: 0,
    hvacAge: 0,
    waterHeaterAge: 0,
    region: "IL",
    notes: "",
    rooms: [] as any[],
  })

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

  const handleSubmit = () => {
    console.log("Submitting form:", formData)
    // TODO: Handle form submission
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">New Project</h1>
        <p className="text-muted-foreground mt-1">Create a new renovation project</p>
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
                    <p
                      className={cn(
                        "text-sm font-medium",
                        currentStep >= step.id ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {step.name}
                    </p>
                    <p className="text-xs text-muted-foreground hidden sm:block">{step.description}</p>
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

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        <Button variant="outline" onClick={prevStep} disabled={currentStep === 1}>
          <ChevronLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>
        {currentStep < steps.length ? (
          <Button onClick={nextStep}>
            Next
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={handleSubmit}>
            <Check className="mr-2 h-4 w-4" />
            Create Project
          </Button>
        )}
      </div>
    </div>
  )
}
