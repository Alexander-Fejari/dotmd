import type React from "react"
import { Sidebar } from "@/components/Sidebar"
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar"

export default function DashboardLayout({
                                            children,
                                        }: {
    children: React.ReactNode
}) {
    return (
        <SidebarProvider>
            <Sidebar />
            <SidebarInset>{children}</SidebarInset>
        </SidebarProvider>
    )
}
