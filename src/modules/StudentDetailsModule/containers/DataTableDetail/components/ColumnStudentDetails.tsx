"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Task } from "../../config/schema";
import { DataTableColumnHeader } from "./DataTableColumnDetailHeader";

export const ColumnStudentDetails: ColumnDef<Task>[] = [
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
    header: ({ column }) => <DataTableColumnHeader column={column} title="Nombre del curso" />,
    cell: ({ row }) => {
      return (
        <div className="flex  space-x-2">
          <span className="truncate font-medium ">{row.getValue("name")}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "description",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Descripción" />,
    cell: ({ row }) => {
      return (
        <div className="flex  items-center">
          <span className="max-w-[200px] truncate ">{row.getValue("description")}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "profesor",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Profesor" />,
    cell: ({ row }) => {
      const profesor = row.getValue("profesor") as any
      return (
        <div className="flex  items-center">
          <span className="max-w-[200px] truncate ">{profesor.fullName}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    accessorKey: "students",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Calificación" />,
    cell: ({ row }) => {
       const student = row.getValue("students") as any
       const note = student[0].note;
      return (
        <div className="flex  items-center">
          <span className="max-w-[200px] truncate ">{note}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },

];
