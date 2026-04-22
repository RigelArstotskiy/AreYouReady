/*
  Warnings:

  - You are about to drop the `CvComment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CvComment" DROP CONSTRAINT "CvComment_authorId_fkey";

-- DropForeignKey
ALTER TABLE "CvComment" DROP CONSTRAINT "CvComment_cvId_fkey";

-- DropTable
DROP TABLE "CvComment";

-- CreateTable
CREATE TABLE "CvResult" (
    "id" TEXT NOT NULL,
    "cvId" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "rawJson" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CvResult_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CvResult" ADD CONSTRAINT "CvResult_cvId_fkey" FOREIGN KEY ("cvId") REFERENCES "CvUpload"("id") ON DELETE CASCADE ON UPDATE CASCADE;
