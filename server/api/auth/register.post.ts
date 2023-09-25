import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
const prisma = new PrismaClient();

interface ReturnedUser {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
}

export default defineEventHandler(async (event) => {
  const { firstName, lastName, email, password } = await readBody(event);

  const hashedPassword = await hash(password, 10);

  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists!");
  }

  const user = await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedPassword,
    },
  });

  await prisma.portfolio.create({
    data: {
      ownerId: user.id,
    },
  });

  delete (user as ReturnedUser).password;
  return user;
});
