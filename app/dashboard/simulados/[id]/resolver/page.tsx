"use client";
import { useParams } from "next/navigation";

export default function Page() {
  const { id } = useParams() as { id: string };
  return <p>Post: {id}</p>;
}
