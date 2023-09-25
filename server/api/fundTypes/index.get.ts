import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default defineEventHandler(async () => {
  const lesson = await prisma.fundType.findMany();

  return lesson;
});
