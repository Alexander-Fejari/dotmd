/*
  Warnings:

  - You are about to drop the column `accessToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `accessTokenExpiresAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refreshToken` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `refreshTokenExpiresAt` on the `session` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `verification` table. All the data in the column will be lost.
  - Made the column `token` on table `session` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `user` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `identifier` to the `verification` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `verification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "account" DROP CONSTRAINT "account_userId_fkey";

-- DropForeignKey
ALTER TABLE "repo_account" DROP CONSTRAINT "repo_account_userId_fkey";

-- DropForeignKey
ALTER TABLE "session" DROP CONSTRAINT "session_userId_fkey";

-- DropForeignKey
ALTER TABLE "verification" DROP CONSTRAINT "verification_userId_fkey";

-- AlterTable
ALTER TABLE "session" DROP COLUMN "accessToken",
DROP COLUMN "accessTokenExpiresAt",
DROP COLUMN "refreshToken",
DROP COLUMN "refreshTokenExpiresAt",
ALTER COLUMN "token" SET NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "name" SET NOT NULL;

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "userId",
ADD COLUMN     "identifier" TEXT NOT NULL,
ADD COLUMN     "value" TEXT NOT NULL;
