/* eslint-disable react-hooks/rules-of-hooks */

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/shadcn/ui/checkbox";

import { DataTableColumnHeader } from "../../../components/common/Table/components/data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"

import { formatDateAndTime } from "@/util/formateDate";

import { Category } from "@/types/categoryReducer.type";
import TimeAgo from "@/components/custom/LiveTime";
import { EditCategory } from "@/components/admin/EditCategoryModal";
import { DeleteAlert } from "@/components/custom/admin/DeleteAlert";

export const CategoryColumn: ColumnDef<Category>[] = [
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
    accessorKey: "categoryname",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]  font-semibold">
        {row.getValue("categoryname")}
      </div>
    ),
  },
  {
    accessorKey: "categoryImage",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="icon" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px] h-auto ">
        <img
          src={row.getValue("categoryImage")}
          className="h-10 w-10 object-cover rounded-full"
          alt=""
        />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="added date" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]  font-semibold">
        {formatDateAndTime(row.getValue("createdAt")).date}
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="added time" />
    ),
    cell: ({ row }) => (
      <div className="w-[150px]  font-semibold">
        <TimeAgo timestamp={row.getValue("createdAt")} />
      </div>
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="last updated" />
    ),
    cell: ({ row }) => (
      <div className="">
        {formatDateAndTime(row.getValue("createdAt")).date}
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: "Actions",
    cell: ({ row }) => {

      return (
        <div className="flex gap-3 h-10">
          <EditCategory CategoryData={row.original} />
          <DeleteAlert
            status={row.original.status as boolean}
            id={row.original._id as string}
          />
        </div>
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
