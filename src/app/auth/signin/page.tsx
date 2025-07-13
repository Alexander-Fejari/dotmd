"use client";

import Link from "next/link";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signIn, signInWithSocial } from "@/lib/auth/client";
import { GithubIcon } from "@/components/icons/GithubIcon";
import { GoogleIcon } from "@/components/icons/GoogleIcon";
import { DiscordIcon } from "@/components/icons/DiscordIcon";
import { GitlabIcon } from "@/components/icons/GitlabIcon";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSocialSignIn = async (provider: "github" | "google" | "discord" | "gitlab") => {
        setLoading(true);
        try {
            const result = await signInWithSocial(provider, "/dashboard");
            if (!result.success) console.error(result.error);
        } catch (error) {
            console.error(`Erreur avec ${provider} :`, error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card className="max-w-md w-full">
            <CardHeader>
                <CardTitle className="text-lg md:text-xl">Connectez-vous</CardTitle>
                <CardDescription className="text-xs md:text-sm">
                    Saisissez votre adresse e-mail pour vous connecter à votre compte.
                </CardDescription>
            </CardHeader>

            <CardContent>
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>

                    <div className="grid gap-2">
                        <div className="flex items-center">
                            <Label htmlFor="password">Mot de passe</Label>
                            <Link href="#" className="ml-auto text-sm underline">
                                Mot de passe oublié ?
                            </Link>
                        </div>
                        <Input
                            id="password"
                            type="password"
                            placeholder="Mot de passe"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={loading}
                        onClick={async () => {
                            await signIn.email(
                                { email, password },
                                {
                                    onRequest: () => setLoading(true),
                                    onResponse: () => setLoading(false),
                                }
                            );
                        }}
                    >
                        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Connexion"}
                    </Button>

                    <div className="flex flex-col gap-2">
                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            disabled={loading}
                            onClick={() => handleSocialSignIn("google")}
                        >
                            <GoogleIcon className="w-5 h-5" />
                            Connexion avec Google
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            disabled={loading}
                            onClick={() => handleSocialSignIn("github")}
                        >
                            <GithubIcon className="w-5 h-5" />
                            Connexion avec GitHub
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            disabled={loading}
                            onClick={() => handleSocialSignIn("discord")}
                        >
                            <DiscordIcon className="w-5 h-5" />
                            Connexion avec Discord
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full gap-2"
                            disabled={loading}
                            onClick={() => handleSocialSignIn("gitlab")}
                        >
                            <GitlabIcon className="w-5 h-5" />
                            Connexion avec GitLab
                        </Button>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
