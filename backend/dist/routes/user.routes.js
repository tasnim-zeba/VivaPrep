"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_js_1 = require("../controllers/user.controller.js");
const router = (0, express_1.Router)();
router.post("/test", user_controller_js_1.createTestUserController);
router.get("/", user_controller_js_1.getAllUsersController);
exports.default = router;
