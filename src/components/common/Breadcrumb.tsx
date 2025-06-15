"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Link from "next/link"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// Mapping des segments d'URL vers leurs labels affichés
const segmentLabels: Record<string, string> = {
    dashboard: "Dashboard",
    repositories: "Repositories",
    readmes: "READMEs",
    drafts: "Brouillons",
}

export function DynamicBreadcrumb() {
    const pathname = usePathname()

    // Diviser le pathname en segments et filtrer les segments vides
    const segments = pathname.split("/").filter(Boolean)

    // Ne pas afficher le breadcrumb si on est à la racine
    if (segments.length === 0) {
        return null
    }

    // Construire les éléments du breadcrumb avec séparateurs
    const breadcrumbElements: React.ReactElement[] = []

    segments.forEach((segment, index) => {
        const href = "/" + segments.slice(0, index + 1).join("/")
        const label = segmentLabels[segment] || segment
        const isLast = index === segments.length - 1

        // Ajouter l'élément breadcrumb
        breadcrumbElements.push(
            <BreadcrumbItem key={`item-${href}`}>
                {isLast ? (
                    <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                    <BreadcrumbLink asChild>
                        <Link href={href}>{label}</Link>
                    </BreadcrumbLink>
                )}
            </BreadcrumbItem>,
        )

        // Ajouter le séparateur si ce n'est pas le dernier élément
        if (!isLast) {
            breadcrumbElements.push(<BreadcrumbSeparator key={`separator-${index}`} />)
        }
    })

    return (
        <nav aria-label="Fil d'Ariane">
            <Breadcrumb>
                <BreadcrumbList>{breadcrumbElements}</BreadcrumbList>
            </Breadcrumb>
        </nav>
    )
}
