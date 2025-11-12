import { z } from "zod";

export const userSchema = z.object({
  id: z.number(),
  email: z.string(),
  role: z.enum(["admin", "user"]).default("user"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type IUser = z.infer<typeof userSchema>;
