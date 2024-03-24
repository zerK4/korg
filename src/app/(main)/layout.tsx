import { CommandDialogComp } from "@/components/command";
import { MobileMenu, Sidebar } from "@/components/navigation/sidebar";
import Topbar from "@/components/navigation/topbar";
import React from "react";
import getSession from "../actions/authActions";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/sonner";
import ClientPage from "./page.client";
import { db } from "@/db";
import { budget, expenses, incomes } from "@/db/schema";
import { eq } from "drizzle-orm";
import { getRecents } from "../actions/recentsActions";
import NewIncome from "@/components/forms/newIncome";
import NewExpense from "@/components/forms/newExpense";
import NewBudgetType from "@/components/forms/newIncomeType";
import NewCategory from "@/components/forms/newCategory";

async function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = await getSession();

  if (!user) redirect("/login");

  const budgetTypes = await db.query.budget.findMany({
    where: eq(budget.userId, user?.id),
    with: {
      user: true,
    },
  });
  const recents = await getRecents();

  const currentExpenses = await db.query.expenses.findMany({
    where: eq(expenses.userId, user?.id),
  });

  const currentIncomes = await db.query.incomes.findMany({
    where: eq(incomes.userId, user?.id),
  });

  return (
    <div className='flex overflow-x-hidden min-h-[100dvh]'>
      <Sidebar />
      <MobileMenu />
      <CommandDialogComp />
      <div className='md:ml-20 relative w-full'>
        <Topbar />
        <NewIncome />
        <NewExpense />
        <NewBudgetType />
        <NewCategory />
        <ClientPage
          data={{
            currentExpenses,
            currentIncomes,
            budgetTypes,
            recents,
          }}
        />
        {children}
        <Toaster closeButton position='top-center' richColors />
      </div>
    </div>
  );
}

export default layout;
