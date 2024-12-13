"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

type Alternative = {
  label: string;
  text: string;
};

type Question = {
  id: string;
  text: string;
  alternatives: Alternative[];
};

const questions: Question[] = [
  {
    id: "q1",
    text: "What is the capital of France?",
    alternatives: [
      { label: "A", text: "London" },
      { label: "B", text: "Berlin" },
      { label: "C", text: "Paris" },
      { label: "D", text: "Madrid" },
    ],
  },
  {
    id: "q2",
    text: "Which planet is known as the Red Planet?",
    alternatives: [
      { label: "A", text: "Venus" },
      { label: "B", text: "Mars" },
      { label: "C", text: "Jupiter" },
      { label: "D", text: "Saturn" },
    ],
  },
  {
    id: "q3",
    text: "Who painted the Mona Lisa?",
    alternatives: [
      { label: "A", text: "Vincent van Gogh" },
      { label: "B", text: "Pablo Picasso" },
      { label: "C", text: "Leonardo da Vinci" },
      { label: "D", text: "Michelangelo" },
    ],
  },
];

export default function QuizComponent() {
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string>
  >({});

  const toggleQuestion = (questionId: string) => {
    setOpenQuestions((prev) =>
      prev.includes(questionId)
        ? prev.filter((id) => id !== questionId)
        : [...prev, questionId]
    );
  };

  const handleSelectAnswer = (questionId: string, value: string) => {
    setSelectedAnswers((prev) => ({ ...prev, [questionId]: value }));
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz Questions</CardTitle>
      </CardHeader>
      <CardContent>
        {questions.map((question) => (
          <Collapsible
            key={question.id}
            open={openQuestions.includes(question.id)}
            onOpenChange={() => toggleQuestion(question.id)}
            className="mb-4"
          >
            <CollapsibleTrigger asChild>
              <Button variant="outline" className="w-full justify-between">
                <span>{question.text}</span>
                {openQuestions.includes(question.id) ? (
                  <ChevronUp className="h-4 w-4" />
                ) : (
                  <ChevronDown className="h-4 w-4" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="mt-2">
              <RadioGroup
                value={selectedAnswers[question.id] || ""}
                onValueChange={(value) =>
                  handleSelectAnswer(question.id, value)
                }
              >
                {question.alternatives.map((alt) => (
                  <div key={alt.label} className="flex gap-2 mb-2">
                    <RadioGroupItem
                      value={alt.label}
                      id={`${question.id}-${alt.label}`}
                    />
                    <Label
                      htmlFor={`${question.id}-${alt.label}`}
                      className="flex-grow cursor-pointer"
                    >
                      <Card>
                        <CardContent>
                          <span className="font-semibold">{alt.label}:</span>
                          {alt.text}
                        </CardContent>
                      </Card>
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </CollapsibleContent>
          </Collapsible>
        ))}
      </CardContent>
    </Card>
  );
}
