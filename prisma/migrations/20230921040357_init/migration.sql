-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'active',
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Portfolio" (
    "id" SERIAL NOT NULL,
    "ownerId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Portfolio_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Investment" (
    "id" SERIAL NOT NULL,
    "units" INTEGER NOT NULL,
    "portfolioId" INTEGER NOT NULL,
    "fundId" INTEGER NOT NULL,

    CONSTRAINT "Investment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Purchase" (
    "id" SERIAL NOT NULL,
    "units" INTEGER NOT NULL,
    "fundId" INTEGER NOT NULL,

    CONSTRAINT "Purchase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Fund" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Fund_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Value" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "fundId" INTEGER NOT NULL,

    CONSTRAINT "Value_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ActivityLog" (
    "id" SERIAL NOT NULL,
    "entity" TEXT NOT NULL,
    "entityId" INTEGER NOT NULL,
    "action" TEXT NOT NULL,
    "data" JSONB NOT NULL,

    CONSTRAINT "ActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Portfolio_ownerId_key" ON "Portfolio"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "Investment_portfolioId_key" ON "Investment"("portfolioId");

-- AddForeignKey
ALTER TABLE "Portfolio" ADD CONSTRAINT "Portfolio_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_portfolioId_fkey" FOREIGN KEY ("portfolioId") REFERENCES "Portfolio"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Investment" ADD CONSTRAINT "Investment_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Value" ADD CONSTRAINT "Value_fundId_fkey" FOREIGN KEY ("fundId") REFERENCES "Fund"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
