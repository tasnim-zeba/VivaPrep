import { Router } from "express";
import {
  createTestUserController,
  getAllUsersController,
} from "../controllers/user.controller.js";

const router = Router();

router.post("/test", createTestUserController);
router.get("/", getAllUsersController);

export default router;