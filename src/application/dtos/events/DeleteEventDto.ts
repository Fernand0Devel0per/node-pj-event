import { z } from "zod";

export const DeleteEventSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID. Must be a valid UUID." }),
});


export type DeleteEventDto = z.infer<typeof DeleteEventSchema>;
