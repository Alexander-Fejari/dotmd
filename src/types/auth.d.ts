export interface BetterAuthUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
}

export interface BetterAuthSession {
    id: string;
    userId: string;
    token: string;
    expiresAt: string | Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    createdAt: string | Date;
    updatedAt: string | Date;
}
