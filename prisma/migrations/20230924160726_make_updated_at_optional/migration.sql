-- AlterTable
ALTER TABLE "ActivityLog" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Portfolio" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Purchase" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Value" ALTER COLUMN "updatedAt" DROP NOT NULL;
