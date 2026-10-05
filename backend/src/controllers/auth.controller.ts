import { Request, Response } from "express";
import { registerSchema } from "../validators/auth.validator.js";
import { registerUser } from "../services/auth.service.js";

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