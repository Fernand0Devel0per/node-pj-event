import { z } from "zod";

export const GetEventsByDateRangeSchema = z.object({
  start: z.coerce.date(),
  end: z.coerce.date(),
});

export type GetEventsByDateRangeDto = z.infer<typeof GetEventsByDateRangeSchema>;