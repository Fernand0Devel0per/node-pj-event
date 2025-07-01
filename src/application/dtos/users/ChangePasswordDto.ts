// src/application/dtos/users/ChangePasswordDto.ts
import { z } from "zod";

export const ChangePasswordSchema = z.object({
  email: z.string().email(),
  currentPassword: z.string().min(6),
  newPassword: z.string().min(6).max(100),
});

export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
