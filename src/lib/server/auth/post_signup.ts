import prisma from "@/lib/server/db/prisma";

export async function handlePostLogin(user: any) {

  const userData = await prisma.userData.findUnique({
    where: { userId: user.id },
  });

  if (!userData) {
    await prisma.userData.create({
      data: {
        userId: user.id,
        displayName: user.name || `No Name`,
        email: user.email || `No Email`,
        isAdmin: false,
        postLoginHandled: true, // Mark as handled
      },
    });

    console.log(`Created userData for user : ${user.name}, id : ${user.id}, email : ${user.email}`);
  } 
  else {
    console.log(`UserData already exists for user ${user.id}`);
  }
}