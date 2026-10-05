import { NextFunction, Request, Response } from "express";
import { verifyToken } from "../services/token.service.js";

export interface AuthenticatedRequest extends Request {
  userId?: string;
}

export const authenticate = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction
): void => {
  const authorization = req.headers.authorization;

  if (!authorization?.startsWith("Bearer ")) {
    res.status(401).json({
      success: false,
      message: "Authentication required",
    });
    return;
  }

  const token = authorization.split(" ")[1];

  try {
    const payload = verifyToken(token);

    req.userId = payload.userId;

    next();
  } catch {
    res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};