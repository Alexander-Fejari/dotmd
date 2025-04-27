import {createAuthClient} from "better-auth/react"

export const authClient = createAuthClient({
    baseURL: process.env.BETTER_AUTH_URL
})

export const {
    signIn,
    signOut,
    signUp,
    useSession
} = createAuthClient()

export const signInWithGitHub = async (callbackURL = "/dashboard") => {
    try {
        const data = await authClient.signIn.social({
            provider: "github",
            callbackURL,
        });
        return { success: true, data };
    } catch (error) {
        console.error("Erreur lors de la connexion GitHub:", error);
        return { success: false, error: (error as Error).message };
    }
};
