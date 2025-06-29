import { Router } from "express";
import { createEventHandler, getEventsByDateRangeHandler } from "../controllers/EventController"; 

const router = Router();

router.post("/events", createEventHandler);
router.get("/events", getEventsByDateRangeHandler);

export default router;