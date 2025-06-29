import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(3).max(100),
  description: z.string().min(10).max(500),
  date: z.coerce.date(),
  location: z.string().min(1),
  maxParticipants: z.number().positive(),
  creatorId: z.string().uuid(),
  bannerUrl: z.string().url().optional(),
});

export type CreateEventDto = z.infer<typeof CreateEventSchema>;
