'use client';
import React from "react"
import { useEffect, useState } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription } from "@/components/ui/alert-dialog";

/**
 * Garde la session à l'œil et affiche un pop-up si le token expire.
 */
export default function SessionGuard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if (status === 'authenticated' && !session?.accessToken) {
            console.warn("⚠️ Token expiré, ouverture de la pop-up...");
            setShowLogoutModal(true);
        }
    }, [session, status]);

    const handleLogout = async () => {
        try {
            await signOut(); // Attendre la fin de la déconnexion
        } catch (error) {
            console.error("❌ Erreur lors de la déconnexion :", error);
        }
    };

    const handleHome = () => {
        router.push('/'); // Redirection vers la home
    };

    return (
        <>
            {children}

            <AlertDialog open={showLogoutModal} onOpenChange={setShowLogoutModal}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Session expirée</AlertDialogTitle>
                        <AlertDialogDescription>
                            Votre session a expiré. Veuillez vous reconnecter ou retourner à l&apos;accueil.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel onClick={handleHome}>Retour à l&apos;accueil</AlertDialogCancel>
                        <AlertDialogAction onClick={handleLogout}>Se reconnecter</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
