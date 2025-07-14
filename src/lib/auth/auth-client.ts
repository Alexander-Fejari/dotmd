import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
});

export const { signIn, signOut, signUp, useSession, resetPassword } = authClient;

const supportedProviders = [`github`, `gitlab`, `google`, `discord`] as const;
type Provider = (typeof supportedProviders)[number];

// SignIn with social providers
export const signInWithSocial = async (
  provider: Provider,
  callbackURL = `/dashboard`
) => {
  if (!supportedProviders.includes(provider)) {
    return { success: false, error: `Provider ${provider} non supporté` };
  }
  localStorage.removeItem("post_login_done");
  try {
    const data = await authClient.signIn.social({
      provider,
      callbackURL,
    });
    
    return { success: true, data };
  } 
  catch (error) {
    console.error(`Erreur lors de la connexion avec ${provider}:`, error);
    return { success: false, error: (error as Error).message };
  }
};

export const signUpEmailPassword = async (
  email: string,
  password: string,
  name: string,
  image: string,
  callbackURL: string
) => {
  localStorage.removeItem("post_login_done");
  try {
    const data = await authClient.signUp.email({
      email,
      password,
      name,
      image,
      callbackURL,
    });
    return { success: true, data };
  }
  catch (error) {
    console.error("Erreur lors de l'inscription:", error);
    return { success: false, error: (error as Error).message };
  }
};


export const signInEmailPassword = async (
  email: string,
  password: string,
  callbackURL: string
) => {
  localStorage.removeItem("post_login_done");
  try {
    const data = await authClient.signIn.email({
      email,
      password,
      callbackURL,
    });
    return { success: true, data };
  }
  catch (error) {
    console.error("Erreur lors de la connexion par email:", error);
    return { success: false, error: (error as Error).message };
  }
}


// // Link Github account to dotmd account
// export const linkGitHubAccount = async (callbackURL = `/dashboard`) => {
//   try {
//     const data = await authClient.signIn.social({
//       provider: "github",
//       callbackURL,
//     });
//     return { success: true, data };
//   } catch (error) {
//     console.error("Erreur lors du lien GitHub:", error);
//     return { success: false, error: (error as Error).message };
//   }
// };
