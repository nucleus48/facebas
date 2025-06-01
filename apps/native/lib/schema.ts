import { z } from "zod";

export const SignUpFormSchema = z.object({
  name: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1).min(6),
});

export type SignUpFormData = z.infer<typeof SignUpFormSchema>;

export const SignInFormSchema = SignUpFormSchema.pick({
  email: true,
  password: true,
});

export type SignInFormData = z.infer<typeof SignInFormSchema>;

export const FieldsSchema = z
  .array(z.object({ name: z.string().min(1) }))
  .min(1);

export type FieldsSchemaData = z.infer<typeof FieldsSchema>;

export const AttendanceCreateSchema = z.object({
  name: z.string().min(1),
  description: z.string().min(1),
  fields: FieldsSchema,
});

export type AttendanceCreateSchemaData = z.infer<typeof AttendanceCreateSchema>;

export const RegistrationFormSchema = z.record(z.string(), z.string().min(1));

export type RegistrationFormSchemaData = z.infer<typeof RegistrationFormSchema>;
