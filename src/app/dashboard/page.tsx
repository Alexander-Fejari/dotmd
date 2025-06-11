"use client";

import Link from "next/link";
import { useSession, authClient } from "@/lib/auth/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useAuthStore } from "@/lib/stores/auth-store";

export default function Dashboard() {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const { authData, setAuthData, clearAuthData } = useAuthStore();

    // Synchroniser la session Better Auth avec le store
    useEffect(() => {
        if (session) {
            setAuthData(session);
        } else {
            clearAuthData();
        }
    }, [session, setAuthData, clearAuthData]);

    if (isPending) {
        return <div>Chargement...</div>;
    }

    if (!session) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Card className="max-w-md">
                    <CardHeader>
                        <CardTitle>Non connecté</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p>Veuillez vous connecter pour accéder au tableau de bord.</p>
                        <Button asChild>
                            <Link href="/auth/signin">Se connecter</Link>
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="flex items-center justify-center min-h-screen">
            <Card className="max-w-md">
                <CardHeader>
                    <CardTitle>
                        Bienvenue, {authData?.user.name || authData?.user.email || "Utilisateur"}
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Vous êtes connecté !</p>
                    <Button
                        onClick={async () => {
                            try {
                                await authClient.signOut();
                                clearAuthData();
                                router.push("/");
                            } catch (error) {
                                console.error("Erreur lors de la déconnexion:", error);
                            }
                        }}
                    >
                        Se déconnecter
                    </Button>
                </CardContent>
            </Card>
        </div>
    );
}
