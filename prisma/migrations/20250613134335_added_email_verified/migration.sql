/*
  Warnings:

  - Added the required column `emailVerified` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "session" ALTER COLUMN "token" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "emailVerified" TEXT NOT NULL;
