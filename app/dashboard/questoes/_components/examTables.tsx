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
import { ColumnDef } from "@tanstack/react-table";
import { DataTable } from "./data-table";

export type Question = {
  title: string;
  category: string;
  author: string;
  date: string;
};

export const questions: Question[] = [
  {
    title: "FUVEST 2024",
    category: "História",
    author: "Cursinho da FFLCH",
    date: "12/12/2023",
  },
  {
    title: "FUVEST 2023",
    category: "Português",
    author: "Cursinho da EACH",
    date: "12/12/2023",
  },
  {
    title: "FUVEST 2022",
    category: "Matemática",
    author: "Cursinho da FEA",
    date: "12/12/2023",
  },
  {
    title: "UNICAMP 2024",
    category: "Dinâmica",
    author: "João Pedro Reis",
    date: "12/12/2023",
  },
  {
    title: "UNICAMP 2023",
    category: "Literatura",
    author: "Cursinho da Poli",
    date: "12/12/2023",
  },
];

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "title",
    header: "Título",
  },
  {
    accessorKey: "category",
    header: "Categoria",
  },
  {
    accessorKey: "author",
    header: "Autor",
  },
  {
    accessorKey: "date",
    header: "Data",
  },
];

export function ExamsTable() {
  return <DataTable columns={columns} data={questions} />;
}

const renderExamRow = ({ title, category, date, author }: Question) => (
  <TableRow>
    <TableCell>
      <div className="font-medium">{title}</div>
    </TableCell>

    <TableCell className="hidden sm:table-cell">
      <Badge className="text-xs" variant="secondary">
        {category}
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
          <DropdownMenuItem>Ver questão</DropdownMenuItem>
          <DropdownMenuItem>Adicionar a um simulado</DropdownMenuItem>
          <DropdownMenuItem>Compartilhar</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>
);
