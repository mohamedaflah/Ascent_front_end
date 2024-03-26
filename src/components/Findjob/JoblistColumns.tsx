/* eslint-disable react-hooks/rules-of-hooks */

import { ColumnDef } from "@tanstack/react-table";

import { Checkbox } from "@/shadcn/ui/checkbox";

import { DataTableColumnHeader } from "../../components/common/Table/components/data-table-column-header";
// import { DataTableRowActions } from "./data-table-row-actions"
import { Job } from "@/types/types.jobReducer";
import { formatDateAndTime } from "@/util/formateDate";
import TimeAgo from "../custom/LiveTime";
import { JobEdit } from "../company/JobEdit";
import ConfirmModal from "../custom/confirmModal";
import { Trash2Icon, Undo2 } from "lucide-react";
import { AppDispatch } from "@/redux/store";
import { useDispatch } from "react-redux";
import { deleteJob } from "@/redux/actions/jobActions";

export const jobListColumns: ColumnDef<Job>[] = [
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
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="job added At" />
    ),
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row.getValue("createdAt"));
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            <div className="flex gap-2">
              {formatDateAndTime(row.getValue("createdAt")).date}
              <TimeAgo
                timestamp={
                  row.getValue("createdAt") as unknown as string | number | Date
                }
              />
            </div>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "employment",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employment type" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("employment")}
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
            <div className="h-10 min-w-20 px-3 flex items-center justify-center border rounded-full">
              {row.getValue("category")}
            </div>
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "vacancies",
    accessorFn: (row) => `${row.vacancies.filled}-${row.vacancies.available}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applications" />
    ),
    cell: ({ row }) => {
      console.log(row.getValue("vacancies"), "vakdidi");
      const rowValue = row.getValue("vacancies") as string;
      return (
        <div className="flex flex-col gap-2 h-10">
          <div>
            {rowValue.split("-")[0]} Vacancies of {rowValue.split("-")[1]}
          </div>
          <div>
            <div className="h-2 w-[100px] dark:bg-green-700  bg-gray-300">
              <div className="h-full w-[12%] bg-green-400"></div>
            </div>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row);

      // {row.original.applicants?.applicantId}
      return (
        <div className="flex">
          {row.getValue("status") ? (
            <div className="flex">
              {!row.original.expired ? (
                <div className=" h-8 rounded-full dark:bg-green-700 bg-green-400 flex items-center gap-2 justify-between px-3 text-white ">
                  <span className="w-3 h-3 rounded-full dark:bg-green-800 bg-green-500"></span>
                  Active
                </div>
              ) : (
                <div className=" h-8 rounded-full dark:bg-red-400 bg-red-400 flex items-center gap-2 justify-between p-3 text-white">
                  <span className="w-3 h-3 rounded-full dark:bg-red-500 bg-red-500"></span>
                  expired
                </div>
              )}
            </div>
          ) : (
            <div className=" h-8 rounded-full  bg-red-400 flex items-center gap-2 justify-between p-3 text-white">
              <span className="w-3 h-3 rounded-full  bg-red-500"></span>
              Deleted
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: "Actions",
    cell: ({ row }) => {
      console.log("🚀 ~ row:", row);
      const dispatch: AppDispatch = useDispatch();
      return (
        <div className="flex gap-3 h-10">
          <JobEdit jobData={row.original} />
          <ConfirmModal
            action={() => dispatch(deleteJob(row.original?._id as string))}
          >
            {!row.original.status ? <Undo2 /> : <Trash2Icon />}
          </ConfirmModal>
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
