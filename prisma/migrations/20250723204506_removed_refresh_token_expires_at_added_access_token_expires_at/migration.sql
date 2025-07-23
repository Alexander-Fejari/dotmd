/*
  Warnings:

  - You are about to drop the column `refreshTokenExpiresAt` on the `repo_account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "repo_account" DROP COLUMN "refreshTokenExpiresAt",
ADD COLUMN     "accessTokenExpiresAt" TIMESTAMP(3);
