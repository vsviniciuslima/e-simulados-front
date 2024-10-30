import { z } from "zod";

// Enum for question difficulty
const QuestionDifficulty = z.enum(["EASY", "MEDIUM", "HARD"]);

// Schema for CreateQuestionAlternativeDTO
const CreateQuestionAlternativeSchema = z.object({
  imageUrls: z.array(z.string()).optional(), // Optional array of image URLs
  label: z.string().optional(), // Content is required
  text: z.string().min(1, { message: "O texto da alternativa é obrigatório." }), // Content is required
  correct: z.boolean().optional(), // Correctness flag
});

// Main schema for CreateQuestionDTO
export const CreateQuestionSchema = z.object({
  statement: z
    .string()
    .min(1, { message: "O enunciado da prova é obrigatório." }), // Required statement
  description: z.string().optional(), // Optional explanation
  category: z.string().min(1), // Required topic
  subcategory: z.string().min(1), // Required sub-topic
  year: z.number().int().optional(), // Optional integer year
  source: z.string().optional(), // Optional source
  sourceUrl: z.string().url().optional(), // Optional source URL, must be a valid URL
  authorId: z.string().optional(), // Required author ID
  tags: z.array(z.string()).optional(), // Required array of tags
  difficulty: QuestionDifficulty, // Required question difficulty enum
  alternatives: z.array(CreateQuestionAlternativeSchema).min(1), // Required non-empty array of alternatives
});

export type CreateQuestion = z.infer<typeof CreateQuestionSchema>;
export type Alternative = z.infer<typeof CreateQuestionAlternativeSchema>;
