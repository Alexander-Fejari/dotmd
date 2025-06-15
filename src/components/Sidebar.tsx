"use client"

import type * as React from "react"
import Link from "next/link"
import {usePathname} from "next/navigation"
import {FileText, GitFork, LayoutDashboard, Save} from "lucide-react"

import {Logo} from "@/components/common/Logo"
import {SearchBar} from "@/components/common/SearchBar"
import {NotificationIcon} from "@/components/common/NotificationIcon"
import {UserMenu} from "@/components/common/UserMenu"
import {
    Sidebar as SidebarComponent,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarRail,
} from "@/components/ui/sidebar"

const navigationItems = [
    {
        title: "Dashboard",
        href: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        title: "Repositories",
        href: "/dashboard/repositories",
        icon: GitFork,
    },
    {
        title: "READMEs",
        href: "/dashboard/readmes",
        icon: FileText,
    },
    {
        title: "Brouillons",
        href: "/dashboard/drafts",
        icon: Save,
    },
]

export function Sidebar({...props}: React.ComponentProps<typeof SidebarComponent>) {
    const pathname = usePathname()

    return (
        <SidebarComponent {...props}>
            <SidebarHeader>
                <div className="flex items-center justify-between p-2">
                    <Logo/>
                </div>
                <div className="px-2 pb-2">
                    <SearchBar/>
                </div>
            </SidebarHeader>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navigation</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navigationItems.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild isActive={pathname === item.href} tooltip={item.title}>
                                        <Link href={item.href}>
                                            <item.icon className="h-5 w-5"/>
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <div className="flex items-center justify-between p-2">
                    <NotificationIcon/>
                    <UserMenu/>
                </div>
            </SidebarFooter>
            <SidebarRail/>
        </SidebarComponent>
    )
}
