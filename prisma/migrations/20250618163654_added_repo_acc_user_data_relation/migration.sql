/*
  Warnings:

  - You are about to drop the column `userId` on the `repo_account` table. All the data in the column will be lost.
  - Added the required column `userDataId` to the `repo_account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "repo_account" DROP COLUMN "userId",
ADD COLUMN     "userDataId" TEXT NOT NULL,
ALTER COLUMN "providerId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "repo_account" ADD CONSTRAINT "repo_account_userDataId_fkey" FOREIGN KEY ("userDataId") REFERENCES "user_data"("id") ON DELETE CASCADE ON UPDATE CASCADE;
