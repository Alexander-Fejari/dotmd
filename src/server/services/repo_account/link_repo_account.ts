import prisma from "@/server/db/prisma";
import { headers } from "next/headers";
import { requireSession } from "@/server/utils/require_session";
import { NextRequest } from "next/server";

async function getAccessToken(repoProvider: string, code: string) {
  if (repoProvider === `github`) {
    const client_id = process.env.GITHUB_CLIENT_ID!;
    const client_secret = process.env.GITHUB_CLIENT_SECRET!;

    return fetch(`https://github.com/login/oauth/access_token`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        //redirect_uri: `${process.env.BETTER_AUTH_URL}/api/auth/callback/github/link?repoProvider=github`,
      }),
    })
  }
  else if (repoProvider === `gitlab`) {
    const client_id = process.env.GITLAB_REPO_CLIENT_ID!;
    const client_secret = process.env.GITLAB_REPO_CLIENT_SECRET!;
    
    return fetch("https://gitlab.com/oauth/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id,
        client_secret,
        code,
        grant_type: "authorization_code",
        redirect_uri: `${process.env.BETTER_AUTH_URL}/api/auth/callback/gitlab/link` // doit matcher exactement celui déclaré dans GitLab
      }),
    })
  }
}

async function saveRepoUser(userId: string, repoUser: any, repoProvider: string, accessTokenObj: any) {
  const userData = await prisma.userData.findUnique({ where: { userId } });
  if (!userData) return { success: false, error: `UserData not found` };
  
  let linked;

  if (repoProvider === `github`) {
    linked = await prisma.repoAccount.create({
      data: {
        accountId: repoUser.id.toString(),
        providerId: repoProvider,
        userDataId: userData.id,
        accessToken: accessTokenObj.access_token,
        scope: `read_user,repo`,
      }
    });
  }

  else if (repoProvider === `gitlab`) {
    const accessTokenExpiresAt = accessTokenObj.created_at ? new Date(accessTokenObj.created_at * 1000 + accessTokenObj.expires_in * 1000) : null;
    linked = await prisma.repoAccount.create({
      data: {
        accountId: repoUser.id.toString(),
        providerId: repoProvider,
        userDataId: userData.id,
        accessToken: accessTokenObj.access_token,
        accessTokenExpiresAt,
        scope: `api`,
        refreshToken: accessTokenObj.refresh_token || null, // GitLab may return a refresh token
      }
    });
  }
  return { success: true, data: linked };
}

export async function linkRepoAccount(req: NextRequest, code: string, repoProvider: string) {
  const accessTokenResponse = await getAccessToken(repoProvider, code);
  if (!accessTokenResponse) {
    return { success: false, error: `Failed to get access token` };
  }

  const accessTokenObj = await accessTokenResponse.json();

  if (!accessTokenObj.access_token || accessTokenObj.tokenError) return { success: false, error: accessTokenObj.tokenError || `Token error` };

  const userRes = await fetch(repoProvider === `github` ? `https://api.github.com/user` : `https://gitlab.com/api/v4/user`,
    { headers: { Authorization: `Bearer ${accessTokenObj.access_token}` } }
  );
  
  const repoUser = await userRes.json();
  const session = await requireSession(await headers());

  return await saveRepoUser(session.user.id, repoUser, repoProvider, accessTokenObj);
}

export async function getAuthUrl(repoProvider: string) {
  if (repoProvider !== `github` && repoProvider !== `gitlab`) {
    return new Error(`Invalid repoProvider: ${repoProvider}`);
  }

  if (repoProvider === `github`) {
    const clientId = process.env.GITHUB_CLIENT_ID!;
    const redirectUri = `${process.env.BETTER_AUTH_URL}/api/auth/callback/github/link`;
    const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
    githubAuthUrl.searchParams.set("client_id", clientId);
    githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
    githubAuthUrl.searchParams.set("scope", "read:user repo");
    return githubAuthUrl;
  }

  else if (repoProvider === `gitlab`) {
    const clientId = process.env.GITLAB_REPO_CLIENT_ID!;
    const redirectUri = `${process.env.BETTER_AUTH_URL}/api/auth/callback/gitlab/link`;
    const gitlabAuthUrl = new URL("https://gitlab.com/oauth/authorize");
    gitlabAuthUrl.searchParams.set("client_id", clientId);
    gitlabAuthUrl.searchParams.set("redirect_uri", redirectUri);
    gitlabAuthUrl.searchParams.set("response_type", "code");
    gitlabAuthUrl.searchParams.set("scope", "api");
    return gitlabAuthUrl;
  }

  return new Error(`Unsupported repoProvider: ${repoProvider}`);
}