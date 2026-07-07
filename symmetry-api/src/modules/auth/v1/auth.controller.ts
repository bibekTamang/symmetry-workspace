import { Request, Response } from "express";
import authService from "./auth.service";
import {
  otpValidationSchema,
  LoginInput,
  RegisterInput,
} from "./auth.validation";
import { env } from "../../../config/env";

const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: env.NODE_ENV === "production",
  sameSite:
    env.NODE_ENV === "production" ? ("strict" as const) : ("lax" as const),
  maxAge: 7 * 24 * 60 * 60 * 1000,
  path: "/",
};

class AuthController {
  private extractMetadata(req: Request) {
    return {
      userAgent: req.headers["user-agent"] || "Unknown Platform",
      ipAddress: req.ip || req.socket.remoteAddress || "Unknown Location",
    };
  }

  async register(req: Request, res: Response): Promise<void> {
    try {
      const { email, password, role, firstName, lastName }: RegisterInput =
        req.body;
      const { otpToken } = await authService.registerUser({
        firstName,
        lastName,
        email,
        password,
        role,
      });
      res.cookie("otp_session", otpToken, COOKIE_OPTIONS);
      res.status(201).json({
        success: true,
        message: "User registered successfully",
      });
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  login = async (req: Request, res: Response): Promise<void> => {
    try {
      const { userAgent, ipAddress } = this.extractMetadata(req);
      const { email, password }: LoginInput = req.body;
      const { accessToken, refreshToken, user, otpToken, isEmailVerified } =
        await authService.loginUserWithEmail(
          email,
          password,
          userAgent,
          ipAddress,
        );
      if (!isEmailVerified) {
        res.cookie("otp_session", otpToken, COOKIE_OPTIONS);
        res.status(423).json({
          success: false,
          message: "Email is not verified.",
        });
      } else {
        res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
        res.status(200).json({ success: true, accessToken, user });
      }
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  };

  googleLogin = async (req: Request, res: Response): Promise<void> => {
    try {
      const { idToken } = req.body;
      const { userAgent, ipAddress } = this.extractMetadata(req);
      const { accessToken, refreshToken, user } =
        await authService.loginUserWithGoogle(idToken, userAgent, ipAddress);

      res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
      res.status(200).json({ success: true, accessToken, user });
    } catch (err: any) {
      res.status(401).json({ success: false, message: err.message });
    }
  };

  refresh = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies.refresh_token;
      if (!token) {
        res
          .status(401)
          .json({ success: false, message: "Session configuration missing" });
        return;
      }

      const { userAgent, ipAddress } = this.extractMetadata(req);
      const { accessToken, refreshToken, user } =
        await authService.rotateRefreshToken(token, userAgent, ipAddress);

      res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
      res.status(200).json({ success: true, accessToken, user });
    } catch (err: any) {
      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: COOKIE_OPTIONS.sameSite,
        secure: COOKIE_OPTIONS.secure,
      });
      res.status(403).json({ success: false, message: err.message });
    }
  };

  logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const token = req.cookies.refresh_token;
      if (token) await authService.logout(token);

      res.clearCookie("refresh_token", {
        httpOnly: true,
        sameSite: COOKIE_OPTIONS.sameSite,
        secure: COOKIE_OPTIONS.secure,
      });
      res
        .status(200)
        .json({ success: true, message: "Session successfully purged" });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  requestOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email }: otpValidationSchema = req.body;
      const otpToken = await authService.requestOtp(email);

      res.cookie("otp_session", otpToken, COOKIE_OPTIONS);
      res.status(200).json({ success: true, otpToken: otpToken });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };

  verifyOtp = async (req: Request, res: Response): Promise<void> => {
    try {
      const { email, otp }: otpValidationSchema = req.body;
      const otpToken = req.cookies.otp_session;

      await authService.verifyOtp(email, otp, otpToken);
      const { userAgent, ipAddress } = this.extractMetadata(req);
      const { accessToken, refreshToken, user } =
        await authService.loginWithOtp(email, userAgent, ipAddress);

      res.cookie("refresh_token", refreshToken, COOKIE_OPTIONS);
      res.clearCookie("otp_session", {
        httpOnly: true,
        sameSite: COOKIE_OPTIONS.sameSite,
        secure: COOKIE_OPTIONS.secure,
      });
      res.status(200).json({ success: true, accessToken, user });
    } catch (err: any) {
      res.status(500).json({ success: false, message: err.message });
    }
  };
}

export default new AuthController();
