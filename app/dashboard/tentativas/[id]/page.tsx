"use client";
import {
  getExam,
  getExamAttempt,
  getExamAttempts,
} from "@/services/examService";
import { getQuestion } from "@/services/questionsService";
import { Exam, ExamAttempt, ExamAttemptResponse } from "@/types/exams";
import { Question, QuestionAlternative } from "@/types/questions";
import { useParams } from "next/navigation";
import React from "react";
import { QuestionBody } from "../../questoes/_components/questionDetails";
import { ExamDetails } from "../../simulados/resolver/page";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { CircleCheckIcon, CircleXIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const { id } = useParams() as { id: string };
  const [attempt, setAttempts] = React.useState<
    ExamAttemptResponse | undefined
  >(undefined);
  const [exam, setExam] = React.useState<Exam | undefined>(undefined);
  const [questions, setQuestions] = React.useState<Question[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [questionsCount, setQuestionsCount] = React.useState(0);

  React.useEffect(() => {
    getExamAttempt(Number(id))
      .then((attempt: ExamAttemptResponse) => {
        console.log("buscou as tentativas", attempt);
        setAttempts(attempt);
        const questionIds = attempt.answers.map((answer) => answer.questionId);
        const uniqueQuestionIds = Array.from(new Set(questionIds));

        setQuestionsCount(uniqueQuestionIds.length);
        uniqueQuestionIds.forEach((questionId) => {
          getQuestion(questionId).then((question) => {
            setQuestions((questions) => [...questions, question]);
          });
        });
        getExam(attempt.examId).then((exam: Exam) => setExam(exam));
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, [id]);

  if (!attempt || !exam) {
    return <div>Carregando...</div>;
  }

  return (
    <div>
      <div>
        <ExamDetails exam={exam} />
        <div className="flex space-x-2 p-2">
          <h4 className="font-semibold scroll-m-20">Acertos</h4>
          <p className="text-muted-foreground capitalize">
            {attempt.score}/{questionsCount}
          </p>
        </div>
      </div>
      <Accordion type="single" collapsible className="w-full p-2">
        {attempt.answers.map((attempt, index) => {
          const question = questions.find(
            (question) => question.id === attempt.questionId
          );
          const correctAlternative = question?.alternatives.find(
            (alternative) => alternative.label === question.correctAlternative
          );
          const userAlternative = question?.alternatives.find(
            (alternative) => alternative.label === attempt.alternativeId
          );

          const isCorrect =
            correctAlternative?.label === userAlternative?.label;

          return (
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                <div className="flex space-x-2">
                  {isCorrect ? (
                    <div>
                      <CircleCheckIcon color="green" />
                    </div>
                  ) : (
                    <div>
                      <CircleXIcon color="red" />
                    </div>
                  )}
                  <p>Questão {index}</p>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-col space-y-2">
                  <div>
                    <div className="flex space-x-2">
                      <p className="scroll-m-20 text-md font-semibold tracking-tight">
                        Alternativa selecionada
                      </p>
                      <Badge variant="outline">{userAlternative?.label} </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {userAlternative?.content}
                    </p>
                  </div>

                  {!isCorrect && (
                    <div>
                      <div className="flex space-x-2">
                        <p className="scroll-m-20 text-md font-semibold tracking-tight">
                          Alternativa correta
                        </p>
                        <Badge variant="outline">
                          {userAlternative?.label}{" "}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {correctAlternative?.content}
                      </p>
                    </div>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}
