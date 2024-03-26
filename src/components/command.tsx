"use client";

import * as React from "react";
import { CreditCard, Plus, Route, Settings, User } from "lucide-react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import { useCommands } from "@/store/useCommands";
import { useRouter } from "next/navigation";
import { navMenu } from "@/lib/navigation";

export function CommandDialogComp() {
  const [open, setOpen] = React.useState(false);
  const router = useRouter();

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <CommandDialog open={open} onOpenChange={setOpen}>
      <CommandInput placeholder='Type a command or search...' />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup heading='Adauga'>
          {commandList.map((command, i) => (
            <div key={i}>{command.button(setOpen)}</div>
          ))}
        </CommandGroup>
        <CommandSeparator />
        <CommandGroup heading='Rute'>
          {navMenu.map((item, i) => (
            <CommandItem
              key={i}
              className='flex items-center gap-2'
              onSelect={() => {
                router.push(item.href);
                setOpen(false);
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
}

export const commandList = [
  {
    button: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      return (
        <CommandItem
          className='flex items-center gap-2'
          onSelect={() => {
            useCommands.setState({ openCategory: true });
            setOpen(false);
          }}
        >
          <Plus />
          <span>Adauga o categorie</span>
        </CommandItem>
      );
    },
  },
  {
    button: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      return (
        <CommandItem
          className='flex items-center gap-2'
          onSelect={() => {
            useCommands.setState({ openExpense: true });
            setOpen(false);
          }}
        >
          <Plus />
          <span>Adauga o cheltuiala</span>
        </CommandItem>
      );
    },
  },
  {
    button: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      return (
        <CommandItem
          className='flex items-center gap-2'
          onSelect={() => {
            useCommands.setState({ openIncomeType: true });
            setOpen(false);
          }}
        >
          <Plus />
          <span>Adauga un tip de incasare</span>
        </CommandItem>
      );
    },
  },
  {
    button: (setOpen: React.Dispatch<React.SetStateAction<boolean>>) => {
      return (
        <CommandItem
          className='flex items-center gap-2'
          onSelect={() => {
            useCommands.setState({ openNewIncome: true });
            setOpen(false);
          }}
        >
          <Plus />
          <span>Adauga o incasare</span>
        </CommandItem>
      );
    },
  },
];
