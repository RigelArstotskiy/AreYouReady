/*
  Warnings:

  - The `format` column on the `MockupCard` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "MockupCard" DROP COLUMN "format",
ADD COLUMN     "format" TEXT[];
