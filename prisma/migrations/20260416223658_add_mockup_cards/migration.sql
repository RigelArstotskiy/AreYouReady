/*
  Warnings:

  - You are about to drop the column `mentorId` on the `Session` table. All the data in the column will be lost.
  - You are about to drop the column `serviceType` on the `Session` table. All the data in the column will be lost.
  - Added the required column `cardId` to the `Session` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Session" DROP CONSTRAINT "Session_mentorId_fkey";

-- AlterTable
ALTER TABLE "Session" DROP COLUMN "mentorId",
DROP COLUMN "serviceType",
ADD COLUMN     "cardId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "MockupCard" (
    "id" TEXT NOT NULL,
    "mentorId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "techStack" TEXT[],
    "format" TEXT NOT NULL,
    "priceUsd" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "MockupCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MockupCard" ADD CONSTRAINT "MockupCard_mentorId_fkey" FOREIGN KEY ("mentorId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "MockupCard"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
