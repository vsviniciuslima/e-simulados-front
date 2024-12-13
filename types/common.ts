import { z } from "zod";

export const ExamTypeEnum = z.enum(["VESTIBULAR", "CONCURSO"]);
export type ExamType = z.infer<typeof ExamTypeEnum>;

// Discipline Schema
export const DisciplineSchema = z.object({
  id: z.number(),
  name: z.string(),
  // Add other discipline fields as needed
});
export type Discipline = z.infer<typeof DisciplineSchema>;

export const TopicSchema = z.object({
  id: z.number(),
  name: z.string(),
  discipline: DisciplineSchema,
  // Add other discipline fields as needed
});
export type Topic = z.infer<typeof TopicSchema>;

export const DifficultyEnum = z.enum(["EASY", "MEDIUM", "HARD"]);
export type Difficulty = z.infer<typeof DifficultyEnum>;

const difficultyMapping = {
  EASY: "Fácil",
  MEDIUM: "Média",
  HARD: "Difícil",
};

export function mapDifficulty(difficulty: Difficulty): string {
  return difficultyMapping[difficulty];
}
