import { z } from "zod";

export const UpdateEventSchema = z.object({
  title: z.string().min(3).max(100).optional(),
  description: z.string().min(10).max(500).optional(),
  date: z.coerce.date().optional(),
  location: z.string().min(1).optional(),
  maxParticipants: z.number().positive().optional(),
  bannerUrl: z.string().url().optional(),
});

export type UpdateEventDto = z.infer<typeof UpdateEventSchema>;
