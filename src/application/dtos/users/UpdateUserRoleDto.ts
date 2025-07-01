import { z } from "zod";

export const UpdateUserRoleSchema = z.object({
  role: z.string()
});

export type UpdateUserRoleDto = z.infer<typeof UpdateUserRoleSchema>;
