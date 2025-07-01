import { Router } from "express";
import { createUserHandler, updateUserRoleHandler } from "../controllers/userController";

const router = Router();

router.post("/", createUserHandler);
router.patch("/:id/role", updateUserRoleHandler);

export default router;
