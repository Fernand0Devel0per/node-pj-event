import { Router } from "express";
import { createEventHandler } from "../controllers/EventController"; 

const router = Router();

router.post("/events", createEventHandler);

export default router;