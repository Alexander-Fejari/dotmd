"use client"

import { Check, Circle } from "lucide-react"
import { cn } from "@/lib/utils/utils"
import { Button } from "@/components/ui/button"

type Step = {
    id: number
    title: string
    description: string
}

type StepBreadcrumbProps = {
    steps: Step[]
    currentStep: number
    onStepClickAction: (step: number) => void
    canAccessStepAction: (step: number) => boolean
}

export function StepBreadcrumb({ steps, currentStep, onStepClickAction, canAccessStepAction }: StepBreadcrumbProps) {
    const getStepStatus = (stepId: number) => {
        if (stepId < currentStep) return "completed"
        if (stepId === currentStep) return "current"
        return "upcoming"
    }

    return (
        <nav aria-label="Étapes d'inscription" className="space-y-4">
            <header>
                <h2 className="text-lg font-semibold">Progression</h2>
                <p className="text-sm text-muted-foreground">
                    Étape {currentStep} sur {steps.length}
                </p>
            </header>

            <ol className="space-y-2">
                {steps.map((step, index) => {
                    const status = getStepStatus(step.id)
                    const isAccessible = canAccessStepAction(step.id)
                    const isClickable = isAccessible && status !== "current"

                    return (
                        <li key={step.id}>
                            <Button
                                variant="ghost"
                                className={cn(
                                    "w-full justify-start h-auto p-4 text-left",
                                    status === "current" && "bg-primary/10 border-primary/20 border",
                                    status === "completed" && "bg-green-50 hover:bg-green-100",
                                    !isAccessible && "opacity-50 cursor-not-allowed",
                                )}
                                onClick={() => isClickable && onStepClickAction(step.id)}
                                disabled={!isAccessible}
                            >
                                <section className="flex items-start space-x-3">
                                    {/* Icône d'état */}
                                    <span
                                        className={cn(
                                            "flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium mt-0.5",
                                            status === "completed" && "bg-green-500 text-white",
                                            status === "current" && "bg-primary text-primary-foreground",
                                            status === "upcoming" && "bg-muted text-muted-foreground",
                                        )}
                                    >
                    {status === "completed" ? (
                        <Check className="w-3 h-3" />
                    ) : status === "current" ? (
                        <Circle className="w-3 h-3 fill-current" />
                    ) : (
                        step.id
                    )}
                  </span>

                                    {/* Contenu */}
                                    <hgroup className="flex-1 min-w-0">
                                        <h3
                                            className={cn(
                                                "font-medium text-sm",
                                                status === "current" && "text-primary",
                                                status === "completed" && "text-green-700",
                                                status === "upcoming" && "text-muted-foreground",
                                            )}
                                        >
                                            {step.title}
                                        </h3>
                                        <p
                                            className={cn(
                                                "text-xs mt-1",
                                                status === "current" && "text-primary/70",
                                                status === "completed" && "text-green-600",
                                                status === "upcoming" && "text-muted-foreground",
                                            )}
                                        >
                                            {step.description}
                                        </p>
                                    </hgroup>
                                </section>
                            </Button>

                            {/* Ligne de connexion */}
                            {index < steps.length - 1 && (
                                <div className="ml-7 mt-2 mb-2">
                                    <div className={cn("w-px h-4 bg-border", status === "completed" && "bg-green-300")} />
                                </div>
                            )}
                        </li>
                    )
                })}
            </ol>
        </nav>
    )
}
