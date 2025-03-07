'use client';

import { useEffect, useState } from 'react';
import Loader from "@/components/Loader";

// 📝 Interface pour un dépôt avec README
interface Repository {
    owner: string;
    name: string;
    description: string | null;
    readme: string | null;
}

export default function RepositoriesPage() {
    const [repositories, setRepositories] = useState<Repository[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepositories = async () => {
            try {
                const response = await fetch("/api/github/getRepos");
                const data = await response.json();

                if (response.ok) {
                    console.log("📚 Dépôts récupérés :", data);
                    setRepositories(data);
                } else {
                    setError(data.error || "Une erreur est survenue");
                }
            } catch (error) {
                setError("Erreur lors de la récupération des dépôts");
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchRepositories().catch(console.error);
    }, []);

    if (loading) return <Loader fullScreen={true} />;
    if (error) return <p className="text-red-500">{error}</p>;

    return (
        <div>
            <h1 className="text-2xl font-bold">Vos dépôts GitHub</h1>
            {repositories.length > 0 ? (
                repositories.map((repo) => (
                    <div key={`${repo.owner}-${repo.name}`} className="border border-primary p-4 rounded-lg my-2">
                        <h2 className="text-xl font-semibold">{repo.name}</h2>
                        <p>{repo.description || "Pas de description"}</p>
                        {repo.readme ? (
                            <pre className="p-4 rounded-lg ">{repo.readme}</pre>
                        ) : (
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                                onClick={() => console.log(`📝 Ajouter un README à ${repo.name}`)}
                            >
                                ➕ Ajouter un README
                            </button>
                        )}
                    </div>
                ))
            ) : (
                <p>Aucun dépôt trouvé.</p>
            )}
        </div>
    );
}
