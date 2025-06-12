'use client';

import { cn } from '@/lib/utils';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FormField, FormItem } from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Question, QuestionAlternative } from '@/types/questions';
import { ExamAttempt } from '@/types/exams';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@radix-ui/react-collapsible';
import {
  BadgeCheckIcon,
  BadgeInfoIcon,
  Bold,
  BookCheck,
  BookOpen,
  Calendar,
  ChevronsDown,
  ChevronsUp,
  ClipboardList,
  Italic,
  Layers,
  Tag,
  Underline,
} from 'lucide-react';
import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import QuestionDetails from './questionDetails';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

export interface QuestionComponentProps {
  question: Question;
  index: number;
}

export const QuestionComponent: React.FC<QuestionComponentProps> = ({
  question,
  index,
}) => {
  const {
    register,
    formState: { errors },
    setValue,
  } = useFormContext<ExamAttempt>();

  const form = useFormContext<ExamAttempt>();

  return (
    <>
      <QuestionDetails question={question} />
      {/* <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4 justify-center">
          <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight mt-2">
            Questão {index + 1}
          </h3>
        </div>
        <div className="flex space-x-2">
          <FormField
            control={form.control}
            name={`answers.${index}.alternativeId`}
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={(value) => {
                    field.onChange(value);
                    setValue(`answers.${index}.questionId`, question.id);
                    window.scrollTo({
                      top: document.body.scrollHeight,
                      behavior: 'smooth',
                    }); // Scroll to the end smoothly
                  }}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {question.alternatives?.map((alternative) => (
                        <SelectItem
                          key={alternative.label}
                          value={alternative.label}
                          // className="capitalize"
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
        </div>
      </div> */}

      <p>{question.statement}</p>
      <ToggleGroup type="single" className="flex flex-col space-y-3">
        {question.alternatives.map((alternative: QuestionAlternative) => (
          <QuestionAlternativeComponent
            key={alternative.label}
            alternative={alternative}
          />
        ))}
      </ToggleGroup>
    </>
  );
};

const QuestionAlternativeComponent = ({
  alternative,
}: {
  alternative: QuestionAlternative;
}) => {
  const [isCollapsibleOpen, setIsCollapsibleOpen] = useState(true);
  return (
    <div className="rounded-md border px-1 py-1 w-full rounded-xl bg-card text-card-foreground shadow">
      <Collapsible
        open={isCollapsibleOpen}
        onOpenChange={setIsCollapsibleOpen}
        className="p-2 ease-out duration-1000"
      >
        <div className="flex items-center justify-between">
          <ToggleGroupItem
            value={alternative.label}
            aria-label={`Toggle ${alternative.label}`}
            className="capitalize"
            variant={'outline'}
          >
            {alternative.label}
          </ToggleGroupItem>
          <div className="flex space-x-2">
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
            'my-2 outline-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
          )}
        >
          <small className="text-sm font-medium leading-none">
            {alternative.content}
          </small>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
};
