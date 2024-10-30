"use server";

import { CreateQuestion, CreateQuestionSchema } from "./formSchema";

export async function createQuestion(data: CreateQuestion) {
  console.log("Enviando form...", data);
  const result = CreateQuestionSchema.safeParse(data);

  if (result.success) {
    return { success: true, data: result.data };
  }

  if (result.error) {
    return { success: false, error: result.error.format() };
  }

  // const response = await fetch("/api/user/update-name", {
  //   method: "POST",
  //   body: formData,
  // });

  // if (!response.ok) {
  //   throw new Error(response.statusText);
  // }

  // return response.json();
}
