import express, { Application, Request, Response } from "express";
import cors from "cors";
import authRoutes from "./modules/auth/v1/auth.routes";
import workoutRoutes from "./modules/workout/v1/workout.routes";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middlewares/errorHandler";

const app: Application = express();

// Global Middlewares
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieParser());

// Mount Modules
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/workouts", workoutRoutes);
app.use(globalErrorHandler);

// Basic Health Check Route
app.get("/health", (req: Request, res: Response) => {
  res.status(200).json({ status: "UP" });
});

export default app;
