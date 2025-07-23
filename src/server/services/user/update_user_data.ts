import prisma from "@/server/db/prisma";

type UserDataUpdateInput = {
  lastName?: string;
  firstName?: string;
  displayName?: string;
  userBio?: string;
  birthday?: string; // ISO string (ex: "2000-01-01")
  phoneNumber?: number;
};

export async function updateUserData(userId: string, input: UserDataUpdateInput) {
  const {
    lastName,
    firstName,
    displayName,
    userBio,
    birthday,
    phoneNumber,
  } = input;

  const updated = await prisma.userData.update({
    where: { userId },
    data: {
      lastName,
      firstName,
      displayName,
      userBio,
      birthday: birthday ? new Date(birthday) : undefined,
      phoneNumber,
    },
  });

  return updated;
}