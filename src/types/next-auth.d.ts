import { DefaultSession } from "next-auth";

declare module "next-auth" {
    interface Session extends DefaultSession {
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
            role?: string;
        };
    }

    interface User {
        id: string;
        role?: string;
    }

    interface JWT {
        accessToken?: string;
    }
}
