/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `user_data` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "user_data" ADD COLUMN     "email" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_data_email_key" ON "user_data"("email");
