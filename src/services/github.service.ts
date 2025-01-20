import { GithubRepository, RepoWithReadme } from "@/types/github";

/**
 * Récupère les dépôts GitHub et leurs README.md si disponibles.
 * @param token Token d'accès GitHub.
 * @returns Liste des dépôts avec README.md ou vide si introuvable.
 */
export const fetchRepositoriesWithReadme = async (token: string): Promise<RepoWithReadme[]> => {
    try {
        // 1. Fetch des dépôts
        const repoResponse = await fetch("https://api.github.com/user/repos", {
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!repoResponse.ok) {
            throw new Error("Erreur lors de la récupération des dépôts.");
        }

        const repositories: GithubRepository[] = await repoResponse.json();

        // 2. Fetch des README pour chaque dépôt
        const reposWithReadme = await Promise.all(
            repositories.map(async (repo) => {
                try {
                    const readmeResponse = await fetch(
                        `https://api.github.com/repos/${repo.owner.login}/${repo.name}/readme`,
                        { headers: { Authorization: `Bearer ${token}` } }
                    );

                    if (!readmeResponse.ok) {
                        return null; // Pas de README disponible
                    }

                    const readmeData = await readmeResponse.json();
                    const decodedReadme = Buffer.from(readmeData.content, "base64").toString("utf-8");
                    console.log(readmeData)
                    return {
                        owner: repo.owner.login,
                        name: repo.name,
                        description: repo.description || null,
                        readme: decodedReadme,
                    };
                } catch {
                    return null; // README non trouvé ou erreur
                }
            })
        );

        // 3. Filtrer les nulls
        return reposWithReadme.filter((repo): repo is RepoWithReadme => repo !== null);
    } catch (error) {
        console.error("Erreur lors du fetch des dépôts avec README.md:", error);
        return [];
    }
};
