import { Request, Response } from "express";
import workoutService from "./workout.service";
import {
  AddWorkoutSchema,
  UpdateWorkoutSchema,
  UuidParamSchema,
} from "./workout.validation";

class WorkoutController {
  public async addWorkout(req: Request, res: Response): Promise<void> {
    const parsedBody = AddWorkoutSchema.parse(req.body);
    const workoutPlan = await workoutService.addWorkout(parsedBody);
    res.status(201).json({ success: true, data: workoutPlan });
  }

  public async updateWorkout(req: Request, res: Response): Promise<void> {
    const { id } = UuidParamSchema.parse(req.params);
    const parsedBody = UpdateWorkoutSchema.parse(req.body);

    const updatedPlan = await workoutService.updateWorkout(id, parsedBody);
    if (!updatedPlan) {
      res.status(404).json({ success: false, error: "Workout plan not found" });
      return;
    }
    res.status(200).json({ success: true, data: updatedPlan });
  }

  public async getWorkoutPlanById(req: Request, res: Response): Promise<void> {
    const { id } = UuidParamSchema.parse(req.params);
    const workoutPlan = await workoutService.getWorkoutPlanById(id);

    if (!workoutPlan) {
      res.status(404).json({ success: false, error: "Workout plan not found" });
      return;
    }
    res.status(200).json({ success: true, data: workoutPlan });
  }

  public async getWorkoutPlansByGymId(
    req: Request,
    res: Response,
  ): Promise<void> {
    const { id: gymId } = UuidParamSchema.parse({ id: req.params.gymId });
    const plans = await workoutService.getWorkoutPlansByGymId(gymId);
    res.status(200).json({ success: true, data: plans });
  }

  public async deleteWorkoutPlan(req: Request, res: Response): Promise<void> {
    const { id } = UuidParamSchema.parse(req.params);
    const deleted = await workoutService.deleteWorkout(id);

    if (!deleted) {
      res.status(404).json({ success: false, error: "Workout plan not found" });
      return;
    }
    res.status(204).send();
  }
}

export default new WorkoutController();
