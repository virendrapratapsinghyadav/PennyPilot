import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  type ColumnDef,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useState } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState("");

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    state: {
      sorting,
      globalFilter,
    },
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    globalFilterFn: (row, _columnId, filterValue) => {
      const search = String(filterValue).toLowerCase();

      const name = String(row.getValue("name") ?? "").toLowerCase();
      const type = String(row.getValue("type") ?? "").toLowerCase();
      const category = String(row.getValue("category") ?? "").toLowerCase();
      const method = String(row.getValue("method") ?? "").toLowerCase();

      return (
        name.includes(search) ||
        type.includes(search) ||
        category.includes(search) ||
        method.includes(search)
      );
    },
  });

  return (
    <div className="w-full">
      {/* Search */}
      <div className="flex items-center py-3 sm:py-4">
        <Input
          className="brutal-input h-10 w-full max-w-sm rounded-none px-3 text-sm placeholder:text-[var(--muted-foreground)] sm:px-4"
          placeholder="Search transactions..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
        />
      </div>

      {/* Table */}
      <div className="w-full overflow-x-auto brutal-card rounded-none shadow-none">
        <Table className="w-full">
          <TableHeader className="bg-[var(--muted)]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b-2 border-[var(--border)] hover:bg-transparent"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="h-11 whitespace-nowrap px-3 text-xs font-bold uppercase tracking-wide text-[var(--foreground)] sm:h-12 sm:px-4 sm:text-sm"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-[var(--input)] transition-colors hover:bg-[var(--accent)]/20 data-[state=selected]:bg-[var(--accent)]/30"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      className="whitespace-nowrap px-3 py-3 text-sm sm:px-4 sm:py-3.5"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow className="hover:bg-transparent">
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center text-sm text-[var(--muted-foreground)]"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Controls */}
      <div className="flex flex-col gap-3 py-4 sm:flex-row sm:items-center sm:justify-between sm:py-5">
        <Button
          variant="outline"
          size="sm"
          className="brutal-button w-fit rounded-none bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--accent)]"
          onClick={() => setSorting([])}
        >
          Reset Sort
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="brutal-button rounded-none bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="brutal-button rounded-none bg-[var(--card)] text-[var(--foreground)] hover:bg-[var(--accent)] disabled:cursor-not-allowed disabled:opacity-40"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
