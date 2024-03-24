"use client";

import { createBudgetType } from "@/app/actions/budgetActions";
import { Spinner } from "@/components/Spinner";
import { AddButton, Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { budgetTypeSchema } from "@/schema/budgetTypeSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useCommands } from "@/store/useCommands";

function NewBudgetType({ children = null }: { children?: React.ReactNode }) {
  const { openIncomeType } = useCommands();
  const form = useForm<z.infer<typeof budgetTypeSchema>>({
    resolver: zodResolver(budgetTypeSchema),
  });

  const onSubmit = async (values: z.infer<typeof budgetTypeSchema>) => {
    const promise = createBudgetType(values);

    toast.promise(promise, {
      loading: (
        <div className='flex items-center gap-2'>
          <Spinner />
          <span>Adaugare...</span>
        </div>
      ),
      success: "Tip incasare adaugat cu succes",
      error: "Eroare la adaugarea tipului incasare",
    });
  };

  return (
    <Dialog
      open={openIncomeType}
      onOpenChange={() =>
        useCommands.setState({ openIncomeType: !openIncomeType })
      }
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>Adauga o nouma metoda de incasare</DialogHeader>
        <div>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume</FormLabel>
                    <FormControl>
                      <Input placeholder='Nume' {...field} />
                    </FormControl>
                    <FormDescription>
                      Numele tipului de incasare, de ex. `cash`, `card`, etc.{" "}
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='details'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nume</FormLabel>
                    <FormControl>
                      <Textarea placeholder='Detalii suplimentare' {...field} />
                    </FormControl>
                    <FormDescription>
                      Poti adauga mai multe detalii pentru a te face inteles.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className='mt-4'>Salveaza</Button>
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default NewBudgetType;
