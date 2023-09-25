import { PrismaClient } from "@prisma/client";
import { getPortfolio } from "../../utils/portfolio";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id: fundId } = event.context.params as {
    id: string;
  };

  const fund = await prisma.fund.findUnique({
    where: {
      id: parseInt(fundId),
    },
  });

  const portfolio = await getPortfolio(event.context.user.id);

  if (!fund) {
    throw createError({
      statusCode: 404,
      statusMessage: "Fund not found",
    });
  }

  if (!portfolio) {
    throw createError({
      statusCode: 404,
      statusMessage: "User portfolio does not exist",
    });
  }

  const investment = await prisma.investment.findFirst({
    where: {
      fundId: parseInt(fundId),
      portfolioId: portfolio?.id,
    },
    include: {
      fund: true,
      purchases: {
        include: {
          value: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  return investment;
});
