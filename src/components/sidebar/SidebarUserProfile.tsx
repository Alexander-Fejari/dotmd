import type React from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

interface SidebarUserProfileProps {
    name: string
    email: string
    avatarUrl: string
}

const SidebarUserProfile: React.FC<SidebarUserProfileProps> = ({ name, email, avatarUrl }) => {
    return (
        <a href="#" className="flex items-center gap-2 p-4 hover:bg-secondary">
            <Avatar>
                <AvatarImage src={avatarUrl} alt={name} />
                <AvatarFallback>{name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
                <p className="text-xs text-white">
                    <strong className="block font-medium">{name}</strong>
                    <span>{email}</span>
                </p>
            </div>
        </a>
    )
}

export default SidebarUserProfile

