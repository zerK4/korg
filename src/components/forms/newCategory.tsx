"use client";

import { newCategory } from "@/app/actions/categoryActions";
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
import { categorySchema } from "@/schema/categorySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useMediaQuery } from "usehooks-ts";
import { z } from "zod";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { useCommands } from "@/store/useCommands";

function NewCategory({ children = null }: { children?: React.ReactNode }) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { openCategory } = useCommands();

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
            <NewCategoryForm />
          </div>
        </DrawerContent>
      </Drawer>
    );
  }
  return (
    <Dialog
      open={openCategory}
      onOpenChange={() => useCommands.setState({ openCategory: !openCategory })}
    >
      {children && <DialogTrigger asChild>{children}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <NewCategoryForm />
      </DialogContent>
    </Dialog>
  );
}

export default NewCategory;

const title = <span className='text-xl font-semibold'>Adauga o categorie</span>;
const description = <span>Aici poti adauga o noua categorie.</span>;

const NewCategoryForm = () => {
  const form = useForm<z.infer<typeof categorySchema>>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const handleSubmit = async (values: z.infer<typeof categorySchema>) => {
    const promise = newCategory(values);

    toast.promise(promise, {
      loading: (
        <div className='flex items-center gap-2'>
          <Loader size={16} className='animate-spin' />
          <span>Adaugare...</span>
        </div>
      ),
      success: "Categorie adaugata cu succes",
      error: "Eroare la adaugarea categoriei",
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className='space-y-5'>
        <FormField
          control={form.control}
          name='name'
          render={({ field }) => (
            <FormItem>
              <FormLabel>Numele categoriei</FormLabel>
              <FormControl>
                <Input {...field} placeholder='Nume' />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <DialogClose asChild>
          <Button className='w-full' type='submit'>
            Salveaza
          </Button>
        </DialogClose>
      </form>
    </Form>
  );
};
