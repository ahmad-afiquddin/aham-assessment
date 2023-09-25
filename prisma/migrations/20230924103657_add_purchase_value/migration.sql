/*
  Warnings:

  - Added the required column `updatedAt` to the `ActivityLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `valueId` to the `Purchase` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Value` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ActivityLog" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "valueId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Value" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_valueId_fkey" FOREIGN KEY ("valueId") REFERENCES "Value"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
