"use client";

import RowActionsDropdown from "@/components/rowActionsDropdown";
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
import { ExpenseType, UserType } from "@/db/schema";
import { CategoryType } from "@/db/schema/categories";
import { useFunctions } from "@/store/useFunctions";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

export interface IExpenseExtended extends ExpenseType {
  category: CategoryType;
  user: UserType;
}

export const columns: ColumnDef<IExpenseExtended>[] = [
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
      return <div className='flex w-full justify-end'>Nume</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end'>
          <span className=''>{row.original.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: ({ table }) => {
      return <div className='flex w-full justify-end'>Categoria</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end'>
          <span className=''>{row.original.category.name}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    accessorFn: () => {
      return 100;
    },
    header: ({ table }) => {
      return <div className='flex w-full justify-end'>Valoare</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end gap-2'>
          <span className=''>{row.original.amount}</span>
          <span className=''>RON</span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ table }) => {
      return <div className='flex w-full justify-end'>Data</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end'>
          <span className=''>{row.original.date}</span>
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
      return (
        <div className='w-full flex justify-end'>
          <RowActionsDropdown
            cb={() => {
              useFunctions.getState().deleteSomething({
                deleteWhat: "expense",
                id: row.original.id,
              });
            }}
          />
        </div>
      );
    },
  },
];
