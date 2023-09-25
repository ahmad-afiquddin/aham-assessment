import { User } from "@prisma/client";
import jwt from "jsonwebtoken";

type UserWithoutPassword = User & {
  password?: string;
};

export function generateToken(user: UserWithoutPassword) {
  const config = useRuntimeConfig();
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
    },
    config.tokenSecret,

    {
      expiresIn: config.tokenExpiration,
    },
  );
}

export function verifyToken(token: string) {
  try {
    const config = useRuntimeConfig();
    return jwt.verify(token, config.tokenSecret);
  } catch (err) {
    return "Token invalid";
  }
}

export function getUserToken(event: any) {
  const cookie = getCookie(event, "__session");
  if (!cookie) {
    return null;
  }
  const token = verifyToken(cookie);
  if (!token) {
    return null;
  }
  return token;
}
