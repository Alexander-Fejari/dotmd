import { NextRequest } from "next/server";
import prisma from "@/lib/server/db/prisma";
import { getUserFromCookies } from "better-auth/next-js";

export async function POST(req: NextRequest) {
  try {
    const user = await getUserFromCookies(); // better-auth

    if (!user) {
      return Response.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const existing = await prisma.userData.findUnique({
      where: { userId: user.id },
    });

    if (!existing) {
      await prisma.userData.create({
        data: {
          userId: user.id,
        },
      });
    }

    return Response.json({ success: true });
  } catch (e) {
    return Response.json({ success: false, error: (e as Error).message }, { status: 500 });
  }
}