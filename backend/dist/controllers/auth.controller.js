"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMe = exports.login = exports.register = void 0;
const auth_validator_js_1 = require("../validators/auth.validator.js");
const auth_service_js_1 = require("../services/auth.service.js");
const token_service_js_1 = require("../services/token.service.js");
const register = async (req, res) => {
    try {
        const result = auth_validator_js_1.registerSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        const user = await (0, auth_service_js_1.registerUser)(result.data);
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    }
    catch (error) {
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
exports.register = register;
const login = async (req, res) => {
    try {
        const result = auth_validator_js_1.loginSchema.safeParse(req.body);
        if (!result.success) {
            res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: result.error.flatten().fieldErrors,
            });
            return;
        }
        const user = await (0, auth_service_js_1.loginUser)(result.data);
        const token = (0, token_service_js_1.generateToken)(user.id);
        res.status(200).json({
            success: true,
            message: "Login successful",
            data: {
                user,
                token,
            },
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "INVALID_CREDENTIALS") {
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
exports.login = login;
const getMe = async (req, res) => {
    try {
        if (!req.userId) {
            res.status(401).json({
                success: false,
                message: "Authentication required",
            });
            return;
        }
        const user = await (0, auth_service_js_1.getUserById)(req.userId);
        res.status(200).json({
            success: true,
            data: user,
        });
    }
    catch (error) {
        if (error instanceof Error &&
            error.message === "USER_NOT_FOUND") {
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
exports.getMe = getMe;
