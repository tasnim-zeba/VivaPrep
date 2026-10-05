"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const auth_validator_js_1 = require("../validators/auth.validator.js");
const auth_service_js_1 = require("../services/auth.service.js");
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
