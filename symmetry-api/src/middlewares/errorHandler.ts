// src/middleware/errorHandler.ts
import { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/appError";
import { env } from "../config/env";

export const globalErrorHandler = (
  err: unknown,
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  // 1. Zod Validation Errors
  if (err instanceof ZodError) {
    res.status(400).json({
      success: false,
      error: "Validation Error",
      details: err.issues,
    });
    return;
  }

  // 2. Custom Application Errors
  if (err instanceof AppError) {
    res.status(err.statusCode).json({
      success: false,
      error: err.message,
    });
    return;
  }

  // 3. Standard JS Errors (Fallback to 500)
  if (err instanceof Error) {
    res.status(500).json({
      success: false,
      error:
        env.NODE_ENV === "production" ? "Internal Server Error" : err.message,
    });
    return;
  }

  // 4. Unknown Errors
  res.status(500).json({
    success: false,
    error: "Internal Server Error",
  });
};
