// Types des dépôts GitHub
export interface GithubRepository {
    id: number;
    name: string;
    owner: {
        login: string;
    };
    description: string | null;
}

// Types pour les fichiers README
export interface GithubReadme {
    content: string; // Contenu encodé en Base64
    encoding: string; // Type d'encodage (ex. "base64")
}

// Nouveau type combiné pour lier dépôt et README
export interface RepoWithReadme {
    owner: string; // Nom du propriétaire du dépôt
    name: string; // Nom du dépôt
    description: string | null; // Description du dépôt
    readme: string; // Contenu décodé du README
}
