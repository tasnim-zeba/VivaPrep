import { Request, Response } from "express";
import {
  createTestUser,
  getAllUsers,
} from "../services/user.service.js";

export const createTestUserController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const user = await createTestUser();

  res.status(201).json({
    success: true,
    data: user,
  });
};

export const getAllUsersController = async (
  _req: Request,
  res: Response
): Promise<void> => {
  const users = await getAllUsers();

  res.status(200).json({
    success: true,
    data: users,
  });
};