"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Logo } from "@/components/common/Logo"
import {GithubIcon} from "@/components/icons/GithubIcon"
import {GitlabIcon} from "@/components/icons/GitlabIcon"
import {DiscordIcon} from "@/components/icons/DiscordIcon";
import {GoogleIcon} from "@/components/icons/GoogleIcon";
import { Eye, EyeOff, Loader2 } from "lucide-react"
import { signInWithSocial, signInEmailPassword } from "@/lib/auth/auth-client"


const signinSchema = z.object({
    email: z.email({ error: "Adresse email invalide" }),
    password: z.string().min(1, "Le mot de passe est requis"),
})

type SigninForm = z.infer<typeof signinSchema>

export default function SigninPage() {
    //const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const form = useForm<SigninForm>({
        resolver: zodResolver(signinSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleEmailSignin = async (values: SigninForm) => {
        setIsLoading(true)
        setError(null)

        try {
            const result = await signInEmailPassword(values.email, values.password, `/dashboard`);
            if (!result.success) {
                console.error(result.error);
            }
        } 
        catch (error) {
            console.error("Erreur de connexion :", error);
        } 
        finally {
            setIsLoading(false);
        }
    }

    const handleSocialSignin = async (provider: `github` | `gitlab` | `google` | `discord`) => {
        setIsLoading(true)
        setError(null)

       try {
            const result = await signInWithSocial(provider, `/dashboard`/*, `/auth/signup?step=3`*/);
            if (!result.success) console.error(result.error);
        } catch (error) {
            console.error(`Erreur avec ${provider} :`, error);
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <main className="min-h-screen flex items-center justify-center bg-background p-4">
            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1 text-center">
                    <header className="flex justify-center mb-4">
                        <Logo />
                    </header>
                    <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
                    <CardDescription>Connectez-vous à votre compte pour accéder au dashboard</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4">
                    {/* Erreur globale */}
                    {error && <div className="p-3 text-sm text-red-600 bg-red-50 border border-red-200 rounded-md">{error}</div>}

                    {/* Connexion par email */}
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleEmailSignin)} className="space-y-4">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input type="email" placeholder="votre@email.com" {...field} disabled={isLoading} />
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
                                            <div className="relative">
                                                <Input
                                                    type={showPassword ? "text" : "password"}
                                                    placeholder="••••••••"
                                                    {...field}
                                                    disabled={isLoading}
                                                />
                                                <Button
                                                    type="button"
                                                    variant="ghost"
                                                    size="sm"
                                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                                    onClick={() => setShowPassword(!showPassword)}
                                                    disabled={isLoading}
                                                >
                                                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                                </Button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button type="submit" className="w-full" disabled={isLoading}>
                                {isLoading ? (
                                    <>
                                        <Loader2 className="w-4 h-4 animate-spin mr-2" />
                                        Connexion...
                                    </>
                                ) : (
                                    "Se connecter"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <Separator className="my-4" />

                    {/* Connexion sociale */}
                    <section className="space-y-3">
                        <p className="text-sm text-center text-muted-foreground">Ou continuez avec</p>

                        <div className="grid grid-cols-2 gap-3">
                            <Button
                                variant="outline"
                                onClick={() => handleSocialSignin("github")}
                                disabled={isLoading}
                                className="flex items-center gap-2"
                            >
                                <GithubIcon className="w-4 h-4" />
                                GitHub
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => handleSocialSignin("gitlab")}
                                disabled={isLoading}
                                className="flex items-center gap-2"
                            >
                                <GitlabIcon className="w-4 h-4" />
                                GitLab
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => handleSocialSignin("google")}
                                disabled={isLoading}
                                className="flex items-center gap-2"
                            >
                                <GoogleIcon className="w-4 h-4" />
                                Google
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => handleSocialSignin("discord")}
                                disabled={isLoading}
                                className="flex items-center gap-2"
                            >
                                <DiscordIcon className="w-4 h-4" />
                                Discord
                            </Button>
                        </div>
                    </section>

                    {/* Lien mot de passe oublié */}
                    <div className="text-center">
                        <Button variant="link" className="text-sm text-muted-foreground p-0">
                            Mot de passe oublié ?
                        </Button>
                    </div>
                </CardContent>

                <CardFooter className="flex flex-col space-y-4">
                    <p className="text-center text-sm text-muted-foreground">
                        Pas encore de compte ?{" "}
                        <Link href="/auth/signup" className="text-primary hover:underline font-medium">
                            S'inscrire
                        </Link>
                    </p>
                    <p className="text-center">
                        <Link href="/" className="text-sm text-muted-foreground hover:underline">
                            Retour à l'accueil
                        </Link>
                    </p>
                </CardFooter>
            </Card>
        </main>
    )
}
