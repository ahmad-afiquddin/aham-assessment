import { PrismaClient } from "@prisma/client";
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

  if (!fund) {
    throw createError({
      statusCode: 404,
      statusMessage: "Fund not found",
    });
  }

  if (!event.context.portfolio) {
    throw createError({
      statusCode: 404,
      statusMessage: "User portfolio does not exist",
    });
  }

  const investment = await prisma.investment.findFirst({
    where: {
      fundId: parseInt(fundId),
      portfolioId: event.context.portfolio?.id,
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
