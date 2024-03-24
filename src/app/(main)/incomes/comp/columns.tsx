"use client";

import { removeIncome } from "@/app/actions/incomeActions";
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
import { ExpenseType, IncomeType } from "@/db/schema";
import { CategoryType } from "@/db/schema/categories";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, Trash } from "lucide-react";
import { toast } from "sonner";

export interface ICategoryExtended extends CategoryType {
  expenses: ExpenseType[];
}

export const columns: ColumnDef<IncomeType>[] = [
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
    accessorKey: "budgetType",
    header: ({ table }) => {
      return <div className='flex w-full justify-end'>Metoda incasare</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end'>
          <span className=''>{row.original.type}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "value",
    accessorFn: (row) => {
      return row.name;
    },
    header: ({ table }) => {
      return <div className='flex w-full justify-end'>Suma</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end gap-2'>
          <span className=''>{row.original.amount}</span>
          <span>RON</span>
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
        <div className='w-full flex justify-end gap-2'>
          <span className=''>{row.original.date}</span>
        </div>
      );
    },
  },
  {
    accessorKey: "details",
    header: ({ table }) => {
      return <div className='flex w-full justify-end'>Detalii</div>;
    },
    cell: ({ row }) => {
      return (
        <div className='w-full flex justify-end gap-2'>
          <span className=''>{row.original.details || "---"}</span>
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
                Copiaza suma
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
          <RowActionsDropdown cb={() => handleDelete(payment.id)} />
        </div>
      );
    },
  },
];

const handleDelete = (id: string) => {
  const promise = removeIncome(id);
  toast.promise(promise, {
    success: "Venit sters cu succes",
    error: "Eroare la stergerea venitului",
  });
};
