import prisma from "@/lib/utils/prisma";
import { auth } from "@/lib/auth/auth";

// Liste les comptes GitHub liés à un utilisateur.
export async function listGitHubAccounts(req: Request) {
  const session = await auth.api.getSession({ req });
  if (!session) {
    return { error: "Non autorisé", status: 401 };
  }

  try {
    const accounts = await prisma.account.findMany({
      where: { userId: session.userId, providerId: "github" },
      select: { id: true, accountId: true, accessToken: true, createdAt: true },
    });
    return { data: accounts, status: 200 };
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}

// Lie un nouveau compte GitHub à un utilisateur.
export async function linkGitHubAccount(req: Request) {
  const session = await auth.api.getSession({ req });
  if (!session) {
    return { error: "Non autorisé", status: 401 };
  }

  const { accessToken, accountId } = await req.json();
  if (!accessToken || !accountId) {
    return { error: "Access token et ID de compte requis", status: 400 };
  }

  try {
    const account = await prisma.repoAccount.create({
      data: {
        id: crypto.randomUUID(),
        accountId,
        providerId: "github",
        userId: session.userId,
        accessToken,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    });
    return { data: account, status: 201 };
  } catch (error) {
    return { error: (error as Error).message, status: 500 };
  }
}