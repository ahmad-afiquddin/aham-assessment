/*
  Warnings:

  - Added the required column `averagePrice` to the `Investment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Investment" ADD COLUMN     "averagePrice" INTEGER NOT NULL;
