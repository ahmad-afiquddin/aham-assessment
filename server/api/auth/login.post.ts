import { PrismaClient } from "@prisma/client";
import { compare } from "bcrypt";
import { generateToken } from "~/server/utils/token";
import { setCookie } from "h3";
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
  const { email, password } = await readBody(event);

  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User with email does not exist!");
  }

  const isMatch = await compare(password, user.password);

  if (!isMatch) {
    throw new Error("Password does not match!");
  }

  const returnedUser: UserWithoutPassword = {
    ...user,
  };

  delete returnedUser.password;

  const token = generateToken(returnedUser);
  setCookie(event, "authToken", token);

  return user;
});
