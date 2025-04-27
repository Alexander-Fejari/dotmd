"use client";

import {authClient, useSession} from "@/lib/auth-client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Dashboard() {
    const { data: session, status } = useSession();

    if (status === "loading") {
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
        <a href="/sign-in">Se connecter</a>
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
        await authClient.signOut();
        window.location.href = "/sign-in";
    }}
>
    Se déconnecter
    </Button>
    </CardContent>
    </Card>
    </div>
);
}
