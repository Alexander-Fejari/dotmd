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
         */
        async jwt({ token, account, user }) {
            if (account && user) {
                token.accessToken = account.access_token as string | undefined;
                token.refreshToken = account.refresh_token as string | undefined;
                token.expiresAt = account.expires_at as number | undefined;
                token.userId = user.id;
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
