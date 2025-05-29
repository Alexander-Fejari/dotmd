import { NextResponse } from "next/server";
import { auth } from "@/lib/auth/server";
import { PrismaClient } from "@/app/generated/prisma";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  const session = await auth.api.getSession({ req });
  if (!session) {
    return NextResponse.json({ error: "Non autorisé" }, { status: 401 });
  }

  const { accessToken, accountId } = await req.json();
  if (!accessToken || !accountId) {
    return NextResponse.json({ error: "Access token et ID de compte requis" }, { status: 400 });
  }

  try {
    const account = await prisma.account.create({
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
    return NextResponse.json(account, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}