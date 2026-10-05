import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import type { RegisterInput } from "../validators/auth.validator.js";

export const registerUser = async (input: RegisterInput) => {
  const normalizedEmail = input.email.toLowerCase();

  const existingUser = await prisma.user.findUnique({
    where: {
      email: normalizedEmail,
    },
  });

  if (existingUser) {
    throw new Error("EMAIL_ALREADY_EXISTS");
  }

  const passwordHash = await bcrypt.hash(input.password, 12);

  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: normalizedEmail,
      passwordHash,
    },

    select: {
      id: true,
      name: true,
      email: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return user;
};