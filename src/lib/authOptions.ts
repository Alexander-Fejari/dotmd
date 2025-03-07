import type { NextAuthOptions, Session, User, Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

/**
 * Configuration NextAuth pour DotMD
 */

type GithubProfile = Profile & {
    login?: string; // Ajoute la propriété login
};

export const authOptions: NextAuthOptions = {
    // Connexion à la base de données via Prisma
    adapter: PrismaAdapter(prisma),

    // Debug mode pour voir les logs NextAuth (utile pour le dev)
    debug: true,

    // Utilisation des JWT pour la gestion des sessions (au lieu des sessions DB)
    session: {
        strategy: 'jwt',
    },

    // Configuration du provider GitHub
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],

    callbacks: {
        /**
         * Callback JWT : création et mise à jour des JWT
         * - Appelé à la connexion initiale et à chaque mise à jour de session
         */
        async jwt({ token, account, profile, user }: { token: JWT; account?: Account | null; profile?: GithubProfile | undefined; user?: User | null }) {
            const now = Math.floor(Date.now() / 1000); // Temps actuel en secondes

            // Stocke les tokens GitHub lors de la première connexion
            if (account && user) {
                token.accessToken = account.access_token ?? undefined;
                token.refreshToken = account.refresh_token ?? undefined;
                token.expiresAt = (account.expires_at as number | undefined) ?? now + 3600; // Expire dans 1h
                token.userId = user.id;
                // Ajoute le login GitHub (pseudo) au token
                token.githubLogin = profile?.login ?? undefined; // C'est souvent l'ID GitHub ou le login
                console.log("🌱 Nouveau token créé:", token);
            }

            // Vérifie si le token est expiré
            if (typeof token.expiresAt === "number" && now >= token.expiresAt) {
                console.warn("⚠️ Token expiré, déconnexion nécessaire !");
                return {
                    ...token,
                    accessToken: undefined, // On vide le token pour forcer la déconnexion
                    error: "AccessTokenExpired" // Indicateur d'erreur
                };
            }

            return token;
        },

        /**
         * Callback Session : création de la session utilisateur
         * - Ajoute les tokens dans la session si tout est ok
         * - Déclenche une déconnexion si le token est expiré
         */
        async session({ session, token }: { session: Session; token: JWT }) {
            // Si le token est expiré, on renvoie une session "vide".
            if (token.error === "AccessTokenExpired") {
                console.error("❌ Session invalide, token expiré");
                return {
                    user: undefined,
                    expires: new Date(0).toISOString(), // Expiration immédiate
                };
            }

            // Sinon, on ajoute les infos à la session
            session.accessToken = token.accessToken as string | undefined;
            session.refreshToken = token.refreshToken as string | undefined;
            session.expires = token.expiresAt as number | undefined;

            // Ajoute le login GitHub à la session
            session.githubLogin = token.githubLogin as string;

            return session;
        },
    },

    events: {
        /**
         * Event déclenché lors de la connexion
         */
        async signIn({ account }) {
            if (account) {
                console.log("✅ Connexion réussie avec accessToken:", account.access_token);
            }
        },

        /**
         * Event déclenché lors de la déconnexion
         */
        async signOut({ session }) {
            console.log("🟠 Utilisateur déconnecté:", session);
        },
    },
};
