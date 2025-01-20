import {JSX} from "react";
import Link from 'next/link'
import GreetingUser from "@/components/GreetingUser";

export function Header(): JSX.Element {

    return (
        <header className="w-full px-4 lg:px-6 h-14 flex items-center">
            <div className="w-full max-w-7xl mx-auto flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold text-green-600 hover:text-green-700 transition-colors">
                    DotMD
                </Link>
                <nav>
                    <ul className="flex items-center gap-4">
                        <li><GreetingUser /></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

