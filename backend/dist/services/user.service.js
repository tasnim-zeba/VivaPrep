"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsers = exports.createTestUser = void 0;
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const createTestUser = async () => {
    const uniqueEmail = `test-${Date.now()}@example.com`;
    const user = await prisma_js_1.default.user.create({
        data: {
            name: "Test User",
            email: uniqueEmail,
            passwordHash: "temporary-password-hash",
        },
    });
    return user;
};
exports.createTestUser = createTestUser;
const getAllUsers = async () => {
    const users = await prisma_js_1.default.user.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    return users;
};
exports.getAllUsers = getAllUsers;
