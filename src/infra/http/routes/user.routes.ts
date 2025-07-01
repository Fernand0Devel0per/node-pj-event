import { Router } from "express";
import { createUserHandler } from "../controllers/userController";

const router = Router();

router.post("/", createUserHandler);

export default router;
