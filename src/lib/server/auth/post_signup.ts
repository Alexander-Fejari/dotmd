import  prisma from "@/lib/server/db/prisma";

export async function handlePostLogin(user: any) {
  console.log("Handling post login for user", user.id);

  const userData = await prisma.userData.findUnique({
    where: { userId: user.id },
  });

  if (!userData) {
    await prisma.userData.create({
      data: {
        userId: user.id,
        displayName: user.name || `No Name`,
        isAdmin: false
      },
    });

    console.log("Created userData for user", user.id);
  } 
  else {
    console.log("UserData already exists for user", user.id);
  }
}