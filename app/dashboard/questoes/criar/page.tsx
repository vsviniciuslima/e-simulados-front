"use client";

import {
  FormProvider,
  SubmitHandler,
  useForm,
  useFormContext,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  CreateQuestion,
  CreateQuestionSchema,
} from "../../../../types/questions";
import { Button } from "@/components/ui/button";
import Alternatives from "./_components/alternatives";
import Categories from "./_components/categories";
import Details from "./_components/details";
import MainInfo from "./_components/mainInfo";
import { createQuestion } from "./actions";
import Images from "./_components/images";
import { toast } from "sonner";

export default function Dashboard() {
  // const { toast } = useToast();
  const form = useForm<CreateQuestion>({
    resolver: zodResolver(CreateQuestionSchema),
    defaultValues: {
      questionAlternatives: [
        { label: "A", content: "" },
        { label: "B", content: "" },
        { label: "C", content: "" },
        { label: "D", content: "" },
      ],
    },
  });

  const { handleSubmit, reset } = form;

  const processForm: SubmitHandler<CreateQuestion> = async (data) => {
    createQuestion(data)
      .then((res) => {
        reset();
        toast("Questão criada com sucesso");
      })
      .catch((err) => {
        console.log(err);
        toast("Não foi possível criar a questão.");
      });
  };

  return (
    <FormProvider {...form}>
      <form onSubmit={handleSubmit(processForm)}>
        <div className="flex min-h-screen w-full flex-col">
          <div className="flex flex-col sm:gap-4">
            <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
              <div className="w-full grid flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Nova Questão
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <ActionButtons />
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <MainInfo />
                    <Alternatives />
                  </div>
                  <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                    <Details />
                    <Categories />
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <ActionButtons />
                </div>
              </div>
            </main>
          </div>
        </div>
      </form>
    </FormProvider>
  );
}

const ActionButtons: React.FC = () => {
  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = useFormContext<CreateQuestion>();

  const onSubmit = (data: CreateQuestion) => {
    console.log("errors", errors);
    console.log("Form Data:", data);
  };

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full">
      <Button
        variant="outline"
        size="sm"
        className="w-full sm:w-auto"
        onClick={() => reset()}
      >
        Descartar
      </Button>
      <Button size="sm" type="submit" className="w-full sm:w-auto">
        Salvar Questão
      </Button>
      <FormErrors />
    </div>
  );
};

const FormErrors: React.FC = () => {
  const {
    formState: { errors },
  } = useFormContext<CreateQuestion>();

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
