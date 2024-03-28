"use client";

import { navMenu } from "@/lib/navigation";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
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
import { useNav } from "@/store/useNav";

export const MobileSidebar = () => {
  const pathname = usePathname();
  const { switchPage } = useNav();
  const router = useRouter();

  return (
    <div className="fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-between bg-background px-10 md:hidden">
      <div className="flex h-full w-full items-center justify-between gap-4">
        {navMenu.map((item, i) => (
          <Fragment key={i}>
            <Link
              key={i}
              href={item.href}
              onClick={(e) =>
                switchPage({
                  e,
                  router,
                  pageName: item.name,
                  href: item.href,
                })
              }
            >
              <Button
                className={`relative h-10 w-10 ${
                  pathname === item.href
                    ? " after:absolute after:-top-3 after:left-0 after:h-0.5 after:w-full after:rounded-full after:bg-accent after:duration-300 after:ease-in-out"
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
        <Button className="h-14 w-14 rounded-full" size={"icon"}>
          <Plus />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-fit px-4 pb-10">
        <DrawerHeader>
          <DrawerTitle className="text-2xl">Adauga</DrawerTitle>
        </DrawerHeader>
        <div className="flex flex-col gap-2">
          <NewCategory>
            <Button
              onClick={() => useCommands.setState({ openCategory: true })}
              className="flex h-14 items-center justify-normal gap-4 rounded-xl"
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
              className="flex h-14 items-center justify-normal gap-4 rounded-xl"
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
              className="flex h-14 items-center justify-normal gap-4 rounded-xl"
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
              className="flex h-14 items-center justify-normal gap-4 rounded-xl"
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
