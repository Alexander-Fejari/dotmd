"use client"

import { useState, useEffect } from "react"
import { FileText, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ReadmeCardSkeleton } from "@/components/common/Skeletons"

export default function ReadmesPage() {
  const [isLoading, setIsLoading] = useState(true)

  const readmes = [
    {
      id: 1,
      title: "Guide d'installation API",
      repository: "dotmd-backend",
      status: "Publié",
      lastUpdate: "Il y a 1 heure",
      views: 156,
    },
    {
      id: 2,
      title: "Documentation des composants React",
      repository: "react-components",
      status: "En révision",
      lastUpdate: "Il y a 3 heures",
      views: 89,
    },
    {
      id: 3,
      title: "Guide de déploiement",
      repository: "my-awesome-project",
      status: "Publié",
      lastUpdate: "Il y a 1 jour",
      views: 234,
    },
    {
      id: 4,
      title: "Architecture du système",
      repository: "dotmd-backend",
      status: "Brouillon",
      lastUpdate: "Il y a 2 jours",
      views: 12,
    },
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Publié":
        return "bg-green-100 text-green-800"
      case "En révision":
        return "bg-yellow-100 text-yellow-800"
      case "Brouillon":
        return "bg-gray-100 text-gray-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="flex flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <hgroup>
          <h1 className="text-3xl font-bold tracking-tight">READMEs</h1>
          <p className="text-muted-foreground">Créez et gérez la documentation de vos projets</p>
        </hgroup>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau README
        </Button>
      </header>

      <section className="flex items-center space-x-2">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un README..." className="pl-8" />
        </form>
      </section>

      <section className="grid gap-4">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <ReadmeCardSkeleton key={index} />)
          : readmes.map((readme) => (
              <article key={readme.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <header className="flex items-center justify-between">
                      <hgroup className="flex items-center space-x-2">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{readme.title}</CardTitle>
                      </hgroup>
                      <Badge className={getStatusColor(readme.status)}>{readme.status}</Badge>
                    </header>
                    <CardDescription>Repository: {readme.repository}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <footer className="flex items-center justify-between text-sm text-muted-foreground">
                      <time>{readme.lastUpdate}</time>
                      <span>{readme.views} vues</span>
                    </footer>
                  </CardContent>
                </Card>
              </article>
            ))}
      </section>
    </section>
  )
}
