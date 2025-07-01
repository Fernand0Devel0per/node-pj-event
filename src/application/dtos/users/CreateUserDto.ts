import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  password: z.string().min(6).max(100),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
