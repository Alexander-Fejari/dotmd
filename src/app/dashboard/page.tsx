"use client"

import { useState, useEffect } from "react"
import { DashboardCardSkeleton } from "@/components/common/Skeletons"

export default function DashboardPage() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Simuler un chargement
        const timer = setTimeout(() => {
            setIsLoading(false)
        }, 1500)

        return () => clearTimeout(timer)
    }, [])

    if (isLoading) {
        return (
            <section className="flex flex-1 flex-col gap-4 p-4">
                <section className="grid auto-rows-min gap-4 md:grid-cols-3">
                    <DashboardCardSkeleton />
                    <DashboardCardSkeleton />
                    <DashboardCardSkeleton />
                </section>
                <section className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
                    <header className="text-center space-y-2">
                        <div className="h-8 w-64 bg-muted rounded mx-auto" />
                        <div className="h-4 w-80 bg-muted rounded mx-auto" />
                    </header>
                </section>
            </section>
        )
    }

    return (
        <section className="flex flex-1 flex-col gap-4 p-4">
            <section className="grid auto-rows-min gap-4 md:grid-cols-3">
                <article className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                    <p className="text-muted-foreground">Statistiques</p>
                </article>
                <article className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                    <p className="text-muted-foreground">Activité récente</p>
                </article>
                <article className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
                    <p className="text-muted-foreground">Notifications</p>
                </article>
            </section>
            <section className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min flex items-center justify-center">
                <header className="text-center space-y-2">
                    <h1 className="text-2xl font-bold">Tableau de bord</h1>
                    <p className="text-muted-foreground">Bienvenue sur votre dashboard dotMD</p>
                </header>
            </section>
        </section>
    )
}
