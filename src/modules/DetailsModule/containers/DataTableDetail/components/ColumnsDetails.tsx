"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../../config/schema";
import { DataTableColumnHeader } from "./DataTableColumnDetailHeader";
import NoteComponent from "./NoteComponent";

export const ColumsDetail: ColumnDef<Task>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => <DataTableColumnHeader column={column} title="ID" />,
    cell: ({ row }) => {
      const currentId = row.getValue("id") as any;

      const id = currentId.substring(currentId.length - 4);

      return <div className="max-w-[150px] truncate">{id}</div>;
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre del estudiante" />,
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span className="truncate font-medium ">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Correo" />,
    cell: ({ row }) => {
      return (
        <div className="flex  items-center">
          <span className="max-w-[200px] truncate ">{row.getValue("email")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "note",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nota" />,
    cell: ({ row }) => (<NoteComponent row={row}/>),
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
];
