import React, { useState } from "react";
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

export default function AlternativesCard() {
  const defaultAlternatives: Alternative[] = [
    { label: "A" },
    { label: "B" },
    { label: "C" },
    { label: "D" },
  ];
  const [alternatives, setAlternatives] =
    useState<Alternative[]>(defaultAlternatives);

  const addAlternative = () => {
    const newAlternative = {
      label: String.fromCharCode(65 + alternatives.length),
    };
    setAlternatives([...alternatives, newAlternative]);
  };

  const deleteAlternative = (label: string) => {
    // Filter out the deleted alternative
    const updatedAlternatives = alternatives.filter(
      (alternative) => alternative.label !== label
    );

    // Rename the subsequent alternatives
    const renamedAlternatives = updatedAlternatives.map(
      (alternative, index) => ({
        ...alternative,
        label: String.fromCharCode(65 + index), // Renaming to A, B, C, etc.
      })
    );

    // Update the state with the new list of alternatives
    setAlternatives(renamedAlternatives);
  };

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
              </TableRow>
            </TableHeader>
            <TableBody>
              {alternatives.map((alternative: Alternative, index) => (
                <AlternativeRow
                  key={index}
                  label={alternative.label}
                  id={alternative.label}
                  onDelete={deleteAlternative}
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
            >
              <PlusCircle className="h-3.5 w-3.5" />
              Adicionar Alternativa
            </Button>
          </div>
          <div className="flex flex-start w-full">
            <div className="flex-col">
              <Label htmlFor="name">Alternativa correta</Label>
              <ToggleGroup
                type="single"
                defaultValue="s"
                variant="outline"
                className="mt-1"
              >
                {alternatives.map((alternative: Alternative, index) => (
                  <ToggleGroupItem key={index} value={alternative.label}>
                    {alternative.label}
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

export type Alternative = {
  label: string;
  text?: string;
};

export const AlternativeRow = ({
  label,
  onDelete,
  id,
}: {
  label: string;
  onDelete: (id: string) => void;
  id: string;
}) => (
  <TableRow>
    <TableCell className="font-semibold text-center">
      <Button variant="secondary">{label}</Button>
    </TableCell>
    <TableCell>
      <Input
        id={label}
        type="text"
        placeholder={`Texto da alternativa ${label}`}
      />
    </TableCell>
    <TableCell className="w-1">
      <Button variant="destructive" size="icon" onClick={() => onDelete(id)}>
        <TrashIcon className="h-4 w-4" />
      </Button>
    </TableCell>
  </TableRow>
);
