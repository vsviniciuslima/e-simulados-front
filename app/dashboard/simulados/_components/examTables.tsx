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
  author: string;
  date: string;
}

const exams: ExamTableProps[] = [
  {
    examName: "FUVEST 2024",
    examType: "FUVEST",
    author: "Cursinho da FFLCH",
    date: "12/12/2023",
  },
  {
    examName: "FUVEST 2023",
    examType: "FUVEST",
    author: "Cursinho da EACH",
    date: "12/12/2023",
  },
  {
    examName: "FUVEST 2022",
    examType: "FUVEST",
    author: "Cursinho da FEA",
    date: "12/12/2023",
  },
  {
    examName: "UNICAMP 2024",
    examType: "UNICAMP",
    author: "João Pedro Reis",
    date: "12/12/2023",
  },
  {
    examName: "UNICAMP 2023",
    examType: "UNICAMP",
    author: "Cursinho da Poli",
    date: "12/12/2023",
  },
];

export function ExamsTable() {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Título</TableHead>
          <TableHead className="hidden sm:table-cell">Prova</TableHead>
          <TableHead className="hidden md:table-cell">Autor</TableHead>
          <TableHead className="hidden md:table-cell">Criado em</TableHead>
          <TableHead className="hidden md:table-cell">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {exams.slice(0, 6).map((exam: ExamTableProps) => renderExamRow(exam))}
      </TableBody>
    </Table>
  );
}

const renderExamRow = ({
  examName,
  examType,
  date,
  author,
}: ExamTableProps) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{examName}</div>
    </TableCell>

    <TableCell className="hidden sm:table-cell">
      <Badge className="text-xs" variant="secondary">
        {examType}
      </Badge>
    </TableCell>
    <TableCell className="hidden md:table-cell font-bold">{author}</TableCell>
    <TableCell className="hidden md:table-cell">{date}</TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button aria-haspopup="true" size="icon" variant="ghost">
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Ações</DropdownMenuLabel>
          <DropdownMenuItem>Salvar aos seus simulados</DropdownMenuItem>
          <DropdownMenuItem>Compartilhar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);
