/*
  Warnings:

  - Added the required column `typeId` to the `Fund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "typeId" INTEGER NOT NULL;

-- CreateTable
CREATE TABLE "FundType" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,

    CONSTRAINT "FundType_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Fund" ADD CONSTRAINT "Fund_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "FundType"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
