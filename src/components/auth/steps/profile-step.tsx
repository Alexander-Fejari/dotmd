"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, UserPlus } from "lucide-react"
import { useRouter } from "next/navigation"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { SignupData } from "@/app/auth/signup/page"

const profileSchema = z.object({
    lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
    bio: z.string().optional(),
})

type ProfileForm = z.infer<typeof profileSchema>

type ProfileStepProps = {
    data: SignupData
    onUpdateAction: (data: Partial<SignupData>) => void
    onPrevAction: () => void
    isLoading: boolean
    setIsLoadingAction: (loading: boolean) => void
}

export function ProfileStep({ data, onUpdateAction, onPrevAction, isLoading, setIsLoadingAction }: ProfileStepProps) {
    const router = useRouter()
    const form = useForm<ProfileForm>({
        resolver: zodResolver(profileSchema),
        defaultValues: {
            lastName: data.lastName || "",
            bio: data.bio || "",
        },
    })

    const handleFinish = async (values: ProfileForm) => {
        setIsLoadingAction(true)
        try {
            const res = await fetch(`/api/auth/user/updateUserData`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    displayName: values.lastName,
                    userBio: values.bio,
                }),
            })

            if (!res.ok) {
                return new Error("Erreur lors de la sauvegarde du profil.")
            }
            router.push("/dashboard")
        } 
        catch (error) {
            console.error("Erreur finalisation:", error)
        } 
        finally {
            setIsLoadingAction(false)
        }
    }

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold">Compléter votre profil</h2>
                <p className="text-muted-foreground mt-2">Ces informations peuvent être modifiées plus tard.</p>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleFinish)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom complet</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jane Doe" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="bio"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Bio</FormLabel>
                                <FormControl>
                                    <Textarea placeholder="Décrivez-vous en quelques mots…" {...field} disabled={isLoading} rows={3} />
                                </FormControl>
                                <FormDescription>Optionnel - Parlez-nous de vous</FormDescription>
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
                                    Enregistrement…
                                </>
                            ) : (
                                <>
                                    <UserPlus className="w-4 h-4 mr-2" />
                                    Terminer
                                </>
                            )}
                        </Button>
                    </div>
                </form>
            </Form>

            <div className="text-center">
                <p className="text-xs text-muted-foreground">
                    En créant votre compte, vous acceptez nos conditions d'utilisation
                </p>
            </div>
        </section>
    )
}
