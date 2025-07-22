import { NextRequest } from "next/server";
import prisma from "@/server/db/prisma";

export async function checkEmailDisplayName(req: NextRequest) {
  const email = req.nextUrl.searchParams.get(`email`);
  const displayName = req.nextUrl.searchParams.get(`displayName`);

  if (!email || !displayName) {
    throw new Error(`Missing email or displayName`);
  }

  try {
    const [emailUser, displayNameUser] = await Promise.all([
      prisma.user.findUnique({
        where: { email },
        select: { id: true }
    }),
      prisma.user.findUnique({
        where: { name: displayName },
        select: { id: true }
      })
    ]);
    
    return ({
      emailExists: !!emailUser,
      displayNameExists: !!displayNameUser
    });
  }
  catch (error) {
    console.error(`Error checking existing user:`, error);
    throw new Error(`Database error while checking user existence`);
  }
}