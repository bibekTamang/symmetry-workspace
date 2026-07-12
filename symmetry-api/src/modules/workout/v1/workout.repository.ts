import { WorkoutPlan, DbWorkoutPlanSummaryRow } from "./workout.types";
import pool from "../../../config/database";

class WorkoutRepository {
  public async addWorkout(plan: Omit<WorkoutPlan, "id">): Promise<unknown> {
    const query = "SELECT fn_add_workout_plan($1::json) AS data";
    const values = [JSON.stringify(plan)];
    const { rows } = await pool.query<{ data: unknown }>(query, values);
    return rows[0].data;
  }

  public async updateWorkout(
    id: string,
    plan: Partial<WorkoutPlan>,
  ): Promise<unknown> {
    const query = "SELECT fn_update_workout_plan($1::uuid, $2::json) AS data";
    const values = [id, JSON.stringify(plan)];
    const { rows } = await pool.query<{ data: unknown }>(query, values);
    return rows[0]?.data || null;
  }

  public async getWorkoutPlanById(id: string): Promise<unknown> {
    const query = "SELECT fn_get_workout_plan_by_id($1::uuid) AS data";
    const { rows } = await pool.query<{ data: unknown }>(query, [id]);
    return rows[0]?.data || null;
  }

  public async getWorkoutPlansByGymId(
    gymId: string,
  ): Promise<DbWorkoutPlanSummaryRow[]> {
    const query = `
      SELECT id, title, duration_in_weeks, updated_at 
      FROM workout_plans 
      WHERE gym_id = $1 
      ORDER BY updated_at DESC
    `;
    const { rows } = await pool.query<DbWorkoutPlanSummaryRow>(query, [gymId]);
    return rows;
  }

  public async deleteWorkout(id: string): Promise<boolean> {
    const query = "DELETE FROM workout_plans WHERE id = $1 RETURNING id";
    const { rowCount } = await pool.query(query, [id]);
    return (rowCount ?? 0) > 0;
  }
}

export default new WorkoutRepository();
