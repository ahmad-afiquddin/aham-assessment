import { PrismaClient, User } from "@prisma/client";
import { compare } from "bcrypt";
import { generateToken } from "~/server/utils/token";
import { setCookie } from "h3";
const prisma = new PrismaClient();

type UserWithoutPassword = User & {
  password?: string;
};

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
  setCookie(event, "__session", token);

  return user;
});
