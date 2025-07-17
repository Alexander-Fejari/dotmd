"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import type { SignupData } from "@/app/auth/signup/page"
import {GithubIcon} from "@/components/icons/GithubIcon"
import {GitlabIcon} from "@/components/icons/GitlabIcon"
import {DiscordIcon} from "@/components/icons/DiscordIcon";
import {GoogleIcon} from "@/components/icons/GoogleIcon";
import {Loader2} from "lucide-react";
import { signUpEmailPassword, signInWithSocial } from "@/lib/auth/auth-client"

const emailSignupSchema = z.object({
    email: z.email({ error: "Adresse email invalide" }),
    password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères"),
    displayName: z.string().min(3, "Le nom doit contenir au moins 3 caractères"),
})

type EmailSignupForm = z.infer<typeof emailSignupSchema>

type SignupStepProps = {
    data: SignupData
    onUpdateAction: (data: Partial<SignupData>) => void
    onNextAction: () => void
    isLoading: boolean
    setIsLoadingAction: (loading: boolean) => void
}

export function SignupStep({ data, onUpdateAction, onNextAction, isLoading, setIsLoadingAction }: SignupStepProps) {
    const form = useForm<EmailSignupForm>({
        resolver: zodResolver(emailSignupSchema),
        defaultValues: {
            email: data.email || "",
            password: data.password || "",
            displayName: data.displayName || "",
        },
    })

    const handleEmailSignup = async (values: EmailSignupForm) => {
        setIsLoadingAction(true)
        try {
            onUpdateAction({ email: values.email, password: values.password, provider: undefined })
            
            const exists = await fetch(`/api/auth/check-existing-user?email=${encodeURIComponent(values.email)}&displayName=${encodeURIComponent(values.displayName)}`);
            const verif = await exists.json();

            console.log("Verification result:", verif);

            if (verif.emailExists == true) {
                alert("Un compte existe déjà avec cette adresse email. Veuillez vous connecter."); // A d'office changer haha
                return ;
            }
            else if (verif.displayNameExists == true) {
                alert("Un compte existe déjà avec ce nom d'utilisateur. Veuillez en choisir un autre.");
                return ;
            }
            await signUpEmailPassword(values.email, values.password, values.displayName, "", `/auth/signup?step=3`); // A changer
            onNextAction();
        }
        catch (error) {
            console.error("Erreur inscription:", error)
        }
        finally {
            setIsLoadingAction(false)
        }
    }

    const handleSocialSignup = async (provider: "github" | "gitlab" | "google" | "discord") => {
        setIsLoadingAction(true)
        try {
            onUpdateAction({
                email: `user@${provider}.com`,
                provider,
                emailVerified: true,
            })
            await signInWithSocial(provider, `/auth/signup?step=3`);
            onNextAction()
        } 
        catch (error) {
            console.error(`Erreur avec ${provider}:`, error)
        } 
        finally {
            setIsLoadingAction(false)
        }
    }

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold">Créer votre compte</h2>
                <p className="text-muted-foreground mt-2">Choisissez votre méthode d'inscription préférée</p>
            </header>

            {/* Inscription par email */}
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleEmailSignup)} className="space-y-4">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Adresse email</FormLabel>
                                <FormControl>
                                    <Input placeholder="votre@email.com" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Mot de passe</FormLabel>
                                <FormControl>
                                    <Input type="password" placeholder="••••••••" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormDescription>Minimum 8 caractères</FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="displayName"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Nom affiché</FormLabel>
                                <FormControl>
                                    <Input placeholder="Jean Raymond" {...field} disabled={isLoading} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full" disabled={isLoading}>
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                Création en cours...
                            </>
                        ) : (
                            "Créer mon compte"
                        )}
                    </Button>
                </form>
            </Form>

            <Separator className="my-6" />

            {/* Inscription sociale */}
            <section className="space-y-3">
                <p className="text-sm text-center text-muted-foreground">Ou continuez avec</p>

                <section className="grid grid-cols-2 gap-3">
                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignup("github")}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        <GithubIcon className="w-4 h-4" />
                        GitHub
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignup("gitlab")}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        <GitlabIcon className="w-4 h-4" />
                        GitLab
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignup("google")}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        <GoogleIcon className="w-4 h-4" />
                        Google
                    </Button>

                    <Button
                        variant="outline"
                        onClick={() => handleSocialSignup("discord")}
                        disabled={isLoading}
                        className="flex items-center gap-2"
                    >
                        <DiscordIcon className="w-4 h-4" />
                        Discord
                    </Button>
                </section>
            </section>

            <footer className="text-center text-sm text-muted-foreground">
                Déjà un compte ?{" "}
                <Button variant="link" className="p-0 h-auto">
                    Se connecter
                </Button>
            </footer>
        </section>
    )
}
