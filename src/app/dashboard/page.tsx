"use client";

import Link from "next/link";
import {authClient, useSession} from "@/lib/auth-client";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const {data: session, isPending} = useSession();

    const router = useRouter();

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
                    <CardTitle>Bienvenue, {session.user.name || session.user.email}</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Vous êtes connecté !</p>
                    <Button
                        onClick={async () => {
                            try {
                                await authClient.signOut();
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
