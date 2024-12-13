import { Question } from "@/types/questions";

// const BACKEND_URL = "localhost:8080";
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getQuestions = async () => {
  const url = `${BACKEND_URL}/questions`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Array<Question>;
  } else {
    throw new Error("Failed to fetch data");
  }
};

export const getQuestion = async (questionId: number) => {
  const url = `${BACKEND_URL}/questions/${questionId}`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Question;
  } else {
    throw new Error("Failed to fetch data");
  }
};
