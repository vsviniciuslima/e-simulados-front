// import * as React from "react";

// import {
//   ColumnDef,
//   ColumnFiltersState,
//   SortingState,
//   Table,
//   flexRender,
//   getCoreRowModel,
//   getFacetedUniqueValues,
//   getFilteredRowModel,
//   getPaginationRowModel,
//   getSortedRowModel,
//   useReactTable,
// } from "@tanstack/react-table";

// import { Button } from "@/components/ui/button";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   Sheet,
//   SheetClose,
//   SheetContent,
//   SheetDescription,
//   SheetFooter,
//   SheetHeader,
//   SheetTitle,
//   SheetTrigger,
// } from "@/components/ui/sheet";
// import { useIsMobile } from "@/hooks/use-mobile";
// import { Question } from "@/types/questions";
// import { ListCollapse } from "lucide-react";
// import { Badge } from "@/components/ui/badge";
// import { difficultyMapping } from "./columns";
// import { DotsHorizontalIcon } from "@radix-ui/react-icons";
// import { useEffect } from "react";
// import { Exam } from "@/types/exams";
// import { getExams } from "@/services/examService";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Table as ShadcnTable,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// export const columns: ColumnDef<Exam>[] = [
//   // {
//   //   id: "select",
//   //   header: ({ table }) => (
//   //     <Checkbox
//   //       checked={
//   //         table.getIsAllPageRowsSelected() ||
//   //         (table.getIsSomePageRowsSelected() && "indeterminate")
//   //       }
//   //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
//   //       aria-label="Select all"
//   //     />
//   //   ),
//   //   cell: ({ row }) => (
//   //     <Checkbox
//   //       checked={row.getIsSelected()}
//   //       onCheckedChange={(value) => row.toggleSelected(!!value)}
//   //       aria-label="Select row"
//   //     />
//   //   ),
//   //   enableSorting: false,
//   //   enableHiding: false,
//   // },
//   {
//     accessorKey: "name",
//     header: "Nome",
//     cell: ({ row }) => <div>{String(row.getValue("name"))}</div>,
//     enableHiding: true,
//   },
//   // {
//   //   id: "2",
//   //   accessorKey: "discipline",
//   //   header: "Disciplina",
//   //   cell: ({ row }) => <div>{row.getValue("discipline")}</div>,
//   //   enableHiding: true,
//   // },
//   // {
//   //   accessorKey: "difficulty",
//   //   header: "Dificuldade",
//   //   cell: ({ row }) => (
//   //     <div>
//   //       {
//   //         difficultyMapping[
//   //           row.getValue("difficulty") as keyof typeof difficultyMapping
//   //         ]
//   //       }
//   //     </div>
//   //   ),
//   //   enableHiding: true,
//   // },
// ];

// export default function AddToExamDialog({
//   questions,
// }: {
//   questions: Question[];
// }) {
//   const [open, setOpen] = React.useState(false);
//   const [loading, setLoading] = React.useState(true);
//   const [data, setData] = React.useState<Exam[]>([]);
//   const isMobile = useIsMobile();

//   const [sorting, setSorting] = React.useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
//     []
//   );
//   const [rowSelection, setRowSelection] = React.useState({});
//   const table: Table<Exam> = useReactTable<Exam>({
//     data,
//     columns,
//     onSortingChange: setSorting,
//     onColumnFiltersChange: setColumnFilters,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     onRowSelectionChange: setRowSelection,
//     getFacetedUniqueValues: getFacetedUniqueValues(),
//     state: {
//       sorting,
//       columnFilters,
//       rowSelection,
//     },
//     initialState: {
//       pagination: {
//         pageSize: 8,
//       },
//     },
//   });

//   useEffect(() => {
//     getExams()
//       .then((data: Exam[]) => {
//         console.log("buscou os exames", data);
//         setData(data);
//         setLoading(false);
//       })
//       .catch((error) => {
//         setLoading(false);
//       });
//   }, []);

//   if (!isMobile) {
//     return (
//       <Sheet>
//         <SheetTrigger asChild>
//           <Button variant="outline">
//             <DotsHorizontalIcon className="h-4 w-4" /> Adicionar ao simulado
//           </Button>
//         </SheetTrigger>
//         <SheetContent>
//           <SheetHeader>
//             <SheetTitle>Adicione ao simulado</SheetTitle>
//             <SheetDescription>
//               Adicione a questão a um simulado
//             </SheetDescription>
//           </SheetHeader>
//           <ExamList table={table} />
//         </SheetContent>
//       </Sheet>
//     );
//   }

//   return (
//     <Drawer open={open} onOpenChange={setOpen}>
//       <DrawerTrigger asChild>
//         <Button variant="outline">
//           <DotsHorizontalIcon className="h-4 w-4" /> Adicionar ao simulado
//         </Button>
//       </DrawerTrigger>
//       <DrawerContent>
//         <DrawerHeader className="text-left">
//           <DrawerTitle>Detalhes da questão</DrawerTitle>
//           <DrawerDescription>Veja os detalhes da questão</DrawerDescription>
//         </DrawerHeader>
//         <ExamList table={table} />
//         {/* <DrawerFooter className="pt-2">
//           <DrawerClose asChild>
//             <Button variant="outline">Fechar</Button>
//           </DrawerClose>
//         </DrawerFooter> */}
//       </DrawerContent>
//     </Drawer>
//   );
// }

// function ExamList({
//   table,
// }: {
//   table: import("@tanstack/table-core").Table<Exam>;
// }) {
//   return (
//     <div className="rounded-md border">
//       <ShadcnTable>
//         <TableHeader>
//           {table.getHeaderGroups().map((headerGroup) => (
//             <TableRow key={headerGroup.id}>
//               {headerGroup.headers.map((header) => {
//                 return (
//                   <TableHead key={header.id}>
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 );
//               })}
//             </TableRow>
//           ))}
//         </TableHeader>
//         <TableBody>
//           {table.getRowModel().rows?.length ? (
//             table.getRowModel().rows.map((row) => (
//               <TableRow
//                 key={row.id}
//                 data-state={row.getIsSelected() && "selected"}
//               >
//                 {row.getVisibleCells().map((cell) => (
//                   <TableCell key={cell.id}>
//                     {flexRender(cell.column.columnDef.cell, cell.getContext())}
//                   </TableCell>
//                 ))}
//               </TableRow>
//             ))
//           ) : (
//             <TableRow>
//               <TableCell colSpan={columns.length} className="h-24 text-center">
//                 Nenhum resultado.
//               </TableCell>
//             </TableRow>
//           )}
//         </TableBody>
//       </ShadcnTable>
//     </div>
//   );
// }
