import { Portfolio, PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getPortfolio(userId: number): Promise<Portfolio | null> {
  const portfolio = await prisma.portfolio.findUnique({
    where: {
      ownerId: userId,
    },
  });

  return portfolio;
}
