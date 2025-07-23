"use client"

import { useEffect } from "react"
import { useSession } from "@/lib/auth/auth-client"
import { useUserStore } from "@/lib/stores/auth-store"

export const UserSessionProvider = () => {
    const { data, isPending } = useSession()
    const setUser = useUserStore(state => state.setUser)
    const clearUser = useUserStore(state => state.clearUser)

    useEffect(() => {
        if (isPending) return

        if (data?.user && data?.session) {
            setUser({ user: data.user, session: data.session })
        } else {
            clearUser()
        }
    }, [data, isPending, setUser, clearUser])

    return null
}
