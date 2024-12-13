import { z } from "zod";
import {
  DifficultyEnum,
  DisciplineSchema,
  ExamTypeEnum,
  TopicSchema,
} from "./common";
import { QuestionSchema } from "./questions";

export const ExamSchema = z.object({
  id: z.number(),
  questions: z.array(QuestionSchema),
  author: z.string().optional(),
  authorId: z.string().optional(),
  examType: ExamTypeEnum,
  discipline: DisciplineSchema,
  topic: TopicSchema,
  difficulty: DifficultyEnum,
  name: z.string().min(1),
  description: z.string().optional(),
  tags: z.array(z.string()).optional(),
  year: z.number().optional(),
  uuid: z.string().uuid(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export const CreateExamSchema = ExamSchema.omit({
  id: true,
  questions: true,
  discipline: true,
  topic: true,
  uuid: true,
  createdAt: true,
  updatedAt: true,
  year: true,
}).extend({
  disciplineId: z.coerce.number(),
  topicId: z.coerce.number(),
  questionIds: z.array(z.number()),
  year: z.coerce.number(),
});

export const ExamAnswerSchema = z.object({
  questionId: z.number(),
  alternativeId: z.string().length(1),
});

export const ExamAttemptSchema = z.object({
  examId: z.number(),
  userId: z.number().optional(),
  examVersion: z.number().optional(),
  answers: z.array(ExamAnswerSchema),
});

export type ExamAttemptResponse = {
  id: number;
  examId: number;
  answers: Array<ExamAnswer>;
  score: number;
};
export type ExamAnswer = z.infer<typeof ExamAnswerSchema>;
export type ExamAttempt = z.infer<typeof ExamAttemptSchema>;
export type Exam = z.infer<typeof ExamSchema>;
export type CreateExam = z.infer<typeof CreateExamSchema>;
