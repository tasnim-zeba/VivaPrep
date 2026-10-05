"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
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
