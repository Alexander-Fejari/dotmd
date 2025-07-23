import { create } from "zustand"
import { BetterAuthUser, BetterAuthSession } from "@/types"

interface UserState {
    user: BetterAuthUser | null
    session: BetterAuthSession | null
    setUser: (data: { user: BetterAuthUser; session: BetterAuthSession }) => void
    clearUser: () => void
    isSessionExpired: () => boolean
}

export const useUserStore = create<UserState>((set, get) => ({
    user: null,
    session: null,

    setUser: ({ user, session }) => set({ user, session }),

    clearUser: () => set({ user: null, session: null }),

    isSessionExpired: () => {
        const session = get().session
        if (!session) return true
        return new Date(session.expiresAt) < new Date()
    },
}))
