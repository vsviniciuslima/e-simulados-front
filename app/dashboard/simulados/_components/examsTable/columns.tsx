import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Discipline } from "@/types/common";
import { Exam } from "@/types/exams";
import { CaretSortIcon, DotsHorizontalIcon } from "@radix-ui/react-icons";
import { ColumnDef } from "@tanstack/react-table";
import { useRouter } from "next/navigation";

export const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: "name",
    header: "Nome",
    cell: ({ row }) => (
      <div className="max-w-6 md:max-w-xs ">{row.getValue("name")}</div>
    ),
    enableHiding: true,
    size: 200,
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
        <Badge variant="outline">
          {(row.getValue("discipline") as Discipline).name}
        </Badge>
        {/* {(row.getValue("discipline") as Discipline).name} */}
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
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const router = useRouter(); // Use useRouter hook

      const handleButtonClick = () => {
        router.push(`/dashboard/simulados/resolver?id=${row.original.id}`); // Navigate to the desired route
      };

      return (
        <div className="flex space-x-2">
          <Button variant="outline" onClick={handleButtonClick}>
            <DotsHorizontalIcon />
          </Button>
        </div>
      );
    },
    size: 50,
  },
];
