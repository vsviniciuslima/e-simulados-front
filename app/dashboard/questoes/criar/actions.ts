"use server";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

import {
  CreateQuestion,
  CreateQuestionSchema,
} from "../../../../types/questions";

export async function createQuestion(data: CreateQuestion) {
  console.log("Enviando form...", data);

  const url = `${BACKEND_URL}/questions`;
  const requestBody = JSON.stringify(CreateQuestionSchema.parse(data));
  console.log("requestBody", requestBody);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return response.json();
}
