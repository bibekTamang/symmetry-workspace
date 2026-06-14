import { Router } from "express";
import authController from "./auth.controller";
import { validateRequest } from "../../../middlewares/validation.middleware";
import {
  emailValidationSchema,
  googleLoginSchema,
  loginSchema,
  registerSchema,
} from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(registerSchema),
  authController.register,
);
router.post("/login", validateRequest(loginSchema), authController.login);
router.post(
  "/google",
  validateRequest(googleLoginSchema),
  authController.googleLogin,
);
router.post(
  "/request-otp",
  validateRequest(emailValidationSchema),
  authController.requestOtp,
);
router.post("/refresh", authController.refresh);
router.post("/logout", authController.logout);

export default router;
