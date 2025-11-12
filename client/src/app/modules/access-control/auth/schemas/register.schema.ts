import z from "zod";

export const registerSchema = z.object({
  email: z.string().email("debe ser un email válido"),
  password: z.string().min(6, "debe contener al menos 6 caracteres"),
  role: z.enum(["admin", "user"]).optional(),
});

export const registerResponseSchema = z.object({
  token: z.string(),
  user: z.object({
    id: z.number(),
    email: z.string(),
    role: z.string(),
  }),
});

export type IRegister = z.infer<typeof registerSchema>;
export type IRegisterResponse = z.infer<typeof registerResponseSchema>;
