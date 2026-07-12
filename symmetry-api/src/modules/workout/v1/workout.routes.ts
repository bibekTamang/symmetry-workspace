import { Router } from "express";
import { validateRequest } from "../../../middlewares/validation.middleware";
import workoutController from "./workout.controller";
import {
  AddWorkoutSchema,
  UpdateWorkoutSchema,
  UuidParamSchema,
} from "./workout.validation";
import { catchAsync } from "../../../utils/catchAsync";

const router = Router();

router.post(
  "/add-workout",
  validateRequest(AddWorkoutSchema),
  catchAsync(workoutController.addWorkout),
);

router.put(
  "/:id",
  validateRequest(UpdateWorkoutSchema),
  catchAsync(workoutController.updateWorkout),
);

router.get(
  "/:id",
  validateRequest(UuidParamSchema),
  catchAsync(workoutController.getWorkoutPlanById),
);

router.get(
  "/gym/:gymid",
  validateRequest(UuidParamSchema),
  catchAsync(workoutController.getWorkoutPlansByGymId),
);

router.delete(
  "/:id",
  validateRequest(UuidParamSchema),
  catchAsync(workoutController.deleteWorkoutPlan),
);

export default router;
