import React from "react";
import Sidebar from "@/components/sidebar/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
            <section className="flex">
                <Sidebar />
                <section className="w-full p-4">
                    {children}
                </section>
            </section>
    );
}
