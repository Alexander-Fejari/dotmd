import Link from "next/link";
import {Navbar} from "@/components/Navbar";
import {Button} from "@/components/ui/button";

export default function Home() {
    return (
        <section className="flex min-h-screen flex-col">
            <Navbar/>
            <main className="flex-1 container mx-auto px-4 py-12">
                <section className="max-w-4xl mx-auto text-center space-y-8">
                    <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">Bienvenue sur dotMD</h1>
                    <p className="text-xl text-muted-foreground">
                        Votre plateforme de documentation et de gestion de repositories.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Button asChild size="lg">
                            <Link href="/dashboard">Accéder au Dashboard</Link>
                        </Button>
                        <Button variant="outline" size="lg">
                            En savoir plus
                        </Button>
                    </div>
                </section>
            </main>
        </section>
    );
}
