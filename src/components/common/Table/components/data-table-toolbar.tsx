"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/shadcn/ui/button";
import { Input } from "@/shadcn/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "../data/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import { AddCategoryModal } from "@/components/admin/AddCategoryModal";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  from?: "Applicants" | "Categories" | "Joblisting";
}

export function DataTableToolbar<TData>({
  table,
  from,
}: DataTableToolbarProps<TData>) {
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

        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
