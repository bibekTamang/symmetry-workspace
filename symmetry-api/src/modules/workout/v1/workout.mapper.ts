import {
  DbWorkoutPlanSummaryRow,
  WorkoutPlanSummary,
  WorkoutPlan,
} from "./workout.types";

export class WorkoutMapper {
  public static toSummaryList(
    rows: DbWorkoutPlanSummaryRow[],
  ): WorkoutPlanSummary[] {
    return rows.map((row) => ({
      id: row.id,
      title: row.title,
      durationInWeeks: row.duration_in_weeks,
      updatedAt: row.updated_at,
    }));
  }

  public static toDomainModel(rawJson: string | object): WorkoutPlan {
    const data = typeof rawJson === "string" ? JSON.parse(rawJson) : rawJson;

    return {
      id: data.id,
      gymId: data.gymid,
      title: data.title,
      durationInWeeks: data.duration_in_weeks,
      description: data.description,
      createdAt: new Date(data.created_at),
      updatedAt: new Date(data.updated_at),
      weeks: data.weeks.map((week: Record<string, unknown>) => ({
        id: week.id,
        weekNumber: week.week_number,
        days: (week.days as Record<string, unknown>[]).map((day) => ({
          id: day.id,
          dayNumber: day.day_number,
          targets: (day.targets as Record<string, unknown>[]).map((target) => ({
            id: target.id,
            bodyPartName: target.body_part_name,
            exercises: (target.exercises as Record<string, unknown>[]).map(
              (ex) => ({
                id: ex.id,
                exerciseName: ex.exercise_name,
                orderSequence: ex.order_sequence,
                sets: ex.sets,
                reps: ex.reps,
                restTimeSeconds: ex.rest_time_seconds,
              }),
            ),
          })),
        })),
      })),
    };
  }
}
