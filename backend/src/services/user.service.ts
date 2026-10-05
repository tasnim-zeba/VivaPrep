import prisma from "../config/prisma.js";

export const createTestUser = async () => {
  const uniqueEmail = `test-${Date.now()}@example.com`;

  const user = await prisma.user.create({
    data: {
      name: "Test User",
      email: uniqueEmail,
      passwordHash: "temporary-password-hash",
    },
  });

  return user;
};

export const getAllUsers = async () => {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return users;
};