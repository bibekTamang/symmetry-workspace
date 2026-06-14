// src/utils/email.ts
import { Resend } from "resend";
import { env } from "../config/env";

const resend = new Resend(env.RESEND_API_KEY);

export const sendOtpEmail = async (email: string, otp: string) => {
  try {
    await resend.emails.send({
      from: "Auth <onboarding@resend.dev>",
      to: email,
      subject: "Verify Your Account",
      html: `
        <div style="font-family: sans-serif; padding: 20px; max-width: 500px; border: 1px solid #e2e8f0; border-radius: 8px;">
          <h2>Account Verification</h2>
          <p>Your 6-digit security code is:</p>
          <div style="font-size: 32px; font-weight: bold; letter-spacing: 4px; color: #2563eb; margin: 20px 0;">
            ${otp}
          </div>
          <p style="font-size: 14px; color: #64748b;">This code will expire in 10 minutes. If you did not request this, please ignore this email.</p>
        </div>
      `,
    });
  } catch (error) {
    console.error("Failed to dispatch email via Resend:", error);
    throw new Error("Email dispatch system offline.");
  }
};
