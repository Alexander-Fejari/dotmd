/*
  Warnings:

  - You are about to drop the `Jwks` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Jwks";

-- CreateTable
CREATE TABLE "jwks" (
    "id" TEXT NOT NULL,
    "publicKey" TEXT NOT NULL,
    "privateKey" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "jwks_pkey" PRIMARY KEY ("id")
);
