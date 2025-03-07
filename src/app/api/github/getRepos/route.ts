import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/authOptions";
import { getOctokit } from "@/lib/octokit";
import { GithubRepository } from "@/types/github";

/**
 * GET /api/github/getRepositories
 * Récupère les dépôts GitHub dont l'utilisateur est propriétaire avec leurs README.md si disponibles.
 * Affiche aussi les repos sans README pour permettre leur création.
 */
export async function GET() {
    const session = await getServerSession(authOptions);

    // Vérifie si la session est valide et si l'accessToken est disponible
    if (!session || !session.accessToken) {
        console.warn("⚠️ Tentative d'accès non autorisé");
        return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
    }

    const octokit = getOctokit(session.accessToken);

    try {
        // Récupère les dépôts GitHub de l'utilisateur connecté
        const { data: repositories } = await octokit.repos.listForAuthenticatedUser();

        // Filtre uniquement les dépôts où l'utilisateur est propriétaire
        const ownedRepos = repositories.filter(
            (repo: GithubRepository) => repo.owner.login === session.githubLogin
        );

        // Pour chaque repo, tente de récupérer le README si disponible
        const reposWithReadme = await Promise.all(
            ownedRepos.map(async (repo: GithubRepository) => {
                try {
                    // Récupère le README.md du dépôt
                    const { data: readmeData } = await octokit.repos.getReadme({
                        owner: repo.owner.login,
                        repo: repo.name,
                    });

                    // Décodage du contenu Base64 en texte lisible
                    const decodedReadme = Buffer.from(readmeData.content, "base64").toString("utf-8");

                    return {
                        owner: repo.owner.login,
                        name: repo.name,
                        description: repo.description || "Pas de description",
                        readme: decodedReadme,
                    };
                } catch {
                    console.warn(`❌ Pas de README pour ${repo.name}`);
                    // Retourne le repo avec un README null pour pouvoir en ajouter plus tard
                    return {
                        owner: repo.owner.login,
                        name: repo.name,
                        description: repo.description || "Pas de description",
                        readme: null,
                    };
                }
            })
        );

        return NextResponse.json(reposWithReadme);
    } catch (error) {
        console.error("❌ Erreur lors de la récupération des dépôts :", error);
        return NextResponse.json({ error: "Erreur interne" }, { status: 500 });
    }
}
