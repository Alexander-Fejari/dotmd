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

    console.log(`Created userData for user : ${user.name}, id : ${user.id}, email : ${user.email}`);
    return true;
  } 
  else {
    console.log(`UserData already exists for user ${user.id}`);
    return false;
  }
}