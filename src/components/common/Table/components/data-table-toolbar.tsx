"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { AddCategoryModal } from "@/components/admin/AddCategoryModal";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import axios from "axios";
import { jobBaseURL } from "@/constants/axiosInstance";
import toast from "react-hot-toast";
import { useState } from "react";
import { Loader2 } from "lucide-react";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  from?: "Applicants" | "Categories" | "Joblisting" | "Candidate";
}

export function DataTableToolbar<TData>({
  table,
  from,
}: DataTableToolbarProps<TData>) {
  const { user } = useSelector((state: RootState) => state.userData);
  const [loadingDownload, setLoading] = useState<boolean>(false);
  const handleDownload = async () => {
    try {
      setLoading(true);
      const copmanyId = user?._id;
      const { data } = await axios.get(
        `${jobBaseURL}/api/v1/download-candidate-report?companyId=${copmanyId}`,
        { responseType: "blob" }
      );
      const url = URL.createObjectURL(new Blob([data]));

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "Report.pdf");
      // link.setAttribute("class","hidden")
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    } catch (error) {
      toast.error("Error in report download");
    }
    setLoading(false);
  };
  const isFiltered = table.getState().columnFilters.length > 0;
  const datatoSearch =
    from === "Applicants"
      ? "jobTitle"
      : from === "Categories"
      ? "categoryname"
      : "";
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Search ..  "
          value={
            (table.getColumn(datatoSearch)?.getFilterValue() as string) ?? ""
          }
          onChange={(event) =>
            table.getColumn(datatoSearch)?.setFilterValue(event.target.value)
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />

        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {table.getColumn("priority") && (
          <DataTableFacetedFilter
            column={table.getColumn("priority")}
            title="Priority"
            options={priorities}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <div className="flex gap-4">
        {from == "Categories" && (
          <>
            <div>
              <AddCategoryModal />
            </div>
          </>
        )}
        {from == "Candidate" && (
          <>
            <div>
              <button
                className={`px-3 rounded-md bg-primary text-white   h-full items-center  text-sm ${
                  loadingDownload && "pointer-events-none bg-primary-800"
                }`}
                onClick={handleDownload}
              >
                {loadingDownload ? <>
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 animate-spin"/> Loading
                </span>
                </> : <>Download report</>}
              </button>
            </div>
          </>
        )}

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
