import { Router } from "express";
import { createEventHandler, deleteEventHandler, getEventsByDateRangeHandler, updateEventHandler } from "../controllers/EventController"; 

const router = Router();

router.post("/events", createEventHandler);
router.get("/events", getEventsByDateRangeHandler);
router.delete("/events/:id", deleteEventHandler);
router.patch("/events/:id", updateEventHandler);

export default router;