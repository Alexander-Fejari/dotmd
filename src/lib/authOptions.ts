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
    },
}
