"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getHealth = void 0;
const health_service_js_1 = require("../services/health.service.js");
const getHealth = (_req, res) => {
    const message = (0, health_service_js_1.getHealthMessage)();
    res.status(200).json({
        success: true,
        message,
    });
};
exports.getHealth = getHealth;
