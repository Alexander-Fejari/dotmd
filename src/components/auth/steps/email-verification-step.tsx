"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Loader2, MailCheck } from "lucide-react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { SignupData } from "@/app/auth/signup/page"

const verificationSchema = z.object({
    code: z.string().min(6, "Le code doit contenir 6 caractères").max(6, "Le code doit contenir 6 caractères"),
})

type VerificationForm = z.infer<typeof verificationSchema>

type EmailVerificationStepProps = {
    data: SignupData
    onUpdateAction: (data: Partial<SignupData>) => void
    onNextAction: () => void
    onPrevAction: () => void
    isLoading: boolean
    setIsLoadingAction: (loading: boolean) => void
}

export function EmailVerificationStep({
                                          data,
                                          onUpdateAction,
                                          onNextAction,
                                          onPrevAction,
                                          isLoading,
                                          setIsLoadingAction,
                                      }: EmailVerificationStepProps) {
    const form = useForm<VerificationForm>({
        resolver: zodResolver(verificationSchema),
        defaultValues: {
            code: "",
        },
    })

    const handleVerify = async (values: VerificationForm) => {
        setIsLoadingAction(true)
        try {
            await new Promise((r) => setTimeout(r, 1000))
            onUpdateAction({ emailVerified: true, verificationCode: values.code })
            onNextAction()
        } catch (error) {
            console.error("Erreur vérification:", error)
        } finally {
            setIsLoadingAction(false)
        }
    }

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold">Vérification de l'email</h2>
                <p className="text-muted-foreground mt-2">
                    Nous avons envoyé un code de vérification à <span className="font-medium">{data.email}</span>
                </p>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleVerify)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="code"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Code de vérification</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="123456"
                                        {...field}
                                        disabled={isLoading}
                                        className="text-center text-lg tracking-widest"
                                        maxLength={6}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" onClick={onPrevAction} disabled={isLoading}>
                            Retour
                        </Button>

                        <Button type="submit" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                    Vérification…
                                </>
                            ) : (
                                <>
                                    <MailCheck className="w-4 h-4 mr-2" />
                                    Vérifier
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="text-center">
                <Button variant="link" className="text-sm text-muted-foreground">
                    Renvoyer le code
                </Button>
            </div>
        </section>
    )
}
