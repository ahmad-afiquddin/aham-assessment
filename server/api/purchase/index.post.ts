import { PrismaClient } from "@prisma/client";
import { getPortfolio } from "../../utils/portfolio";
const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const { fundId, units } = await readBody(event);

  const currentValue = await prisma.value.findFirst({
    where: {
      fundId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  if (!currentValue) {
    throw createError({
      statusCode: 404,
      statusMessage: "Fund value not found",
    });
  }

  const portfolio = await getPortfolio(event.context.user?.id);

  if (!portfolio) {
    throw createError({
      statusCode: 404,
      statusMessage: "Portfolio not found",
    });
  }

  let investment = await prisma.investment.findUnique({
    where: {
      portfolioId_fundId: {
        portfolioId: portfolio.id,
        fundId,
      },
    },
  });

  if (!investment?.id) {
    investment = await prisma.investment.create({
      data: {
        portfolioId: portfolio.id,
        fundId,
        units: parseInt(units),
        averagePrice: currentValue?.value,
      },
    });
  } else {
    investment = await prisma.investment.update({
      where: {
        portfolioId_fundId: {
          portfolioId: portfolio.id,
          fundId,
        },
      },
      data: {
        units: investment.units + parseInt(units),
        averagePrice: getNewAverage(
          investment.units,
          investment.averagePrice,
          parseInt(units),
          currentValue.value,
        ),
      },
    });
  }

  if (!investment) {
    throw createError({
      statusCode: 500,
      statusMessage: "Failed to create an investment!",
    });
  }

  const purchase = await prisma.purchase.create({
    data: {
      units: parseInt(units),
      fundId,
      valueId: currentValue.id,
      investmentId: investment.id,
    },
  });

  return purchase;
});

function getNewAverage(
  oldUnits: number,
  oldPrice: number,
  addedUnits: number,
  newPrice: number,
): number {
  return (
    (oldUnits * oldPrice + addedUnits * newPrice) / (oldUnits + addedUnits)
  );
}
