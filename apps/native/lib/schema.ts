import { z } from "zod";

export const AuthSchema = z.object({
  email: z
    .string()
    .min(1, "This field is required")
    .email("Invalid email address"),
  password: z
    .string()
    .min(1, "This field is required")
    .min(6, "Password must contain at least 6 characters"),
});
