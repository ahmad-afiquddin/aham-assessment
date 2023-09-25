import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const fund = await prisma.portfolio.findUnique({
    where: {
      ownerId: event.context.user.id,
    },
    include: {
      investments: {
        include: {
          fund: {
            include: {
              values: {
                orderBy: {
                  createdAt: "desc",
                },
                take: 1,
              },
            },
          },
          purchases: true,
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
