"use client";

import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FormField, FormItem } from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Question, QuestionAlternative } from "@/types/questions";
import { ExamAttempt } from "@/types/exams";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@radix-ui/react-collapsible";
import { ChevronsDown, ChevronsUp } from "lucide-react";
import React, { useState } from "react";
import { useFormContext } from "react-hook-form";

export interface QuestionComponentProps {
  question: Question;
  index: number;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  index,
}) => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(false);

  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ExamAttempt>();

  setValue(`answers.${index}.questionId`, question.id);

  const form = useFormContext<ExamAttempt>();

  return (
    <div className="rounded-md border px-2 py-2">
      <div className="hidden" {...register(`answers.${index}.questionId`)}>
        1
      </div>
      <Collapsible
        open={isCollapsibleOpen}
        onOpenChange={setIsCollapsibleOpen}
        className="p-2 ease-out duration-1000"
      >
        <div className="flex items-center justify-between">
          <h4 className="text-sm font-semibold">Questão {index + 1}</h4>
          <div className="flex space-x-2">
            <FormField
              control={form.control}
              name={`answers.${index}.alternativeId`}
              render={({ field }) => (
                <FormItem>
                  <Select onValueChange={field.onChange}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        {question.alternatives?.map((alternative) => (
                          <SelectItem
                            key={alternative.label}
                            value={alternative.label}
                          >
                            {alternative.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />

            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm">
                {isCollapsibleOpen ? (
                  <ChevronsUp className="h-4 w-4" />
                ) : (
                  <ChevronsDown className="h-4 w-4" />
                )}
                <span className="sr-only">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
        </div>
        <CollapsibleContent
          className={cn(
            " space-y-2 text-popover-foreground outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
          )}
        >
          <div className="flex space-x-2 my-3">
            <Badge>{question.discipline.name}</Badge>
            <Badge variant={"outline"}>{question.topic.name}</Badge>
          </div>
          <p>{question.statement}</p>
          <Accordion type="multiple" className="w-full grid gap-4">
            {question.alternatives.map((alternative: QuestionAlternative) => (
              <QuestionAlternativeComponent
                key={alternative.label}
                alternative={alternative}
              />
            ))}
          </Accordion>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};

const QuestionAlternativeComponent = ({
  alternative,
}: {
  alternative: QuestionAlternative;
}) => {
  return (
    <AccordionItem value={`item-${alternative.label}`}>
      <AccordionTrigger>{`Alternativa ${alternative.label}`}</AccordionTrigger>
      <AccordionContent>{alternative.content}</AccordionContent>
    </AccordionItem>
  );
};
