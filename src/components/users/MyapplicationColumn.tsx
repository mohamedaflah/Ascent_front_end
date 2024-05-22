/* eslint-disable react-hooks/rules-of-hooks */

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/shadcn/ui/checkbox";

import { DataTableColumnHeader } from "../../components/common/Table/components/data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"
import { Job } from "@/types/types.jobReducer";

import { format } from "date-fns";

export const MyapplicatonColumn: ColumnDef<Job>[] = [
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
      <div className="w-[150px]  font-semibold">{row.getValue("jobTitle")}</div>
    ),
    enableSorting: false,
    enableHiding: false,
  },

  {
    accessorKey: "companydetail",
    accessorFn: (row) => `${row.companyName}{*}${row.companyIcon}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="company" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]  font-semibold flex items-center gap-2">
        <img
          src={
            String(row.getValue("companydetail"))?.split(
              "{*}" as unknown as {
                [Symbol.split](
                  string: string,
                  limit?: number | undefined
                ): string[];
              }
            )[1]
          }
          className="size-8 rounded-full"
          alt=""
        />
        {
          String(row.getValue("companydetail"))?.split(
            "{*}" as unknown as {
              [Symbol.split](
                string: string,
                limit?: number | undefined
              ): string[];
            }
          )[0]
        }
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "appliedDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="applied date" />
    ),
    cell: ({ row }) => {
      const appliedDate = row.getValue("appliedDate") as string[]
      return (
        <div className="w-[150px]  font-semibold">
          {appliedDate &&  format(String(appliedDate[0]), "PPP")}
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "applicationStatus",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="application status" />
    ),

    cell: ({ row }) => {
      const status=row.getValue("applicationStatus") as string[]
      return (
        <div className="w-[150px]  font-semibold">
          <span className="h-8 w-20 rounded-3xl flex items-center justify-center border">
            {String(status[0])}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "category",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="category" />
    ),

    cell: ({ row }) => {
      const status=row.getValue("category") 
      return (
        <div className="w-[150px]  font-semibold">
          <span className="h-8 w-24 rounded-3xl flex items-center justify-start ">
            {String(status)}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "employment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="employment type" />
    ),

    cell: ({ row }) => {
      const status=row.getValue("employment") 
      return (
        <div className="w-[150px]  font-semibold">
          <span className="h-8 w-24 rounded-3xl flex items-center justify-start ">
            {String(status)}
          </span>
        </div>
      );
    },
    enableSorting: false,
    enableHiding: false,
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => <DataTableRowActions row={row} />,
  // },
];
