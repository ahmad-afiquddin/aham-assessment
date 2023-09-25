import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const query = getQuery(event);
  const payload: Record<string, any> = {};
  let orderBy: Record<string, any> = {};
  let take: Record<string, number> = {};

  if (query.typeId) {
    payload.typeId = parseInt(query?.typeId as string);
  }

  if (query.title) {
    payload.title = {
      contains: query.title,
      mode: "insensitive",
    };
  }

  if (query?.trend === "negative") {
    payload.difference = { lte: 0 };
    orderBy = {
      orderBy: {
        difference: "asc",
      },
    };
    take = { take: 3 };
  }

  if (query?.trend === "positive") {
    payload.difference = { gte: 0 };
    orderBy = {
      orderBy: {
        difference: "desc",
      },
    };
    take = { take: 3 };
  }

  const fund = await prisma.fund.findMany({
    ...orderBy,
    ...take,
    where: payload,
    include: {
      type: true,
    },
  });

  if (!fund) {
    throw createError({
      statusCode: 404,
      statusMessage: "Fund not found",
    });
  }

  return fund;
});
