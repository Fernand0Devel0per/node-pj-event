import { z } from "zod";
import { CreateEventSchema } from "./CreateEventDto";

export type EventProps = z.infer<typeof CreateEventSchema>;