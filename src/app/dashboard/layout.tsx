import React from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import Sidebar from "@/components/sidebar/Sidebar";

// ✅ Ajoute "async" ici pour pouvoir utiliser await
export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    const session = await getServerSession(authOptions);

    // 🚫 Si pas de session ou token expiré → redirection vers la page de login
    if (!session || !session.accessToken) {
        const callbackUrl = encodeURIComponent("/dashboard");
        console.warn("🚫 Session invalide ou token expiré, redirection vers /login");
        redirect(`/api/auth/signin?callbackUrl=${callbackUrl}`);
    }

    return (
        <section className="w-full flex h-screen overflow-y-hidden">
            <Sidebar />
            <section className="w-full p-6 overflow-y-auto">
                {children}
            </section>
        </section>
    );
}
