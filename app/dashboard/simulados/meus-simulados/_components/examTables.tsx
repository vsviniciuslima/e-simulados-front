"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { MoreHorizontal } from "lucide-react";

export interface ExamTableProps {
  examName: string;
  examType: string;
  date: string;
  score: string;
}

const exams: ExamTableProps[] = [
  {
    examName: "FUVEST 2024",
    examType: "FUVEST",
    date: "10/10/2021 às 13:00",
    score: "73/10",
  },
  {
    examName: "FUVEST 2023",
    examType: "FUVEST",
    date: "10/10/2021 às 13:00",
    score: "72/90",
  },
  {
    examName: "FUVEST 2022",
    examType: "FUVEST",
    date: "10/10/2021 às 13:00",
    score: "68/90",
  },
  {
    examName: "UNICAMP 2024",
    examType: "UNICAMP",
    date: "10/10/2021 às 13:00",
    score: "68/90",
  },
  {
    examName: "UNICAMP 2023",
    examType: "UNICAMP",
    date: "10/10/2021 às 13:00",
    score: "68/90",
  },
];

export function ExamsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Simulado</TableHead>
          <TableHead className="hidden sm:table-cell">Tipo</TableHead>
          <TableHead className="hidden md:table-cell">Data</TableHead>
          <TableHead className="hidden md:table-cell">Acertos</TableHead>
          <TableHead className="hidden md:table-cell">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams.slice(0, 6).map((exam: ExamTableProps) => renderExamRow(exam))}
      </TableBody>
    </Table>
  );
}

const renderExamRow = ({ examName, examType, date, score }: ExamTableProps) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{examName}</div>
    </TableCell>

    <TableCell className="hidden sm:table-cell">
      <Badge className="text-xs" variant="secondary">
        {examType}
      </Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell">{date}</TableCell>
    <TableCell className="hidden md:table-cell">{score}</TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuItem>Delete</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);
