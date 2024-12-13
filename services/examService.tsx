import {
  CreateExam,
  Exam,
  ExamAnswer,
  ExamAttempt,
  ExamAttemptResponse,
  ExamAttemptSchema,
} from "@/types/exams";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getExams = async () => {
  const url = `${BACKEND_URL}/exams`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Array<Exam>;
  } else {
    throw new Error("Failed to fetch data");
  }
};

export const getExam = async (id: number) => {
  const url = `${BACKEND_URL}/exams/${id}`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Exam;
  } else {
    throw new Error("Failed to fetch data");
  }
};

export const addQuestionToExam = async (
  examId: number,
  questionIds: Array<number>
) => {
  const url = `${BACKEND_URL}/exams/${examId}/questions`;
  const requestBody = JSON.stringify({
    questionsIds: questionIds,
  });
  console.log("requestBody", requestBody);
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
};

export const getExamAttempts = async () => {
  const url = `${BACKEND_URL}/exam-attempts`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Array<ExamAttemptResponse>;
  } else {
    throw new Error("Failed to fetch data");
  }
};

export const getExamAttempt = async (attemptId: number) => {
  const url = `${BACKEND_URL}/exam-attempts/${attemptId}`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as ExamAttemptResponse;
  } else {
    throw new Error("Failed to fetch data");
  }
};

export const attemptExam = async (
  examId: number,
  answers: Array<ExamAnswer>
) => {
  const url = `${BACKEND_URL}/exam-attempts`;
  const body: ExamAttempt = {
    examId: examId,
    answers: answers,
    examVersion: 1,
    userId: 1,
  };
  const requestBody = JSON.stringify(ExamAttemptSchema.parse(body));
  console.log("requestBody", body);
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
  return res.json();
};

export const createExam = async (newExam: CreateExam) => {
  const url = `${BACKEND_URL}/exams`;
  const requestBody = JSON.stringify(newExam);
  console.log("requestBody", requestBody);
  return await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: requestBody,
  });
};
