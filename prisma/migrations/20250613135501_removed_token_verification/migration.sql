/*
  Warnings:

  - You are about to drop the column `token` on the `verification` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "verification_token_key";

-- AlterTable
ALTER TABLE "verification" DROP COLUMN "token";
