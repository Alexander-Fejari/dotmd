import prisma from "@/server/db/prisma";
import { requireSession } from "@/server/utils/require_session";

export async function handlePostLogin(headers: Headers) {
  const session = await requireSession(headers);
  const user = session.user;
  
  const userData = await prisma.userData.findUnique({
    where: { userId: user.id },
  });

  if (!userData) {
    await prisma.userData.create({
      data: {
        userId: user.id,
        displayName: user.name || `No Name`,
        email: user.email || `No Email`,
        image: user.image || `No Image`,
        isAdmin: false,
        postLoginHandled: true, // Mark as handled
      },
    });

    return true;
  } 
  return false;
}