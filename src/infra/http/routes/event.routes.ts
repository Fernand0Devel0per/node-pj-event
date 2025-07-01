import { Router } from "express";
import { createEventHandler, deleteEventHandler, getEventsByDateRangeHandler, updateEventHandler } from "../controllers/eventController"; 

const router = Router();

router.post("/", createEventHandler);
router.get("/", getEventsByDateRangeHandler);
router.delete("/:id", deleteEventHandler);
router.patch("/:id", updateEventHandler);

export default router;