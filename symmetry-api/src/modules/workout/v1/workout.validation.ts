import { z } from "zod";

const ExerciseSchema = z.object({
  exerciseName: z.string().min(1),
  orderSequence: z.number().int().positive(),
  sets: z.number().int().positive(),
  reps: z.string().min(1),
  restTimeSeconds: z.number().int().min(0),
});

const TargetSchema = z.object({
  bodyPartName: z.string().min(1),
  exercises: z.array(ExerciseSchema).min(1),
});

const DaySchema = z.object({
  dayNumber: z.number().int().positive(),
  targets: z.array(TargetSchema).min(1),
});

const WeekSchema = z.object({
  weekNumber: z.number().int().positive(),
  days: z.array(DaySchema).min(1),
});

export const AddWorkoutSchema = z.object({
  gymId: z.uuid(),
  title: z.string().min(3).max(255),
  durationInWeeks: z.number().int().positive(),
  description: z.string(),
  weeks: z.array(WeekSchema).min(1),
});

export const UpdateWorkoutSchema = AddWorkoutSchema.partial().extend({
  gymId: z.uuid().optional(),
});

export const UuidParamSchema = z.object({
  id: z.uuid(),
});
