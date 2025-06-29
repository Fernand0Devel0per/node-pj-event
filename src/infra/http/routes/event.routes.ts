import { Router } from "express";
import { createEventHandler, deleteEventHandler, getEventsByDateRangeHandler } from "../controllers/EventController"; 

const router = Router();

router.post("/events", createEventHandler);
router.get("/events", getEventsByDateRangeHandler);
router.delete("/events/:id", deleteEventHandler);

export default router;