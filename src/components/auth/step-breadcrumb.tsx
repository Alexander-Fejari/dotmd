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
        <>
            {/* Version mobile - horizontale compacte */}
            <nav aria-label="Étapes d'inscription" className="lg:hidden">
                <div className="bg-card border rounded-lg p-4">
                    <div className="text-center mb-4">
                        <h2 className="text-sm font-medium">
                            Étape {currentStep} sur {steps.length}
                        </h2>
                        <p className="text-xs text-muted-foreground mt-1">{steps.find((s) => s.id === currentStep)?.title}</p>
                    </div>

                    <div className="flex items-center justify-between">
                        {steps.map((step, index) => {
                            const status = getStepStatus(step.id)
                            const isAccessible = canAccessStepAction(step.id)
                            const isClickable = isAccessible && status !== "current"

                            return (
                                <div key={step.id} className="flex items-center">
                                    <button
                                        onClick={() => isClickable && onStepClickAction(step.id)}
                                        disabled={!isAccessible}
                                        className={cn(
                                            "flex items-center justify-center w-8 h-8 rounded-full text-xs font-medium transition-colors",
                                            status === "completed" && "bg-green-500 text-white",
                                            status === "current" && "bg-primary text-primary-foreground",
                                            status === "upcoming" && "bg-muted text-muted-foreground",
                                            !isAccessible && "opacity-50 cursor-not-allowed",
                                            isClickable && "hover:opacity-80",
                                        )}
                                    >
                                        {status === "completed" ? (
                                            <Check className="w-4 h-4" />
                                        ) : status === "current" ? (
                                            <Circle className="w-4 h-4 fill-current" />
                                        ) : (
                                            step.id
                                        )}
                                    </button>

                                    {/* Ligne de connexion */}
                                    {index < steps.length - 1 && (
                                        <div className={cn("w-8 h-px mx-2", status === "completed" ? "bg-green-300" : "bg-border")} />
                                    )}
                                </div>
                            )
                        })}
                    </div>
                </div>
            </nav>

            {/* Version desktop-verticale détaillée */}
            <nav aria-label="Étapes d'inscription" className="hidden lg:block space-y-4">
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
        </>
    )
}
