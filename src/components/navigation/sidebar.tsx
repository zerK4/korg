"use client";

import { BarChart, Coins, Grid, Home, LogOut, Plus } from "lucide-react";
import Link from "next/link";
import React from "react";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { Separator } from "../ui/separator";
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

export function Sidebar() {
  return (
    <div className='fixed top-0 left-0 h-[100dvh] w-20 border-r md:flex flex-col justify-center z-50 hidden'>
      <div>asd</div>
      <Separator className='my-10' />
      <div className='flex flex-col gap-4 items-center w-full h-full'>
        {navMenu.map((item, i) => (
          <Tooltip key={i} delayDuration={0}>
            <TooltipTrigger asChild>
              <Link key={i} href={item.href}>
                <Button className='h-14 w-14' variant={"ghost"} size={"icon"}>
                  <span>{item.icon}</span>
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent
              side='right'
              className='h-14 flex items-center gradiendBg text-foreground ml-4'
            >
              <span className='text-lg'>{item.name}</span>
            </TooltipContent>
          </Tooltip>
        ))}
      </div>
      <div className='flex justify-center mb-2'>
        <Button className='h-14 w-14' variant={"ghost"} size={"icon"}>
          <LogOut />
        </Button>
      </div>
    </div>
  );
}

export const MobileMenu = () => {
  return (
    <div className='fixed bottom-0 left-0 w-full flex items-center justify-between md:hidden h-16 bg-background z-50 px-10'>
      <div className='flex gap-4 items-center justify-between w-full h-full'>
        {navMenu.map((item, i) => (
          <>
            <Link key={i} href={item.href}>
              <Button className='h-10 w-10' variant={"ghost"} size={"icon"}>
                <span>{item.icon}</span>
              </Button>
            </Link>
            {i === navMenu.length - 3 && <MobileNavDrawer />}
          </>
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
            >
              Adauga o categorie
            </Button>
          </NewCategory>
          <NewIncome>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
            >
              Adauga un venit
            </Button>
          </NewIncome>
          <NewExpense>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
            >
              Adauga o cheltuiala
            </Button>
          </NewExpense>
          <NewBudgetType>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
            >
              Adauga un nou tip de venit
            </Button>
          </NewBudgetType>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export const navMenu = [
  {
    name: "Dashboard",
    icon: <Home size={20} />,
    href: "/",
  },
  {
    name: "Chelutieli",
    icon: <Coins size={20} />,
    href: "/expenses",
  },
  {
    name: "Venituri",
    icon: <BarChart size={20} />,
    href: "/incomes",
  },
  {
    name: "Categorii",
    icon: <Grid size={20} />,
    href: "/categories",
  },
];
