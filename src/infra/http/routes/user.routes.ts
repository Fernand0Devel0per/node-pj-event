import { Router } from "express";
import { changeUserPasswordHandler, createUserHandler, updateUserRoleHandler } from "../controllers/userController";

const router = Router();

router.post("/", createUserHandler);
router.patch("/:id/role", updateUserRoleHandler);
router.patch("/password", changeUserPasswordHandler);

export default router;
