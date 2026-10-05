"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserById = exports.loginUser = exports.registerUser = void 0;
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const prisma_js_1 = __importDefault(require("../config/prisma.js"));
const registerUser = async (input) => {
    const normalizedEmail = input.email.toLowerCase();
    const existingUser = await prisma_js_1.default.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });
    if (existingUser) {
        throw new Error("EMAIL_ALREADY_EXISTS");
    }
    const passwordHash = await bcryptjs_1.default.hash(input.password, 12);
    const user = await prisma_js_1.default.user.create({
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
exports.registerUser = registerUser;
const loginUser = async (input) => {
    const normalizedEmail = input.email.toLowerCase();
    const user = await prisma_js_1.default.user.findUnique({
        where: {
            email: normalizedEmail,
        },
    });
    if (!user) {
        throw new Error("INVALID_CREDENTIALS");
    }
    const passwordMatches = await bcryptjs_1.default.compare(input.password, user.passwordHash);
    if (!passwordMatches) {
        throw new Error("INVALID_CREDENTIALS");
    }
    return {
        id: user.id,
        name: user.name,
        email: user.email,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
};
exports.loginUser = loginUser;
const getUserById = async (userId) => {
    const user = await prisma_js_1.default.user.findUnique({
        where: {
            id: userId,
        },
        select: {
            id: true,
            name: true,
            email: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    if (!user) {
        throw new Error("USER_NOT_FOUND");
    }
    return user;
};
exports.getUserById = getUserById;
