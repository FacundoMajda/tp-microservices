import { z } from "zod";
import { commonSchema } from "./common.schema";

export const userSchema = commonSchema.extend({
  userName: z.string(),
  email: z.string().optional(),
  password: z.string().optional(),
  role: z.enum(["admin", "user"]).default("user"),
});

export type IUser = z.infer<typeof userSchema>;
