"use client";

import { Input } from "@/components/ui/input";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

type DataTableProps<TData> = {
  data: TData[];
  columns: ColumnDef<TData>[];
  isLoading?: boolean;
};

export function DataTable<TData>({
  data,
  columns,
  isLoading = false,
}: DataTableProps<TData>) {
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    state: { globalFilter },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div
      className="relative w-full space-y-3 rounded-xl border border-gray-200 bg-white p-3
                    dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center">
        <Input
          value={globalFilter ?? ""}
          onChange={(e) => setGlobalFilter(e.target.value)}
          placeholder="Search..."
          className="max-w-sm bg-white dark:bg-gray-950
                     dark:border-gray-800 dark:text-gray-100
                     dark:placeholder:text-gray-400"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-sm">
          <thead className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-900">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="whitespace-nowrap border-b border-gray-200 px-4 py-3
                               text-left font-semibold text-gray-700
                               dark:border-gray-800 dark:text-gray-300"
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading &&
              Array.from({ length: 2 }).map((_, rowIndex) => (
                <tr key={rowIndex}>
                  {columns.map((_, colIndex) => (
                    <td
                      key={colIndex}
                      className="border-b border-gray-100 px-4 py-3
                                 dark:border-gray-800"
                    >
                      <div
                        className="h-4 w-full animate-pulse rounded
                                      bg-gray-200 dark:bg-gray-700"
                      />
                    </td>
                  ))}
                </tr>
              ))}

            {!isLoading &&
              table.getRowModel().rows.map((row, index) => (
                <tr
                  key={row.id}
                  className={`transition
                    ${
                      index % 2 === 0
                        ? "bg-white dark:bg-gray-900"
                        : "bg-gray-50 dark:bg-gray-800"
                    }
                    hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="whitespace-nowrap border-b border-gray-100 px-4 py-3
                                 text-gray-700 dark:border-gray-800
                                 dark:text-gray-200"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            {!isLoading && table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="py-10 text-center text-gray-500 dark:text-gray-400"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
