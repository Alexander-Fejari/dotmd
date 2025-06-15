"use client"

import { useState, useEffect } from "react"
import { Save, Plus, Search, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DraftCardSkeleton } from "@/components/common/Skeletons"

export default function DraftsPage() {
  const [isLoading, setIsLoading] = useState(true)

  const drafts = [
    {
      id: 1,
      title: "Guide d'utilisation avancée",
      repository: "my-awesome-project",
      lastSaved: "Il y a 15 minutes",
      wordCount: 1250,
      progress: 75,
    },
    {
      id: 2,
      title: "Documentation API v2.0",
      repository: "dotmd-backend",
      lastSaved: "Il y a 1 heure",
      wordCount: 890,
      progress: 45,
    },
    {
      id: 3,
      title: "Tutoriel d'intégration",
      repository: "react-components",
      lastSaved: "Il y a 3 heures",
      wordCount: 2100,
      progress: 90,
    },
    {
      id: 4,
      title: "Notes de version 3.1",
      repository: "my-awesome-project",
      lastSaved: "Il y a 1 jour",
      wordCount: 450,
      progress: 20,
    },
  ]

  const getProgressColor = (progress: number) => {
    if (progress >= 80) return "bg-green-500"
    if (progress >= 50) return "bg-yellow-500"
    return "bg-red-500"
  }

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2200)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="flex flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <hgroup>
          <h1 className="text-3xl font-bold tracking-tight">Brouillons</h1>
          <p className="text-muted-foreground">Vos documents en cours de rédaction</p>
        </hgroup>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau brouillon
        </Button>
      </header>

      <section className="flex items-center space-x-2">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un brouillon..." className="pl-8" />
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <DraftCardSkeleton key={index} />)
          : drafts.map((draft) => (
              <article key={draft.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <header className="flex items-center space-x-2">
                      <Save className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{draft.title}</CardTitle>
                    </header>
                    <CardDescription>Repository: {draft.repository}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <p className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <time>Sauvegardé {draft.lastSaved}</time>
                    </p>

                    <footer className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{draft.wordCount} mots</span>
                      <span className="text-muted-foreground">{draft.progress}% terminé</span>
                    </footer>

                    <progress
                      value={draft.progress}
                      max="100"
                      className="w-full h-2 rounded-full overflow-hidden bg-gray-200"
                    >
                      <span
                        className={`block h-full transition-all ${getProgressColor(draft.progress)}`}
                        style={{ width: `${draft.progress}%` }}
                      />
                    </progress>
                  </CardContent>
                </Card>
              </article>
            ))}
      </section>
    </section>
  )
}
