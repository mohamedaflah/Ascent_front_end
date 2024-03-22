"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/shadcn/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"
import { Applicant } from "@/types/types.jobReducer";

export const columns: ColumnDef<Applicant>[] = [
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
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px] "
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "jobtitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="job title" />
    ),
    cell: ({ row }) => <div className="w-[80px]">{row.getValue("id")}</div>,
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "Applicantemail",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant email" />
    ),
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row.getValue("title"));
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Applicantemail")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Appliedat",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied at" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Appliedat")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Hiringstage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hiring stage" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Hiringstage")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("Category")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "Employment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employment" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status")
  //     )

  //     if (!status) {
  //       return null
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     )
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id))
  //   },
  // },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
