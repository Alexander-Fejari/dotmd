import { create } from "zustand";

// Type aligné avec useSession
interface AuthUser {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image?: string | null | undefined;
    createdAt: Date | string;
    updatedAt: Date | string;
}

interface AuthSession {
    id: string;
    expiresAt: string | Date;
    token: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    ipAddress?: string | null;
    userAgent?: string | null;
    userId: string;
}

interface AuthData {
    user: AuthUser;
    session: AuthSession;
}

interface AuthState {
    authData: AuthData | null;
    setAuthData: (authData: AuthData | null) => void;
    clearAuthData: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    authData: null,
    setAuthData: (authData) => set({ authData }),
    clearAuthData: () => set({ authData: null }),
}));
