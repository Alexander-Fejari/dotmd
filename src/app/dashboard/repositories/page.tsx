"use client"

import { useState, useEffect } from "react"
import { GitFork, Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RepositoryCardSkeleton } from "@/components/common/Skeletons"

export default function RepositoriesPage() {
  const [isLoading, setIsLoading] = useState(true)

  const repositories = [
    {
      id: 1,
      name: "my-awesome-project",
      description: "Un projet incroyable avec Next.js et TypeScript",
      language: "TypeScript",
      stars: 42,
      lastUpdate: "Il y a 2 heures",
    },
    {
      id: 2,
      name: "dotmd-backend",
      description: "API backend pour l'application dotMD",
      language: "Node.js",
      stars: 15,
      lastUpdate: "Il y a 1 jour",
    },
    {
      id: 3,
      name: "react-components",
      description: "Collection de composants React réutilisables",
      language: "JavaScript",
      stars: 28,
      lastUpdate: "Il y a 3 jours",
    },
  ]

  useEffect(() => {
    // Simuler un chargement
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <section className="flex flex-1 flex-col gap-6 p-6">
      <header className="flex items-center justify-between">
        <hgroup>
          <h1 className="text-3xl font-bold tracking-tight">Repositories</h1>
          <p className="text-muted-foreground">Gérez vos repositories et leur documentation</p>
        </hgroup>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Nouveau repository
        </Button>
      </header>

      <section className="flex items-center space-x-2">
        <form className="relative flex-1 max-w-sm">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Rechercher un repository..." className="pl-8" />
        </form>
      </section>

      <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? Array.from({ length: 6 }).map((_, index) => <RepositoryCardSkeleton key={index} />)
          : repositories.map((repo) => (
              <article key={repo.id}>
                <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
                  <CardHeader>
                    <header className="flex items-center space-x-2">
                      <GitFork className="h-5 w-5 text-muted-foreground" />
                      <CardTitle className="text-lg">{repo.name}</CardTitle>
                    </header>
                    <CardDescription>{repo.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <footer className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{repo.language}</span>
                      <span>⭐ {repo.stars}</span>
                    </footer>
                    <time className="text-xs text-muted-foreground mt-2 block">{repo.lastUpdate}</time>
                  </CardContent>
                </Card>
              </article>
            ))}
      </section>
    </section>
  )
}
