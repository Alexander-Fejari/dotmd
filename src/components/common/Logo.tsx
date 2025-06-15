import Link from "next/link"
import Image from "next/image"

export function Logo() {
    return (
        <Link href="/dashboard" className="flex items-center space-x-2" aria-label="Retour au tableau de bord">
            <Image src="/dotmd.png" alt="dotMD Logo" width={32} height={32} className="h-8 w-8" />
            <h1 className="hidden md:flex font-mono text-xl font-semibold tracking-tight">
                <span className="text-primary">dot</span>
                <span className="text-secondary">md</span>
            </h1>
        </Link>
    )
}
