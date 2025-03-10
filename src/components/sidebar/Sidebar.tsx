"use client"

import React from "react"
import { useSession } from "next-auth/react"
import { usePathname } from "next/navigation"
import Logo from "@/components/Logo"
import SidebarNavItem from "./SidebarNavItem"
import SidebarUserProfile from "./SidebarUserProfile"
import { Book, ChevronDown, FolderGit2, Home, Settings, User, UserCircle } from "lucide-react"
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible"
import type { AppRoutes } from "@/types/routes"
import { cn } from "@/lib/utils"

const Sidebar: React.FC = () => {
    const { data: session } = useSession()
    const [isOpen, setIsOpen] = React.useState(false)
    const pathname = usePathname()

    const isActive = (path: AppRoutes) => pathname === path
    const isAccountActive = isActive("/account/settings") || isActive("/account/profile")

    return (
        <>
            {/* Barre de navigation mobile - ICÔNES UNIQUEMENT - CENTRÉE */}
            <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 flex justify-between items-center p-2  backdrop-blur-md rounded-xl border border-primary shadow-lg md:hidden w-auto min-w-[200px] max-w-[280px]">
                <a
                    href="/dashboard"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive("/dashboard")
                            ? "bg-green-600/30 text-white"
                            : "text-gray-300 hover:bg-green-600/30 hover:text-white",
                    )}
                >
                    <Home size={20} />
                </a>

                <a
                    href="/dashboard/repositories"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive("/dashboard/repositories")
                            ? "bg-green-600/30 text-white"
                            : "text-gray-300 hover:bg-green-600/30 hover:text-white",
                    )}
                >
                    <FolderGit2 size={20} />
                </a>

                <a
                    href="/dashboard/readmes"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isActive("/dashboard/readmes")
                            ? "bg-green-600/30 text-white"
                            : "text-gray-300 hover:bg-green-600/30 hover:text-white",
                    )}
                >
                    <Book size={20} />
                </a>

                <a
                    href="/account/settings"
                    className={cn(
                        "p-2 rounded-lg transition-colors",
                        isAccountActive ? "bg-green-600/30 text-white" : "text-gray-300 hover:bg-green-600/30 hover:text-white",
                    )}
                >
                    <User size={20} />
                </a>
            </div>

            {/* Sidebar desktop originale - cachée sur mobile */}
            <div className="hidden md:flex h-screen flex-col justify-between border-e border-primary">
                <div className="px-4 py-6">
                    <Logo />

                    <ul className="mt-6 space-y-1">
                        <SidebarNavItem href="/dashboard" isActive={isActive("/dashboard")}>
                            <Home size={20} />
                            <span className="ml-2">Générale</span>
                        </SidebarNavItem>

                        <SidebarNavItem href="/dashboard/repositories" isActive={isActive("/dashboard/repositories")}>
                            <FolderGit2 size={20} />
                            <span className="ml-2">Mes repositories</span>
                        </SidebarNavItem>

                        <SidebarNavItem href="/dashboard/readmes" isActive={isActive("/dashboard/readmes")}>
                            <Book size={20} />
                            <span className="ml-2">Mes readmes</span>
                        </SidebarNavItem>

                        <Collapsible open={isOpen} onOpenChange={setIsOpen} className={"w-full"}>
                            <CollapsibleTrigger asChild>
                                <div
                                    className={cn(
                                        "flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                                        isAccountActive || isOpen
                                            ? "bg-green-600/30 text-white font-semibold"
                                            : "text-gray-300 hover:bg-green-600/30 hover:text-white",
                                    )}
                                >
                  <span className="flex items-center">
                    <User size={20} />
                    <span className="ml-2">Compte</span>
                  </span>
                                    <ChevronDown
                                        size={16}
                                        className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                                    />
                                </div>
                            </CollapsibleTrigger>
                            <CollapsibleContent>
                                <ul className="mt-1 space-y-1 pl-6">
                                    <SidebarNavItem href="/account/settings" isActive={isActive("/account/settings")}>
                                        <Settings size={20} />
                                        <span className="ml-2">Paramètres</span>
                                    </SidebarNavItem>
                                    <SidebarNavItem href="/account/profile" isActive={isActive("/account/profile")}>
                                        <UserCircle size={20} />
                                        <span className="ml-2">Profil</span>
                                    </SidebarNavItem>
                                </ul>
                            </CollapsibleContent>
                        </Collapsible>
                    </ul>
                </div>

                <div className="sticky inset-x-0 bottom-0 border-t border-primary">
                    <SidebarUserProfile
                        name={session?.user?.name ?? ""}
                        email={session?.user?.email ?? ""}
                        avatarUrl={session?.user?.image ?? ""}
                    />
                </div>
            </div>
        </>
    )
}

export default Sidebar

