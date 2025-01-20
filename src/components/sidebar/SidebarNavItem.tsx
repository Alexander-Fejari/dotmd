import React from 'react'
import Link from 'next/link'
import { cn } from "@/lib/utils"
import {AppRoutes} from "@/types/routes";

interface SidebarNavItemProps {
    href: AppRoutes
    children: React.ReactNode
    isActive?: boolean
    className?: string
}

const SidebarNavItem: React.FC<SidebarNavItemProps> = ({ href, children, isActive = false, className }) => {
    return (
        <li>
            <Link
                href={href}
                className={cn(
                    "flex items-center w-full rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                        ? "bg-green-600/30 text-white font-semibold"
                        : "text-gray-300 hover:bg-green-600/30 hover:text-white",
                    className
                )}
            >
                {React.Children.map(children, (child, index) => (
                    <span key={index} className={cn(
                        "flex items-center",
                        index > 0 ? "ml-2" : ""
                    )}>
            {child}
          </span>
                ))}
            </Link>
        </li>
    )
}

export default SidebarNavItem
