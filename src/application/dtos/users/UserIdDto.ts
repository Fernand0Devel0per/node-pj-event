import { z } from "zod";

export const UserIdParamSchema = z.object({
  id: z.string().uuid({ message: "Invalid ID format. Must be a valid UUID." }),
});

export type UserIdParamDto = z.infer<typeof UserIdParamSchema>;
