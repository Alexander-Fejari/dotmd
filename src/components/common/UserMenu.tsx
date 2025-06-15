"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { LogOut, Settings, User } from "lucide-react"
import {signOut} from "@/lib/auth/client";

type UserMenuProps = {
  user?: {
    name?: string | null
    email?: string | null
    image?: string | null
  }
}

export function UserMenu({ user = { name: "John Doe", email: "john@example.com", image: "" } }: UserMenuProps) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)

  const handleSignOut = async () => {
    setIsLoading(true)
    await signOut()
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="Menu utilisateur">
          <Avatar className="h-8 w-8">
            <AvatarImage src={user.image || ""} alt={`Photo de profil de ${user.name || "l'utilisateur"}`} />
            <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount role="menu">
        <DropdownMenuLabel className="font-normal">
          <header className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user.name}</p>
            <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
          </header>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup role="group">
          <DropdownMenuItem onClick={() => router.push("/profile")} role="menuitem">
            <User className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Profil</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => router.push("/settings")} role="menuitem">
            <Settings className="mr-2 h-4 w-4" aria-hidden="true" />
            <span>Paramètres</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="text-red-600 focus:text-red-600"
          disabled={isLoading}
          onClick={handleSignOut}
          role="menuitem"
        >
          <LogOut className="mr-2 h-4 w-4" aria-hidden="true" />
          <span>Déconnexion</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
