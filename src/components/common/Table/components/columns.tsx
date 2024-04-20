"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/shadcn/ui/checkbox";

import { DataTableColumnHeader } from "./data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"
import { Applicant } from "@/types/types.jobReducer";
import { format } from "date-fns";
import { Link } from "react-router-dom";

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
    accessorKey: "jobTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="job title" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]  ">{row.getValue("jobTitle")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "email",
    accessorFn: (row) => row.applicantDetails.email,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant email" />
    ),
    cell: ({ row }) => {
    
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("email")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "appliedDate",
    accessorFn: (row) => row?.applicants?.appliedDate,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applied at" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(row.getValue("appliedDate"), "PPP")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "hiringstage",
    accessorFn: (row) => row?.applicants?.hiringstage,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Hiring stage" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <div className="h-10 min-w-20 flex items-center justify-center border rounded-full">
              {row.getValue("hiringstage")}
            </div>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => {
 

      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("category")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "employment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employment" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium ">
            {row.getValue("employment")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Actions",
    cell: ({ row }) => {
  

      // {row.original.applicants?.applicantId}
      return (
        <Link
          className="flex w-auto bg-primary/5  h-10 border border-primary items-center justify-center cursor-pointer"
          to={`/company/applicantdetail/${row.original._id}/${row.original.applicants?.applicantId}/profile`}
        >
          See Application
        </Link>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
