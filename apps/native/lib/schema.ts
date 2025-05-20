import { z } from "zod";

export const AuthSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).min(6),
});

export type AuthSchemaData = z.infer<typeof AuthSchema>;

export const AttendanceCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  fields: z.array(z.object({ name: z.string().min(1) })).min(1),
});

export type AttendanceCreateSchemaData = z.infer<typeof AttendanceCreateSchema>;
