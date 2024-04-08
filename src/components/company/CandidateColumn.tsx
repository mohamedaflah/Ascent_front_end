"use client";
import defaultImage from "@/assets/IMG 3.png";
import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/shadcn/ui/checkbox";

// import { DataTableRowActions } from "./data-table-row-actions"
import { Applicant } from "@/types/types.jobReducer";
import { format } from "date-fns";

import { DataTableColumnHeader } from "../common/Table/components/data-table-column-header";

export const CandidateColumn: ColumnDef<Applicant>[] = [
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
        className="translate-y-[1px]"
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
    accessorKey: "icon",
    accessorFn: (row) => row.applicantDetails.icon,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant profile" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <img
            src={row.getValue("icon") ? row.getValue("icon") : defaultImage}
            className="size-12 rounded-full"
            alt=""
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    accessorFn: (row) => row.applicantDetails.firstname,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant name" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
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
      <DataTableColumnHeader column={column} title="Hiring status" />
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

  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
