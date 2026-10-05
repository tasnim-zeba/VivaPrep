import jwt from "jsonwebtoken";

export interface TokenPayload {
  userId: string;
}

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined");
  }

  return secret;
};

export const generateToken = (userId: string): string => {
  return jwt.sign(
    { userId },
    getJwtSecret(),
    {
      expiresIn: "7d",
    }
  );
};

export const verifyToken = (token: string): TokenPayload => {
  return jwt.verify(token, getJwtSecret()) as TokenPayload;
};