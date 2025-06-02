import Link from "next/link"
import { FileCode2 } from "lucide-react"

export function Logo() {
  return (
    <Link href="/dashboard" className="flex items-center space-x-2" aria-label="Retour au tableau de bord">
      <FileCode2 className="h-6 w-6 text-primary" aria-hidden="true" />
      <h1 className="font-mono text-xl font-semibold tracking-tight">
        <span className="text-primary">dot</span>
        <span className="text-green-600 font-bold">MD</span>
      </h1>
    </Link>
  )
}
