import { PrismaClient } from "@prisma/client";
import { hash } from "bcrypt";
import { generateToken } from "~/server/utils/token";
const prisma = new PrismaClient();

interface UserWithoutPassword {
  id: number;
  firstName: string;
  lastName: string;
  status: string;
  email: string;
  password?: string;
  createdAt: Date;
  updatedAt: Date | null;
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

  const returnedUser: UserWithoutPassword = {
    ...user,
  };

  delete returnedUser.password;

  const token = generateToken(returnedUser);
  setCookie(event, "authToken", token);

  return user;
});
