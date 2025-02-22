import type { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/lib/prisma";

/**
 * Configuration NextAuth pour DotMD
 */
export const authOptions: NextAuthOptions = {
    // Adapter Prisma pour connecter NextAuth à la base de données PostgreSQL
    adapter: PrismaAdapter(prisma),

    // Providers d'authentification (GitHub)
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
        }),
    ],

    // Callbacks pour manipuler les tokens et les sessions
    callbacks: {
        /**
         * Callback JWT : appelé lors de la création et mise à jour des JWT
         * Vérifie si le token est expiré et prépare le terrain pour le rafraîchir si besoin
         */
        async jwt({ token, account, user }) {
            const now = Math.floor(Date.now() / 1000); // Temps en seconde
            // Lors de la première connexion, on stocke les tokens GitHub et leur expiration
            if (account && user) {
                token.accessToken = account.access_token as string | undefined;
                token.refreshToken = account.refresh_token as string | undefined;
                token.expiresAt = account.expires_at as number | undefined;
                token.userId = user.id;
            }
            // Vérifie si le token est expiré
            if (typeof token.expiresAt === 'number' && now >= token.expiresAt) {
                console.warn("⚠️ Access token expiré :", token.accessToken);
                token.accessToken = undefined; // On marquera le token comme expiré
            }
            return token;
        },

        /**
         * Callback Session : appelé lors de la création de la session utilisateur
         */
        async session({ session, user }) {
            try {
                const account = await prisma.account.findFirst({
                    where: {
                        userId: user.id,
                        provider: 'github',
                    }
                });

                if (account?.access_token) {
                    session.accessToken = account.access_token;
                    session.refreshToken = account.refresh_token as string | undefined;
                    session.expires = account.expires_at as number | undefined;
                }
            } catch (error) {
                console.error("❌ Erreur lors de la récupération de l'access_token :", error);
            }

            return session;
        },
    },

    // Events pour suivre les actions comme signIn, signOut et les sessions
    events: {
        async signIn({ user }) {
            console.log("🔵 Utilisateur connecté :", user);
        },
        async signOut({ session }) {
            console.log("🟠 Utilisateur déconnecté :", session);
        },
        async session({ session }) {
            console.log("🟢 Mise à jour de la session :", session);
        },
    },
};
