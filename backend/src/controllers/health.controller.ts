import { Request, Response } from "express";
import { getHealthMessage } from "../services/health.service.js";

export const getHealth = (_req: Request, res: Response): void => {
  const message = getHealthMessage();

  res.status(200).json({
    success: true,
    message,
  });
};