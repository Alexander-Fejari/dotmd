"use client"

import { Logo } from "@/components/Logo"
import { SearchBar } from "./SearchBar"
import { NotificationIcon } from "./NotificationIcon"
import { UserMenu } from "./UserMenu"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
            <nav
                className="flex h-14 max-w-screen-3xl items-center justify-between px-0 md:px-4"
                role="navigation"
                aria-label="Navigation principale"
            >
                {/* Logo à gauche */}
                <section className="flex items-center min-w-0">
                    <Logo />
                </section>

                {/* Barre de recherche au centre */}
                <section className="flex-1 flex justify-center px-4 md:px-8 max-w-2xl">
                    <SearchBar />
                </section>

                {/* Actions à droite */}
                <section className="flex items-center min-w-0">
                    <ul className="flex items-center space-x-1 md:space-x-2" role="list">
                        <li>
                            <NotificationIcon />
                        </li>
                        <li>
                            <UserMenu />
                        </li>
                    </ul>
                </section>
            </nav>
        </header>
    )
}
