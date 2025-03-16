"use client"

import React from "react"
import {useSession} from "next-auth/react"
import {usePathname} from "next/navigation"
import Link from "next/link";
import Logo from "@/components/Logo"
import SidebarNavItem from "./SidebarNavItem"
import SidebarUserProfile from "./SidebarUserProfile"
import {ChevronDown, FolderGit2, Home, Settings, User} from "lucide-react"
import {Collapsible, CollapsibleContent, CollapsibleTrigger} from "@/components/ui/collapsible"
import type {AppRoutes} from "@/types/routes"
import {cn} from "@/lib/utils"

const Sidebar: React.FC = () => {
    const {data: session} = useSession()
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    const isActive = (path: AppRoutes) => pathname === path
    const isAccountActive = isActive("/account/settings") || isActive("/account/profile")

    return (
        <>
            {/* Barre de navigation mobile - ICÔNES UNIQUEMENT - CENTRÉE */}
            <div
                className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between items-center p-2  backdrop-blur-md rounded-xl border border-primary shadow-lg md:hidden w-auto min-w-[200px] max-w-[280px]">
                <Link
                    href="/"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive("/")
                            ? "bg-primary/30 text-white"
                            : "text-gray-300 hover:bg-primary/30 hover:text-white",
                    )}
                >
                    <Home size={20}/>
                </Link>

                <Link
                    href="/dashboard/repositories"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive("/dashboard/repositories")
                            ? "bg-primary/30 text-white"
                            : "text-gray-300 hover:bg-primary/30 hover:text-white",
                    )}
                >
                    <FolderGit2 size={20}/>
                </Link>


                <Link
                    href="/account/settings"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isAccountActive ? "bg-primary/30 text-white" : "text-gray-300 hover:bg-primary/30 hover:text-white",
                    )}
                >
                    <User size={20}/>
                </Link>
            </div>

            {/* Sidebar desktop originale - cachée sur mobile */}
            <div className="hidden md:flex h-screen flex-col justify-between border-e border-primary">
                <div className="px-4 py-6">
                    <Logo classname={'px-3'}/>

                    <ul className="mt-6 space-y-1">
                        <SidebarNavItem href="/" isActive={isActive("/")}>
                            <Home size={20}/>
                            <span className="ml-2">Accueil</span>
                        </SidebarNavItem>

                        <SidebarNavItem href="/dashboard/repositories" isActive={isActive("/dashboard/repositories")}>
                            <FolderGit2 size={20}/>
                            <span className="ml-2">Repositories</span>
                        </SidebarNavItem>

                        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={"w-full"}>
                            <CollapsibleTrigger asChild>
                                <div
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isAccountActive || isOpen
                                            ? "bg-primary/30 text-white font-semibold"
                                            : "text-gray-300 hover:bg-primary/30 hover:text-white",
                                    )}
                                >
                                    <span className="flex items-center">
                                        <User size={20}/>
                                        <span className="ml-4">Compte</span>
                                    </span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ul className="mt-1 space-y-1 pl-5">
                                    <SidebarNavItem href="/account/settings" isActive={isActive("/account/settings")}>
                                        <Settings size={20}/>
                                        <span className="ml-2">Paramètres</span>
                                    </SidebarNavItem>
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-primary">
                    <SidebarUserProfile
                        name={session?.user?.name ?? "undefined"}
                        avatarUrl={session?.user?.image ?? "undefined"}
                    />
                </div>
            </div>
        </>
    )
}

export default Sidebar

