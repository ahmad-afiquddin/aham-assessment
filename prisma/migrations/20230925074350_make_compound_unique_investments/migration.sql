/*
  Warnings:

  - A unique constraint covering the columns `[portfolioId,fundId]` on the table `Investment` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Investment_portfolioId_fundId_key" ON "Investment"("portfolioId", "fundId");
