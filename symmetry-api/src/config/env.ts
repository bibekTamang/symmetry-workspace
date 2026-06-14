import { z } from "zod";
import dotenv from "dotenv";

dotenv.config();

const envSchema = z.object({
  PORT: z.string().default("3000"),
  NODE_ENV: z.enum(["development", "production"]).default("development"),
  JWT_SECRET: z.string().min(1, { error: "JWT_SECRET is required" }),
  JWT_REFRESH_SECRET: z
    .string()
    .min(1, { error: "JWT_REFRESH_SECRET is required" }),
  DB_USER: z.string().min(1, { error: "DB_USER is required" }),
  DB_PASSWORD: z.string().min(1, { error: "DB_PASSWORD is required" }),
  DB_HOST: z.string().min(1, { error: "DB_HOST is required" }),
  DB_PORT: z.string().min(1, { error: "DB_PORT is required" }),
  DB_NAME: z.string().min(1, { error: "DB_NAME is required" }),
  GOOGLE_CLIENT_ID: z
    .string()
    .min(1, { error: "GOOGLE_CLIENT_ID is required" }),
  RESEND_API_KEY: z.string().min(1, { error: "Resend API key is required" }),
  OTP_SECRET: z.string().min(1, { error: "Otp secret is required" }),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  process.exit(1);
}

export const env = parsedEnv.data;
