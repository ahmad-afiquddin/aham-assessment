import { User } from "@prisma/client";
import jwt from "jsonwebtoken";
import { parseCookies } from "h3";

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
  const cookies = parseCookies(event);
  const token = cookies?.__session;
  if (!token) {
    return null;
  }
  const user = verifyToken(token);
  if (!user) {
    return null;
  }
  return user;
}
