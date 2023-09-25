/*
  Warnings:

  - Added the required column `investmentId` to the `Purchase` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "investmentId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_investmentId_fkey" FOREIGN KEY ("investmentId") REFERENCES "Investment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
