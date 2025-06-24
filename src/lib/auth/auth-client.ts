import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  fetchOptions: {
    auth: {
      type:"Bearer",
        token: () => localStorage.getItem("bearer_token") || ""
    },
    onSuccess: (ctx) => {
        const authToken = ctx.response.headers.get("set-auth-token") // get the token from the response headers
        // Store the token securely (e.g., in localStorage)
        if(authToken){
          localStorage.setItem("bearer_token", authToken); // Surement demander à Alex si il ne vaut mieux pas le mettre dans un store 
      }
    }
  }
});

export const { signIn, signOut, signUp, useSession, resetPassword } = authClient;

const supportedProviders = ["github", "gitlab", "google", "discord"] as const;
type Provider = (typeof supportedProviders)[number];

// SignIn with social providers
export const signInWithSocial = async (
  provider: Provider,
  callbackURL = "/dashboard"
) => {
  if (!supportedProviders.includes(provider)) {
    return { success: false, error: `Provider ${provider} non supporté` };
  }
  try {
    const data = await authClient.signIn.social({
      provider,
      callbackURL,
    });
    return { success: true, data };
  } catch (error) {
    console.error(`Erreur lors de la connexion avec ${provider}:`, error);
    return { success: false, error: (error as Error).message };
  }
};

// Link Github account to dotmd account
export const linkGitHubAccount = async (callbackURL = "/dashboard") => {
  try {
    const data = await authClient.signIn.social({
      provider: "github",
      callbackURL,
    });
    return { success: true, data };
  } catch (error) {
    console.error("Erreur lors du lien GitHub:", error);
    return { success: false, error: (error as Error).message };
  }
};
