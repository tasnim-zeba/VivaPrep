"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllUsersController = exports.createTestUserController = void 0;
const user_service_js_1 = require("../services/user.service.js");
const createTestUserController = async (_req, res) => {
    const user = await (0, user_service_js_1.createTestUser)();
    res.status(201).json({
        success: true,
        data: user,
    });
};
exports.createTestUserController = createTestUserController;
const getAllUsersController = async (_req, res) => {
    const users = await (0, user_service_js_1.getAllUsers)();
    res.status(200).json({
        success: true,
        data: users,
    });
};
exports.getAllUsersController = getAllUsersController;
