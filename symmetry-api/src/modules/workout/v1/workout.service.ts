import workoutRepository from "./workout.repository";
import { WorkoutMapper } from "./workout.mapper";
import { WorkoutPlan, WorkoutPlanSummary } from "./workout.types";

class WorkoutService {
  public async addWorkout(
    payload: Omit<WorkoutPlan, "id">,
  ): Promise<WorkoutPlan> {
    const rawData = await workoutRepository.addWorkout(payload);
    if (!rawData) throw new Error("Failed to create workout plan");
    return WorkoutMapper.toDomainModel(rawData);
  }

  public async updateWorkout(
    id: string,
    payload: Partial<WorkoutPlan>,
  ): Promise<WorkoutPlan | null> {
    const rawData = await workoutRepository.updateWorkout(id, payload);
    if (!rawData) return null;
    return WorkoutMapper.toDomainModel(rawData);
  }

  public async getWorkoutPlanById(id: string): Promise<WorkoutPlan | null> {
    const rawData = await workoutRepository.getWorkoutPlanById(id);
    if (!rawData) return null;
    return WorkoutMapper.toDomainModel(rawData);
  }

  public async getWorkoutPlansByGymId(
    gymId: string,
  ): Promise<WorkoutPlanSummary[]> {
    const rows = await workoutRepository.getWorkoutPlansByGymId(gymId);
    return WorkoutMapper.toSummaryList(rows);
  }

  public async deleteWorkout(id: string): Promise<boolean> {
    return workoutRepository.deleteWorkout(id);
  }
}

export default new WorkoutService();
