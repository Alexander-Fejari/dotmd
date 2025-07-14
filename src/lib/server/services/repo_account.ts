import prisma from "@/lib/server/db/prisma";
import { auth } from "@/lib/server/auth/auth";
import { headers } from "next/headers";

// Liste les comptes GitHub liés à un utilisateur.
export async function listGitHubAccounts(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { error: `Non autorisé`, status: 401 };
  }

  try {
    const accounts = await prisma.account.findMany({
      where: { userId: session.user.id, providerId: `github` },
      select: { id: true, accountId: true, accessToken: true, createdAt: true },
    });
    return { data: accounts, status: 200 };
  } 
  catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}

// Lie un nouveau compte GitHub à un utilisateur.
export async function linkGitHubAccount(req: Request) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { error: `Non autorisé`, status: 401 };
  }

  const { accessToken, accountId } = await req.json();
  if (!accessToken || !accountId) {
    return { error: `Access token et ID de compte requis`, status: 400 };
  }

  try {
    const account = await prisma.repoAccount.create({
      data: {
        accountId,
        providerId: `github`,
        userDataId: session.user.id,
        accessToken
      },
    });
    return { data: account, status: 201 };
  } 
  catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}