'use client'

import { useRouter } from "next/navigation"
import { useUserStore } from "@/lib/stores/auth-store"
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
import { signOut } from "@/lib/auth/auth-client"

export function UserMenu() {
    const router = useRouter()
    const user = useUserStore((state) => state.user)
    const session = useUserStore((state) => state.session)

    const handleSignOut = async () => {
        await signOut()
        router.push("/")
    }

    // 🔁 Si l'utilisateur n'est pas connecté
    if (!user) {
        return (
            <div className="flex gap-2">
                <Button variant="outline" onClick={() => router.push("/auth/signin")}>
                    Se connecter
                </Button>
                <Button onClick={() => router.push("/auth/signup")}>
                    S’inscrire
                </Button>
            </div>
        )
    }

    // ✅ Sinon, afficher le menu utilisateur
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full" aria-label="Menu utilisateur">
                    <Avatar className="h-8 w-8">
                        <AvatarImage src={user.image || ""} alt={`Photo de ${user.name}`} />
                        <AvatarFallback>{user.name?.charAt(0) || "U"}</AvatarFallback>
                    </Avatar>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount role="menu">
                <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.name}</p>
                        <p className="text-xs leading-none text-muted-foreground">{user.email}</p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup role="group">
                    <DropdownMenuItem onClick={() => router.push("/profile")}>
                        <User className="mr-2 h-4 w-4" />
                        <span>Profil</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => router.push("/settings")}>
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Paramètres</span>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="text-red-600 focus:text-red-600"
                    onClick={handleSignOut}
                >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Déconnexion</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}
