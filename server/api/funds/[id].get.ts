import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { id } = event.context.params as {
    id: string;
  };

  const fund = await prisma.fund.findUnique({
    where: {
      id: parseInt(id),
    },
    include: {
      type: true,
      values: {
        orderBy: {
          createdAt: "desc",
        },
      },
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
