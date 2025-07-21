import prisma from "@/server/db/prisma";
import { headers } from "next/headers";
import { requireSession } from "@/server/utils/require_session";

// Lie un nouveau compte GitHub à un utilisateur.
export async function linkRepoAccount(req: Request) {
  const session = await requireSession(await headers());

  const { accessToken, repoProvider } = await req.json();
  if (!accessToken || !repoProvider) {
    return { error: `No GH/GL access token or no specified repo Provider`, status: 400 };
  }

  try {
    const repoAccountUser = (repoProvider == `github`) ? await fetch(`htpps://api/github.com/user}`, { headers: { Authorization: `Bearer ${accessToken}`}}).then(res => res.json()) : await fetch(`https://gitlab.com/api/v4/user`, { headers: { Authorization: `Bearer ${accessToken}`}}).then(res => res.json());
    
    const userData = await prisma.userData.findUnique({
      where: { userId: session.user.id },
      select: { id: true }
    });

    if (!userData) return { error: "UserData not found", status: 404 };

    const linked = await prisma.repoAccount.upsert({
      where: {
        accountId_providerId: {
          accountId: repoAccountUser.id.toString(),
          providerId: "github"
        }
      },
      update: {
        accessToken,
        updatedAt: new Date()
      },
      create: {
        accountId: repoAccountUser.id.toString(),
        providerId: repoProvider,
        userDataId: userData.id,
        accessToken
      }
    });

    return { data: linked, status: 201 };
  } 
  catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}

// // Liste les comptes GitHub liés à un utilisateur.
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