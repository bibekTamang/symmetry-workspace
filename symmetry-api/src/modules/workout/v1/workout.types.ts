export interface WorkoutTargetExercise {
  id?: string;
  exerciseName: string;
  orderSequence: number;
  sets: number;
  reps: string;
  restTimeSeconds: number;
}

export interface WorkoutDayTarget {
  id?: string;
  bodyPartName: string;
  exercises: WorkoutTargetExercise[];
}

export interface WorkoutPlanDay {
  id?: string;
  dayNumber: number;
  targets: WorkoutDayTarget[];
}

export interface WorkoutPlanWeek {
  id?: string;
  weekNumber: number;
  days: WorkoutPlanDay[];
}

export interface WorkoutPlan {
  id?: string;
  gymId: string;
  title: string;
  durationInWeeks: number;
  description: string;
  weeks: WorkoutPlanWeek[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface WorkoutPlanSummary {
  id: string;
  title: string;
  durationInWeeks: number;
  updatedAt: Date;
}

export interface DbWorkoutPlanSummaryRow {
  id: string;
  title: string;
  duration_in_weeks: number;
  updated_at: Date;
}
