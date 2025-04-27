import {Button} from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
    return (
        <div
            className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
            <Button><Link href={'/auth/signin'}>Se connecter</Link></Button>
            <Button><Link href={'/auth/signup'}>S'inscrire</Link></Button>
        </div>
    );
}
