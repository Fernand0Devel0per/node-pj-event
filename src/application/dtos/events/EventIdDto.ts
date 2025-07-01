import { z } from "zod";

export const EventIdParamSchema = z.object({
  id: z.string().uuid({ message: "Invalid event ID. Must be a valid UUID." }),
});

export type EventIdParamDto = z.infer<typeof EventIdParamSchema>;
