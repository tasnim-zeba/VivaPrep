"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const token_service_js_1 = require("../services/token.service.js");
const authenticate = (req, res, next) => {
    const authorization = req.headers.authorization;
    if (!authorization?.startsWith("Bearer ")) {
        res.status(401).json({
            success: false,
            message: "Authentication required",
        });
        return;
    }
    const token = authorization.split(" ")[1];
    try {
        const payload = (0, token_service_js_1.verifyToken)(token);
        req.userId = payload.userId;
        next();
    }
    catch {
        res.status(401).json({
            success: false,
            message: "Invalid or expired token",
        });
    }
};
exports.authenticate = authenticate;
