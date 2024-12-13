import * as React from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { addQuestionToExam, getExams } from "@/services/examService";
import { Question } from "@/types/attempts";
import { Exam } from "@/types/exams";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { FilePlus } from "lucide-react";
import { useEffect } from "react";

export default function AddToExamDialog({
  questions,
}: {
  questions: Question[];
}) {
  const [open, setOpen] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [data, setData] = React.useState<Exam[]>([]);
  const [selectedExams, setSelectedExams] = React.useState<Exam[]>([]);
  const isMobile = useIsMobile();

  const title = "Adicionar ao simulado";
  const description = "Adicione a questão a um simulado";
  const buttonText = "Adicionar a simulado";

  const addQuestionsToExam = async () => {
    console.log("selectedExams", selectedExams);
    console.log("questions", questions);
    selectedExams.forEach((exam) => {
      const questionIds: Array<number> = questions.map(
        (question) => question.id
      );

      console.log("questionIds", questionIds);
      console.log("exam.id", exam.id);

      addQuestionToExam(exam.id, questionIds).then((response) => {
        if (response.ok) {
          setOpen(false);
        } else {
          console.log("Erro ao adicionar");
        }
      });
    });

    console.log("selectedExams", selectedExams);
    console.log("questions", questions);
  };

  useEffect(() => {
    getExams()
      .then((data: Exam[]) => {
        console.log("buscou os exames", data);
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        setLoading(false);
      });
  }, []);

  if (!isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline" disabled={questions.length == 0}>
            <FilePlus className="h-4 w-4" /> {buttonText}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <ExamList exams={data} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" disabled={questions.length == 0}>
          <FilePlus className="h-4 w-4" /> {buttonText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <div className="p-2 flex flex-col space-y-2">
          {data.map((exam) => (
            <Card key={exam.id}>
              <CardContent className="flex p-2 h-10 items-center space-x-2">
                <Checkbox
                  disabled={questions.some((question) =>
                    exam.questions?.map((qst) => qst.id).includes(question.id)
                  )}
                  onCheckedChange={(checked) => {
                    if (checked) {
                      setSelectedExams([...selectedExams, exam]);
                    } else {
                      setSelectedExams(
                        selectedExams.filter((selectedExam) => {
                          return selectedExam.id !== exam.id;
                        })
                      );
                    }
                  }}
                />
                <p className="max-w-sm">{exam.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <Button className="m-2" onClick={addQuestionsToExam}>
          Adicionar a simulados
        </Button>
      </DrawerContent>
    </Drawer>
  );
}

function ExamList({ exams }: { exams: Array<Exam> }) {
  return (
    <div className="p-2 flex flex-col space-y-2">
      {exams.map((exam) => (
        <Card key={exam.id}>
          <CardContent className="flex p-2 h-10 items-center space-x-2">
            <Checkbox
              onCheckedChange={(event) => {
                const isChecked =
                  typeof event === "boolean" ? event : event.target.checked;
              }}
            />
            <p>{exam.name}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
