import prisma from "@/server/db/prisma";
import { headers } from "next/headers";
import { requireSession } from "@/server/utils/require_session";

// Lie un nouveau compte GitHub à un utilisateur.
export async function linkRepoAccount(req: Request) {
  const session = await requireSession(await headers());

  const { accessToken, repoProvider } = await req.json();
  if (!accessToken || !repoProvider || repoProvider !== `github` && repoProvider !== `gitlab`) {
    return { error: `No GH/GL access token or no specified repo Provider`, status: 400 };
  }

  try {
    const repoAccountUser = (repoProvider == `github`) ? await fetch(`htpps://api/github.com/user}`, { headers: { Authorization: `Bearer ${accessToken}`}}).then(res => res.json()) : await fetch(`https://gitlab.com/api/v4/user`, { headers: { Authorization: `Bearer ${accessToken}`}}).then(res => res.json());
    
    const userData = await prisma.userData.findUnique({
      where: { userId: session.user.id },
      select: { id: true }
    });

    if (!userData) return { error: `UserData not found`, status: 404 };

    const linked = await prisma.repoAccount.create({
      data: {
        accountId: repoAccountUser.id.toString(),
        providerId: repoProvider,
        userDataId: userData.id,
        accessToken,
        scope: repoProvider === `github` ? `read_user,repo` : `read_user,api`,
      }
    });

    return { data: linked, status: 201 };
  } 
  catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}

export async function getAuthUrl(repoProvider: string) {
  if (repoProvider !== `github` && repoProvider !== `gitlab`) {
    return new Error(`Invalid repoProvider: ${repoProvider}`);
  }

  const redirectUri = `${process.env.BETTER_AUTH_URL}/api/repo-accounts/link`;

  if (repoProvider === `github`) {
    const clientId = process.env.GITHUB_CLIENT_ID!;
    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", clientId);
    githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
    githubAuthUrl.searchParams.set("scope", "read:user repo");
    return githubAuthUrl;
  }

  else if (repoProvider === `gitlab`) {
    const clientId = process.env.GITLAB_CLIENT_ID!;
    const gitlabAuthUrl = new URL("https://gitlab.com/oauth/authorize");
    gitlabAuthUrl.searchParams.set("client_id", clientId);
    gitlabAuthUrl.searchParams.set("redirect_uri", redirectUri);
    gitlabAuthUrl.searchParams.set("response_type", "code");
    gitlabAuthUrl.searchParams.set("scope", "read_user api");
    return gitlabAuthUrl;
  }

  return new Error(`Unsupported repoProvider: ${repoProvider}`);
}



// export async function listGitHubAccounts() {
//   const session = await auth.api.getSession({ headers: await headers() });
//   if (!session) {
//     return { error: `Non autorisé`, status: 401 };
//   }

//   try {
//     const accounts = await prisma.repoAccount.findMany({
//       where: { userDataId: session.user.id, providerId: `github` },
//       select: { id: true, accountId: true, accessToken: true }
//     });
//     return { data: accounts, status: 200 };
//   } 
//   catch (error) {
//     return { error: (error as Error).message, status: 500 };
//   }
// }