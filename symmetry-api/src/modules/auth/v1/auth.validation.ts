import { z } from "zod";
import { UserRole } from "../../../enums";

export const registerSchema = z.object({
  firstName: z
    .string()
    .trim()
    .max(30, { error: "First name cannot exceed 30 characters" }),
  lastName: z
    .string()
    .trim()
    .max(30, { error: "Last name cannot exceed 30 characters" }),
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Invalid email address" })),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" })
    .max(50, { error: "Password cannot exceed 50 characters" }),
  role: z.enum(UserRole, {
    error: "Role must be either gym_admin or individual",
  }),
});

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Invalid email address" })),
  password: z
    .string()
    .min(6, { error: "Password must be at least 6 characters long" })
    .max(50, { error: "Password cannot exceed 50 characters" }),
});

export const googleLoginSchema = z.object({
  idToken: z.string().min(1, { message: "Google ID Token is required" }),
});

export const otpValidationSchema = z.object({
  email: z
    .string()
    .trim()
    .pipe(z.email({ error: "Invalid email address" })),
  otp: z
    .string()
    .trim()
    .length(6, { message: "OTP must be 6 digits only" })
    .regex(/^\d+$/, { message: "OTP must contain numbers only" })
    .optional(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type GoogleLoginInput = z.infer<typeof googleLoginSchema>;
export type otpValidationSchema = z.infer<typeof otpValidationSchema>;
