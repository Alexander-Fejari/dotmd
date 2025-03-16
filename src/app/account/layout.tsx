import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";
import SessionGuard from "@/components/SessionGuard";

/**
 * Layout du dashboard, garde la session à l'œil grâce à SessionGuard.
 */
export default function AccountLayout({ children }: { children: React.ReactNode }) {
    return (
        <SessionGuard>
            <section className="flex h-screen overflow-hidden">
                <Sidebar />
                <section className="w-full p-4 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent scrollbar-thumb-rounded-full">
                    {children}
                </section>
            </section>
        </SessionGuard>
    );
}
