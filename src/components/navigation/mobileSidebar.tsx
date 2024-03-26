"use client";

import { navMenu } from "@/lib/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { Fragment } from "react";
import { Button } from "../ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import NewCategory from "../forms/newCategory";
import { useCommands } from "@/store/useCommands";
import NewIncome from "../forms/newIncome";
import NewExpense from "../forms/newExpense";
import NewBudgetType from "../forms/newIncomeType";
import { Plus } from "lucide-react";

export const MobileSidebar = () => {
  const pathname = usePathname();
  return (
    <div className='fixed bottom-0 left-0 w-full flex items-center justify-between md:hidden h-16 bg-background z-50 px-10'>
      <div className='flex gap-4 items-center justify-between w-full h-full'>
        {navMenu.map((item, i) => (
          <Fragment key={i}>
            <Link key={i} href={item.href}>
              <Button
                className={`h-10 w-10 relative ${
                  pathname === item.href
                    ? " after:w-full after:absolute after:-top-3 after:left-0 after:h-0.5 after:bg-accent after:rounded-full after:ease-in-out after:duration-300"
                    : ""
                }`}
                variant={"ghost"}
                size={"icon"}
              >
                <span>{item.icon}</span>
              </Button>
            </Link>
            {i === navMenu.length - 3 && <MobileNavDrawer />}
          </Fragment>
        ))}
      </div>
    </div>
  );
};

const MobileNavDrawer = () => {
  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button className='rounded-full h-14 w-14' size={"icon"}>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className='h-fit pb-10 px-4'>
        <DrawerHeader>
          <DrawerTitle className='text-2xl'>Adauga</DrawerTitle>
        </DrawerHeader>
        <div className='flex flex-col gap-2'>
          <NewCategory>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
              className='rounded-xl h-14 flex items-center justify-normal gap-4'
              variant={"ghost"}
            >
              <span>
                <Plus />
              </span>
              <span>Adauga o categorie</span>
            </Button>
          </NewCategory>
          <NewIncome>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
              className='rounded-xl h-14 flex items-center justify-normal gap-4'
              variant={"ghost"}
            >
              <span>
                <Plus />
              </span>
              <span>Adauga un venit</span>
            </Button>
          </NewIncome>
          <NewExpense>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
              className='rounded-xl h-14 flex items-center justify-normal gap-4'
              variant={"ghost"}
            >
              <span>
                <Plus />
              </span>
              <span>Adauga o cheltuiala</span>
            </Button>
          </NewExpense>
          <NewBudgetType>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
              className='rounded-xl h-14 flex items-center justify-normal gap-4'
              variant={"ghost"}
            >
              <span>
                <Plus />
              </span>
              <span>Adauga un nou tip de venit</span>
            </Button>
          </NewBudgetType>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
