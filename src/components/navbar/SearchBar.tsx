"use client"

import {useEffect, useState} from "react"
import { Search } from "lucide-react"
import {
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import { useRouter } from "next/navigation"
import { FileCode2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function SearchBar() {
    const [open, setOpen] = useState(false)
    const router = useRouter()

    const searchResults = [
        { id: 1, type: "repository", name: "my-project", path: "/dashboard/repositories/my-project" },
        { id: 2, type: "readme", name: "API Documentation", path: "/dashboard/readmes/api-docs" },
        { id: 3, type: "repository", name: "dotmd-backend", path: "/dashboard/repositories/dotmd-backend" },
    ]

    // Gérer le raccourci clavier ⌘K
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault()
                setOpen((prev) => !prev)
            }
        }
        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [])

    return (
        <section className="w-full max-w-lg">
            <Button
                variant="outline"
                className="relative w-full justify-start text-sm text-muted-foreground h-9 bg-muted/50 hover:bg-muted border-0"
                onClick={() => setOpen(true)}
                aria-label="Ouvrir la recherche"
            >
                <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Rechercher repositories, README...</span>
                <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
                    <span className="text-xs">⌘</span>K
                </kbd>
            </Button>

            <CommandDialog open={open} onOpenChange={setOpen} aria-label="Dialogue de recherche">
                <CommandInput placeholder="Rechercher des repositories ou README..." />
                <CommandList>
                    <CommandEmpty>Aucun résultat trouvé.</CommandEmpty>
                    <CommandGroup heading="Repositories">
                        {searchResults
                            .filter((item) => item.type === "repository")
                            .map((item) => (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => {
                                        router.push(item.path)
                                        setOpen(false)
                                    }}
                                >
                                    <FileCode2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                    {item.name}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                    <CommandGroup heading="README">
                        {searchResults
                            .filter((item) => item.type === "readme")
                            .map((item) => (
                                <CommandItem
                                    key={item.id}
                                    onSelect={() => {
                                        router.push(item.path)
                                        setOpen(false)
                                    }}
                                >
                                    <FileCode2 className="mr-2 h-4 w-4" aria-hidden="true" />
                                    {item.name}
                                </CommandItem>
                            ))}
                    </CommandGroup>
                </CommandList>
            </CommandDialog>
        </section>
    )
}
