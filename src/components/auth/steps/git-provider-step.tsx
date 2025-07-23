"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Loader2, Check, ExternalLink, User } from "lucide-react"
import {GithubIcon} from "@/components/icons/GithubIcon"
import {GitlabIcon} from "@/components/icons/GitlabIcon"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form"
import type { SignupData } from "@/app/auth/signup/page"
import { useEffect } from "react"


const gitProviderSchema = z
    .object({
        connectGithub: z.boolean(),
        connectGitlab: z.boolean(),
    })
    .refine((data) => data.connectGithub || data.connectGitlab, {
        message: "Vous devez connecter au moins un compte Git",
        path: ["connectGithub"],
    })

type GitProviderForm = z.infer<typeof gitProviderSchema>

type GitProviderStepProps = {
    data: SignupData
    onUpdateAction: (data: Partial<SignupData>) => void
    onNextAction: () => void
    onPrevAction: () => void
    isLoading: boolean
    setIsLoadingAction: (loading: boolean) => void
}

type GitAccount = {
    username: string
    avatar: string
    email: string
    repos: number
}

export function GitProviderStep({
                                    data,
                                    onUpdateAction,
                                    onNextAction,
                                    onPrevAction,
                                    isLoading,
                                    setIsLoadingAction,
                                }: GitProviderStepProps) {
    useEffect(() => {
        const prepareDb = async () => {
            try {
                const res = await fetch(`/api/auth/post-signup`, {
                    method: `POST`
                });
                if (res.status === 401) {
                    return new Error(`Erreur lors de l'initialisation du post login: ${res.statusText}`); // À voir comment gérer les erreurs en front
                }
                // else if (res.status === 409) {
                //     console.warn(`UserData already exists, skipping creation.`); // À voir comment gérer les erreurs en front
                // }
                else if (!res.ok) {
                    return new Error(`Erreur lors de l'initialisation du post login: ${res.statusText}`); // À voir comment gérer les erreurs en front
                }
            }
            catch (error) {
                console.error(`Erreur init Git step:`, error)
                throw new Error(`Erreur lors de l'initialisation du post login: ${ error.message }`);
            }
        }
        
        prepareDb();
    }, []);
    
    const [githubAccount, setGithubAccount] = useState<GitAccount | null>(
        data.githubLinked === true ? { username: "johndoe", avatar: "", email: "john@github.com", repos: 42 } : null,
    )
    const [gitlabAccount, setGitlabAccount] = useState<GitAccount | null>(
        data.gitlabLinked === true ? { username: "johndoe", avatar: "", email: "john@gitlab.com", repos: 15 } : null,
    )

    const form = useForm<GitProviderForm>({
        resolver: zodResolver(gitProviderSchema),
        defaultValues: {
            connectGithub: data.githubLinked === true,
            connectGitlab: data.gitlabLinked === true,
        },
        mode: "onChange",
    })

    const handleConnectGitHub = async () => {
        setIsLoadingAction(true)
        try {
            const res = await fetch(`/api/repo-accounts/begin-link?repoProvider=github`);
            const data = await res.json();

            if (res.ok && data.url) {
                window.location.href = data.url;
            }
            else {
                console.error("Erreur lors de la connexion GitHub:", data.error || "Unknown error");
            }
            //setGithubAccount(mockGitHubData)
            form.setValue("connectGithub", true)
            //onUpdateAction({ githubLinked: true, githubToken: getAccessToken.headers.get("Authorization") || "mock_github_token" })
        } 
        catch (error) {
            console.error("Erreur connexion GitHub:", error)
        } 
        finally {
            setIsLoadingAction(false)
        }
    }

    const handleConnectGitLab = async () => {
        setIsLoadingAction(true)
        try {
            const res = await fetch(`/api/repo-accounts/begin-link?repoProvider=gitlab`);
            const data = await res.json();

            if (res.ok && data.url) {
                window.location.href = data.url;
            }
            else {
                console.error("Erreur lors de la connexion GitHub:", data.error || "Unknown error");
            }
            //setGitlabAccount(mockGitLabData)
            form.setValue("connectGitlab", true)
            //onUpdateAction({ gitlabLinked: true, gitlabToken: "mock_gitlab_token" })
        } catch (error) {
            console.error("Erreur connexion GitLab:", error)
        } finally {
            setIsLoadingAction(false)
        }
    }

    const handleDisconnect = (provider: "github" | "gitlab") => {
        if (provider === "github") {
            setGithubAccount(null)
            form.setValue("connectGithub", false)
            onUpdateAction({ githubLinked: false, githubToken: undefined })
        } else {
            setGitlabAccount(null)
            form.setValue("connectGitlab", false)
            onUpdateAction({ gitlabLinked: false, gitlabToken: undefined })
        }
    }

    const handleSubmit = () => {
        onNextAction()
    }

    const canContinue = githubAccount || gitlabAccount

    return (
        <section className="space-y-6">
            <header>
                <h2 className="text-2xl font-bold">Lier vos comptes Git</h2>
                <p className="text-muted-foreground mt-2">
                    Connectez vos comptes GitHub et/ou GitLab pour importer vos repositories et gérer votre documentation.
                </p>
            </header>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
                    <div className="space-y-4">
                        {/* GitHub */}
                        <Card className="p-4">
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <GithubIcon className="w-6 h-6" />
                                        <div>
                                            <h3 className="font-medium">GitHub</h3>
                                            <p className="text-sm text-muted-foreground">Accédez à vos repositories GitHub</p>
                                        </div>
                                    </div>

                                    {githubAccount ? (
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                <Check className="w-3 h-3 mr-1" />
                                                Connecté
                                            </Badge>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDisconnect("github")}
                                                disabled={isLoading}
                                                type="button"
                                            >
                                                Déconnecter
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={handleConnectGitHub}
                                            disabled={isLoading}
                                            className="flex items-center gap-2"
                                            type="button"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <ExternalLink className="w-4 h-4" />
                                                    Connecter
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>

                                {githubAccount && (
                                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">@{githubAccount.username}</p>
                                                <p className="text-sm text-muted-foreground">{githubAccount.email}</p>
                                            </div>
                                            <Badge variant="outline">{githubAccount.repos} repos</Badge>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* GitLab */}
                        <Card className="p-4">
                            <CardContent className="p-0">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <GitlabIcon className="w-6 h-6" />
                                        <div>
                                            <h3 className="font-medium">GitLab</h3>
                                            <p className="text-sm text-muted-foreground">Accédez à vos repositories GitLab</p>
                                        </div>
                                    </div>

                                    {gitlabAccount ? (
                                        <div className="flex items-center gap-3">
                                            <Badge variant="secondary" className="bg-green-100 text-green-800">
                                                <Check className="w-3 h-3 mr-1" />
                                                Connecté
                                            </Badge>
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleDisconnect("gitlab")}
                                                disabled={isLoading}
                                                type="button"
                                            >
                                                Déconnecter
                                            </Button>
                                        </div>
                                    ) : (
                                        <Button
                                            onClick={handleConnectGitLab}
                                            disabled={isLoading}
                                            className="flex items-center gap-2"
                                            type="button"
                                        >
                                            {isLoading ? (
                                                <Loader2 className="w-4 h-4 animate-spin" />
                                            ) : (
                                                <>
                                                    <ExternalLink className="w-4 h-4" />
                                                    Connecter
                                                </>
                                            )}
                                        </Button>
                                    )}
                                </div>

                                {gitlabAccount && (
                                    <div className="mt-4 p-3 bg-muted/50 rounded-lg">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                                                <User className="w-4 h-4" />
                                            </div>
                                            <div className="flex-1">
                                                <p className="font-medium">@{gitlabAccount.username}</p>
                                                <p className="text-sm text-muted-foreground">{gitlabAccount.email}</p>
                                            </div>
                                            <Badge variant="outline">{gitlabAccount.repos} repos</Badge>
                                        </div>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>

                    {/* Message d'aide */}
                    {!canContinue && (
                        <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                                💡 Connectez au moins un compte Git pour accéder à vos repositories et créer votre documentation.
                            </p>
                        </div>
                    )}

                    {/* Validation des erreurs */}
                    <FormField
                        control={form.control}
                        name="connectGithub"
                        render={() => (
                            <FormItem className="hidden">
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Boutons de navigation */}
                    <div className="flex items-center gap-2">
                        <Button variant="outline" type="button" onClick={onPrevAction} disabled={isLoading}>
                            Retour
                        </Button>
                        <Button type="submit" disabled={!canContinue}>
                            Continuer
                        </Button>
                    </div>
                </form>
            </Form>

            {/* Note de sécurité */}
            <footer className="text-xs text-muted-foreground text-center">
                🔒 Vos tokens d'accès sont stockés de manière sécurisée et ne sont utilisés que pour accéder à vos repositories.
            </footer>
        </section>
    )
}
