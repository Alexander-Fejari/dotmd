import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const session = await auth.api.getSession({ req });
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  try {
    const accounts = await prisma.account.findMany({
      where: { userId: session.userId, providerId: "github" },
      select: { id, accountId, accessToken, createdAt },
    });
    return NextResponse.json(accounts);
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}