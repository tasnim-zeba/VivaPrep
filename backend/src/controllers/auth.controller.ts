import { Request, Response } from "express";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";
import { registerUser, loginUser, getUserById } from "../services/auth.service.js";
import { generateToken } from "../services/token.service.js";
import type { AuthenticatedRequest } from "../middleware/auth.middleware.js";

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = registerSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });

      return;
    }

    const user = await registerUser(result.data);

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      data: user,
    });
  } catch (error) {
    if (error instanceof Error && error.message === "EMAIL_ALREADY_EXISTS") {
      res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });

      return;
    }

    console.error("Registration error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const result = loginSchema.safeParse(req.body);

    if (!result.success) {
      res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: result.error.flatten().fieldErrors,
      });

      return;
    }

    const user = await loginUser(result.data);

    const token = generateToken(user.id);

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: {
        user,
        token,
      },
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "INVALID_CREDENTIALS"
    ) {
      res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });

      return;
    }

    console.error("Login error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export const getMe = async (
  req: AuthenticatedRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        success: false,
        message: "Authentication required",
      });
      return;
    }

    const user = await getUserById(req.userId);

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "USER_NOT_FOUND"
    ) {
      res.status(404).json({
        success: false,
        message: "User not found",
      });
      return;
    }

    console.error("Get current user error:", error);

    res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};