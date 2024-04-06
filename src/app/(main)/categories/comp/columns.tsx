"use client";

import { RenderExpenseAmount } from "@/components/filteredAmount";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExpenseType } from "@/db/schema";
import { CategoryType } from "@/db/schema/categories";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface ICategoryExtended extends CategoryType {
  expenses: ExpenseType[];
}

export const columns: ColumnDef<ICategoryExtended>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label='Select all'
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label='Select row'
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "name",
    header: ({ table }) => {
      return <div className='flex w-full justify-center'>Nume</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-center'>
          <span className=''>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "expenses",
    header: ({ table }) => {
      return <div className='flex w-full justify-center'>Cheltuieli</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-center'>
          <span className=''>{row.original?.expenses?.length}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "expenses_amount",
    header: ({ table }) => {
      return <div className='flex w-full justify-center'>Value</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-center'>
          <RenderExpenseAmount data={row.original.expenses} />
        </div>
      );
    },
  },
  {
    id: "actions",
    header: ({ table }) => {
      return (
        <div className='w-full flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=''>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText("payment.id")}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <div className='w-full flex justify-end'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild className=''>
              <Button variant='ghost' className='h-8 w-8 p-0'>
                <span className='sr-only'>Open menu</span>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(payment.id)}
              >
                Copy payment ID
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>View customer</DropdownMenuItem>
              <DropdownMenuItem>View payment details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  },
];
