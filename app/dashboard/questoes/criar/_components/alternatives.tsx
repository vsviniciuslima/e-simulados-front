import React, { useEffect } from "react";
import { useFormContext, useFieldArray } from "react-hook-form";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PlusCircle, TrashIcon } from "lucide-react";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { CreateQuestion } from "../formSchema";
import { Textarea } from "@/components/ui/textarea";

const AlternativeRow = ({
  label,
  onDelete,
  index,
}: {
  label: string;
  onDelete: () => void;
  index: number;
}) => {
  const {
    register,
    formState: { errors },
  } = useFormContext<CreateQuestion>();

  return (
    <TableRow>
      <TableCell className="font-semibold text-center">
        <div
          className="w-8 h-8 bg-gray-100 rounded flex items-center justify-center"
          {...register(`alternatives.${index}.label`)}
        >
          {label}
        </div>
        {/* <Button variant="secondary" type="button">
          {label}
        </Button> */}
      </TableCell>
      <TableCell>
        <Input
          {...register(`alternatives.${index}.text`)}
          placeholder={`Texto da alternativa ${label}`}
        />

        {errors.alternatives?.[index]?.text && (
          <span className="text-sm text-red-500">
            {errors.alternatives[index].text?.message}
          </span>
        )}
      </TableCell>
      <TableCell className="w-1">
        <Button
          variant="destructive"
          size="icon"
          onClick={onDelete}
          type="button"
        >
          <TrashIcon className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default function Alternatives() {
  const { control, watch, setValue } = useFormContext<CreateQuestion>();
  const { fields, append, remove } = useFieldArray({
    control,
    name: "alternatives",
  });

  const addAlternative = () => {
    append({
      label: String.fromCharCode(65 + fields.length),
      text: "",
      correct: false,
    });
  };

  const deleteAlternative = (index: number) => {
    fields.splice(index, 1); // Remove the field from the fields array
    remove(index); // Trigger re-render through react-hook-form's remove

    // Sync remaining labels after deletion
    fields.forEach((_, idx) => {
      setValue(`alternatives.${idx}.label`, String.fromCharCode(65 + idx));
    });
  };

  useEffect(() => {
    // Ensure that labels are in sync whenever alternatives change
    fields.forEach((field, index) => {
      setValue(`alternatives.${index}.label`, String.fromCharCode(65 + index));
    });
  }, [fields, setValue]); // Run effect whenever fields change

  const handleCorrectChange = (selectedLabel: string) => {
    // Update the `correct` value for each alternative based on selection
    fields.forEach((field, index) => {
      setValue(`alternatives.${index}.correct`, field.label === selectedLabel);
    });
  };

  // Track the current correct alternative
  const correctAlternative = watch("alternatives")?.find((alt) => alt.correct);
  const correctValue = correctAlternative?.label || "";

  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Alternativas</CardTitle>
          <CardDescription>
            Adicione, edite ou remova as alternativas da questão.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Alternativa</TableHead>
                <TableHead>Texto</TableHead>
                <TableHead>Ações</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {fields.map((field, index) => (
                <AlternativeRow
                  key={`${field.id}-${index}`} // Ensure key uniqueness
                  index={index}
                  label={field.label}
                  onDelete={() => deleteAlternative(index)}
                />
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter className="flex flex-col border-t">
          <div className="justify-center p-4">
            <Button
              size="sm"
              variant="ghost"
              className="gap-1"
              onClick={addAlternative}
              type="button"
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Adicionar Alternativa
            </Button>
          </div>
          <div className="flex flex-start w-full">
            <div className="flex-col">
              <Label htmlFor="correctAnswer">Alternativa correta</Label>
              <ToggleGroup
                type="single"
                value={correctValue}
                onValueChange={handleCorrectChange}
                variant="outline"
                className="mt-1"
              >
                {fields.map((field, index) => (
                  <ToggleGroupItem key={field.id} value={field.label}>
                    {field.label}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
