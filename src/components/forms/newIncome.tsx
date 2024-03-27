"use client";

import { newIncome } from "@/app/actions/incomeActions";
import { Spinner } from "@/components/Spinner";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { BudgetType } from "@/db/schema";
import { incomeSchema } from "@/schema/incomeSchema";
import { useFinancial } from "@/store/useFinancial";
import { zodResolver } from "@hookform/resolvers/zod";
import { SelectValue } from "@radix-ui/react-select";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { z } from "zod";
import { useCommands } from "@/store/useCommands";
import { FormCalendar } from "../calendars/formCalendar";

function NewIncome({ children = null }: { children?: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { budgets } = useFinancial();
  const { openNewIncome } = useCommands();

  if (isMobile) {
    return (
      <Drawer>
        {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <IncomeForm budgetTypes={budgets as BudgetType[]} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Sheet
        open={openNewIncome}
        onOpenChange={() =>
          useCommands.setState({ openNewIncome: !openNewIncome })
        }
      >
        {children && <SheetTrigger asChild>{children}</SheetTrigger>}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className='mt-10'>
            <IncomeForm budgetTypes={budgets as BudgetType[]} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }
}

export default NewIncome;

const title = <span className='text-xl font-semibold'>Adauga venit</span>;
const description = (
  <span>
    Aici poti adauga un nou venit care va fi luat in considerare la calulele
    tale.
  </span>
);

const IncomeForm = ({ budgetTypes }: { budgetTypes: BudgetType[] }) => {
  const form = useForm<z.infer<typeof incomeSchema>>({
    resolver: zodResolver(incomeSchema),
    defaultValues: {
      name: "",
      type: "",
      value: "",
      date: Date.now(),
    },
  });

  const handleSubmit = async (values: z.infer<typeof incomeSchema>) => {
    const promise = newIncome(values);
    toast.promise(promise, {
      loading: (
        <div className='flex items-center gap-2'>
          <Spinner />
          <span>Adaugare...</span>
        </div>
      ),
      success: "Venit adaugat cu succes",
      error: "Eroare la adaugarea venitului",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='flex flex-col gap-3'
      >
        {Object.keys(incomeSchema.shape).map((item, i) => (
          <FormField
            key={i}
            control={form.control}
            name={item as any}
            render={({ field }) => (
              <FormItem className='flex flex-col gap-0'>
                <FormLabel>{incomeFieldMapper[item as any]}</FormLabel>
                <FormControl>
                  {item === "type" ? (
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger>
                        <SelectValue placeholder='Selecteaza metoda' />
                      </SelectTrigger>
                      <SelectContent>
                        {budgetTypes.map((item, i) => (
                          <SelectItem key={i} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  ) : item === "value" ? (
                    <div className='flex items-center gap-2'>
                      <Input
                        {...field}
                        onChange={(e) =>
                          field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                        }
                      />
                      <span className='text-zinc-500'>RON</span>
                    </div>
                  ) : item === "details" ? (
                    <Textarea {...field} />
                  ) : item === "date" ? (
                    <FormCalendar field={field} />
                  ) : (
                    <Input {...field} />
                  )}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}
        <SheetClose asChild>
          <Button className='w-full mt-4' type='submit'>
            Salveaza
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
};

const incomeFieldMapper: any = {
  name: "Nume",
  value: "Valoare",
  cash: "Metoda de incasare",
  details: "Detalii",
  date: "Data incasarii",
};
