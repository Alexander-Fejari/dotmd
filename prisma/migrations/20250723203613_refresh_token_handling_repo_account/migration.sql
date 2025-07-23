/*
  Warnings:

  - You are about to drop the column `accessTokenExpiresAt` on the `repo_account` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "repo_account" DROP COLUMN "accessTokenExpiresAt";
