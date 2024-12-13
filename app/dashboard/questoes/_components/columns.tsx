import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Question } from "@/types/questions";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import QuestionDetails from "./questionDetails";
import { Discipline, mapDifficulty } from "@/types/common";

export const columns: ColumnDef<Question>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "statement",
    header: "Enunciado",
    cell: ({ row }) => (
      <div className="max-w-6 md:max-w-xs truncate">
        {row.getValue("statement")}
      </div>
    ),
    enableHiding: true,
  },
  {
    accessorKey: "discipline",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          className="flex items-center"
        >
          Disciplina
          <CaretSortIcon className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="ml-3 md:ml-0">
        {(row.getValue("discipline") as Discipline).name}
      </div>
    ),
    enableHiding: true,
    enableGlobalFilter: true,
    filterFn: (row, id, filterValue) => {
      console.log("filterValue", filterValue);
      return filterValue.length === 0
        ? true
        : row.original.discipline.name
            .toLowerCase()
            .includes(filterValue.toLowerCase());
    },
  },
  {
    accessorKey: "difficulty",
    header: () => <div>Dificuldade</div>,
    cell: ({ row }: { row: any }) => {
      const difficulty = row.getValue("difficulty");
      const mappedDifficulty = mapDifficulty(difficulty);
      const variant =
        difficulty === "EASY"
          ? "success"
          : difficulty === "MEDIUM"
          ? "warning"
          : "destructive";
      return <Badge variant={variant}>{mapDifficulty(difficulty)}</Badge>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const question: Question = row.original;

      return (
        <div className="flex space-x-2">
          {/* <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Abrir menu</span>
                <DotsHorizontalIcon className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Ações</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  if (question.id) navigator.clipboard.writeText(question.id);
                }}
              >
                Copiar link
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Adicionar a simulado</DropdownMenuItem>
              <DropdownMenuItem>Ver detalhes</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu> */}
          <QuestionDetails question={question} />
        </div>
      );
    },
  },
];
