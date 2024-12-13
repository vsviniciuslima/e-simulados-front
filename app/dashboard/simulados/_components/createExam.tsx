"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { CreateExam, CreateExamSchema, Exam } from "@/types/exams";
import { Question } from "@/types/questions";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { getDisciplines, getTopics } from "@/services/commonService";
import { createExam } from "@/services/examService";
import {
  DifficultyEnum,
  Discipline,
  ExamTypeEnum,
  mapDifficulty,
  Topic,
} from "@/types/common";
import { FilePlus } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { toast } from "sonner";

export const CreateExamComponent = ({
  questions,
}: {
  questions: Question[];
}) => {
  const isMobile = useIsMobile();
  const [open, setOpen] = React.useState(false);

  const title = "Novo simulado";
  const description = "Criar simulado com as questões selecionadas";
  const buttonText = "Criar simulado";

  if (!isMobile) {
    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="outline">
            <FilePlus className="h-4 w-4" /> {buttonText}
          </Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <ExamForm questions={questions} setOpen={setOpen} />
        </SheetContent>
      </Sheet>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline">
          <FilePlus className="h-4 w-4" /> {buttonText}
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        <ExamForm questions={questions} setOpen={setOpen} />
      </DrawerContent>
    </Drawer>
  );
};

type ExamFormProps = {
  questions: Question[];
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; // Add setOpen prop type
};

const ExamForm: React.FC<ExamFormProps> = ({ questions, setOpen }) => {
  const router = useRouter();
  const [loading, setLoading] = React.useState(false);
  const [disciplines, setDisciplines] = React.useState<Array<Discipline>>([]);
  const [topics, setTopics] = React.useState<Array<Topic>>([]);
  const form = useForm<CreateExam>({
    resolver: zodResolver(CreateExamSchema),
    defaultValues: {
      questionIds: questions.map((question) => question.id),
    },
  });

  useEffect(() => {
    getDisciplines()
      .then((disciplines: Discipline[]) => {
        console.log("buscou as disciplinas", disciplines);
        setDisciplines(disciplines);
      })
      .catch((error) => {});
    getTopics()
      .then((topics: Topic[]) => {
        console.log("buscou os tópicos", topics);
        setTopics(topics);
      })
      .catch((error) => {});
  }, []);

  const handleNewExam: SubmitHandler<CreateExam> = async (data) => {
    console.log("Form Data:", data as CreateExam);
    setLoading(true);
    createExam(data).then((result) => {
      if (!result) {
        console.log("Erro ao criar simulado");
        return;
      }

      if (!result.ok) {
        console.log(result);
        return;
      }

      result.json().then((data: Exam) =>
        toast(
          <div className="flex justify-between w-full">
            <div className="items-center">Simulado criado com sucesso</div>
            <div>
              <Button
                variant="outline"
                onClick={() =>
                  router.push(`/dashboard/simulados/resolver?id=${data.id}`)
                }
              >
                Ver
              </Button>
            </div>
          </div>
        )
      );

      form.reset();
      setOpen(false);
      setLoading(false);
    });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleNewExam)}>
        <div className="flex w-full flex-col">
          <div className="grid gap-4 p-4">
            {/* <FormErrors /> */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input placeholder="Fuvest" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="year"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ano</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="2010"
                      type="number"
                      min={100}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="examType"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de simulado</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Tipo" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {ExamTypeEnum.options.map((type) => {
                        return (
                          <SelectItem key={type} value={type}>
                            {type
                              .toLowerCase()
                              .replace(/\b(\w)/g, (x) => x.toUpperCase())}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <FormField
                control={form.control}
                name="disciplineId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Disciplina</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Disciplina" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {disciplines.map((discipline) => (
                          <SelectItem
                            key={discipline.id}
                            value={discipline.id.toString()}
                          >
                            {discipline.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="topicId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tópico</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Tópico" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {topics.map((topic) => (
                          <SelectItem
                            key={topic.id}
                            value={topic.id.toString()}
                          >
                            {topic.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Dificuldade</FormLabel>
                  <Select onValueChange={field.onChange}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Dificuldade" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {DifficultyEnum.options.map((difficulty) => {
                        return (
                          <SelectItem key={difficulty} value={difficulty}>
                            {mapDifficulty(difficulty)}
                          </SelectItem>
                        );
                      })}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
        <Button className="m-2" type="submit" disabled={loading}>
          Criar simulado
        </Button>
      </form>
    </FormProvider>
  );
};

const FormErrors: React.FC = () => {
  const {
    formState: { errors },
  } = useFormContext<CreateExam>();

  return (
    <div className="text-red-500">
      {Object.keys(errors).map((field) => (
        <div key={field}>
          {field}: {errors[field as keyof typeof errors]?.message}
        </div>
      ))}
    </div>
  );
};
