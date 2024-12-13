import { Discipline, Topic } from "@/types/common";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export const getTopics = async () => {
  const url = `${BACKEND_URL}/topics`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Array<Topic>;
  } else {
    console.log("Failed to fetch topics");
    throw new Error("Failed to fetch topics");
  }
};

export const getDisciplines = async () => {
  const url = `${BACKEND_URL}/disciplines`;
  const response = await fetch(url);
  if (response.ok) {
    return (await response.json()) as Array<Discipline>;
  } else {
    console.log("Failed to fetch disciplines");
    throw new Error("Failed to fetch disciplines");
  }
};
