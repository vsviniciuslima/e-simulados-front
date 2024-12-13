import React, { useEffect } from "react";
import { useFormContext } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateQuestion } from "../../../../../types/questions";
import { getDisciplines, getTopics } from "@/services/commonService";
import { Discipline, ExamTypeEnum, Topic } from "@/types/common";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";

const subcategoriesMap: Record<
  string,
  Array<{ value: string; label: string }>
> = {
  human_science: [
    { value: "brazil_history", label: "História do Brasil" },
    { value: "world_history", label: "História Mundial" },
  ],
  exact_science: [{ value: "trigonometry", label: "Trigonometria" }],
  biological_science: [],
};

export default function Categories() {
  const [disciplines, setDisciplines] = React.useState<Array<Discipline>>([]);
  const [topics, setTopics] = React.useState<Array<Topic>>([]);

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

  const form = useFormContext<CreateQuestion>();
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<CreateQuestion>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categorias da questão</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6 sm:grid-cols-3">
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
          <div className="grid gap-3">
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
          </div>

          <div className="grid gap-3">
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
                        <SelectItem key={topic.id} value={topic.id.toString()}>
                          {topic.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
