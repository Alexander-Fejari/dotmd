"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { StepBreadcrumb } from "@/components/auth/step-breadcrumb"
import { SignupStep } from "@/components/auth/steps/signup-step"
import { EmailVerificationStep } from "@/components/auth/steps/email-verification-step"
import { GitProviderStep } from "@/components/auth/steps/git-provider-step"
import { ProfileStep } from "@/components/auth/steps/profile-step"
import { Card } from "@/components/ui/card"

export type SignupData = {
    // Étape 1 - Inscription
    email?: string
    password?: string
    displayName?: string
    provider?: "github" | "gitlab" | "google" | "discord"

    // Étape 2 - Email (skip si provider)
    emailVerified?: boolean
    verificationCode?: string

    // Étape 3 - Git providers
    githubLinked?: boolean
    gitlabLinked?: boolean
    githubToken?: string
    gitlabToken?: string

    // Étape 4 - Profil
    lastName?: string
    bio?: string
    avatar?: string
}

const STEPS = [
    { id: 1, title: "Inscription", description: "Créer votre compte" },
    { id: 2, title: "Email", description: "Vérifier votre email" },
    { id: 3, title: "Git Providers", description: "Lier GitHub/GitLab" },
    { id: 4, title: "Profil", description: "Finaliser votre profil" },
]

export default function SignupPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [currentStep, setCurrentStep] = useState(1)
    const [signupData, setSignupData] = useState<SignupData>({})
    const [isLoading, setIsLoading] = useState(false)

    // Récupérer l'étape depuis l'URL
    useEffect(() => {
        const step = searchParams.get("step")
        if (step) {
            const stepNumber = Number.parseInt(step)
            if (stepNumber >= 1 && stepNumber <= 4) {
                setCurrentStep(stepNumber)
            }
        }
    }, [searchParams])

    // Mettre à jour l'URL quand l'étape change
    const updateStep = (step: number) => {
        setCurrentStep(step)
        router.push(`/auth/signup?step=${step}`, { scroll: false })
    }

    // Déterminer les étapes visibles selon le type d'inscription
    const getVisibleSteps = () => {
        if (signupData.provider) {
            // Inscription via provider : skip email verification
            return STEPS.filter((step) => step.id !== 2)
        }
        return STEPS
    }

    // Valider si on peut accéder à une étape - Action sérialisable
    const canAccessStepAction = (step: number): boolean => {
        if (step === 1) return true

        // Si inscription via provider, skip l'étape email
        if (signupData.provider && step === 2) return false

        // Étape 2 : Email verification (seulement si inscription email)
        if (step === 2) {
            return !signupData.provider && !!signupData.email
        }

        // Étape 3 : Git providers
        if (step === 3) {
            if (signupData.provider) {
                return !!signupData.email // Provider inscription complétée
            }
            return !!signupData.emailVerified // Email verification complétée
        }

        // Étape 4 : Profil
        if (step === 4) {
            return !!(signupData.githubLinked || signupData.gitlabLinked)
        }

        return false
    }

    // Navigation entre étapes - Actions sérialisables
    const onStepClickAction = (step: number) => {
        if (canAccessStepAction(step)) {
            updateStep(step)
        }
    }

    const onNextAction = () => {
        const visibleSteps = getVisibleSteps()
        const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep)
        const nextStepId = visibleSteps[currentIndex + 1]?.id

        if (nextStepId && canAccessStepAction(nextStepId)) {
            updateStep(nextStepId)
        }
    }

    const onPrevAction = () => {
        const visibleSteps = getVisibleSteps()
        const currentIndex = visibleSteps.findIndex((s) => s.id === currentStep)
        const prevStepId = visibleSteps[currentIndex - 1]?.id

        if (prevStepId) {
            updateStep(prevStepId)
        }
    }

    // Mettre à jour les données - Action sérialisable
    const onUpdateAction = (data: Partial<SignupData>) => {
        setSignupData((prev) => ({ ...prev, ...data }))
    }

    // Action sérialisable pour le loading
    const setIsLoadingAction = (loading: boolean) => {
        setIsLoading(loading)
    }

    // Confirmation avant abandon
    useEffect(() => {
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            if (currentStep > 1 && Object.keys(signupData).length > 0) {
                e.preventDefault()
            }
        }

        window.addEventListener("beforeunload", handleBeforeUnload)
        return () => window.removeEventListener("beforeunload", handleBeforeUnload)
    }, [currentStep, signupData])

    return (
        <main className="min-h-screen bg-background p-4">
            <section className="max-w-6xl mx-auto">
                <header className="text-center mb-8">
                    <h1 className="text-3xl font-bold tracking-tight">Créer votre compte</h1>
                    <p className="text-muted-foreground mt-2">Rejoignez dotMD pour gérer vos repositories et documentation</p>
                </header>

                <section className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Breadcrumb vertical */}
                    <aside className="lg:col-span-1">
                        <StepBreadcrumb
                            steps={getVisibleSteps()}
                            currentStep={currentStep}
                            onStepClickAction={onStepClickAction}
                            canAccessStepAction={canAccessStepAction}
                        />
                    </aside>

                    {/* Contenu principal */}
                    <section className="lg:col-span-3">
                        <Card className="p-8">
                            {currentStep === 1 && (
                                <SignupStep
                                    data={signupData}
                                    onUpdateAction={onUpdateAction}
                                    onNextAction={onNextAction}
                                    isLoading={isLoading}
                                    setIsLoadingAction={setIsLoadingAction}
                                />
                            )}

                            {currentStep === 2 && !signupData.provider && (
                                <EmailVerificationStep
                                    data={signupData}
                                    onUpdateAction={onUpdateAction}
                                    onNextAction={onNextAction}
                                    onPrevAction={onPrevAction}
                                    isLoading={isLoading}
                                    setIsLoadingAction={setIsLoadingAction}
                                />
                            )}

                            {currentStep === 3 && (
                                <GitProviderStep
                                    data={signupData}
                                    onUpdateAction={onUpdateAction}
                                    onNextAction={onNextAction}
                                    onPrevAction={onPrevAction}
                                    isLoading={isLoading}
                                    setIsLoadingAction={setIsLoadingAction}
                                />
                            )}

                            {currentStep === 4 && (
                                <ProfileStep
                                    data={signupData}
                                    onUpdateAction={onUpdateAction}
                                    onPrevAction={onPrevAction}
                                    isLoading={isLoading}
                                    setIsLoadingAction={setIsLoadingAction}
                                />
                            )}
                        </Card>
                    </section>
                </section>
            </section>
        </main>
    )
}
