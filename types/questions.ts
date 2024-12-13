import { z } from "zod";
import {
  DifficultyEnum,
  DisciplineSchema,
  ExamTypeEnum,
  TopicSchema,
} from "./common";

// Comment Schema
export const CommentSchema = z.object({
  id: z.string().uuid().optional(),
  text: z.string(),
  authorId: z.string(),
  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});
export type Comment = z.infer<typeof CommentSchema>;

// Enum for question difficulty
const QuestionDifficulty = z.enum(["EASY", "MEDIUM", "HARD"]);

// Schema for CreateQuestionAlternativeDTO
const CreateQuestionAlternativeSchema = z.object({
  imageUrls: z.array(z.string()).optional(), // Optional array of image URLs
  label: z.string().min(1), // Content is required
  content: z
    .string()
    .min(1, { message: "O texto da alternativa é obrigatório." }), // Content is required
});

// Main schema for CreateQuestionDTO
export const CreateQuestionSchema = z.object({
  statement: z
    .string()
    .min(1, { message: "O enunciado da prova é obrigatório." }), // Required statement
  description: z.string().optional(), // Optional explanation
  disciplineId: z.coerce.number(), // Required topic
  topicId: z.coerce.number(), // Required sub-topic
  examType: ExamTypeEnum, // Required exam type
  year: z.number().int().optional(), // Optional integer year
  source: z.string().optional(), // Optional source
  sourceUrl: z.string().url().optional(), // Optional source URL, must be a valid URL
  authorId: z.string().optional(), // Required author ID
  tags: z.array(z.string()).optional(), // Required array of tags
  difficulty: QuestionDifficulty, // Required question difficulty enum
  questionAlternatives: z.array(CreateQuestionAlternativeSchema).min(1), // Required non-empty array of alternatives
  correctAlternative: z.string().length(1), // Required correct alternative
});

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;
export type Alternative = z.infer<typeof CreateQuestionAlternativeSchema>;

// Question Alternative Schema
export const QuestionAlternativeSchema = z.object({
  id: z.string().uuid().optional(),
  label: z.string().length(1),
  content: z.string(),
});
export type QuestionAlternative = z.infer<typeof QuestionAlternativeSchema>;

// Main Question Schema
export const QuestionSchema = z.object({
  id: z.number(),
  statement: z.string().min(1, "O enunciado é obrigatório"),
  explanation: z.string().optional(),
  difficulty: DifficultyEnum,
  examType: ExamTypeEnum,

  discipline: DisciplineSchema,
  topic: TopicSchema,

  year: z.number().int().min(1900).max(new Date().getFullYear()),
  source: z.string().optional(),
  sourceUrl: z.string().url().optional(),
  authorId: z.string(),

  tags: z.array(z.string()),
  comments: z.array(CommentSchema),
  alternatives: z
    .array(QuestionAlternativeSchema)
    .min(2, "A questão deve ter pelo menos 2 alternativas")
    .max(6, "A questão deve ter no máximo 6 alternativas"),
  correctAlternative: z
    .string()
    .length(1)
    .regex(/^[A-Z]$/),

  createdAt: z.date().optional(),
  updatedAt: z.date().optional(),
});

export type Question = z.infer<typeof QuestionSchema>;

// Create Question Schema (for forms)
// export const CreateQuestionSchema = QuestionSchema.omit({
//   id: true,
//   createdAt: true,
//   updatedAt: true,
// });

// export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;
