import {DefaultSession} from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            role?: string;
        } & DefaultSession["user"];
        accessToken?: string;
        refreshToken?: string;
        expires?: number;
        githubLogin?: string;
    }

    interface User {
        id: string;
        role?: string;
        login: string;
    }

    interface JWT {
        accessToken?: string;
        refreshToken?: string;
        expiresAt?: number;
        githubLogin?: string;
    }
}
