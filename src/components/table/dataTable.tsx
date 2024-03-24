"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
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
import { useEffect, useRef, useState } from "react";
import anime from "animejs";
import { DataTablePagination } from "./dataTablePagination";
import { SearchInput } from "../ui/input";
import { FilterCalendar } from "./filterCalendar";
import FilterSelectMonth from "./filterSelectMonth";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const tableRef = useRef(null);
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  useEffect(() => {
    anime({
      targets: tableRef.current,
      opacity: [0, 1],
      translateY: [40, 0],
      duration: 1000,
      easing: "easeInOutExpo",
    });
  }, []);

  return (
    <div
      ref={tableRef}
      className='rounded-xl border overflow-hidden opacity-0 scale-0 translate-y-40'
    >
      <div className='border-b flex justify-between items-center  p-2'>
        <div className='flex items-center'>
          <SearchInput
            placeholder='Filtreaza dupa nume'
            value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("name")?.setFilterValue(event.target.value)
            }
            className='max-w-sm'
          />
        </div>
        <div className='flex gap-2 w-fit'>
          <FilterSelectMonth />
          <FilterCalendar />
        </div>
      </div>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id} className='hover:bg-none'>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id} className='p-4'>
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
                onClick={() => table.getRow(row.id).toggleSelected()}
                key={row.id}
                className={`${row.getIsSelected() && "bg-accent/30"}`}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='h-16 px-4'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className='h-24 text-center'>
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className='border-t p-2'>
        <DataTablePagination table={table} />
      </div>
    </div>
  );
}
