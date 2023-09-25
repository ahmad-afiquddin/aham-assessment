/*
  Warnings:

  - Added the required column `title` to the `Fund` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Fund" ADD COLUMN     "title" TEXT NOT NULL;
