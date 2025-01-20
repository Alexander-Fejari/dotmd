import {NextAuthOptions} from "next-auth";
import GithubProvider from "next-auth/providers/github"

export const authOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        })
    ],
    callbacks: {
        async jwt({ token, account }) {
            // Attache le accessToken de GitHub au JWT
            if (account) {
                token.accessToken = account.access_token;
            }
            return token;
        },
        async session({ session, token }) {
            // Attache le accessToken de GitHub à la session utilisateur
            session.accessToken = token.accessToken as string;
            return session;
        },
        async redirect({ url, baseUrl }) {
            console.log("Redirect callback:", { url, baseUrl });


            // Si `url` est interne (relatif), redirige vers celui-ci
            if (url.startsWith("/")) {
                return `${baseUrl}${url}`;
            }

            // Si `url` est externe, redirige uniquement si c'est autorisé
            if (url.startsWith(baseUrl)) {
                return url;
            }

            // Par défaut, redirige vers la page d'accueil
            return `${baseUrl}/dashboard`;
        },
    },
}
