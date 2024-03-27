"use client";

import { getAllCategories } from "@/app/actions/categoryActions";
import { newExpense } from "@/app/actions/expenseActions";
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
  SelectValue,
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
import { CategoryType } from "@/db/schema";
import { expenseSchema } from "@/schema/expenseSchema";
import { useCommands } from "@/store/useCommands";
import { useFinancial } from "@/store/useFinancial";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { z } from "zod";
import { FormCalendar } from "../calendars/formCalendar";

function NewExpense({ children = null }: { children?: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [categories, setCategories] = useState<CategoryType[]>();
  const { openExpense } = useCommands();

  useEffect(() => {
    getAllCategories()
      .then((cats) => {
        setCategories(cats);
      })
      .catch((err) => {
        console.log(err);

        throw err;
      });
  }, []);

  if (isMobile) {
    return (
      <Drawer>
        {children && <DrawerTrigger asChild>{children}</DrawerTrigger>}
        <DrawerContent className='pb-4'>
          <DrawerHeader>
            <DrawerTitle>{title}</DrawerTitle>
            <DrawerDescription>{description}</DrawerDescription>
          </DrawerHeader>
          <div className='px-4'>
            <NewExpenseForm categories={categories} />
          </div>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Sheet
        open={openExpense}
        onOpenChange={() => useCommands.setState({ openExpense: !openExpense })}
      >
        {children && <SheetTrigger asChild>{children}</SheetTrigger>}
        <SheetContent>
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <SheetDescription>{description}</SheetDescription>
          </SheetHeader>
          <div className='mt-10'>
            <NewExpenseForm categories={categories} />
          </div>
        </SheetContent>
      </Sheet>
    );
  }
}

export default NewExpense;

const title = (
  <span className='text-xl font-semibold'>Adauga o Cheltuiala</span>
);
const description = <span>Aici poti adauga o noua cheltuiala.</span>;

const NewExpenseForm = ({
  categories,
}: {
  categories: CategoryType[] | undefined;
}) => {
  const { budgets } = useFinancial();
  const form = useForm<z.infer<typeof expenseSchema>>({
    resolver: zodResolver(expenseSchema),
    defaultValues: {
      name: "",
      amount: "",
      category: "",
      date: Date.now(),
    },
  });

  const handleSubmit = async (values: z.infer<typeof expenseSchema>) => {
    const promise = newExpense(values);

    toast.promise(promise, {
      loading: (
        <div className='flex items-center gap-2'>
          <Loader size={16} className='animate-spin' />
          <span>Adaugare...</span>
        </div>
      ),
      success: "Cheltuiala adaugata cu succes",
      error: "Eroare la adaugarea cheltuielii",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className='space-y-3 w-full'
      >
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nume cheltuiala</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Nume' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='category'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Categoria</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecteaza o categorie' />
                  </SelectTrigger>
                  <SelectContent>
                    {categories?.map((category, i) => (
                      <SelectItem key={i} value={category.id}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='amount'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Valoarea</FormLabel>
              <FormControl className='flex items-center gap-2'>
                <div>
                  <Input
                    {...field}
                    onChange={(e) =>
                      field.onChange(e.target.value.replace(/[^0-9]/g, ""))
                    }
                  />
                  <span className='text-zinc-500'>RON</span>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='from'
          render={({ field }) => (
            <FormItem className='w-full'>
              <FormLabel>Alege sursa</FormLabel>
              <FormControl className='flex items-center gap-2 w-full'>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder='Selecteaza o sursa' />
                  </SelectTrigger>
                  <SelectContent className='w-full'>
                    {budgets?.map((budget, i) => (
                      <SelectItem key={i} value={budget.id}>
                        <div className='flex items-center gap-10'>
                          <span>{budget.name}</span>
                          <span>disponibil: {budget.amount}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='date'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Data</FormLabel>
              <FormControl className='flex items-center gap-2'>
                <FormCalendar field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetClose asChild>
          <Button className='w-full' type='submit'>
            Salveaza
          </Button>
        </SheetClose>
      </form>
    </Form>
  );
};
